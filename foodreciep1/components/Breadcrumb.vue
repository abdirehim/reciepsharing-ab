<template>
    <nav class="bg-gray-200 p-2 rounded-md">
      <ol class="list-reset flex">
        <li>
          <NuxtLink to="/" class="text-blue-600">Home</NuxtLink>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="mx-2">
          <span>/</span>
          <NuxtLink :to="crumb.path" class="text-blue-600">{{ crumb.name }}</NuxtLink>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const breadcrumbs = ref([])
  
  watchEffect(() => {
    const pathArray = route.path.split('/').filter((p) => p)
    breadcrumbs.value = pathArray.map((path, index) => {
      return {
        name: path.charAt(0).toUpperCase() + path.slice(1), // Capitalize first letter
        path: '/' + pathArray.slice(0, index + 1).join('/') // Construct path
      }
    })
  })
  </script>
  
  <style scoped>
  nav {
    margin-bottom: 20px; /* Space between breadcrumb and content */
  }
  </style>
  