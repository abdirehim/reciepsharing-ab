
<template>
  <div>
    <div class="container mx-auto p-4  bg-white rounded-lg shadow-lg my-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label class="block text-sm font-medium text-gray-700">Search (Title or Ingredients or creater)</label>
          <input v-model="searchQuery" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter title or ingredients or crater" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select v-model="categoryId" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="">All</option>
            <option v-for="category in categories" :key="category.id" >
              {{ category.category_name }}
            </option>
          </select>
        </div>
       
        <div>
          <label class="block text-sm font-medium text-gray-700">Preparation Time (mins)</label>
           <input v-model.number="preparationTime" type="range" min="0" max="60" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
           <span class="ml-2">{{ preparationTime }}</span>
          <!-- <label class="block text-sm font-medium text-gray-700">Preparation Time (mins)</label>
          <input v-model.number="preparationTime" type="range" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" /> -->
        </div>
      </div>
      <button @click="fetchRecipes" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
    </div>

    <div class="container mx-auto p-4 bg-white rounded-lg shadow-lg my-8">
      <div v-if="loading">Loading...</div>
      <div v-if="error">Error: {{ error.message }}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="recipe in recipes" :key="recipe.id" class="mb-4 bg-gray-100 p-4 rounded-lg shadow">
          <div v-if="recipe.recipe_images.length > 0">
            <img 
              v-if="recipe.recipe_images[0].url" 
              :src="recipe.recipe_images[0].url" 
              alt="Featured Image" 
              class="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
          <NuxtLink :to="`/recipes/${recipe.id}`" class="text-2xl font-bold text-blue-600">{{ recipe.title }}</NuxtLink>
          <p>{{ recipe.description }}</p>
          <p>Category: {{ recipe.category?.category_name }}</p>
          <p>Preparation Time: {{ recipe.preparation_time }} mins</p>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-between mt-4">
        <button @click="prevPage" :disabled="currentPage <= 1" class="px-4 py-2 bg-gray-300 rounded-md">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages" class="px-4 py-2 bg-gray-300 rounded-md">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch,onMounted } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'

const GET_RECIPES = gql`
  query GetRecipes($where: recipes_bool_exp, $limit: Int, $offset: Int) {
    recipes(where: $where, limit: $limit, offset: $offset) {
      id
      title
      description
      preparation_time
      category {
        category_name
      }
      recipe_images(where: {is_featured: {_eq: true}}) {
        url
      }
    }
    recipes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

const searchQuery = ref('')
const categoryId = ref('')
const preparationTime = ref(null)
const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const categories = ref([]) // Assuming you have categories to populate the dropdown
const nuxtApp = useNuxtApp()
const apolloClient = nuxtApp.$apollo.defaultClient
const filterDropdownOpen = ref(false)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 20
const totalPages = ref(0)

const fetchRecipes = async () => {
  loading.value = true
  error.value = null

  try {
    const filters = []

    if (searchQuery.value) {
      const searchTerms = searchQuery.value.split(',').map(term => term.trim());
      filters.push({
        _or: [
          { title: { _ilike: `%${searchQuery.value}%` } },
          { ingredients: { ingredient_name: { _in: searchTerms } } } // Adjust according to your schema
        ]
      });
    }

    if (categoryId.value) {
      filters.push({ category_id: { _eq: parseInt(categoryId.value) } })
    }

    if (preparationTime.value) {
      filters.push({ preparation_time: { _lte: preparationTime.value } })
    }

    const offset = (currentPage.value - 1) * itemsPerPage;

    const { data } = await apolloClient.query({
      query: GET_RECIPES,
      variables: {
        where: filters.length ? { _and: filters } : {},
        limit: itemsPerPage,
        offset
      }
    })

    recipes.value = data.recipes;
    
    // Calculate total pages
    const totalCount = data.recipes_aggregate.aggregate.count;
    totalPages.value = Math.ceil(totalCount / itemsPerPage);
    
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

// Watch for changes in searchQuery, categoryId, and preparationTime to automatically fetch recipes
watch([searchQuery, categoryId, preparationTime], () => {
  currentPage.value = 1; // Reset to first page on new search/filter
  fetchRecipes();
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchRecipes();
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchRecipes();
  }
}

  const fetchCategories = async () => {
  const GET_CATEGORIES = gql`
    query GetCategories {
      categories {
        id
        category_name
      }
    }
  `
  const { data } = await apolloClient.query({ query: GET_CATEGORIES })
  categories.value = data.categories
}

onMounted(() => {
  fetchCategories()
  fetchRecipes()
})
</script>

<style scoped>
/* Additional styles if necessary */
</style>
```

\




