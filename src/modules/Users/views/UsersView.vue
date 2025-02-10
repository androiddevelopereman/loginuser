<script setup>

import Sidebar from "../components/Sidebar.vue";
import Tabs from "../components/Tabs.vue";
import NavBar from "../components/NavBar.vue";
</script>
<template>

    <div class="app-container">
        <Sidebar />

        <div class="content-bar">
            <NavBar />
            <hr>

            <Tabs />

        </div>
    </div>
    <!-- <div class="users-container">

        <Tabs />

    </div> -->
</template>
<style scoped>
.app-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #F0F5FA;
    display: flex;

}

.content-bar {
    background-color: #F0F5FA;
    width: 100% !important;
}
</style>
