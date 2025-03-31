<template>
    <div>
      <!-- Recipe details display -->
      <button @click="deleteRecipe">Delete Recipe</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
//   import { useFetch } from '@nuxt/http'
  
  const recipe = ref({})
  
  onMounted(async () => {
    const recipeId = useRoute().params.id
    const { data } = await useFetch(`/api/recipes/${recipeId}`)
    recipe.value = data.value
  })
  
  const deleteRecipe = async () => {
    const confirmed = confirm('Are you sure you want to delete this recipe?')
    if (confirmed) {
      const recipeId = useRoute().params.id
      const { data, error } = await useFetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE'
      })
  
      if (!error.value) {
        useRouter().push('/')
      } else {
        console.error('Failed to delete recipe')
      }
    }
  }
  </script>
  