import { createRouter, createWebHistory } from 'vue-router';
import Homeview from '@/views/Homeview.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import AdminDashboard from '@/views/admin/AdminDashboard.vue'; // Ensure these imports exist
import AdminStatsGrid from '@/views/admin/AdminStatsGrid.vue';
import ManageMovies from '@/views/admin/ManageMovies.vue';
import ManageUsers from '@/views/admin/ManageUsers.vue';

const routes = [
  { path: '/', name: 'home', component: Homeview },
  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { hideLayout: true, requiresAdmin: true },
    children: [
      {
        path: '', // When you go to /admin, it redirects to /admin/dashboard
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard', // REMOVED THE SLASH HERE
        name: 'AdminStatsGrid',
        component: AdminStatsGrid 
      },
      {
        path: 'movies', // Relative path: /admin/movies
        component: ManageMovies
      },
      {
        path: 'users', // Relative path: /admin/users
        component: ManageUsers
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;