import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import createStore from "./store"

import App from './App.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

import './style.css';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "Home", component: Home },
        { path: "/login", name: "Login", component: Login },
    ]
});

const store = createStore();

setInterval(() => {
    store.commit('updateSeamlessly');
}, 8000);

createApp(App).use(router).use(store).mount('#app');
