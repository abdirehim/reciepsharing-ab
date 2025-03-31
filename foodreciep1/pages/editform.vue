 <!-- <template>
  <div>
    <Navbar />

    <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-8">
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
      <div v-if="recipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="recipe in recipes" :key="recipe.id" class="bg-gray-100 p-4 rounded-lg shadow-md relative">
          <div v-if="recipe.recipe_images.length > 0">
            <img 
              v-if="recipe.recipe_images[0].url" 
              :src="recipe.recipe_images[0].url" 
              alt="Featured Image" 
              class="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
          <NuxtLink :to="`/recipes/${recipe.id}`" class="text-2xl font-bold text-blue-600 hover:underline">{{ recipe.title }}</NuxtLink>
          
          <p class="mt-2">{{ recipe.description }}</p>
          <button @click="openEditForm(recipe)" class="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
         


          <div v-if="selectedRecipe === recipe" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white p-4 rounded-lg shadow-lg max-w-lg max-h-screen overflow-auto">
    <h2 class="text-2xl font-semibold mb-4">Edit Recipe</h2>
    <form @submit.prevent="submitEditForm" class="space-y-4">
    
      <div>
        <label class="block text-lg font-semibold mb-2">Title</label>
        <input v-model="editRecipe.title" placeholder="Title" required class="w-full p-2 border border-gray-300 rounded-md" />
      </div>
 


      <div>
        <label class="block text-lg font-semibold mb-2">Description</label>
        <textarea v-model="editRecipe.description" placeholder="Description" required class="w-full p-2 border border-gray-300 rounded-md"></textarea>
      </div>
     




      <div>
        <label class="block text-lg font-semibold mb-2">Preparation Time (minutes)</label>
        <input v-model="editRecipe.preparation_time" type="number" placeholder="Preparation Time" required class="w-full p-2 border border-gray-300 rounded-md" />
      </div>
    



      <div>
        <label class="block text-lg font-semibold mb-2">Category</label>
        <select v-model="editRecipe.categoryId" class="w-full p-2 border border-gray-300 rounded-md" >
          
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_name }}</option>
        </select>
      </div>
     









      <div>
        <label class="block text-lg font-semibold mb-2">Ingredients</label>
        <div v-for="(ingredient, index) in editRecipe.ingredients" :key="index" class="flex space-x-2 mb-2">
          <input v-model="ingredient.ingredient_name" placeholder="Ingredient Name" required class="w-full p-2 border border-gray-300 rounded-md" />
          <input v-model="ingredient.quantity" placeholder="Quantity" required class="w-full p-2 border border-gray-300 rounded-md" />
          <input v-model="ingredient.unit" placeholder="Unit" required class="w-full p-2 border border-gray-300 rounded-md" />
          <button type="button" @click="removeIngredient(index)" class="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
        </div>
        <button type="button" @click="addIngredient" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Ingredient</button>
      </div>
    



      <div>
        <label class="block text-lg font-semibold mb-2">Steps</label>
        <div v-for="(step, index) in editRecipe.steps" :key="index" class="mb-2">
          <textarea v-model="step.step_description" placeholder="Step Description" required class="w-full p-2 border border-gray-300 rounded-md"></textarea>
          <button type="button" @click="removeStep(index)" class="bg-red-500 text-white px-2 py-1 rounded-md mt-2">Remove</button>
        </div>
        <button type="button" @click="addStep" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Step</button>
      </div>
  


      <div>
        <label class="block text-lg font-semibold mb-2">Images</label>
        <input type="file" multiple @change="onFileChange" class="w-full p-2 border border-gray-300 rounded-md" />
        <div v-for="(image, index) in editRecipe.images" :key="index" class="mt-2 flex items-center space-x-2">
          <img :src="image.url" alt="Recipe Image" class="w-20 h-20 object-cover rounded-md" />
          <button v-if="!image.is_featured" @click="setFeaturedImage(index)" class="bg-blue-500 text-white px-2 py-1 rounded-md">Set as Featured</button>
          <button @click="removeImage(index)" class="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
        </div>
      </div>
  
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Submit</button>
      <button type="button" @click="closeEditForm" class="bg-gray-500 text-white px-4 py-2 rounded-md w-full">Cancel</button>
    </form>
  </div>
</div>

        </div>
      </div>
      <div v-else class="text-center text-gray-500">No recipes found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth'
