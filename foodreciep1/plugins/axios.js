import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const instance = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true,
  });

  nuxtApp.provide('axios', instance);
});

