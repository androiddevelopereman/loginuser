<template>

    <header class="header">
        <div class="logo">
            <h5>{{ title }}</h5>
        </div>
        <div class="iconat">
            <div>
                <button class="icon-btn" title="Notifications">
                    <img src="../../../assets/notification.svg" class="icon">
                </button>
            </div>
            <div class="dropdown">
                <button class="dropdown-toggle lang" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img src="../../../assets/language.svg" class="icon">
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click.prevent="changeLanguage('ar')">{{ $t('Arabic') }}</a>
                    </li>
                    <li><a class="dropdown-item" href="#" @click.preven="changeLanguage('en')">{{ $t('English') }}</a>
                    </li>

                </ul>
            </div>
            <div class="dropdown">
                <button class="dropdown-toggle lang" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span class="material-symbols-outlined">
                        E
                    </span>Eman
                </button>
                <ul class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">

                    <div>
                        E
                    </div>
                    <h5>Eman</h5>
                    <p>PITS</p>
                    <button>{{ $t('editProfile') }}</button>
                    <hr>
                    <a href="#">{{ $t('switchAccount') }}</a>
                    <hr>
                    <a href="#">{{ $t('logout') }}</a>
                </ul>
            </div>


        </div>
    </header>
</template>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 50px;

}

.iconat {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.icon-btn {
    background-color: rgba(128, 128, 128, 0.222);
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
}

.icon {
    width: 24px;
    height: 24px;
    fill: #0601ae;
}

.logo {
    color: black;
}

.lang,
.profile-icon {
    background-color: transparent;
    padding: 5px;

    border-radius: 50%;
    border: none;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

.iconat span {
    background-color: rgba(128, 128, 128, 0.222);
    padding: 5px;
    border-radius: 50%;
}

.profile-icon div {
    background-color: rgba(119, 22, 22, 0.22) !important;
    border-radius: 50%;
    width: 20px;
    height: 20px
}
</style>
<script setup>
import { useI18n } from 'vue-i18n';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { locale, t } = useI18n();
const route = useRoute();
const title = ref(t(route.meta.title || 'Default Title'));

const changeLanguage = (language) => {
    locale.value = language;

    if (language === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
};

const updateTitle = () => {
    title.value = t(route.meta.title || 'Default Title');
};

onMounted(() => {
    updateTitle();
});

watch(route, updateTitle);
watch(locale, (newLocale) => {
    if (newLocale === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    updateTitle();
});
</script>