<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>My Match Dog</h3>
      <DogCard :dog="dog" :hideFav="true"/>
      <button class="close-button" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DogCard from './DogCard.vue';

const isOpen = ref(false);
const dog = ref<any>(null);

const openModal = (selectedDog: any) => {
  dog.value = selectedDog;
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

defineExpose({ openModal });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
}

.close-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #ff6b81;
}
</style>