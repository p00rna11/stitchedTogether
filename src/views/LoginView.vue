<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/api';

const name = ref('');
const email = ref('');
const router = useRouter();

const loginUser = async () => {
  await login(name.value, email.value);
  localStorage.setItem('isAuthenticated', 'true');
  router.push('/search');
};
</script>