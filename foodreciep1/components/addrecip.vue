<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl h-3/4 overflow-auto">
      <h2 class="text-2xl font-semibold mb-6">Create Recipe</h2>
      <Form :schema="schema" @submit="submitForm">
        <form>
        
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title <span class="text-red-500">*</span>
            </label>
            <Field v-model="recipe.title" id="title" name="title" type="text" placeholder="Enter recipe title"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" />
            <ErrorMessage name="title" class="text-red-500 text-sm" />
          </div>

         
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">
              Description <span class="text-red-500">*</span>
            </label>
            <Field v-model="recipe.description" id="description" name="description" as="textarea" placeholder="Enter recipe description"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" rows="4" />
            <ErrorMessage name="description" class="text-red-500 text-sm" />
          </div>

         
          <div class="mb-4">
            <label for="preparation_time" class="block text-sm font-medium text-gray-700">
              Preparation Time (minutes) <span class="text-red-500">*</span>
            </label>
            <Field v-model="recipe.preparationTime" id="preparation_time" name="preparationTime" type="number" placeholder="Enter preparation time"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" />
            <ErrorMessage name="preparationTime" class="text-red-500 text-sm" />
          </div>

         
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">
              Category <span class="text-red-500">*</span>
            </label>
            <Field v-model="recipe.categoryId" id="category" name="categoryId" as="select"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500">
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </Field>
            <ErrorMessage name="categoryId" class="text-red-500 text-sm" />
          </div>

          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="flex items-center mb-2">
              <Field v-model="ingredient.name" name="ingredients[index].name" type="text" placeholder="Ingredient name"
                class="mr-2 p-2 border border-gray-300 rounded-md w-1/3 focus:ring-blue-500 focus:border-blue-500" />
              <Field v-model="ingredient.quantity" name="ingredients[index].quantity" type="text" placeholder="Quantity"
                class="mr-2 p-2 border border-gray-300 rounded-md w-1/4 focus:ring-blue-500 focus:border-blue-500" />
              <Field v-model="ingredient.unit" name="ingredients[index].unit" type="text" placeholder="Unit"
                class="mr-2 p-2 border border-gray-300 rounded-md w-1/4 focus:ring-blue-500 focus:border-blue-500" />
              <button type="button" @click="removeIngredient(index)" class="text-red-500 hover:text-red-700"><IconsDelete/></button>
            </div>
            <div class="flex items-center space-x-2">
              <button type="button" @click="addIngredient"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"><IconsAdd/></button>
            </div>
          </div>

         
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              Steps
            </label>
            <div v-for="(step, index) in recipe.steps" :key="index" class="flex items-center mb-2">
              <Field v-model="step.description" name="steps[index].description" type="text" placeholder="Step description"
                class="p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" />
              <button type="button" @click="removeStep(index)" class="text-red-500 hover:text-red-700 ml-2"><IconsDelete/></button>
            </div>
            <div class="flex items-center space-x-2">
              <button type="button" @click="addStep"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"><IconsAdd/></button>
            </div>
          </div>

        
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Images</label>
            <input type="file" @change="onFileChange" multiple
              class="p-2 border border-gray-300 rounded-md w-full mb-2 focus:ring-blue-500 focus:border-blue-500" />
            <div v-for="(image, index) in recipe.images" :key="index" class="flex items-center mb-2">
              <img :src="image.url" alt="Image preview" class="w-20 h-20 object-cover rounded-md mr-2" />
              <input type="checkbox" v-model="image.is_featured" class="mr-2" />
              <button type="button" @click="removeImage(index)" class="text-red-500 hover:text-red-700"><IconsDelete/></button>
            </div>
          </div>

        
          <div class="flex justify-end space-x-2">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
            <button type="button" @click="$emit('close-modal')" class="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </Form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useForm, useField, Form, Field, ErrorMessage } from 'vee-validate';
// import * as yup from 'yup';
import axios from 'axios';
import { gql } from '@apollo/client/core';
import apolloClient from '~/apollo/client';
import { useAuth } from '@/composables/useAuth'; 
import { schema } from '~/components/validationSchema';


const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      category_name
    }
  }
