<template>
    <div :class="['sidebar', { collapsed: isCollapsed }]" class="p-3 text-white bg-white">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto gap-2 text-white text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cc-circle"
                viewBox="0 0 16 16" style="color: orange;">
                <path
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.408 5.89c-.83 0-1.318.64-1.318 1.753v.742c0 1.108.479 1.727 1.318 1.727.69 0 1.138-.435 1.187-1.05h1.147v.114c-.058 1.147-1.029 1.938-2.343 1.938-1.612 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.75 2.518-2.75 1.319 0 2.29.812 2.343 1.999v.11H6.595c-.049-.638-.506-1.108-1.187-1.108Zm5.404 0c-.831 0-1.319.64-1.319 1.753v.742c0 1.108.48 1.727 1.319 1.727.69 0 1.138-.435 1.186-1.05h1.147v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.75 2.518-2.75 1.318 0 2.29.812 2.342 1.999v.11h-1.147c-.048-.638-.505-1.108-1.186-1.108Z" />
            </svg>
            <span class="fs-4" style="color:blue" v-if="!isCollapsed">PITCS</span>
        </a>
        <div style="display:flex; justify-content:end; ">
            <button class="btn-toggle" @click="toggleSidebar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-caret-right" viewBox="0 0 16 16">
                    <path
                        d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                </svg>
            </button>
        </div>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item" v-for="link in links" :key="link.name">
                <router-link :to="link.path" class="nav-link d-flex align-items-center text-dark gap-2"
                    active-class="active">
                    <span v-html="link.icon" style="color:rgb(49, 49, 49);"></span>
                    <span v-if="!isCollapsed" style=" color: rgb(49, 49, 49);">{{ link.name }}</span>
                </router-link>
            </li>
        </ul>
        <hr>

    </div>
</template>
<script setup>
import { ref } from 'vue';
const isCollapsed = ref(false);

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
};
const links = [
    { name: 'Home', path: '/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/></svg>' },
    { name: 'Dashboard', path: '/dashboard', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3.571l2.5 1.428a.5.5 0 1 1-.5.866L7.5 9V4.5A.5.5 0 0 1 8 4z"/><path fill-rule="evenodd" d="M6.832 3.555a4 4 0 1 1 6.936 4.89c.3.115.544.3.717.534a5 5 0 1 0-8.987 0 1.713 1.713 0 0 1 .717-.534 4.01 4.01 0 0 1 .617-.89z"/></svg>' },
    { name: 'Profile', path: '/profile', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zM8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z"/></svg>' },
    { name: 'Reports', path: '/reports', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16"><path d="M5.5 9.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm0-4a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z"/></svg>' },
    { name: 'Settings', path: '/settings', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 16 8A8 8 0 0 0 8 0zM8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2z"/></svg>' }
];
</script>

<style scoped>
.sidebar {
    width: 280px;
    transition: width 0.3s;
}

.sidebar.collapsed {
    width: 80px;
}

.but-toggle hover {
    outline: none;
    border: none
}

.btn-toggle {
    padding: 5px 5px;
    border: none;
    border-radius: 5px;
    background-color: #F0F5FA;


}
</style>