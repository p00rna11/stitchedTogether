<template>
  <div class="filters-container">
    <div class="search-filters">
      <div class="filter-item">
        <label for="breed">Breed</label>
        <select id="breed" v-model="selectedBreed">
          <option value="">All Breeds</option>
          <option v-for="breed in breeds" :key="breed" :value="breed">{{ breed }}</option>
        </select>
      </div>
      <div class="filter-item">
        <label for="min-age">Min Age</label>
        <select id="min-age" v-model="minAge">
          <option v-for="age in 20" :value="age" :key="'minAge-'+age">{{ age }}</option>
        </select>
      </div>
      <div class="filter-item">
        <label for="max-age">Max Age</label>
        <select id="max-age" v-model="maxAge">
          <option v-for="age in 20" :value="age" :key="'maxAge-'+age">{{ age }}</option>
        </select>
      </div>
      <div class="filter-item">
        <label for="sort-order">Sort Order</label>
        <select id="sort-order" v-model="sortOrder">
          <option value="name:asc">Name (A-Z)</option>
          <option value="name:desc">Name (Z-A)</option>
        </select>
      </div>
      <div class="filter-item buttons">
        <label></label>
        <button @click="applyFilters">Apply Filters</button>
      </div>
    </div>
  </div>
  <Pagination :filters="filters" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useDogStore } from '../stores/dogStore';
import Pagination from '../components/Pagination.vue';

const dogStore = useDogStore();
const selectedBreed = ref('');
const sortOrder = ref('name:asc');
const breeds = computed(() => dogStore.breeds);
const minAge = ref(1);
const maxAge = ref(10);
const filters = computed(() => {
  return { breeds: selectedBreed.value ? [selectedBreed.value] : [], ageMin: minAge.value, ageMax: maxAge.value}
});
const applyFilters = () => {
  dogStore.search(filters.value);
};

watch(sortOrder, (newOrder) => {
  dogStore.updateSort(newOrder);
})

onMounted(() => {
  dogStore.fetchBreeds();
  applyFilters();
});
</script>
<style scoped>
  .filters-container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;
  justify-content: center;
}

.filter-item {
  /* flex: 1 1 calc(20% - 20px); */
  min-width: 150px;
}

.filter-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.filter-item select,
.filter-item button {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-item.buttons {
  /* flex: 1 1 calc(40% - 20px); */
  display: flex;
  gap: 10px;
}

.filter-item.buttons button {
  flex: 1;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-item.buttons button:hover {
  background-color: #0056b3;
}

</style>