<!-- <template>
  <Navbar />

  <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-32">
   
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>

  
    <div v-if="recipe" class="flex flex-col md:flex-row items-start gap-6">
     
      <div class="flex-1 pr-4 mx-auto md:pr-8">
        <div class="flex flex-col space-y-4">
          <div class=" items-center space-x-4 mb-4">
           
            <h1 class="text-3xl font-bold text-blue-800 mb-2">{{ recipe.title }}</h1>
            
            
           
           
            <p class="text-gray-600 mb-4 break-words">{{ recipe.description}} </p>
              <p class="text-gray-700 mb-2">Category: {{ recipe.category?.category_name }}</p>
              <p class="text-gray-600 mb-4">Preparation Time: {{ recipe.preparation_time }} mins</p>
              <Rating v-if="recipe" :recipeId="recipe.id" class="text-yellow-400 text-2xl" />
              <like v-if="recipe" :recipeId="recipe.id" class="text-red-500 text-2xl" />
           
          </div>
        </div>
      </div>

 
      <div class="hidden md:block w-px bg-gray-800"></div>

   
      <div class="flex-1 relative">
        <div class="flex flex-wrap gap-4">
         
          <div v-for="(image, index) in recipe.recipe_images" :key="index" class="relative w-full ">
          
            <img 
              v-if="index === 0" 
              :src="image.url" 
              alt="Featured Recipe Image" 
              class="w-full h-48 object-cover rounded-md mb-4"
            />
           
            <img 
              v-else 
              :src="image.url" 
              alt="Recipe Image" 
              class="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </div>

  
    <div v-if="recipe" class="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8 px-4 rounded-lg shadow-lg mt-8">
      <div class="flex items-start space-x-4">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 20l10-5-10-5-10 5 10 5z"/>
        </svg>
        <div>
          <h2 class="text-3xl font-bold mb-4">Ingredients</h2>
          <div v-if="recipe.ingredients && recipe.ingredients.length > 0" class="space-y-2">
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="text-sm- text-black p-2   w-96 bg-gray-100 rounded-lg shadow-md overflow-wrap break-word">
              {{ ingredient.ingredient_name }} - {{ ingredient.quantity }} {{ ingredient.unit }}
            </div>
          </div>
          <p v-if="!recipe.ingredients || recipe.ingredients.length === 0" class="text-gray-300">No ingredients available.</p>
        </div>
      </div>

      
     
    </div>
   
    <div v-if="recipe">
    <div v-if="recipe.steps && recipe.steps.length > 0" class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Steps</h2>
        <ol class="list-decimal list-inside space-y-1 text-sm">
          <li v-for="(step, index) in recipe.steps" :key="index" class="p-2  w-96 bg-gray-100 text-black rounded-lg shadow-md  overflow-wrap break-word">
            {{ step.step_description }}
          </li>
        </ol>
      </div>
    </div>

   
    <div class="mt-8">
      <AddComment v-if="recipe" :recipeId="recipe.id" @comment-added="handleCommentAdded" />
      <CommentsList v-if="recipe" :recipeId="recipe.id" ref="commentList" />
    </div>
  </div>
  
  <Footer />
</template> -->

