<script setup>
import Tabs from "../components/Tabs.vue";
import Sidebar from "../components/Sidebar.vue";
import LoginForm from "../components/LoginForm.vue";
import ImageSider from "../components/ImageSider.vue";
</script>
<template>
    <div class="container">
        <div class="component1">
            <LoginForm />
        </div>

        <div class="component2">
            <ImageSider />
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.component1 {
    width: 35%;
    padding: 20px;
    border: 1px solid #ccc;
    text-align: center;
}

.component2 {
    width: 60%;
    padding: 20px;
    border: 1px solid #ccc;
    text-align: center;

}
</style>