<template>
  <div id="app">
    <div class="container">
      <div class="text">My Beloved Dog</div>
      <button @click="logoutUser">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { logout } from './services/api';

const router = useRouter();

const logoutUser = async () => {
  await logout();
  localStorage.removeItem('isAuthenticated');
  router.push('/login');
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

p{
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
}

button {
  background-color: #ff4757;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #ff6b81;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  
}

.text {
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #3aa876;
}
</style>