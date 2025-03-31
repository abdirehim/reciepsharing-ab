<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center text-white">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="recipe in recipes" :key="recipe.id" class="bg-white p-4 rounded-lg shadow-md">
        <!-- <Like v-if="recipe" :recipeId="recipe.id" :recipe="recipe" /> -->
        <NuxtLink :to="`/recipes/${recipe.id}`" class="block text-xl font-bold mb-2 text-blue-600 hover:underline">
          {{ recipe.title }}
        </NuxtLink>
        <p class="text-gray-700">{{ recipe.description }}</p>
        <Rating v-if="recipe?.id" :recipeId="recipe.id" :recipe="recipe" />
      </div>
    
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'

import Rating from './UserInteract/rating.vue'
// import Like from './UserInteract/rating.vue'
const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      title
      description
    }
  }
`

const recipes = ref([])
const loading = ref(true)
const error = ref(null)

const fetchRecipes = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    const { data } = await apolloClient.query({
      query: GET_RECIPES,
    })
    recipes.value = data.recipes
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRecipes()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>




