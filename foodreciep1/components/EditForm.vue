<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg h-3/4 overflow-auto">
        <h2 class="text-2xl font-semibold mb-6">Edit Recipe</h2>
        <form @submit.prevent="submitEditForm">
          <!-- Title -->
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input v-model="editRecipe.title" id="title" type="text" placeholder="Enter recipe title"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required />
          </div>
  
          <!-- Description -->
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="editRecipe.description" id="description" placeholder="Enter recipe description"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" rows="4" required></textarea>
          </div>
  
          <!-- Preparation Time -->
          <div class="mb-4">
            <label for="preparation_time" class="block text-sm font-medium text-gray-700">Preparation Time (minutes)</label>
            <input v-model="editRecipe.preparation_time" id="preparation_time" type="number" placeholder="Enter preparation time"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required />
          </div>
  
          <!-- Category -->
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <select v-model="editRecipe.categoryId" id="category"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </select>
          </div>
  
          <!-- Ingredients -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Ingredients</label>
            <div v-for="(ingredient, index) in editRecipe.ingredients" :key="index" class="flex items-center mb-2">
              <input v-model="ingredient.ingredient_name" type="text" placeholder="Ingredient name"
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
  
          <!-- Steps -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Steps</label>
            <div v-for="(step, index) in editRecipe.steps" :key="index" class="flex items-center mb-2">
              
              <input v-model="step.step_description" type="text" placeholder="Step description"
                class="p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" required />
              <button type="button" @click="removeStep(index)" class="text-red-500 hover:text-red-700 ml-2"><IconsDelete/></button>
            </div>
            <div class="flex items-center space-x-2">
              <button type="button" @click="addStep"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"><IconsAdd/></button>
            </div>
          </div>
  
          <!-- Images -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Images</label>
            <input type="file" @change="onFileChange" multiple
              class="p-2 border border-gray-300 rounded-md w-full mb-2 focus:ring-blue-500 focus:border-blue-500" />
            <div v-for="(image, index) in editRecipe.images" :key="index" class="flex items-center mb-2">
              <img :src="image.url" alt="Image preview" class="w-20 h-20 object-cover rounded-md mr-2" />
              <input type="checkbox" v-model="image.is_featured" class="mr-2" />
              <button type="button" @click="removeImage(index)" class="text-red-500 hover:text-red-700"><IconsDelete/></button>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="flex justify-end space-x-2">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save</button>
            <button type="button" @click="closeEditForm" class="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import axios from 'axios'
  import cloneDeep from 'lodash/cloneDeep'
  import { useAuth } from '@/composables/useAuth'
  import { gql } from '@apollo/client/core'
  import { useNuxtApp } from '#app'
  
  const GET_CATEGORIES = gql`
    query GetCategories {
      categories {
        id
        category_name
      }
    }
   `
  
  // const UPDATE_RECIPE = gql`
  //   mutation UpdateRecipe(
  //     $id: Int!
  //     $title: String
  //     $description: String
  //     $preparationTime: Int
  //     $categoryId: Int
  //     $creatorId: Int
  //     $ingredients: [ingredients_insert_input!]!
  //     $steps: [steps_insert_input!]!
  //     $images: [images_insert_input!]!
  //   ) {
  //     update_recipes(
  //       where: { id: { _eq: $id } }
  //       _set: {
  //         title: $title
  //         description: $description
  //         preparation_time: $preparationTime
  //         category_id: $categoryId
  //         creator_id: $creatorId
  //       }
  //     ) {
  //       returning {
  //         id
  //       }
  //     }
  //     insert_ingredients(objects: $ingredients) {
  //       returning {
  //         id
  //       }
  //     }
  //     insert_steps(objects: $steps) {
  //       returning {
  //         id
  //       }
  //     }
  //     insert_images(objects: $images) {
  //       returning {
  //         id
  //       }
  //     }
  //   }
  // `
  
  const props = defineProps(['recipe'])
  const emit = defineEmits(['close', 'update'])
  
  const { user, token } = useAuth()
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient
  
  const editRecipe = reactive(cloneDeep(props.recipe))
  editRecipe.categoryId = props.recipe.category.id
  editRecipe.images = props.recipe.recipe_images.map(img => ({
    url: img.url,
    is_featured: img.is_featured
  }))
  
  const categories = ref([])
  
  const fetchCategories = async () => {
    try {
      const { data } = await apolloClient.query({ query: GET_CATEGORIES })
      categories.value = data.categories
    } catch (err) {
      console.error('Failed to fetch categories:', err.message)
    }
  }
  
  fetchCategories()


  const submitEditForm = async () => {
  const newIngredients = editRecipe.ingredients.map(ingredient => ({
    recipe_id: editRecipe.id,
    ingredient_name: ingredient.ingredient_name,
    quantity: ingredient.quantity,
    unit: ingredient.unit
  }));

  const newSteps = editRecipe.steps.map((step, index) => ({
    recipe_id: editRecipe.id,
    step_number: index + 1,
    step_description: step.step_description
  }));

  const newImages = editRecipe.images.map(image => ({
    recipe_id: editRecipe.id,
    url: image.url,
    is_featured: image.is_featured
  }));

  try {
    await apolloClient.mutate({
      mutation: gql`
      mutation UpdateRecipe(
 
 $id: Int!
 $title: String
 $description: String
 $preparationTime: Int
 $categoryId: Int
 $creatorId: Int
 $ingredients: [ingredients_insert_input!]!
 $steps: [steps_insert_input!]!
 $images: [images_insert_input!]!
) {
update_recipes(
 where: { id: { _eq: $id } }
 _set: {
   title: $title
   description: $description
   preparation_time: $preparationTime
   category_id: $categoryId
   creator_id: $creatorId
 }
) {
 returning {
   id
 }
}

delete_ingredients(where: { recipe_id: { _eq: $id } }) {
 affected_rows
}

delete_steps(where: { recipe_id: { _eq: $id } }) {
 affected_rows
}

delete_images(where: { recipe_id: { _eq: $id } }) {
 affected_rows
}

insert_ingredients(objects: $ingredients) {
 returning {
   id
 }
}

insert_steps(objects: $steps) {
 returning {
   id
 }
}

insert_images(objects: $images) {
 returning {
   id
 }
}
}
      `,
      variables: {
        id: editRecipe.id,
        title: editRecipe.title,
        description: editRecipe.description,
        preparationTime: editRecipe.preparation_time,
        categoryId: editRecipe.categoryId,
        creatorId: parseInt(user.value.id, 10),
        ingredients: newIngredients,
        steps: newSteps,
        images: newImages
      }
    });

    alert('Recipe updated successfully!');
    emit('update');
    closeEditForm();
  } catch (error) {
    console.error('Failed to update recipe:', error.message);
    alert('Failed to update recipe. Please try again.');
  }
};



  
  const addIngredient = () => {
    editRecipe.ingredients.push({ ingredient_name: '', quantity: '', unit: '' })
  }
  
  const removeIngredient = (index) => {
    editRecipe.ingredients.splice(index, 1)
  }
  
  const addStep = () => {
    editRecipe.steps.push({ step_description: '' })
  }
  
  const removeStep = (index) => {
    editRecipe.steps.splice(index, 1)
  }
  
  const onFileChange = async (event) => {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
      try {
        const { data } = await axios.post('http://localhost:8081/upload', formData)
        editRecipe.images.push({ url: data.url, is_featured: false })
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
  }
  
  const setFeaturedImage = (index) => {
    editRecipe.images.forEach((image, i) => {
      image.is_featured = i === index
    })
  }
  
  const removeImage = (index) => {
    editRecipe.images.splice(index, 1)
  }
  
  const closeEditForm = () => {
    emit('close')
  }
  </script>
  




<!--
    <div v-if="selectedRecipe" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4 w-full">
        <h2 class="text-2xl font-bold mb-4">Edit Recipe</h2>
        
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-medium mb-2">Title</label>
            <input v-model="editRecipe.title" type="text" id="title" class="w-full p-2 border border-gray-300 rounded"/>
          </div>
          
          <div class="mb-4">
            <label for="description" class="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea v-model="editRecipe.description" id="description" rows="3" class="w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
          
          <div class="mb-4">
            <label for="preparation_time" class="block text-gray-700 text-sm font-medium mb-2">Preparation Time (minutes)</label>
            <input v-model.number="editRecipe.preparation_time" type="number" id="preparation_time" class="w-full p-2 border border-gray-300 rounded"/>
          </div>
          
          <div class="mb-4">
            <label for="category" class="block text-gray-700 text-sm font-medium mb-2">Category</label>
            <select v-model="editRecipe.categoryId" id="category" class="w-full p-2 border border-gray-300 rounded">
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_name }}</option>
            </select>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">Ingredients</label>
            <div v-for="(ingredient, index) in editRecipe.ingredients" :key="index" class="flex items-center mb-2">
              <input v-model="ingredient.ingredient_name" type="text" placeholder="Ingredient Name" class="w-1/3 p-2 border border-gray-300 rounded mr-2"/>
              <input v-model="ingredient.quantity" type="text" placeholder="Quantity" class="w-1/6 p-2 border border-gray-300 rounded mr-2"/>
              <input v-model="ingredient.unit" type="text" placeholder="Unit" class="w-1/6 p-2 border border-gray-300 rounded mr-2"/>
              <button type="button" @click="removeIngredient(index)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
            </div>
            <button type="button" @click="addIngredient" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Ingredient</button>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">Steps</label>
            <div v-for="(step, index) in editRecipe.steps" :key="index" class="flex items-center mb-2">
              <input v-model="step.step_description" type="text" placeholder="Step Description" class="w-4/5 p-2 border border-gray-300 rounded mr-2"/>
              <button type="button" @click="removeStep(index)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
            </div>
            <button type="button" @click="addStep" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Step</button>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">Images</label>
            <input type="file" @change="onFileChange" multiple class="mb-4"/>
            <div v-for="(image, index) in editRecipe.images" :key="index" class="flex items-center mb-2">
              <img :src="image.url" alt="Image Preview" class="w-24 h-24 object-cover mr-2"/>
              <label class="flex items-center">
                <input type="checkbox" :checked="image.is_featured" @change="setFeaturedImage(index)" class="mr-2"/>
                <span>Featured</span>
              </label>
              <button type="button" @click="removeImage(index)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">Remove</button>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
            <button type="button" @click="closeEditForm" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useNuxtApp } from '#app'
  import { useAuth } from '@/composables/useAuth'
  import axios from 'axios'
  import cloneDeep from 'lodash/cloneDeep'
  
  const recipes = ref([])
  const loading = ref(true)
  const error = ref(null)
  const selectedRecipe = ref(null)
  const editRecipe = ref({
    id: null,
    title: '',
    description: '',
    preparation_time: 0,
    categoryId: null,
    ingredients: [],
    steps: [],
    images: []
  })
  const categories = ref([])
  
  const { token, user } = useAuth()
  
  const fetchRecipes = async () => {
    loading.value = true;
    try {
      const nuxtApp = useNuxtApp();
      const apolloClient = nuxtApp.$apollo.defaultClient;
      
      if (!user.value) {
        throw new Error('User not found');
      }
      
      const { data } = await apolloClient.query({
        query: GET_USER_RECIPES,
        variables: { creatorId: parseInt(user.value.id, 10) }
      });
      
      if (!data.recipes || data.recipes.length === 0) {
        throw new Error('No recipes found');
      }
  
      recipes.value = data.recipes;
    } catch (err) {
      error.value = err;
      console.error('Error fetching recipes:', err.message);
    } finally {
      loading.value = false;
    }
  }
  
  const fetchCategories = async () => {
    try {
      const nuxtApp = useNuxtApp()
      const apolloClient = nuxtApp.$apollo.defaultClient
      const { data } = await apolloClient.query({ query: GET_CATEGORIES })
      categories.value = data.categories
    } catch (err) {
      error.value = err
    }
  }
  
  const openEditForm = (recipe) => {
    selectedRecipe.value = recipe
    editRecipe.value = cloneDeep(recipe)
    editRecipe.value.categoryId = recipe.category.id
    editRecipe.value.images = recipe.recipe_images.map(img => ({
      url: img.url,
      is_featured: img.is_featured
    }))
  }
  
  const closeEditForm = () => {
    selectedRecipe.value = null
  }
  
  const submitEditForm = async () => {
    const cleanData = {
      id: editRecipe.value.id,
      title: editRecipe.value.title,
      description: editRecipe.value.description,
      preparationTime: editRecipe.value.preparation_time,
      categoryId: editRecipe.value.categoryId,
      creatorId: user.value.id,
      ingredients: editRecipe.value.ingredients.map(ingredient => ({
        recipe_id: editRecipe.value.id,
        ingredient_name: ingredient.ingredient_name,
        quantity: ingredient.quantity,
        unit: ingredient.unit
      })),
      steps: editRecipe.value.steps.map((step, index) => ({
        recipe_id: editRecipe.value.id,
        step_number: index + 1,
        step_description: step.step_description
      })),
      images: editRecipe.value.images.map(image => ({
        recipe_id: editRecipe.value.id,
        url: image.url,
        is_featured: image.is_featured
      }))
    }
  
    try {
      console.log('Submitting recipe edit:', cleanData)
      await axios.post('/api/recipes/update', cleanData, {
        headers: { 'Authorization': `Bearer ${token.value}` }
      })
      alert('Recipe updated successfully!')
      closeEditForm()
      fetchRecipes()
    } catch (error) {
      console.error('Failed to update recipe:', error.response?.data || error.message)
      alert('Failed to update recipe. Please try again.')
    }
  }
  
  const addIngredient = () => {
    editRecipe.value.ingredients.push({ ingredient_name: '', quantity: '', unit: '' })
  }
  
  const removeIngredient = (index) => {
    editRecipe.value.ingredients.splice(index, 1)
  }
  
  const addStep = () => {
    editRecipe.value.steps.push({ step_description: '' })
  }
  
  const removeStep = (index) => {
    editRecipe.value.steps.splice(index, 1)
  }
  
  const onFileChange = async (event) => {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
      try {
        const { data } = await axios.post('http://localhost:8081/upload', formData)
        editRecipe.value.images.push({ url: data.url, is_featured: false })
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
  }
  
  const setFeaturedImage = (index) => {
    editRecipe.value.images.forEach((image, i) => {
      image.is_featured = (i === index)
    })
  }
  
  const removeImage = (index) => {
    editRecipe.value.images.splice(index, 1)
  }
  
  onMounted(() => {
    fetchRecipes()
    fetchCategories()
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  .relative {
    position: relative;
  }
  .bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .fixed {
    position: fixed;
  }
  .z-50 {
    z-index: 50;
  }
  .max-w-lg {
    max-width: 600px; /* Adjust the width as needed */
  }
  .max-h-screen {
    max-height: 80vh; /* Adjust the height as needed */
  }
  .overflow-auto {
    overflow: auto;
  }
  </style> -->
  
  


<!--





    <div class="edit-form-overlay">
      <div class="edit-form">
        <h2>Edit Recipe</h2>
        <form @submit.prevent="submitEditForm">
          <div>
            <label for="title">Title</label>
            <input id="title" v-model="editRecipe.title" type="text" required />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea id="description" v-model="editRecipe.description" required></textarea>
          </div>
          <div>
            <label for="preparation_time">Preparation Time (minutes)</label>
            <input id="preparation_time" v-model="editRecipe.preparation_time" type="number" required />
          </div>
          <div>
            <label for="category">Category</label>
            <select id="category" v-model="editRecipe.categoryId" required>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </select>
          </div>
          <div>
            <h3>Ingredients</h3>
            <div v-for="(ingredient, index) in editRecipe.ingredients" :key="index">
              <input v-model="ingredient.ingredient_name" placeholder="Ingredient Name" required />
              <input v-model="ingredient.quantity" placeholder="Quantity" required />
              <input v-model="ingredient.unit" placeholder="Unit" required />
              <button @click.prevent="removeIngredient(index)">Remove</button>
            </div>
            <button @click.prevent="addIngredient">Add Ingredient</button>
          </div>
          <div>
            <h3>Steps</h3>
            <div v-for="(step, index) in editRecipe.steps" :key="index">
              <textarea v-model="step.step_description" placeholder="Step Description" required></textarea>
              <button @click.prevent="removeStep(index)">Remove</button>
            </div>
            <button @click.prevent="addStep">Add Step</button>
          </div>
          <div>
            <h3>Images</h3>
            <div v-for="(image, index) in editRecipe.images" :key="index">
              <input v-model="image.url" placeholder="Image URL" required />
              <input type="checkbox" v-model="image.is_featured" /> Featured
              <button @click.prevent="removeImage(index)">Remove</button>
            </div>
            <input type="file" @change="onFileChange" multiple />
          </div>
          <div>
            <button type="submit">Save</button>
            <button @click="closeEditForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { gql } from '@apollo/client/core'
  import { useNuxtApp } from '#app'
  import { useAuth } from '@/composables/useAuth'
  import cloneDeep from 'lodash/cloneDeep'
  import axios from 'axios'
  
  const UPDATE_RECIPE_MUTATION = gql`
    mutation UpdateRecipe(
      $id: Int!
      $title: String
      $description: String
      $preparationTime: Int
      $categoryId: Int
      $creatorId: Int
      $ingredients: [InsertIngredientInput!]!
      $steps: [InsertStepInput!]!
      $images: [InsertImageInput!]!
    ) {
      update_recipes(
        where: { id: { _eq: $id } }
        _set: {
          title: $title
          description: $description
          preparation_time: $preparationTime
          category_id: $categoryId
          creator_id: $creatorId
        }
      ) {
        returning {
          id
        }
      }
      delete_ingredients(where: { recipe_id: { _eq: $id } }) {
        affected_rows
      }
      insert_ingredients(objects: $ingredients) {
        returning {
          id
        }
      }
      delete_steps(where: { recipe_id: { _eq: $id } }) {
        affected_rows
      }
      insert_steps(objects: $steps) {
        returning {
          id
        }
      }
      delete_images(where: { recipe_id: { _eq: $id } }) {
        affected_rows
      }
      insert_images(objects: $images) {
        returning {
          id
        }
      }
    }
  `
  
  const editRecipe = ref({
    id: null,
    title: '',
    description: '',
    preparation_time: 0,
    categoryId: null,
    ingredients: [],
    steps: [],
    images: []
  })
  const categories = ref([])
  
  const { token, user } = useAuth()
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient
  
  const fetchCategories = async () => {
    try {
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
    } catch (err) {
      console.error('Error fetching categories:', err.message)
    }
  }
  
  const closeEditForm = () => {
    editRecipe.value = {
      id: null,
      title: '',
      description: '',
      preparation_time: 0,
      categoryId: null,
      ingredients: [],
      steps: [],
      images: []
    }
    emit('close')
  }
  
  const submitEditForm = async () => {
    if (!token.value) {
      alert('You must be logged in to edit a recipe.')
      return
    }
  
    const cleanData = {
      id: editRecipe.value.id,
      title: editRecipe.value.title,
      description: editRecipe.value.description,
      preparationTime: editRecipe.value.preparation_time,
      categoryId: editRecipe.value.categoryId,
      creatorId: parseInt(user.value.id, 10),
      ingredients: editRecipe.value.ingredients.map(ingredient => ({
        recipe_id: editRecipe.value.id,
        ingredient_name: ingredient.ingredient_name,
        quantity: ingredient.quantity,
        unit: ingredient.unit
      })),
      steps: editRecipe.value.steps.map((step, index) => ({
        recipe_id: editRecipe.value.id,
        step_number: index + 1,
        step_description: step.step_description
      })),
      images: editRecipe.value.images.map(image => ({
        recipe_id: editRecipe.value.id,
        url: image.url,
        is_featured: image.is_featured
      }))
    }
  
    try {
      await apolloClient.mutate({
        mutation: UPDATE_RECIPE_MUTATION,
        variables: cleanData
      })
      alert('Recipe updated successfully!')
      closeEditForm()
      emit('update')
    } catch (error) {
      console.error('Failed to update recipe:', error.response?.data || error.message)
      alert('Failed to update recipe. Please try again.')
    }
  }
  
  const addIngredient = () => {
    editRecipe.value.ingredients.push({ ingredient_name: '', quantity: '', unit: '' })
  }
  
  const removeIngredient = (index) => {
    editRecipe.value.ingredients.splice(index, 1)
  }
  
  const addStep = () => {
    editRecipe.value.steps.push({ step_description: '' })
  }
  
  const removeStep = (index) => {
    editRecipe.value.steps.splice(index, 1)
  }
  
  const onFileChange = async (event) => {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
      try {
        const { data } = await axios.post('http://localhost:8081/upload', formData)
        editRecipe.value.images.push({ url: data.url, is_featured: false })
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
  }
  
  const setFeaturedImage = (index) => {
    editRecipe.value.images.forEach((image, i) => {
      image.is_featured = (i === index)
    })
  }
  
  const removeImage = (index) => {
    editRecipe.value.images.splice(index, 1)
  }
  
  onMounted(() => {
    fetchCategories()
  })
  </script>
  
  <style scoped>
  .edit-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .edit-form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .edit-form h2 {
    margin-bottom: 20px;
  }
  
  .edit-form label {
    display: block;
    margin-bottom: 8px;
  }
  
  .edit-form input,
  .edit-form textarea,
  .edit-form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .edit-form button {
    margin-right: 10px;
  }
  </style>
   -->