import axios from 'axios'

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

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      category_name
    }
  }
`


const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const selectedRecipe = ref(null)
const editRecipe = ref({
  title: '',
  description: '',
  preparationTime: 0,
  categoryId: null,
  ingredients: [],
  steps: [],
  images: []
})
const categories = ref([])

const { token, user } = useAuth()

const fetchRecipes = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    if (!user) throw new Error('User not found')
    const { data } = await apolloClient.query({
      query: GET_USER_RECIPES,
      variables: { creatorId: parseInt(user.value.id, 10) }
    })
    recipes.value = data.recipes
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    const { data } = await apolloClient.query({ query: GET_CATEGORIES })
    categories.value = data.categories
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

const openEditForm = (recipe) => {
  selectedRecipe.value = recipe
  editRecipe.value = { ...recipe } // Pre-populate edit form
}

const closeEditForm = () => {
  selectedRecipe.value = null
}

const submitEditForm = async () => {
  if (!token.value) {
    alert('You must be logged in to edit a recipe.')
    return
  }

  try {
    await axios.put(`http://localhost:8081/api/recipes/${editRecipe.value.id}`, editRecipe.value, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })
    alert('Recipe updated successfully!')
    closeEditForm()
    fetchRecipes()
  } catch (error) {
    console.error('Failed to update recipe:', error)
    alert('Failed to update recipe. Please try again.')
}
}

const addIngredient = () => {
editRecipe.value.ingredients.push({ name: '', quantity: '', unit: '' })
}

const removeIngredient = (index) => {
editRecipe.value.ingredients.splice(index, 1)
}

const addStep = () => {
editRecipe.value.steps.push({ description: '' })
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
</style>
 -->

 <template>
  <div>
    <Navbar />

    <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-8">
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
      <div v-if="recipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="recipe in recipes" :key="recipe.id" class="bg-gray-100 p-4 rounded-lg shadow-md relative">
          <div v-if="recipe.recipe_images.length > 0">
            <img 
              v-if="recipe.recipe_images[0].url" 
              :src="recipe.recipe_images[0].url" 
              alt="Featured Image" 
              class="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
          <NuxtLink :to="`/recipes/${recipe.id}`" class="text-2xl font-bold text-blue-600 hover:underline">{{ recipe.title }}</NuxtLink>
          
          <p class="mt-2">{{ recipe.description }}</p>
          <button @click="openEditForm(recipe)" class="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
         
          <div v-if="selectedRecipe === recipe" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-4 rounded-lg shadow-lg max-w-lg max-h-screen overflow-auto">
              <h2 class="text-2xl font-semibold mb-4">Edit Recipe</h2>
              <form @submit.prevent="submitEditForm" class="space-y-4">
                <!-- Title Field -->
                <div>
                  <label class="block text-lg font-semibold mb-2">Title</label>
                  <input v-model="editRecipe.title" placeholder="Title" required class="w-full p-2 border border-gray-300 rounded-md" />
                </div>

                <!-- Description Field -->
                <div>
                  <label class="block text-lg font-semibold mb-2">Description</label>
                  <textarea v-model="editRecipe.description" placeholder="Description" required class="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>

                <!-- Preparation Time Field -->
                <div>
                  <label class="block text-lg font-semibold mb-2">Preparation Time (minutes)</label>
                  <input v-model="editRecipe.preparation_time" type="number" placeholder="Preparation Time" required class="w-full p-2 border border-gray-300 rounded-md" />
                </div>

                <!-- Category Field -->
                <div>
                  <label class="block text-lg font-semibold mb-2">Category</label>
                  <select v-model="editRecipe.categoryId" class="w-full p-2 border border-gray-300 rounded-md">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_name }}</option>
                  </select>
                </div>

                <!-- Ingredients Field -->
                <div>
                  <label class="block text-lg font-semibold mb-2">Ingredients</label>
                  <div v-for="(ingredient, index) in editRecipe.ingredients" :key="index" class="flex space-x-2 mb-2">
                    <input v-model="ingredient.ingredient_name" placeholder="Ingredient Name" required class="w-full p-2 border border-gray-300 rounded-md" />
                    <input v-model="ingredient.quantity" placeholder="Quantity" required class="w-full p-2 border border-gray-300 rounded-md" />
                    <input v-model="ingredient.unit" placeholder="Unit" required class="w-full p-2 border border-gray-300 rounded-md" />
                    <button type="button" @click="removeIngredient(index)" class="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                  </div>
                  <button type="button" @click="addIngredient" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Ingredient</button>
                </div>

                <!-- Steps Field -->
                <div>
                  <label class="block text-lg font-semibold mb-2">Steps</label>
                  <div v-for="(step, index) in editRecipe.steps" :key="index" class="mb-2">
                    <textarea v-model="step.step_description" placeholder="Step Description" required class="w-full p-2 border border-gray-300 rounded-md"></textarea>
                    <button type="button" @click="removeStep(index)" class="bg-red-500 text-white px-2 py-1 rounded-md mt-2">Remove</button>
                  </div>
                  <button type="button" @click="addStep" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Step</button>
                </div>

                <!-- Images Field -->
                <div>
                  <label class="block text-lg font-semibold mb-2">Images</label>
                  <input type="file" multiple @change="onFileChange" class="w-full p-2 border border-gray-300 rounded-md" />
                  <div v-for="(image, index) in editRecipe.images" :key="index" class="mt-2 flex items-center space-x-2">
                    <img :src="image.url" alt="Recipe Image" class="w-20 h-20 object-cover rounded-md" />
                    <button v-if="!image.is_featured" @click="setFeaturedImage(index)" class="bg-blue-500 text-white px-2 py-1 rounded-md">Set as Featured</button>
                    <button @click="removeImage(index)" class="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                  </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Submit</button>
                <button type="button" @click="closeEditForm" class="bg-gray-500 text-white px-4 py-2 rounded-md w-full">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No recipes found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

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

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      category_name
    }
  }
