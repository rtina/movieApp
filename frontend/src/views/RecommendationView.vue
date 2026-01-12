<script setup>
import { ref } from 'vue';

const prompt = ref("");
const results = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

const getAIRecommendation = async () => {
  if (!prompt.value) return;
  isLoading.value = true;
  errorMessage.value = "";
  
  try {
    // Note: We removed the Authorization header so guests can use this
    const res = await fetch('http://localhost:3000/api/movies/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization' header is removed to allow public access
      },
      body: JSON.stringify({ prompt: prompt.value })
    });

    // Check if the response is actually JSON
    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to get recommendations");
      } else {
        throw new Error("Server error. Please check if the backend is running.");
      }
    }

    results.value = await res.json();
  } catch (err) {
    errorMessage.value = err.message;
    console.error("AI Error:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="ai-page-container">
    <div class="glass-card">
      <div class="header-section">
        <h1>🎬 AI Movie Guide</h1>
        <span class="badge">Public Beta</span>
      </div>
      <p>Tell the AI what you're in the mood for. No account needed!</p>
      
      <div class="search-section">
        <textarea 
          v-model="prompt" 
          placeholder="e.g., I want something animated and funny for a family night..."
          class="dark-input"
          :disabled="isLoading"
        ></textarea>
        <button @click="getAIRecommendation" :disabled="isLoading" class="ai-btn">
          <span v-if="!isLoading">✨ Get Recommendations</span>
          <span v-else>🧠 Thinking...</span>
        </button>
      </div>

      <div v-if="errorMessage" class="error-msg">
        ⚠️ {{ errorMessage }}
      </div>

      <div v-if="results.length === 0 && !isLoading && !errorMessage" class="empty-state">
        Your recommendations will appear here.
      </div>

      <div class="results-grid">
        <div v-for="movie in results" :key="movie.id" class="movie-card">
          <div class="card-content">
            <h3>{{ movie.title }}</h3>
            <span class="genre-tag">{{ movie.genre }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-page-container { padding: 40px; background: #000; min-height: 100vh; color: white; font-family: sans-serif; }
.glass-card { background: #111; border: 1px solid #222; padding: 30px; border-radius: 20px; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

.header-section { display: flex; align-items: center; gap: 15px; margin-bottom: 10px; }
.badge { background: #333; font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; color: #ff5733; text-transform: uppercase; letter-spacing: 1px; }

.search-section { display: flex; flex-direction: column; gap: 15px; margin: 25px 0; }
.dark-input { background: #0d0d0d; border: 1px solid #333; color: white; padding: 15px; border-radius: 12px; min-height: 100px; transition: border 0.3s; resize: none; }
.dark-input:focus { outline: none; border-color: #ff5733; }

.ai-btn { background: linear-gradient(45deg, #ff5733, #ff8d33); color: white; border: none; padding: 14px; border-radius: 10px; cursor: pointer; font-weight: bold; transition: opacity 0.3s; }
.ai-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.error-msg { background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; color: #ef4444; padding: 12px; border-radius: 4px; margin: 20px 0; }
.empty-state { text-align: center; color: #444; margin-top: 40px; border: 2px dashed #222; padding: 40px; border-radius: 15px; }

.results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-top: 30px; }
.movie-card { background: #1a1a1a; border-radius: 12px; border: 1px solid #333; overflow: hidden; transition: transform 0.3s; }
.movie-card:hover { transform: translateY(-5px); border-color: #ff5733; }
.card-content { padding: 20px; }
.card-content h3 { margin: 0 0 10px 0; font-size: 1.1rem; }
.genre-tag { font-size: 0.75rem; color: #ff5733; background: rgba(255, 87, 51, 0.1); padding: 4px 10px; border-radius: 20px; }
</style>