<template>
  <div>
    <Navbar />
    <div class="container mx-auto p-4 bg-green-800 text-white rounded-lg shadow-lg my-8">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label class="block text-lg font-semibold mb-2">Title</label>
          <input v-model="recipe.title" placeholder="Title" required
            class="w-full p-2 border border-gray-300 rounded-md text-black" />
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Description</label>
          <textarea v-model="recipe.description" placeholder="Description" required
            class="w-full p-2 border border-gray-300 rounded-md text-black"></textarea>
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Preparation Time (minutes)</label>
          <input v-model="recipe.preparationTime" type="number" placeholder="Preparation Time" required
            class="w-full p-2 border border-gray-300 rounded-md text-black" />
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Category</label>
          <select v-model="recipe.categoryId" class="w-full p-2 border border-gray-300 rounded-md text-black">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{  category.category_name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Ingredients</label>
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="flex space-x-2 mb-2">
            <input v-model="ingredient.name" placeholder="Ingredient Name" required
              class="w-full p-2 border border-gray-300 rounded-md text-black" />
            <input v-model="ingredient.quantity" placeholder="Quantity" required
              class="w-full p-2 border border-gray-300 rounded-md text-black" />
            <input v-model="ingredient.unit" placeholder="Unit" required
              class="w-full p-2 border border-gray-300 rounded-md text-black" />
            <button type="button" @click="removeIngredient(index)"
              class="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
          </div>
          <button type="button" @click="addIngredient" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Ingredient</button>
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Steps</label>
          <div v-for="(step, index) in recipe.steps" :key="index" class="mb-2">
            <textarea v-model="step.description" placeholder="Step Description" required
              class="w-full p-2 border border-gray-300 rounded-md text-black"></textarea>
            <button type="button" @click="removeStep(index)"
              class="bg-red-500 text-white px-2 py-1 rounded-md mt-2">Remove</button>
          </div>
          <button type="button" @click="addStep" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Step</button>
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Images</label>
          <input type="file" multiple @change="onFileChange"
            class="w-full p-2 border border-gray-300 rounded-md text-black" />
          <div v-for="(image, index) in recipe.images" :key="index" class="mt-2 flex items-center space-x-2">
            <img :src="image.url" alt="Recipe Image" class="w-20 h-20 object-cover rounded-md" />
            <button v-if="!image.is_featured" @click="setFeaturedImage(index)"
              class="bg-blue-500 text-white px-2 py-1 rounded-md">Set as Featured</button>
            <button @click="removeImage(index)" class="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
          </div>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { gql } from '@apollo/client/core'
import apolloClient from '~/apollo/client';
import { useNuxtApp } from '#app'
// import jwtDecode from 'jwt-decode'
import { useAuth } from '@/composables/useAuth' // Adjust the import path as needed



const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      category_name
    }
  }
`; 

const newRecipes = ref([...recipe.value, newRecipes]);
const recipe = ref({
  title: '',
  description: '',
  preparationTime: 0,
  categoryId: null,
  createrId:null,
  ingredients: [],
  steps: [],
  images: []
})

const categories = ref([])

const addIngredient = () => {
  recipe.value.ingredients.push({ name: '', quantity: '', unit: '' })
}

const removeIngredient = (index) => {
  recipe.value.ingredients.splice(index, 1)
}

const addStep = () => {
  recipe.value.steps.push({ description: '' })
}

const removeStep = (index) => {
  recipe.value.steps.splice(index, 1)
}


const onFileChange = async (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post('http://localhost:8081/upload', formData);
      console.log('Uploaded image URL:', data.url); // Log the URL to check
      recipe.value.images.push({ url: data.url, is_featured: false });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  }
};

// const onFileChange = async (event) => {
//   const files = event.target.files;
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const { data } = await axios.post('http://localhost:8081/upload', formData);
//       recipe.value.images.push({ url: data.url, is_featured: false });
//     } catch (error) {
//       console.error('Failed to upload image:', error);
//     }
//   }
// };

const setFeaturedImage = (index) => {
  recipe.value.images.forEach((image, i) => {
    image.is_featured = (i === index);
  });
};

const removeImage = (index) => {
  recipe.value.images.splice(index, 1);
};


const { token, user } = useAuth();

const submitForm = async () => {
  if (!token.value) {
    alert('You must be logged in to add a recipe.');
    return;
  }
  const creatorId=computed(()=>parseInt(user.value.id, 10))

  const recipeData = {
    ...recipe.value,
    creatorId: creatorId.value // Include the user ID here
  };

  try {
    await axios.post('http://localhost:8081/api/recipes', recipeData, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });
    alert('Recipe added successfully!');
  } catch (error) {
    console.error('Failed to add recipe:', error.response ? error.response.data : error.message);
    alert('Failed to add recipe. Please try again.');
  }
};


onMounted(async () => {
  try {
    const { data } = await apolloClient.query({ query: GET_CATEGORIES });
    categories.value = data.categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});
// onMounted(async () => {
//   try {
//     const { data } = await axios.get('http://localhost:8081/api/categories')
//     categories.value = data
//   } catch (error) {
//     console.error('Failed to fetch categories:', error)
//   }
// })





</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
