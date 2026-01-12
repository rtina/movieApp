<script setup>
import { ref, onMounted } from 'vue';

const movies = ref([]);
const showForm = ref(false);
const isLoading = ref(false);
const isEditing = ref(false); // New state to track if we are editing
const currentMovieId = ref(null); // Tracks the ID of the movie being edited

// Database schema fields
const movieData = ref({ 
  title: '', 
  genre: '', 
  description: '', 
  posterUrl: '', 
  releaseYear: 2026 
});

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const fetchMovies = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/movies');
    if (!res.ok) throw new Error("Failed to fetch");
    movies.value = await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

/**
 * NEW: Edit Logic - Populate form and scroll to top
 */
const startEdit = (movie) => {
  isEditing.value = true;
  showForm.value = true;
  currentMovieId.value = movie.id;
  
  // Fill the form with existing data
  movieData.value = {
    title: movie.title,
    genre: movie.genre,
    description: movie.description,
    posterUrl: movie.posterUrl,
    releaseYear: movie.releaseYear
  };
  
  // Optional: scroll to the form
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Modified Save Logic: Handles both POST and PUT
 */
const saveMovie = async () => {
  if (!movieData.value.title || !movieData.value.posterUrl || !movieData.value.description) {
    return alert("All fields are required.");
  }
  
  isLoading.value = true;
  
  // Determine if we are updating or creating
  const url = isEditing.value 
    ? `http://localhost:3000/api/movies/${currentMovieId.value}`
    : 'http://localhost:3000/api/movies';
    
  const method = isEditing.value ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method: method,
      headers: getAuthHeaders(),
      body: JSON.stringify({
        ...movieData.value,
        releaseYear: parseInt(movieData.value.releaseYear) 
      })
    });

    if (res.ok) {
      alert(isEditing.value ? "Movie updated!" : "Movie added!");
      cancelAction(); // Reset form and state
      await fetchMovies(); 
    }
  } catch (err) {
    console.error("Save error:", err);
  } finally {
    isLoading.value = false;
  }
};

/**
 * NEW: Helper to reset form state
 */
const cancelAction = () => {
  showForm.value = false;
  isEditing.value = false;
  currentMovieId.value = null;
  movieData.value = { title: '', genre: '', description: '', posterUrl: '', releaseYear: 2026 };
};

const deleteMovie = async (id) => {
  if (!confirm("Delete this movie?")) return;
  try {
    const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) movies.value = movies.value.filter(m => m.id !== id);
  } catch (err) {
    console.error("Delete error:", err);
  }
};

onMounted(fetchMovies);
</script>

<template>
  <div class="management-layout">
    <div class="sidebar">
      <h1 class="page-title">Movie Management</h1>
      <button class="close-btn" @click="showForm ? cancelAction() : showForm = true">
        {{ showForm ? 'Close' : 'Open' }}
      </button>
    </div>

    <div class="content-area">
      <transition name="fade">
        <div v-if="showForm" class="glass-card form-box">
          <div class="form-row">
            <input v-model="movieData.title" placeholder="Movie Title" class="dark-input" />
            <input v-model="movieData.genre" placeholder="Genre" class="dark-input" />
            <button class="save-btn" @click="saveMovie" :disabled="isLoading">
              {{ isLoading ? 'Saving...' : (isEditing ? 'Update Movie' : 'Save to Database') }}
            </button>
          </div>

          <div class="form-row">
            <input v-model="movieData.posterUrl" placeholder="Poster URL (Image Link)" class="dark-input poster-input" />
            <input v-model="movieData.releaseYear" type="number" class="dark-input year-input" />
          </div>

          <div class="form-row">
            <textarea v-model="movieData.description" placeholder="Movie Description..." class="dark-input textarea-input"></textarea>
          </div>
        </div>
      </transition>

      <div class="glass-card table-box">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in movies" :key="movie.id">
              <td>{{ movie.title }}</td>
              <td>{{ movie.genre }}</td>
              <td>
                <button class="action-btn edit" @click="startEdit(movie)">Edit</button>
                <button class="action-btn delete" @click="deleteMovie(movie.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles remain exactly as you provided */
.management-layout { display: flex; padding: 40px; background-color: #000; min-height: 100vh; gap: 40px; }
.sidebar { width: 300px; display: flex; flex-direction: column; align-items: flex-start; }
.page-title { color: #fff; font-size: 2.5rem; font-weight: 800; margin-bottom: 20px; line-height: 1.2; }
.close-btn { background-color: #ff5733; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.content-area { flex: 1; display: flex; flex-direction: column; gap: 20px; }
.glass-card { background: #111; border: 1px solid #222; border-radius: 15px; padding: 25px; }
.form-box { display: flex; flex-direction: column; gap: 15px; }
.form-row { display: flex; gap: 15px; }
.dark-input { background: #0d0d0d; border: 1px solid #222; color: #fff; padding: 12px; border-radius: 8px; flex: 1; }
.year-input { max-width: 120px; }
.poster-input { flex: 2; }
.save-btn { background-color: #ff5733; color: white; border: none; padding: 0 20px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
.save-btn:disabled { opacity: 0.5; }
.textarea-input { min-height: 120px; width: 100%; }
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th { color: #ff5733; text-align: left; padding-bottom: 20px; }
.admin-table td { padding: 15px 0; color: #ccc; border-bottom: 1px solid #1a1a1a; }
.action-btn { background: none; border: none; cursor: pointer; margin-right: 15px; font-weight: 600; }
.edit { color: #3b82f6; }
.delete { color: #ef4444; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>