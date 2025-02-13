<template>
  <div class="search">
    <SearchFilter />
    <div class="dog-list">
      <DogCard v-for="dog in dogs" :key="dog.id" :dog="dog" :hideFav="false"/>
    </div>
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDogStore } from '../stores/dogStore';
import DogCard from '../components/DogCard.vue';
import SearchFilter from '../components/SearchFilter.vue';
import Pagination from '../components/Pagination.vue';

const dogStore = useDogStore();
const dogs = computed(() => dogStore.dogs);
</script>

<style scoped>
.search {
  padding: 1rem;
}

.dog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}
</style>