<template>
    <ul class="nav nav-pills mb-3 container nav-underline" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                {{ $t("Users") }}
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                {{ $t("Accounts") }}
            </button>
        </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
            tabindex="0">
            <UsersTable />


        </div>
    </div>
</template>

<style scoped>
.nav {
    width: 90%;
    margin: 0 auto;
}

.nav-link {
    background-color: transparent !important;
    border-radius: 0;
    color: rgb(49, 49, 49);
}

.nav-link.active {
    background-color: transparent !important;
    border-radius: 0;
    color: #0056b3 !important;
}

.body {
    width: 96%;
    background-color: rgb(248, 251, 254);
    margin: 0 auto;
    border-radius: 6px;
    padding: 20px;
    text-align: left;
    border: solid 1px gray;
}

.body span {
    color: gray;
}


.page-link:hover {
    color: #007bff;
}
</style>

<script setup>
import UsersTable from "./UsersTable.vue";
</script>