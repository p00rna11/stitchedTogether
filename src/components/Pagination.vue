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
    <button v-if="favorites.length" @click="generateMatch">Generate Match</button>
    <Match ref="matchDog" />
  </div>

</template>

<script setup lang="ts">
import { computed,ref } from 'vue';
import { useDogStore } from '../stores/dogStore';
import Match from '../components/Match.vue';
const props = defineProps<{
  filters: {
    breeds: string[],
    ageMin: number,
    ageMax: number
  }
}>();

const dogStore = useDogStore();
const matchId = ref(null);
const matchDog = ref();
const currentPage = computed(() => dogStore.currentPage);
const totalPages = computed(() => Math.ceil(dogStore.totalDogs / 25));
const dogs = computed(() => dogStore.dogs);
const favorites = computed(() => dogStore.favorites);

const changePage = (page: number) => {
  dogStore.currentPage = page;
  dogStore.search(props.filters);
};

const generateMatch = async () => {
  matchId.value = await dogStore.generateMatch();
  const selectedDog = dogs.value.find(dog => dog.id == matchId.value);
  selectedDog && matchDog.value.openModal(selectedDog);
}
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