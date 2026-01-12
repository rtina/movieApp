<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);
const userInitial = ref('P');

// Logic to check authentication status
const checkAuth = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  isLoggedIn.value = !!token;
  
  // If user exists, get the first letter of their email for the profile circle
  if (user && user.email) {
    userInitial.value = user.email.charAt(0).toUpperCase();
  } else {
    userInitial.value = 'P';
  }
};

onMounted(() => {
  // 1. Initial check when component loads
  checkAuth();

  // 2. Listen for 'auth-change' event (triggered by Login/Logout)
  window.addEventListener('auth-change', checkAuth);
  
  // 3. Listen for changes in other tabs (optional but good practice)
  window.addEventListener('storage', checkAuth);
});

onUnmounted(() => {
  // Clean up listeners when component is destroyed
  window.removeEventListener('auth-change', checkAuth);
  window.removeEventListener('storage', checkAuth);
});

const goToRegister = () => router.push('/register');
const goToLogin = () => router.push('/login');

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Update local state and tell other components
  checkAuth();
  window.dispatchEvent(new Event('auth-change'));
  
  router.push('/login');
};
</script>

<template>
  <nav class="navbar">
    <div class="brand">
      <router-link to="/">StoryArc <span>Flims</span></router-link>
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><a href="#">About</a></li>

      <template v-if="!isLoggedIn">
        <li><button class="btn" @click="goToRegister">Register</button></li>
        <li><button class="btn" @click="goToLogin">Login</button></li>
        <li class="btn"><router-link to="/recommendations">AI Recommendations</router-link></li>
      </template>

      <template v-else>
        <li>
          <router-link to="/profile" class="profile-link">
            <div class="profile-circle">{{ userInitial }}</div>
          </router-link>
        </li>
        <li><button class="btn logout" @click="handleLogout">Logout</button></li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #000;
        padding: 10px 20px;
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .brand a {
        color: white;
        text-decoration: none;
        font-size: 24px;
        font-weight: bold;
        font-family: Georgia, serif;
        margin-left: 1rem;
    }
    
    .brand a span {
        color: #ff5733;
    }

    .navbar ul {
        list-style-type: none;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    .navbar ul li {
        margin: 0 10px;
    }

    .navbar ul li a {
        color: white;
        text-decoration: none;
        font-size: 18px;
        padding: 8px 12px;
        transition: background-color 0.3s ease;
    }

    .navbar ul li a:hover {
        background-color: #333;
        border-radius: 4px;
    }

    .btn {
        padding: 8px 18px;
        font-size: 16px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        background-color: #ff5733;
        color: white;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn:hover {
        background-color: #ba300e;
        transform: translateY(-1px);
    }

    .profile-link {
        text-decoration: none;
        display: flex;
        align-items: center;
    }

    .profile-circle {
        width: 38px;
        height: 38px;
        background-color: #ff5733;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.1rem;
        border: 2px solid #fff;
        transition: transform 0.2s;
    }

    .profile-circle:hover {
        transform: scale(1.1);
    }

    .logout {
        background-color: transparent;
        border: 1.5px solid #ff5733;
        color: #ff5733;
    }

    .logout:hover {
        background-color: #ff5733;
        color: white;
    }
</style>