<template>
    <div id="search">
      <!-- Search and Filter Section -->
      <div class="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg my-8">
  
  
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <!-- Search Input -->
          <div class="relative">
            <input v-model="searchQuery" type="text" class="block w-full rounded-3xl border-gray-300 shadow-3xl p-4 pr-32 bg-white focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-105" placeholder="Enter title, ingredients, or creator" />
            <!-- Search Button -->
            <button @click="fetchRecipes" class="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-500">
             <IconsSearch/>
              <span class="sr-only">Search</span>
            </button>
          </div>
          
          
           
          
          <!-- Preparation Time Range Input -->
          <div>
            <input v-model.number="preparationTime" type="range" min="0" max="60" class="block w-full rounded-md border-gray-300 shadow-lg bg-gray-200" />
            <span class="ml-2">{{ preparationTime }} mins</span>
          </div>
        </div>
      </div>
      
      <!-- Recipes Grid -->
      <div class="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg my-8">
        <div v-if="loading" class="text-center text-gray-700">Loading...</div>
        <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="recipe in recipes" :key="recipe.id" class="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <BookmarkButton v-if="recipe" :recipeId="recipe.id" @update="bookmark" />
            <div class="w-full h-48 overflow-hidden mb-4 rounded-lg">
              <img 
                v-if="recipe.recipe_images.length > 0 && recipe.recipe_images[0].url" 
                :src="recipe.recipe_images[0].url" 
                alt="Featured Image" 
                class="w-full h-full object-cover"
              />
            </div>
            <NuxtLink :to="`/recipes/${recipe.id}`" class="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">{{ recipe.title }}</NuxtLink>
            <p class="text-gray-600 mt-1">Category: {{ recipe.category?.category_name }}</p>
            <p class="text-gray-600 mt-1">Preparation Time: {{ recipe.preparation_time }} mins</p>
            <like v-if="recipe" :recipeId="recipe.id"  @update="likes"/>
            <Rating v-if="recipe" :recipeId="recipe.id"  @update="ratings"/>
          </div>
        </div>
        
        <!-- Pagination Controls -->
        <div class="flex justify-between mt-4">
          <button @click="prevPage" :disabled="currentPage <= 1" class="px-4 py-2 bg-gray-300 rounded-md text-blue-500 hover:bg-blue-300"><leftarrow/></button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="px-4 py-2 bg-gray-300 rounded-md text-blue-500 hover:bg-blue-300"><rightarrow /></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { gql } from '@apollo/client/core'
  import { useNuxtApp } from '#app'
  import leftarrow from './Icons/leftarrow.vue';
  import rightarrow from './Icons/rightarrow.vue';
  import like from './UserInteract/like.vue'
  import Rating from './UserInteract/rating.vue'
  import BookmarkButton from '~/components/UserInteract/BookmarkButton.vue'
  import search from './Icons/search.vue';
  // import IconsFilter from './Icons/IconsFilter.vue'
  
  const GET_RECIPES_BY_CATEGORY = gql`
  query GetRecipesByCategory(
    $categoryId: Int!,
    $searchQuery: String,
    $preparationTime: Int
  ) {
    recipes(
      where: {
        _and: [
          { category_id: { _eq: $categoryId } }
          {
            _or: [
              { title: { _ilike: $searchQuery } }
              { ingredients: { ingredient_name: { _ilike: $searchQuery } } }
            ]
          }
          { preparation_time: { _lte: $preparationTime } }
        ]
      }
    ) {
      id
      title
      description
      preparation_time
      category {
        category_name
      }
      recipe_images(where: { is_featured: { _eq: true } }) {
        url
      }
      ratings {
        rating
      }
    }
    recipes_aggregate(
      where: {
        _and: [
          { category_id: { _eq: $categoryId } }
          {
            _or: [
              { title: { _ilike: $searchQuery } }
              { ingredients: { ingredient_name: { _ilike: $searchQuery } } }
            ]
          }
          { preparation_time: { _lte: $preparationTime } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
  const GET_RECIPE = gql`
  query GetRecipes($categoryId: Int!) {
    recipes(where: { category_id: { _eq: $categoryId } }) {
      id
      title
      description
      preparation_time
      category {
        category_name
      }
      recipe_images {
        url
      }
    }
  }
