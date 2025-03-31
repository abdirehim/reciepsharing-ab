<template>

<Navbar/>

  <div>
    <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-8">
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
      <div v-if="recipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="recipe in recipes" :key="recipe.id" class="bg-gray-100 p-4 rounded-lg shadow-md">
          <NuxtLink :to="`/recipes/${recipe.id}`" class="text-2xl font-bold text-blue-600 hover:underline">{{ recipe.title }}</NuxtLink>
          <p class="mt-2">{{ recipe.description }}</p>
        </div>
        <like recipeId="recipe.id"/>
      </div>
             
      <div v-else class="text-center text-gray-500">No recipes found.</div>
    </div>
   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth'
// import like from "/Userinteract/like"

const GET_USER_RECIPES = gql`
  query GetUserRecipes($creatorId: Int!) {
    recipes(where: { creator_id: { _eq: $creatorId } }) {
      id
      title
      description
    }
  }
`

const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const { token, user } = useAuth();
const creatorId=computed(()=>parseInt(user.value.id, 10))

const fetchRecipes = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    // const user = JSON.parse(localStorage.getItem('user'))
    if (!user) throw new Error('User not found')
    const { data } = await apolloClient.query({
      query: GET_USER_RECIPES,
      variables: { creatorId: creatorId.value }
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
  max-width: 800px;
}
</style>



