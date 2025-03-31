<template>
    <button @click="toggleBookmark">
      <span v-if="bookmarked">🔖</span>
      <span v-else>📑</span>
    </button>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useFetch } from '@nuxt/http'
  
  const bookmarked = ref(false)
  const recipeId = useRoute().params.id
  
  const toggleBookmark = async () => {
    bookmarked.value = !bookmarked.value
  
    await useFetch(`/api/recipes/${recipeId}/bookmark`, {
      method: 'POST',
      body: JSON.stringify({ bookmarked: bookmarked.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
  onMounted(async () => {
    const { data } = await useFetch(`/api/recipes/${recipeId}`)
    bookmarked.value = data.value.bookmarked
  })
  </script>
  