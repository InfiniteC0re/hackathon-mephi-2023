import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import createStore from "./store"

import App from './App.vue';
import Home from '@/views/Home.vue';



import './style.css';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "Home", component: Home },
    ]
});

createApp(App).use(router).use(createStore()).mount('#app');
