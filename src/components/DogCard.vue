<template>
  <div class="dog-card">
    <img :src="dog.img" :alt="dog.name" />
    <h3>{{ dog.name }}</h3>
    <p>Breed: {{ dog.breed }}</p>
    <p>Age: {{ dog.age }}</p>
    <p>Location: {{ dog.zip_code }}</p>
    <button @click="toggleFavorite" v-if="!hideFav">
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDogStore } from '../stores/dogStore';

const props = defineProps<{
  dog: {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  };
  hideFav: boolean;
}>();

const dogStore = useDogStore();
const isFavorite = computed(() => dogStore.favorites.includes(props.dog.id));

const toggleFavorite = () => {
  if (isFavorite.value) {
    dogStore.removeFromFavorites(props.dog.id);
  } else {
    dogStore.addToFavorites(props.dog.id);
  }
};
</script>

<style scoped>
.dog-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.dog-card img {
  max-width: 100%;
  border-radius: 8px;
  height: 150px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>