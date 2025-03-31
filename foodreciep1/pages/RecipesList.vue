<template>


<Navbar/>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="my-8   "> <button @click="showCreateRecipeModal = true"  class="hover:bg-blue-800  bg-gradient-to-r from-blue-700 to-purple-700  rounded-md text-white p-4  hover:text-white focus:outline-none mt-8 font-bold  "  >CreateRecipe</button></div>
    
    <div v-if="loading" class="text-center text-gray-600">Loading...</div>
    <div v-if="error" class="text-center text-red-600">Error: {{ error.message }}</div>
    <div v-if="!loading && !error && recipes.length === 0" class="text-center text-gray-600">No recipes found.</div>
    

   
    
    
    <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

     

      <div v-for="recipe in recipes" :key="recipe.id" class="relative bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
        <div v-if="recipe.recipe_images.length" class="relative">
          <img :src="getFeaturedImage(recipe.recipe_images)" alt="Featured Image" class="w-full h-48 object-cover"/>
         <!-- // <div class="absolute top-0 right-0 p-2 bg-gray-900 bg-opacity-75 text-white text-xs font-semibold rounded-bl-lg">
         //   Featured
         // </div> -->
        </div>
        <div class="p-4">
          <NuxtLink   :to="`/recipes/${recipe.id}`" class="text-xl font-semibold mb-2 text-blue-600">{{ recipe.title }}</NuxtLink>
          <p class="text-gray-600 mb-2">Category: {{ recipe.category.category_name }}</p>
          <p class="text-gray-500 mb-4">Preparation Time: {{ recipe.preparation_time }} minutes</p>
          <!-- <button @click="openEditForm(recipe)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><IconsEdit/></button> -->
             <button @click="openEditForm(recipe)" class="hover:bg-blue-600 focus:outline-none "><IconsEdit/></button>
             <button  @click="handleDelete(recipe.id)" class=" text-red-800 float-right rounded hover:bg-red-600"><IconsDelete/></button>
           
             
        </div>
      </div>
    </div>
    
    <EditForm v-if="selectedRecipe" :recipe="selectedRecipe" @close="closeEditForm" @update="fetchRecipes" />
    <Addrecip v-if="showCreateRecipeModal" @close-modal="showCreateRecipeModal = false" @update="handleUpdate" />
   
 

  </div>

  <Footer/>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth'
import EditForm from '@/components/EditForm.vue'



import { useState } from '#app'
import Addrecip from '~/components/addrecip.vue'

import { useDeleteRecipe } from '@/components/deleteRcipe.vue'

const { deleteRecipe } = useDeleteRecipe()

const handleDelete = async (id) => {
  const success = await deleteRecipe(id)
  if (success) {
    recipes.value = recipes.value.filter(recipe => recipe.id !== id)
    alert('Recipe deleted successfully!')
  } else {
    alert('Failed to delete recipe. Please try again.')
  }
}





const showCreateRecipeModal = useState('showCreateRecipeModal', () => false)

const GET_USER_RECIPES = gql`
  query GetUserRecipes($creatorId: Int!) {
    recipes(where: { creator_id: { _eq: $creatorId } }) {
      id
      title
      description
      preparation_time
      category {
        id
        category_name
      }
      ingredients {
        ingredient_name
        quantity
        unit
      }
      steps {
        step_description
      }
      recipe_images {
        url
        is_featured
      }
    }
  }
`

const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const selectedRecipe = ref(null)

const { user } = useAuth()
const nuxtApp = useNuxtApp()
const apolloClient = nuxtApp.$apollo.defaultClient

const fetchRecipes = async () => {
  loading.value = true
  try {
    if (!user.value) throw new Error('User not found')
    const { data } = await apolloClient.query({
      query: GET_USER_RECIPES,
      variables: { creatorId: parseInt(user.value.id, 10) },
       fetchPolicy: 'network-only'
    })
    recipes.value = data.recipes
    console.log('Recipes updated:', recipes.value)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const openEditForm = (recipe) => {
  selectedRecipe.value = recipe
}


const closeEditForm = () => {
  selectedRecipe.value = null
}



const getFeaturedImage = (images) => {
  const featuredImage = images.find(img => img.is_featured) || images[0]
  return featuredImage?.url || '/default-image.jpg'
}
const handleUpdate = () => {
  fetchRecipes() // Refresh the list when the event is emitted
}
onMounted(() => {
  fetchRecipes()
})
</script>

<style scoped>
/* Additional styling can be added here if needed */
</style>









