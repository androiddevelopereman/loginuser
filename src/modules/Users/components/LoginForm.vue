<template>
    <div class="login-container" :class="{ 'rtl': isRTL }">
        <div class="logo">
            <img src="../../../assets/logo.jpg" alt="Company Logo">
            <span class="fs-4" style="color:  #007bff;; font-size: 40px; font-weight: bold; text-transform: uppercase;"
                v-if="!isCollapsed">PITS</span>
            <h2 class="welcome-text">Welcome</h2>

        </div>
        <form @submit.prevent="handleLogin">
            <div class="mb-3 input-group">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                    placeholder="Enter your Email" v-model="email" required>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>


            <div class="mb-3 input-group">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" :type="showPassword ? 'text' : 'password'" id="password"
                    v-model="password" required>
            </div>
            <div class="mb-3 form-check">
                <a href="#" class="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit">Login</button>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isRTL = ref(false);
const router = useRouter(); // استدعاء Vue Router

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = () => {
    console.log("Logging in with", email.value, password.value);
    router.push('/');
};
</script>
<style scoped>
.login-container {
    width: 100%;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.logo {
    text-align: center;
}

.logo img {
    width: 30px;
    height: auto;
}

.input-group {
    margin-bottom: 15px;
    color: gray;

}

.input-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;


}

.input-group input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

}

.password-field {
    position: relative;
}

.password-field span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #02366d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: hsl(211, 97%, 23%);
}

.rtl {
    direction: rtl;
}

.forgot-password {
    display: block;
    text-align: right;
    font-size: 12px;
    color: #007bff;
    margin-top: 5px;
}

.forgot-password:hover {
    text-decoration: underline;
}

.welcome-text {
    font-size: 20px;
    margin-top: 5px;
    font-weight: bold;
}

.logo-st {
    width: 20px;
    height: auto;
}
</style>