<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const showForm = ref(false);
const isEditing = ref(false);
const isLoading = ref(false);
const currentUserId = ref(null);

const userData = ref({ email: '', role: 'USER', password: '' });

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});


const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  console.log("Sending Token:", token); // Verify this is not null

  try {
    const res = await fetch('http://localhost:3000/api/users', { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Ensure 'Bearer ' space is present
      } 
    });
    
    if (!res.ok) {
        const errorData = await res.json();
        console.error("Fetch failed:", errorData.message);
        throw new Error(errorData.message);
    }
    
    const data = await res.json();
    users.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
  }
};


const saveUser = async () => {
  if (!userData.value.email) return alert("Email is required");
  isLoading.value = true;

  const url = isEditing.value 
    ? `http://localhost:3000/api/users/${currentUserId.value}`
    : 'http://localhost:3000/api/users';
  
  try {
    const res = await fetch(url, {
      method: isEditing.value ? 'PUT' : 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData.value)
    });

    if (res.ok) {
      alert("Success!");
      cancelAction();
      await fetchUsers();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to save");
    }
  } catch (err) {
    console.error("Save error:", err);
  } finally {
    isLoading.value = false;
  }
};

const deleteUser = async (id) => {
  if (!confirm("Remove user?")) return;
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) fetchUsers();
  } catch (err) {
    console.error("Delete error:", err);
  }
};

const startEdit = (user) => {
  isEditing.value = true;
  showForm.value = true;
  currentUserId.value = user.id;
  userData.value = { email: user.email, role: user.role, password: '' };
};

const cancelAction = () => {
  showForm.value = false;
  isEditing.value = false;
  userData.value = { email: '', role: 'USER', password: '' };
};

onMounted(fetchUsers);
</script>

<template>
  <div class="management-layout">
    <div class="sidebar">
      <h1 class="page-title">User Management</h1>
      <button class="close-btn" @click="showForm ? cancelAction() : showForm = true">
        {{ showForm ? 'Close' : 'Add User' }}
      </button>
    </div>

    <div class="content-area">
      <div v-if="showForm" class="glass-card form-box">
        <div class="form-row">
          <input v-model="userData.email" placeholder="Email" class="dark-input" />
          <select v-model="userData.role" class="dark-input role-select">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button class="save-btn" @click="saveUser" :disabled="isLoading">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
        <div class="form-row">
          <input v-model="userData.password" type="password" placeholder="Password" class="dark-input" />
        </div>
      </div>

      <div class="glass-card table-box">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.email }}</td>
              <td><span :class="['role-badge', user.role]">{{ user.role }}</span></td>
              <td>
                <button class="action-btn edit" @click="startEdit(user)">Edit</button>
                <button class="action-btn delete" @click="deleteUser(user.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Use the same styles as your Movie Management for consistency */
.management-layout { display: flex; padding: 40px; background-color: #000; min-height: 100vh; gap: 40px; }
.sidebar { width: 300px; color: white; }
.content-area { flex: 1; display: flex; flex-direction: column; gap: 20px; }
.glass-card { background: #111; border: 1px solid #222; border-radius: 15px; padding: 25px; }
.form-row { display: flex; gap: 15px; margin-bottom: 10px; }
.dark-input { background: #0d0d0d; border: 1px solid #222; color: #fff; padding: 12px; border-radius: 8px; flex: 1; }
.save-btn { background-color: #ff5733; color: white; border: none; padding: 0 20px; border-radius: 8px; cursor: pointer; }
.admin-table { width: 100%; color: #ccc; border-collapse: collapse; }
.admin-table th { color: #ff5733; text-align: left; padding-bottom: 15px; }
.admin-table td { padding: 12px 0; border-bottom: 1px solid #1a1a1a; }
.role-badge { padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
.ADMIN { background: rgba(255, 87, 51, 0.2); color: #ff5733; }
.USER { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.action-btn { background: none; border: none; cursor: pointer; margin-right: 10px; }
.edit { color: #3b82f6; }
.delete { color: #ef4444; }
.close-btn {margin-top: 5px; background-color: #ff5733; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
</style>