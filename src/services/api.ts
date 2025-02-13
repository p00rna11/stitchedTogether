import axios from 'axios';

const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (name: string, email: string) => {
  const response = await api.post('/auth/login', { name, email });
  return response;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const getBreeds = async () => {
  const response = await api.get('/dogs/breeds');
  return response.data;
};

export const searchDogs = async (params: any) => {
  const response = await api.get('/dogs/search', { params });
  return response.data;
};

export const fetchDogs = async (dogIds: string[]) => {
  const response = await api.post('/dogs', dogIds);
  return response.data;
};

export const matchDog = async (dogIds: string[]) => {
  const response = await api.post('/dogs/match', dogIds);
  return response.data.match;
};