<!-- 
<template>
  <Navbar />

  <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-32">
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>

    <div v-if="recipe" class="flex flex-col md:flex-row items-start gap-6 ">
      <div class="flex-1 pr-4 mx-auto md:pr-8 break-words overflow-hidden overflow-ellipsis max-w-full">
        <div class="flex flex-col space-y-4 break-words">
          <div class="items-center space-x-4 mb-4">
            <h1 class="text-3xl font-bold text-blue-800 mb-2">{{ recipe.title }}</h1>
            <p class="text-gray-600 mb-4  ">{{ recipe.description }}</p>
            <p class="text-gray-700 mb-2">Category: {{ recipe.category?.category_name }}</p>
            <p class="text-gray-600 mb-4">Preparation Time: {{ recipe.preparation_time }} mins</p>
            <Rating v-if="recipe" :recipeId="recipe.id" class="text-yellow-400 text-2xl my-4" />
            <like v-if="recipe" :recipeId="recipe.id" class="text-red-500 text-2xl" />
          </div>
        </div>
      </div>

      <div class="hidden md:block w-px bg-gray-800"></div>

      <div class="flex-1 relative">
        <div class=" gap-4">
          <div v-for="(image, index) in recipe.recipe_images" :key="index" class="relative w-full">
            <img 
              v-if="index === 0" 
              :src="image.url" 
              alt="Featured Recipe Image" 
              class="w-full h-48 object-cover rounded-md mb-4"
            />
          
            <img 
            
              v-else 
              :src="image.url" 
              alt="Recipe Image" 
             class="w-32 h-32 object-cover rounded-md shadow-md flex-auto flex-wrap "
            />

          </div>
        </div>
      </div>
    </div>

    <div v-if="recipe" class="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8 px-4 rounded-lg shadow-lg mt-8">
      <div class="flex items-start space-x-4">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 20l10-5-10-5-10 5 10 5z"/>
        </svg>
        <div>
          <h2 class="text-3xl font-bold mb-4">Ingredients</h2>
          <div v-if="recipe.ingredients && recipe.ingredients.length > 0" class="space-y-2">
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="text-sm text-black p-2 w-full bg-gray-100 rounded-lg shadow-md overflow-wrap break-word">
              {{ ingredient.ingredient_name }} - {{ ingredient.quantity }} {{ ingredient.unit }}
            </div>
          </div>
          <p v-if="!recipe.ingredients || recipe.ingredients.length === 0" class="text-gray-300">No ingredients available.</p>
        </div>
      </div>
    </div>

    <div v-if="recipe">
      <div v-if="recipe.steps && recipe.steps.length > 0" class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Steps</h2>
        <ol class="list-decimal list-inside space-y-1 text-sm">
          <li v-for="(step, index) in recipe.steps" :key="index" class="p-2 w-10/12 bg-gray-100 text-black rounded-lg shadow-md  break-words">
            {{ step.step_description }}
          </li>
        </ol>
      </div>
    </div>

    <div class="mt-8">
      <AddComment v-if="recipe" :recipeId="recipe.id" @comment-added="handleCommentAdded" />
      <CommentsList v-if="recipe" :recipeId="recipe.id" ref="commentList" />
    </div>
  </div>

  <Footer />
</template> -->




<template>
  <Navbar />

  <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-32">
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>

    <div v-if="recipe" class="flex flex-col md:flex-row items-start gap-6">
      <div class="flex-1 pr-4 mx-auto md:pr-8 break-words overflow-hidden overflow-ellipsis max-w-full">
        <div class="flex flex-col space-y-4 break-words">
          <div class="items-center space-x-4 mb-4">
            <h1 class="text-4xl font-extrabold text-blue-800 mb-2 tracking-tight p-4 shadow-md">{{ recipe.title }}</h1>
            <p class="text-lg text-gray-600 mb-4 leading-relaxed">{{ recipe.description }}</p>
            <p class="text-gray-700 mb-2"><span class="text-blue-700">Catagory:</span> {{ recipe.category?.category_name }}</p>
            <p class="text-gray-600 mb-4"><span  class="text-blue-700">Preparation Time:</span> {{ recipe.preparation_time }} mins</p>
            <div class="items-center ">
              <Rating v-if="recipe" :recipeId="recipe.id" class="text-yellow-400 text-3xl my-4" />
              <like v-if="recipe" :recipeId="recipe.id" class="text-red-500 text-3xl my-8" />
            </div>
          </div>
        </div>
      </div>

      <div class="hidden md:block w-px bg-gray-800"></div>

      <div class="flex-1">
        <!-- Featured image -->
        <img 
          v-if="recipe.recipe_images.length > 0"
          :src="recipe.recipe_images[0].url"
          alt="Featured Recipe Image"
          class="w-full h-48 object-cover rounded-md mb-4"
        />

        <!-- Non-featured images in a row -->
        <div class="flex flex-wrap gap-4">
          <img
            v-for="(image, index) in recipe.recipe_images.slice(1)"
            :key="index"
            :src="image.url"
            alt="Recipe Image"
            class="w-32 h-32 object-cover rounded-md shadow-md"
          />
        </div>
      </div>
    </div>

    <div v-if="recipe" class="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8 px-4 rounded-lg shadow-lg mt-8">
      <div class="flex items-start ">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 20l10-5-10-5-10 5 10 5z"/>
        </svg>
        <div>
          <h2 class="text-3xl font-bold mb-4">Ingredients</h2>
          <div v-if="recipe.ingredients && recipe.ingredients.length > 0" class="space-y-2">
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="text-sm text-black p-2 w-full bg-gray-100 rounded-lg shadow-md overflow-wrap break-word">
              {{ ingredient.ingredient_name }} - {{ ingredient.quantity }} {{ ingredient.unit }}
            </div>
          </div>
          <p v-if="!recipe.ingredients || recipe.ingredients.length === 0" class="text-gray-300">No ingredients available.</p>
        </div>
      </div>

      <div v-if="recipe">
      <div v-if="recipe.steps && recipe.steps.length > 0" class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Steps</h2>
        <ol class="list-decimal list-inside  text-sm">
          <li v-for="(step, index) in recipe.steps" :key="index" class="p-2 my-4 w-10/12 bg-gray-100 text-black rounded-lg shadow-md break-words">
            {{ step.step_description }}
          </li>
        </ol>
      </div>
    </div>


    </div>

    

    <div class="mt-8">
      <AddComment v-if="recipe" :recipeId="recipe.id" @comment-added="handleCommentAdded" />
      <CommentsList v-if="recipe" :recipeId="recipe.id" ref="commentList" />
    </div>
  </div>

  <Footer />
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp, useRoute } from '#app'
import AddComment from '~/components/UserInteract/AddComment.vue'
import CommentsList from '~/components/UserInteract/CommentsList.vue'
import like from './UserInteract/like.vue'
import Rating from './UserInteract/rating.vue'





