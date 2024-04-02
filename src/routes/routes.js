import { createRouter, createWebHistory } from "vue-router";

export const routes = createRouter( {
    history: createWebHistory(),
    routes: [
        {path: '/login', name: 'Login', component: () => import('../pages/Login.vue'),},
        {path: '/', name: 'Home', component: () => import('../pages/Home.vue'),}
    ]
})
