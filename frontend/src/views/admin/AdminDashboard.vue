<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const stats = ref({ totalUsers: 0, totalMovies: 0 });
const adminName = ref('Admin');

const fetchStats = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/admin/stats', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const result = await response.json();
    if (response.ok) {
      stats.value = result.data;
    } else {
      // If unauthorized, kick back to login
      router.push('/login');
    }
  } catch (error) {
    console.error("Failed to fetch stats", error);
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth-change'));
  router.push('/login');
};

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  adminName.value = user.email ? user.email.split('@')[0] : 'Admin';
  fetchStats();
});
</script>

<template>
  <div class="admin-container">
    <aside class="sidebar">
      <div class="logo">StoryArc<span>Admin</span></div>
      <nav class="menu">
        <router-link to="/admin/dashboard" class="menu-item active">Dashboard</router-link>
        <router-link to="/admin/movies" class="menu-item">Manage Movies</router-link>
        <router-link to="/admin/users" class="menu-item">Manage Users</router-link>
      </nav>
      <button class="logout-btn" @click="handleLogout">Exit to Site</button>
    </aside>

    <main class="main-content">
      <header class="admin-header">
        <h1>Dashboard</h1>
        <div class="user-pill">Welcome, {{ adminName }}</div>
      </header>

      <router-view /> 
    </main>
  </div>
</template>

<style scoped>
/* Container and Overall Background */
.admin-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0a0a; /* True black background */
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 260px;
  background-color: #141414; /* Slightly lighter black for depth */
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  border-right: 1px solid #222; /* Subtle separation */
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
}
.logo span { color: #ff5733; } /* Your specific orange */

.menu { flex: 1; }
.menu-item {
  display: block;
  padding: 1rem 2rem;
  color: #888;
  text-decoration: none;
  transition: 0.3s;
  font-weight: 500;
}

.menu-item:hover {
  color: #fff;
  background-color: rgba(255, 87, 51, 0.1); /* Subtle orange glow */
}

.menu-item.active {
  background-color: rgba(255, 87, 51, 0.15);
  color: #ff5733;
  border-left: 4px solid #ff5733;
}

.logout-btn {
  margin: 1rem 2rem;
  padding: 0.8rem;
  background: transparent;
  border: 1px solid #ff5733;
  color: #ff5733;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #ff5733;
  color: #fff;
}

/* Content Styles */
.main-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
  background-color: #0a0a0a;
}

.admin-header h1 {
  color: #fff;
  font-weight: 700;
}

.user-pill {
  background: #1e1e1e; /* Darker pill */
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-weight: 500;
  border: 1px solid #333;
  margin: 1rem 0;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: #141414; /* Match sidebar */
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #222; /* Sharp, clean edges */
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: #ff5733; /* Highlights on hover */
}

.stat-info h3 { 
  color: #888; 
  font-size: 0.85rem; 
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0; 
}

.stat-info .number { 
  font-size: 2rem; 
  font-weight: 700; 
  color: #fff;
  margin: 0.5rem 0 0; 
}

.active-status { color: #10b981; }

/* Icons with Orange Theme */
.icon {
  font-size: 1.5rem;
  background: rgba(255, 87, 51, 0.1); /* Transparent version of your orange */
  color: #ff5733; /* Solid orange for the emoji/icon */
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
</style>