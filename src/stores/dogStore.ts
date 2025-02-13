import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getBreeds, searchDogs, fetchDogs, matchDog, getLocation, locationSearch } from '../services/api';

export const useDogStore = defineStore('dog', () => {
  const breeds = ref<string[]>([]);
  const dogs = ref<any[]>([]);
  const favorites = ref<string[]>([]);
  const totalDogs = ref(0);
  const currentPage = ref(1);
  const sortOrder = ref('name:asc');

  const fetchBreeds = async () => {
    breeds.value = await getBreeds();
  };

  const updateSort =  (value: string):void => {
    sortOrder.value = value;
  }

  const search = async (filters: any) => {
    const params = { ...filters, sort: sortOrder.value, size: 25, from: (currentPage.value - 1) * 25 };
    const { resultIds, total } = await searchDogs(params);
    totalDogs.value = total;
    dogs.value = await fetchDogs(resultIds);
    const data = await getLocation([52135]);
    await locationSearch({city: 'Clermont'});
  };

  const addToFavorites = (dogId: string) => {
    if (!favorites.value.includes(dogId)) {
      favorites.value.push(dogId);
    }
  };

  const removeFromFavorites = (dogId: string) => {
    favorites.value = favorites.value.filter((id) => id !== dogId);
  };

  const generateMatch = async () => {
    if (favorites.value.length > 0) {
      const matchId = await matchDog(favorites.value);
      return matchId;
    }
    return null;
  };

  return {
    breeds,
    dogs,
    favorites,
    totalDogs,
    currentPage,
    sortOrder,
    updateSort,
    fetchBreeds,
    search,
    addToFavorites,
    removeFromFavorites,
    generateMatch,
  };
});