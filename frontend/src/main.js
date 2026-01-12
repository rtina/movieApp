import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 1. Create the app instance and store it in a variable 'app'
const app = createApp(App);

// 2. Tell the app to use the router (MUST be before mount)
app.use(router);

// 3. Finally, mount the app to the DOM
app.mount('#app');