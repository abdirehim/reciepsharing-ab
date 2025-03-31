<template>
  <div class="relative w-full overflow-hidden p-8 my-8">
    <!-- Title -->
    <h2 class="text-2xl font-bold mb-4 pl-4">Most Popular Recipes</h2>

    <!-- Scroll Container -->
    <div ref="scrollContainer" class="flex items-center space-x-4 overflow-x-auto scrollbar-hide px-2">
      <!-- Card Item -->
      <div v-for="recipe in popularRecipes" :key="recipe.id" class="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
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
            <like v-if="recipe" :recipeId="recipe.id"/><Rating v-if="recipe" :recipeId="recipe.id"/>
        </div>
      </div>
    


    <!-- Horizontal Navigation Arrows -->
    <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-white p-3 rounded-full shadow-lg focus:outline-none">
      <i class="fa fa-arrow-left"></i>
    </button>
    <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-white p-3 rounded-full shadow-lg focus:outline-none">
      <i class="fa fa-arrow-right"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import leftarrow from './Icons/leftarrow.vue';
import rightarrow from './Icons/rightarrow.vue';
import { gql } from '@apollo/client/core';
import { useNuxtApp } from '#app';
import like from './UserInteract/like.vue'
import Rating from './UserInteract/rating.vue'

// GraphQL Query to fetch most popular recipes
const GET_POPULAR_RECIPES = gql`
  query GetPopularRecipes {
    recipes(
      order_by: {
        likes_aggregate: { count: desc },
        ratings_aggregate: { avg: { rating: desc } }
      },
      limit: 10
    ) {
      id
      title
      likes_aggregate {
        aggregate {
          count
        }
      }
      ratings_aggregate {
        aggregate {
          avg {
            rating
          }
          count
        }
      }
      recipe_images(where: {is_featured: {_eq: true}}) {
        url
      }
    }
  }
`;

const nuxtApp = useNuxtApp();
const popularRecipes = ref([]);

const fetchPopularRecipes = async () => {
  try {
    const { data } = await nuxtApp.$apollo.defaultClient.query({ query: GET_POPULAR_RECIPES });
    popularRecipes.value = data.recipes;
  } catch (error) {
    console.error('Error fetching popular recipes:', error);
  }
};

const scrollContainer = ref(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -200, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 200, behavior: 'smooth' });
  }
};

onMounted(() => {
  fetchPopularRecipes();
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

button:focus {
  outline: none;
}

button i {
  font-size: 1.25rem;
  color: #ffffff;
}

.recipe-card {
  margin: 1rem;
}

.recipe-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #f7f7f7;
}
</style>