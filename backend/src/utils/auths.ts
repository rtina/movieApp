import { ref } from 'vue';

// This variable is reactive and shared across the whole app
export const isLoggedIn = ref(!!localStorage.getItem('token'));
export const userEmail = ref(JSON.parse(localStorage.getItem('user') || '{}')?.email || '');

export const updateAuthState = () => {
    isLoggedIn.value = !!localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userEmail.value = user.email || '';
};