<script setup>
import { ref, onMounted } from 'vue';

const stats = ref({ totalUsers: 0, totalMovies: 0 });

const fetchStats = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/admin/stats', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const result = await response.json();
    if (response.ok) stats.value = result.data;
  } catch (err) {
    console.error("Stats error:", err);
  }
};

onMounted(fetchStats);
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-info">
        <h3>Total Users</h3>
        <p class="number">{{ stats.totalUsers }}</p>
      </div>
      <div class="icon">👤</div>
    </div>

    <div class="stat-card">
      <div class="stat-info">
        <h3>Total Movies</h3>
        <p class="number">{{ stats.totalMovies }}</p>
      </div>
      <div class="icon">🎬</div>
    </div>

    <div class="stat-card">
      <div class="stat-info">
        <h3>System Status</h3>
        <p class="number status-online">Online</p>
      </div>
      <div class="icon">✔</div>
    </div>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.stat-card {
  background: #141414;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #222;
}
.stat-info h3 { color: #888; font-size: 0.85rem; text-transform: uppercase; margin: 0; }
.stat-info .number { font-size: 2rem; font-weight: 700; color: #fff; margin: 0.5rem 0 0; }
.status-online { color: #10b981; }
.icon {
  font-size: 1.5rem;
  background: rgba(255, 87, 51, 0.1);
  color: #ff5733;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
</style>