<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const message = ref('');
const isError = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  message.value = '';
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      // 1. SAVE DATA
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      isError.value = false;
      message.value = "Login successful! Redirecting...";

      // 2. NOTIFY OTHER COMPONENTS
      window.dispatchEvent(new Event('auth-change'));
      
      // 3. SECURE REDIRECTION
      setTimeout(() => {
        // Use .toUpperCase() to prevent "admin" vs "ADMIN" errors
        const userRole = data.user.role ? data.user.role.toUpperCase() : 'USER';

        if (userRole === 'ADMIN') {
          console.log("Redirecting to Admin Dashboard...");
          router.push('/admin/dashboard').catch(err => {
             console.error("Router Push Failed:", err);
             // Fallback if the path is actually just /admin
             router.push('/admin');
          });
        } else {
          router.push('/');
        }
      }, 1000);
      
    } else {
      isError.value = true;
      message.value = data.message || "Invalid credentials.";
    }
  } catch (err) {
    isError.value = true;
    message.value = "Connection error. Is the backend running?";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Welcome Back</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input v-model="password" type="password" placeholder="Enter your password" required />
      </div>
      
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    
    <p v-if="message" :class="{ 'error-text': isError, 'success-text': !isError }">
      {{ message }}
    </p>

    <p class="switch-text">
      Don't have an account? <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<style scoped>
/* Keep your existing CSS styles, they look great! */
.login-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
}

form {
  background: rgba(20, 20, 20, 0.6);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
}

.form-group {
  margin-bottom: 1.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: #fff;
}

input {
  padding: 0.5rem 0.8rem;
  border: 1px solid #444;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  box-sizing: border-box;
  background: rgba(30, 30, 30, 0.7);
  color: #fff;
  outline: none;
}

button[type="submit"] {
  padding: 0.6rem 1.5rem;
  background: #ff5733;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.switch-text {
  margin-top: 1rem;
  color: #bbb;
  font-size: 0.9rem;
}

.switch-text a {
  color: #ff5733;
  text-decoration: none;
}

.error-text { color: #ff4d4f; }
.success-text { color: #52c41a; }
</style>