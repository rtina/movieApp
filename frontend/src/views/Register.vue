<template>
  <div class="register-container">
    <h2>Create Account</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input v-model="password" type="password" placeholder="Enter your password" required />
      </div>
      
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>
    </form>
    
    <p v-if="message" :class="{ 'error-text': isError, 'success-text': !isError }">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const message = ref('');
const isError = ref(false);
const isLoading = ref(false);

const handleRegister = async () => {
  isLoading.value = true;
  message.value = '';
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
        // Role is NOT sent; backend handles the @default("USER")
      })
    });

    const data = await response.json();

    if (response.ok) {
      isError.value = false;
      message.value = "Registration successful! You can now login.";
      email.value = '';
      password.value = '';
    } else {
      isError.value = true;
      // MATCHING THE BACKEND KEY: data.message
      message.value = data.message || "Registration failed.";
    }
  } catch (err) {
    isError.value = true;
    message.value = "Cannot connect to server. Is the backend running on port 3000?";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
body {
  background: #111;
}

.register-container {
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
  -webkit-backdrop-filter: blur(10px) saturate(180%);
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

input[type="email"],
input[type="password"] {
  padding: 0.5rem 0.8rem;
  border: 1px solid #444;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  box-sizing: border-box;
  background: rgba(30, 30, 30, 0.7);
  color: #fff;
  outline: none;
  transition: border 0.2s;
}
input[type="email"]:focus,
input[type="password"]:focus {
  border: 1.5px solid #007bff;
}

button[type="submit"] {
  padding: 0.6rem 1.5rem;
  background: #ff5733;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
button[type="submit"]:hover:not(:disabled) {
  background: #ba300e;
}
button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Feedback text colors */
.error-text { color: #ff4d4f; }
.success-text { color: #52c41a; }
</style>