const GET_RECIPE = gql`
query GetRecipe($id: Int!) {
  recipes_by_pk(id: $id) {
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
      step_number
      step_description
    }
    recipe_images {
      url
    }
  }
}
`

const recipe = ref(null)
const loading = ref(true)
const error = ref(null)
const route = useRoute()

const commentList = ref(null) 
// Create a ref for the CommentList component

const fetchRecipe = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    const { data } = await apolloClient.query({
      query: GET_RECIPE,
      variables: { id: parseInt(route.params.id) },
    })
    recipe.value = data.recipes_by_pk
   
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}


const handleCommentAdded = () => {
  console.log('handleCommentAdded called') // Ensure this is logged
  if (commentList.value && typeof commentList.value.fetchComments === 'function') {
    commentList.value.fetchComments() // Call fetchComments on the CommentList component
  } else {
    console.error('fetchComments method not found')
  }
}

onMounted(() => {
  fetchRecipe()

})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>

<!-- <template>
  <div>
    <h1 class="text-3xl font-bold mb-4">{{ recipe.title }}</h1>
    <p class="text-lg mb-4">{{ recipe.description }}</p> -->
    <!-- Other recipe details -->

    <!-- Add Comment Section -->
    <!-- <AddComment v-if="recipe" :recipeId="recipe.id" @comment-added="handleCommentAdded" /> -->

    <!-- Comments List Section -->
    <!-- <CommentsList v-if="recipe" :recipeId="recipe.id" ref="commentList" />
    
    <Footer />
  </div>
</template> -->