`; 


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

const emit = defineEmits(['close', 'update'])

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

const setFeaturedImage = (index) => {
  recipe.value.images.forEach((image, i) => {
    image.is_featured = (i === index);
  });
};

const removeImage = (index) => {
  recipe.value.images.splice(index, 1);
};


const { token, user } = useAuth();



const { handleSubmit } = useForm({
  validationSchema: schema
})

const submitForm = handleSubmit(async (values) => {
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
    emit('update');
    closeForm();
    
    
  } catch (error) {
    console.error('Failed to add recipe:', error.response ? error.response.data : error.message);
    alert('Failed to add recipe. Please try again.');
  }
});


onMounted(async () => {
  try {
    const { data } = await apolloClient.query({ query: GET_CATEGORIES });
    categories.value = data.categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});

// defineEmits(['close-modal'])

const closeForm = () => {
  emit('close-modal')
  }

</script>

<!-- <template>
 
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg max-h-screen overflow-auto">
        <h2 class="text-2xl font-semibold mb-6">CreateRecipe</h2>
        <form @submit.prevent="submitForm" >
        
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input v-model="recipe.title" id="title" type="text" placeholder="Enter recipe title"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required />
          </div>
  
        
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="recipe.description" id="description" placeholder="Enter recipe description"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" rows="4" required></textarea>
          </div>
  
          
          <div class="mb-4">
            <label for="preparation_time" class="block text-sm font-medium text-gray-700">Preparation Time (minutes)</label>
            <input v-model="recipe.preparationTime" id="preparation_time" type="number" placeholder="Enter preparation time"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required />
          </div>
  
         
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <select v-model="recipe.categoryId" id="category"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </select>
          </div>
  
         
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Ingredients</label>
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="flex items-center mb-2">
              <input v-model="ingredient.name" type="text" placeholder="Ingredient name"
                class="mr-2 p-2 border border-gray-300 rounded-md w-1/3 focus:ring-blue-500 focus:border-blue-500" required />
              <input v-model="ingredient.quantity" type="text" placeholder="Quantity"
                class="mr-2 p-2 border border-gray-300 rounded-md w-1/4 focus:ring-blue-500 focus:border-blue-500" required />
              <input v-model="ingredient.unit" type="text" placeholder="Unit"
                class="mr-2 p-2 border border-gray-300 rounded-md w-1/4 focus:ring-blue-500 focus:border-blue-500" required />
              <button type="button" @click="removeIngredient(index)" class="text-red-500 hover:text-red-700"><IconsDelete/></button>
            </div>
            <div class="flex items-center space-x-2">
              <button type="button" @click="addIngredient"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"><IconsAdd/></button>
            </div>
          </div>
  
      
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Steps</label>
            <div v-for="(step, index) in recipe.steps" :key="index" class="flex items-center mb-2">
             
              <input v-model="step.description" type="text" placeholder="Step description"
                class="p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required />
              <button type="button" @click="removeStep(index)" class="text-red-500 hover:text-red-700 ml-2"><IconsDelete/></button>
            </div>
            <div class="flex items-center space-x-2">
              <button type="button" @click="addStep"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"><IconsAdd/></button>
            </div>
          </div>
  
      
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Images</label>
            <input type="file" @change="onFileChange" multiple
              class="p-2 border border-gray-300 rounded-md w-full mb-2 focus:ring-blue-500 focus:border-blue-500" />
            <div v-for="(image, index) in recipe.images" :key="index" class="flex items-center mb-2">
              <img :src="image.url" alt="Image preview" class="w-20 h-20 object-cover rounded-md mr-2" />
              <input type="checkbox" v-model="image.is_featured" class="mr-2" />
              <button type="button" @click="removeImage(index)" class="text-red-500 hover:text-red-700"><IconsDelete/></button>
            </div>
          </div>
  
         
          <div class="flex justify-end space-x-2">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">submit</button>
            <button type="button"  @click="$emit('close-modal')" class="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          </div>
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
// const props = defineProps(['recipe'])
const emit = defineEmits(['close', 'update'])

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
    emit('update');
    closeForm();
    
    
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

// defineEmits(['close-modal'])

const closeForm = () => {
  emit('close-modal')
  }

</script> -->