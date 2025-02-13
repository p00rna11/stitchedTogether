<template>
  <div class="filters-container">
    <div class="search-filters">
      <select v-model="selectedBreed">
        <option value="">All Breeds</option>
        <option v-for="breed in breeds" :key="breed" :value="breed">{{ breed }}</option>
      </select>
      <select v-model="sortOrder">
        <option value="name:asc">Name (A-Z)</option>
        <option value="name:desc">Name (Z-A)</option>
      </select>
      <button @click="applyFilters" class="button">Apply</button>
    </div>
    <div v-if="favorites.length">
      <button @click="generateMatch" class="button">Generate Match</button>
    </div>
  </div>
  <Pagination />
  <Match ref="matchDog" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useDogStore } from '../stores/dogStore';
import Pagination from '../components/Pagination.vue';
import Match from '../components/Match.vue';

const dogStore = useDogStore();
const selectedBreed = ref('');
const sortOrder = ref('name:asc');
const matchId = ref(null);
const breeds = computed(() => dogStore.breeds);
const dogs = computed(() => dogStore.dogs);
const favorites = computed(() => dogStore.favorites);
const matchDog = ref();

const applyFilters = () => {
  dogStore.search({ breeds: selectedBreed.value ? [selectedBreed.value] : [] });
};

const generateMatch = async () => {
  matchId.value = await dogStore.generateMatch();
  const selectedDog = dogs.value.find(dog => dog.id == matchId.value);
  selectedDog && matchDog.value.openModal(selectedDog);
}

watch(sortOrder, (newOrder) => {
  dogStore.updateSort(newOrder);
})

onMounted(() => {
  dogStore.fetchBreeds();
  applyFilters();
});
</script>
<style scoped>
  .filters-container{
    display: flex;
    justify-content: space-between;
  }
  .search-filters{
    display: flex;
    gap: 10px
  }
</style>