<!-- <template>
  <Navbar />

  <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-32">
   
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>

  
    <div v-if="recipe" class="flex flex-col md:flex-row items-start gap-6">
     
      <div class="flex-1 pr-4 mx-auto md:pr-8">
        <div class="flex flex-col space-y-4">
          <div class=" items-center space-x-4 mb-4">
           
            <h1 class="text-3xl font-bold text-blue-800 mb-2">{{ recipe.title }}</h1>
            
            
           
           
            <p class="text-gray-600 mb-4">{{ recipe.description}} </p>
              <p class="text-gray-700 mb-2">Category: {{ recipe.category?.category_name }}</p>
              <p class="text-gray-600 mb-4">Preparation Time: {{ recipe.preparation_time }} mins</p>
              <!-- <Rating v-if="recipe" :recipeId="recipe.id" class="text-yellow-400 text-2xl" />
              <like v-if="recipe" :recipeId="recipe.id" class="text-red-500 text-2xl" />
            -->
          <!-- </div>
        </div>
      </div>

 
      <div class="hidden md:block w-px bg-gray-800"></div>

   
      <div class="flex-1 relative">
        <div class="flex flex-wrap gap-4">
         
          <div v-for="(image, index) in recipe.recipe_images" :key="index" class="relative w-full ">
          
            <img 
              v-if="index === 0" 
              :src="image.url" 
              alt="Featured Recipe Image" 
              class="w-full h-48 object-cover rounded-md mb-4"
            />
           
            <img 
              v-else 
              :src="image.url" 
              alt="Recipe Image" 
              class="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </div>

  
    <div v-if="recipe" class="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8 px-4 rounded-lg shadow-lg mt-8">
      <div class="flex items-start space-x-4">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 20l10-5-10-5-10 5 10 5z"/>
        </svg>
        <div>
          <h2 class="text-3xl font-bold mb-4">Ingredients</h2>
          <div v-if="recipe.ingredients && recipe.ingredients.length > 0" class="space-y-2">
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="text-sm- text-black p-2   w-96 bg-gray-100 rounded-lg shadow-md">
              {{ ingredient.ingredient_name }} - {{ ingredient.quantity }} {{ ingredient.unit }}
            </div>
          </div>
          <p v-if="!recipe.ingredients || recipe.ingredients.length === 0" class="text-gray-300">No ingredients available.</p>
        </div>
      </div>

      
     
    </div>
   
    <div v-if="recipe">
    <div v-if="recipe.steps && recipe.steps.length > 0" class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Steps</h2>
        <ol class="list-decimal list-inside space-y-1 text-sm">
          <li v-for="(step, index) in recipe.steps" :key="index" class="p-2  w-96 bg-gray-100 text-black rounded-lg shadow-md">
            {{ step.step_description }}
          </li>
        </ol>
      </div>
    </div> -->

   

    <!-- Recipe Details -->
    <!-- <AddComment v-if="recipe" :recipeId="recipe.id" @comment-added="handleCommentAdded" />
    <div v-if="commentsList.length > 0">
      <div v-for="comment in commentsList" :key="comment.id" class="bg-gray-100 p-4 rounded-lg shadow-md mb-2">
        <p>{{ comment.comment }}</p>
        <p class="text-sm text-gray-500">{{ comment.created_at }}</p>
      </div>
    </div>
    <!-- <div v-else class="text-center text-gray-500">No comments yet.</div> -->
  <!-- </div>
    <Footer />
 
</template>




<script setup>
import { ref, onMounted, watch } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp, useRoute } from '#app'
import AddComment from '~/components/UserInteract/AddComment.vue'
import Footer from '~/components/Footer.vue'

const GET_RECIPE = gql`
query GetRecipe($id: Int!) {
  recipes_by_pk(id: $id) {
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
      step_number
      step_description
    }
    recipe_images {
      url
    }
  }
}
`

const GET_COMMENTS = gql`
  query GetComments($recipe_id: Int!) {
    comments(where: { recipe_id: { _eq: $recipe_id } }, order_by: { created_at: desc }) {
      id
      user_id
      comment
      created_at
      updated_at
    }
  }
`

const recipe = ref(null)
const comments = ref([])
const loading = ref(true)
const error = ref(null)
const route = useRoute()

const fetchRecipe = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    const { data } = await apolloClient.query({
      query: GET_RECIPE,
      variables: { id: parseInt(route.params.id) },
    })
    recipe.value = data.recipes_by_pk
    await fetchComments()
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const fetchComments = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    const { data } = await apolloClient.query({
      query: GET_COMMENTS,
      variables: { recipe_id: recipe.value.id },
    })
   console.log('fetchComments:', data.comments) // Add this line
    comments.value = data.comments
    
    console.log('comments:', comments.value) // Add this line
  } catch (err) {
    error.value = err
  }
}


  //  const commentsList = computed(() => {
  //     return comments.value.map((comment) => {
  //       // Process the comment here
  //       return comment
  //     })
  //   })

const handleCommentAdded = async () => {
 console.log('handleCommentAdded called')
  await fetchComments()
}
watch(comments, (newComments) => {
  console.log('comments updated:', newComments)
})
onMounted(() => {
  fetchRecipe()
})


  
</script> -->
 --> -->
