<!-- <template>
    <CreateForm :recipe="recipe" @submit="updateRecipe" />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
//   import { useFetch } from '@nuxt/http'
//   import RecipeForm from '~/components/RecipeForm.vue'
  
  const recipe = ref({
    title: '',
    description: '',
    preparationTime: 0,
    categoryId: null,
    ingredients: [],
    steps: [],
    images: []
  })
  
  onMounted(async () => {
    const recipeId = useRoute().params.id
    const { data } = await useFetch(`/api/recipes/${recipeId}`)
    recipe.value = data.value
  })
  
  const updateRecipe = async (updatedRecipe) => {
    const recipeId = useRoute().params.id
    const { data, error } = await useFetch(`/api/recipes/${recipeId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRecipe),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    if (!error.value) {
      useRouter().push(`/recipes/${recipeId}`)
    } else {
      console.error('Failed to update recipe')
    }
  }
  </script> -->

  <template>
    <div class="modal">
      <h2>Edit Recipe</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Recipe Name:</label>
          <input v-model="editRecipe.name" id="name" required />
        </div>
  
        <!-- Ingredients, Steps, and Images Sections -->
        <!-- Similar to what you had before, just use editRecipe as the data model -->
  
        <button type="submit">Save</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editRecipe: { ...this.recipe }, // Create a copy of the recipe to edit
      };
    },
    methods: {
      submitForm() {
        this.$emit('update', this.editRecipe); // Emit updated recipe
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    /* Add your modal styles here */
  }
  </style>
  
  