`

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
  loading.value = true; // Set loading to true at the start
  try {
    const nuxtApp = useNuxtApp();
    const apolloClient = nuxtApp.$apollo.defaultClient;
    
    if (!user.value) {
      throw new Error('User not found'); // Ensure user exists
    }
    
    const { data } = await apolloClient.query({
      query: GET_USER_RECIPES,
      variables: { creatorId: parseInt(user.value.id, 10) }
    });
    
    if (!data.recipes || data.recipes.length === 0) {
      throw new Error('No recipes found'); // Handle no recipes found
    }

    recipes.value = data.recipes;
  } catch (err) {
    error.value = err;
    console.error('Error fetching recipes:', err.message); // Log detailed error message
  } finally {
    loading.value = false; // Set loading to false after completion
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
  if (!token.value) {
    alert('You must be logged in to edit a recipe.')
    return
  }

  // Deep clone the selected recipe
  const updatedRecipe = cloneDeep(selectedRecipe.value)

  // Set the category ID and images
  updatedRecipe.categoryId = editRecipe.value.categoryId
  updatedRecipe.images = editRecipe.value.images.map(img => ({
    url: img.url,
    is_featured: img.is_featured
  }))

  try {
    // Send a PUT request to the /api/recipes/:id endpoint with the updated recipe data
    await axios.put(`http://localhost:8081/api/recipes/${updatedRecipe.id}`, updatedRecipe, {
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















  
// }


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
</style>



<!-- <script setup>
import { ref, onMounted } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

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

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      category_name
    }
  }
`

const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const selectedRecipe = ref(null)
const editRecipe = ref({
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
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    if (!user.value) throw new Error('User not found')
    const { data } = await apolloClient.query({
      query: GET_USER_RECIPES,
      variables: { creatorId: parseInt(user.value.id, 10) }
    })
    recipes.value = data.recipes
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
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
  editRecipe.value = cloneDeep(recipe) // Deep clone the selected recipe
  editRecipe.value.categoryId = recipe.category.id
  // Map recipe_images to images
  editRecipe.value.images = recipe.recipe_images.map(img => ({
    url: img.url,
    is_featured: img.is_featured
  }))
}

const closeEditForm = () => {
  selectedRecipe.value = null
}

const submitEditForm = async () => {
  if (!token.value) {
    alert('You must be logged in to edit a recipe.')
    return
  }

  try {
    
    await axios.put(`http://localhost:8081/api/recipes/${editRecipe.value.id}`, editRecipe.value, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })
    alert('Recipe updated successfully!')
    closeEditForm()
    fetchRecipes()
  } catch (error) {
    console.error('Failed to update recipe:', error)
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


