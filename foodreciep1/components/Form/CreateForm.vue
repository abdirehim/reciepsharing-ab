<!-- <template>
    <div class="flex  justify-center items-center  bg-green-800 m-4 text-white">
    <form class="" @submit.prevent="submitForm" >
      <div class="m-4" >
        <label>Title</label>
        <input class="text-black ml-16" v-model="recipe.title" placeholder="Title" required   >
      </div>
      <div class="m-4">
        <label>Description</label>
        <textarea class="ml-8 mt-4 text-black" v-model="recipe.description" placeholder="Description" required></textarea>
      </div>
      <div class="m-4">
        <label>Preparation Time (minutes)</label>
        <input class="text-black ml-8" type="number" v-model="recipe.preparationTime" placeholder="Preparation Time" required />
      </div>
      <div class="m-4">
        <label>Category</label>
        <select class="text-black ml-8" v-model="recipe.categoryId">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="m-4">
        <label>Ingredients</label>
        <div class="text-black m-4"  v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <input v-model="ingredient.name" placeholder="Ingredient Name" required />
          <input v-model="ingredient.quantity" placeholder="Quantity" required />
          <input v-model="ingredient.unit" placeholder="Unit" required />
          <button type="button" @click="removeIngredient(index)">Remove</button>
        </div>
        <button class="m-4" type="button" @click="addIngredient">Add Ingredient</button>
      </div>
      <div class="m-4">
        <label>Steps</label>
        <div class="text-black m-4" v-for="(step, index) in recipe.steps" :key="index">
          <textarea v-model="step.description" placeholder="Step Description" required></textarea>
          <button type="button" @click="removeStep(index)">Remove</button>
        </div>
        <button class="m-4" type="button" @click="addStep">Add Step</button>
      </div>
      <div class="m-4">
        <label>Images</label>
        <input type="file" multiple @change="onFileChange" />
        <div v-for="(image, index) in recipe.images" :key="index">
          <img :src="image.url" alt="Recipe Image" />
          <button type="button" @click="removeImage(index)">Remove</button>
        </div>
      </div >
      <button class="ml-32 mt-4" type="submit">Submit</button>
    </form>
</div>

<div></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useFetch } from '@nuxt/http'
  
  const recipe = ref({
    title: '',
    description: '',
    preparationTime: 0,
    categoryId: null,
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
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
  
      const { data } = await useFetch('/upload', {
        method: 'POST',
        body: formData
      })
  
      recipe.value.images.push({ url: data.value.url })
    }
  }
  
  const removeImage = (index) => {
    recipe.value.images.splice(index, 1)
  }
  
  const submitForm = async () => {
    // Handle form submission
    // Add logic to send form data to the backend
    await useFetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe.value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
  onMounted(async () => {
    // Fetch categories from the backend
    const { data } = await useFetch('/api/categories')
    categories.value = data.value
  })
  </script>
   -->