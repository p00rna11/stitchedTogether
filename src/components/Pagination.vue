<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDogStore } from '../stores/dogStore';

const dogStore = useDogStore();

const currentPage = computed(() => dogStore.currentPage);
const totalPages = computed(() => Math.ceil(dogStore.totalDogs / 25));

const changePage = (page: number) => {
  dogStore.currentPage = page;
  dogStore.search({});
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

span {
  font-size: 1rem;
  color: #2c3e50;
}
</style>