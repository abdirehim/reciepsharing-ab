<template>
  <div class="relative w-full overflow-hidden p-8 my-8">
    <!-- Title -->
    <h2 class="text-2xl font-bold mb-4 pl-4">Category Showcase</h2>

    <!-- Scroll Container -->
    <div ref="scrollContainer" class="flex items-center space-x-4 overflow-x-auto scrollbar-hide px-2">
      <!-- Card Item -->
      <div
        v-for="(image, index) in images"
        :key="image.id"
        @click="navigateToCategory(image.id)"
        class="flex-none w-40 h-40 relative recipe-card"
      >
        <div class="w-full h-full rounded-full overflow-hidden relative">
          <img :src="image.imageUrl" alt="Category Image" class="w-full h-full object-cover rounded-full recipe-image" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="bg-black bg-opacity-50 text-white p-4 rounded-full recipe-text">
              {{ image.category_name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Horizontal Navigation Arrows -->
    <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-white p-3 rounded-full shadow-lg focus:outline-none">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-white p-3 rounded-full shadow-lg focus:outline-none">
      <i class="fa fa-arrow-right"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { gql } from '@apollo/client/core';
import { useNuxtApp } from '#app';

// GraphQL Query to fetch categories
const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      category_name
    }
  }
`;

const nuxtApp = useNuxtApp();
const categories = ref([]);
const images = ref([]);
const scrollContainer = ref(null);

// Static local images imported using import statement
import a1 from '@/assets/a1.jpg';
import a2 from '@/assets/a2.jpg';
import a3 from '@/assets/a3.jpg';
import a4 from '@/assets/a4.jpg';

const localImages = [
  { id: 1, imageUrl: a1 },
  { id: 2, imageUrl: a2 },
  { id: 3, imageUrl: a3 },
  { id: 4, imageUrl: a4 },
  // Add more local images as needed
];

const fetchCategories = async () => {
  try {
    const { data } = await nuxtApp.$apollo.defaultClient.query({ query: GET_CATEGORIES });
    categories.value = data.categories;

    // Map the fetched categories to the local images array
    images.value = localImages.map((image, index) => ({
      id: categories.value[index]?.id || index,  // Use index if there's no matching category
      category_name: categories.value[index]?.category_name || 'Unknown',
      imageUrl: image.imageUrl,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

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

const navigateToCategory = (categoryId) => {
  router.push(`/categories/${categoryId}`);
};

onMounted(() => {
  fetchCategories();
});

const router = useRouter();
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

.recipe-card:hover .recipe-image {
  opacity: 0.7;
}

.recipe-card:hover .recipe-text {
  background-color: rgba(0, 0, 0, 0.7);
}

.recipe-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #f7f7f7;
}
</style>
