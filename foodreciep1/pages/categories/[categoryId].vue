 <template>
  <div>
    <Navbar />
    <div class="container mx-auto p-8 my-12">
      <h1  class="text-3xl font-bold mb-4">Recipes for  '{{ categoryName }}'</h1>
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
      <div v-if="recipes.length === 0" class="text-center text-gray-500">No recipes found.</div>
      <div v-if="recipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
        <div v-for="recipe in recipes" :key="recipe.id" class="border rounded-lg overflow-hidden shadow-lg">
          <img :src="recipe.recipe_images[0]?.url" alt="Recipe Image" class="w-full h-48 object-cover">
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ recipe.title }}</h2>
            <p class="text-gray-600 mb-2">{{recipe.category?.category_name }}</p>
            <p class="text-gray-600 mb-2">{{ recipe.description }}</p>  
            <div class="flex justify-between items-center">
              <span class="text-gray-500">{{ recipe.preparation_time }} mins</span>
              <div class="flex space-x-2">
                <button class="bg-blue-500 text-white px-3 py-1 rounded">Like</button>
                <button class="bg-green-500 text-white px-3 py-1 rounded">Rate</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useRoute } from 'vue-router';

import { gql } from '@apollo/client/core';

 const GET_RECIPES = gql`
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

const GET_CATEGORY_NAME = gql`
  query GetCategoryName($categoryId: Int!) {
    categories_by_pk(id: $categoryId) {
      category_name
    }
  }
`;

const route = useRoute();
const categoryId = ref(Number(route.params.categoryId)); // Convert to number if necessary
const recipes = ref([]);
const loading = ref(true);
const error = ref(null);
const nuxtApp = useNuxtApp();
const categoryName = ref('');

onMounted(async () => {
  try {

    const { data: categoryData } = await nuxtApp.$apollo.defaultClient.query({
      query: GET_CATEGORY_NAME,
      variables: { categoryId: categoryId.value },
    });
    categoryName.value = categoryData.categories_by_pk?.category_name || 'Unknown Category';


    if (categoryId.value) {
      const { data } = await nuxtApp.$apollo.defaultClient.query({
        query: GET_RECIPES,
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
</script>

<style scoped>

</style> 














 