`;
const route = useRoute();


onMounted(async () => {
  try {
    if (categoryId.value) {
      const { data } = await nuxtApp.$apollo.defaultClient.query({
        query: GET_RECIPE,
        variables: { categoryId: categoryId.value },
      });
      recipes.value = data.recipes;
    }
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});
  
  const searchQuery = ref('')
  const categoryId = ref('')
  const preparationTime = ref(null)
  const recipes = ref([])
  const loading = ref(true)
  const error = ref(null)
  const categories = ref([])
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient
  const filterDropdownOpen = ref(false)
  
  const currentPage = ref(1)
  const itemsPerPage = 20
  const totalPages = ref(0)
  
  const fetchRecipes = async () => {
    loading.value = true
    error.value = null
  
    try {
      const filters = []
  
      if (searchQuery.value) {
        const searchTerms = searchQuery.value.split(',').map(term => term.trim())
        filters.push({
          _or: [
            { title: { _ilike: `%${searchQuery.value}%` } },
            { ingredients: { ingredient_name: { _in: searchTerms } } }
          ]
        })
      }
  
      if (categoryId.value) {
        filters.push({ category_id: { _eq: parseInt(categoryId.value) } })
      }
  
      if (preparationTime.value) {
        filters.push({ preparation_time: { _lte: preparationTime.value } })
      }
  
      const offset = (currentPage.value - 1) * itemsPerPage
  
      const { data } = await apolloClient.query({
        query: GET_RECIPES,
        variables: {
          where: filters.length ? { _and: filters } : {},
          limit: itemsPerPage,
          offset
        }
      })
  
      recipes.value = data.recipes
      const totalCount = data.recipes_aggregate.aggregate.count
      totalPages.value = Math.ceil(totalCount / itemsPerPage)
  
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  
//   const fetchCategories = async () => {
//     const { data } = await apolloClient.query({ query: GET_CATEGORIES })
//     categories.value = data.categories
//   }
  
//   const applyFilter = (selectedCategoryId) => {
//     categoryId.value = selectedCategoryId
//     filterDropdownOpen.value = false // Close the dropdown after selection
//     fetchRecipes()
//   }
  
  watch([searchQuery, categoryId, preparationTime], () => {
    currentPage.value = 1
    fetchRecipes()
  })
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      fetchRecipes()
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchRecipes()
    }
  }
  const bookmark=()=>{
    fetchBookmarkedRecipes()
    fetchBookmarkStatus
  }
  
  const likes=()=>{
    fetchLikeStatus()
    fetchLikeCount()
  }
  const ratings=()=>{
    fetchRatings()
  }
//   onMounted(() => {
//     fetchCategories()
//     fetchRecipes()
//   })
  </script>
  
  <style scoped>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 20px;
    background: #4a90e2;
    cursor: pointer;
    border-radius: 50%;
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 10px;
    height: 20px;
    background: #4a90e2;
    cursor: pointer;
    border-radius: 50%;
  }
  
  img {
    transition: transform 0.3s ease-in-out;
  }
  
  img:hover {
    transform: scale(1.05);
  }
  
  /* Search Input Styles */
  input[type="text"] {
    border-color: #d1d5db; /* Light gray border color */
    padding: 1rem; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
    background-color: #ffffff; /* White background */
  }
  
  input[type="text"]:focus {
    border-color: #4a90e2; /* Blue border on focus */
    box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3); /* Blue shadow effect */
  }
  
  /* Filter Icon Styles */
  button {
    margin-left: 1rem; /* Margin to the left of the filter icon */
  }
  
  button svg {
    width: 2rem; /* Size of the filter icon */
    height: 2rem; /* Size of the filter icon */
  }
  
  /* Background for the Component */
  .container {
    background-color: #f9fafb; /* Light gray background */
  }
  </style>
  
  