<script setup>
import { useRoute } from 'vue-router';
import Navbar from './components/navbar.vue';
import Footer from './components/footer.vue';

const route = useRoute();
</script>

<template>
  <Navbar v-if="!route.meta.hideLayout" />
  
  <main :class="{ 'admin-screen': route.meta.hideLayout }">
    <router-view /> 
  </main>
  
  <Footer v-if="!route.meta.hideLayout" />
</template>

<style>
/* Reset margins for the admin screen to ensure it fills the page */
.admin-screen {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>