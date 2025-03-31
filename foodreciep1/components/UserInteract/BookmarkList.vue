<!-- <template>
    <Navbar/> -->
    <!-- <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg my-8">
      <h2 class="text-2xl font-semibold mb-4">Bookmarked Recipes</h2>
      <div v-if="loading" class="text-center text-gray-500">Loading bookmarks...</div>
      <div v-if="error" class="text-center text-red-500">Error loading bookmarks: {{ error.message }}</div>
      <div v-if="bookmarkedRecipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="bookmark in bookmarkedRecipes" :key="bookmark.recipe.id" class="bg-gray-100 p-4 rounded-lg shadow-md mb-2">
          <NuxtLink :to="`/recipes/${bookmark.recipe.id}`" class="text-xl font-bold">{{ bookmark.recipe.title }}</NuxtLink>
          <p>{{ bookmark.recipe.description }}</p>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No bookmarks yet.</div>
    </div> -->


    <!-- <div class="p-6 bg-gray-100 min-h-screen">
    
    
    <div v-if="loading" class="text-center text-gray-600">Loading...</div>
    <div v-if="error" class="text-center text-red-600">Error: {{ error.message }}</div>
    <div v-if="!loading && !error && recipes.length === 0" class="text-center text-gray-600">No recipes found.</div>
    

   
    
    
    <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> -->

     

      <!-- <div v-for="recipe in recipes" :key="recipe.id" class="relative bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
        <div v-if="recipe.recipe_images.length" class="relative">
          <img :src="getFeaturedImage(recipe.recipe_images)" alt="Featured Image" class="w-full h-48 object-cover"/> -->
         <!-- // <div class="absolute top-0 right-0 p-2 bg-gray-900 bg-opacity-75 text-white text-xs font-semibold rounded-bl-lg">
         //   Featured
         // </div> -->
        <!-- </div>
        <!-- <div class="p-4">
          <NuxtLink   :to="`/recipes/${recipe.id}`" class="text-xl font-semibold mb-2 text-blue-600">{{ recipe.title }}</NuxtLink>
          <p class="text-gray-600 mb-2">Category: {{ recipe.category.category_name }}</p>
          <p class="text-gray-500 mb-4">Preparation Time: {{ recipe.preparation_time }} minutes</p> --> -->
          <!-- <button @click="openEditForm(recipe)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><IconsEdit/></button> -->
           
           
             
        <!-- </div>
      </div>
    </div>
    
    
   
 

  </div>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { gql } from '@apollo/client/core'
  import { useNuxtApp } from '#app'
  import { useAuth } from '@/composables/useAuth' 
  
  const GET_BOOKMARKED_RECIPES = gql`
    query GetBookmarkedRecipes($user_id: Int!) {
      bookmarks(where: { user_id: { _eq: $user_id } }) {
        recipe {
          id
          title
          description
        }
        
      }
    }
  `
  
  const bookmarkedRecipes = ref([])
  const loading = ref(true)
  const error = ref(null)
  const { token, user } = useAuth();
  const creatorId=computed(()=>parseInt(user.value.id, 10))
  
  const fetchBookmarkedRecipes = async () => {
    try {
      const nuxtApp = useNuxtApp()
      const apolloClient = nuxtApp.$apollo.defaultClient
      const { data } = await apolloClient.query({
        query: GET_BOOKMARKED_RECIPES,
        variables: { user_id: creatorId.value },
         fetchPolicy: 'network-only'
      })
      bookmarkedRecipes.value = data.bookmarks
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchBookmarkedRecipes()
  })

  const expose = {
    fetchBookmarkedRecipes
}

defineExpose(expose)
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  


    -->



    <template>
      <Navbar />
      
      <div class="p-6 bg-gray-100 min-h-screen">
        <!-- Loading and Error States -->
        <div v-if="loading" class="text-center text-gray-600">Loading bookmarks...</div>
        <div v-if="error" class="text-center text-red-600">Error: {{ error.message }}</div>
        <div v-if="!loading && !error && bookmarkedRecipes.length === 0" class="text-center text-gray-600">No bookmarks yet.</div>
    
        <!-- Recipe Cards -->
        <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="recipe in bookmarkedRecipes" :key="recipe.recipe.id" class="relative bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
            <div v-if="recipe.recipe.recipe_images.length" class="relative">
              <img :src="getFeaturedImage(recipe.recipe.recipe_images)" alt="Featured Image" class="w-full h-48 object-cover"/>
            </div>
            <div class="p-4">
              <NuxtLink :to="`/recipes/${recipe.recipe.id}`" class="text-xl font-semibold mb-2 text-blue-600 hover:underline">{{ recipe.recipe.title }}</NuxtLink>
              <p class="text-gray-600 mb-2">Category: {{ recipe.recipe.category.category_name }}</p>
              <p class="text-gray-500 mb-4">Preparation Time: {{ recipe.recipe.preparation_time }} minutes</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted, computed } from 'vue'
    import { gql } from '@apollo/client/core'
    import { useNuxtApp } from '#app'
    import { useAuth } from '@/composables/useAuth'
    
    const GET_BOOKMARKED_RECIPES = gql`
      query GetBookmarkedRecipes($user_id: Int!) {
        bookmarks(where: { user_id: { _eq: $user_id } }) {
          recipe {
            id
            title
            description
            category {
              category_name
            }
            preparation_time
            recipe_images {
              url
              is_featured
            }
          }
        }
      }
    `
    
    const bookmarkedRecipes = ref([])
    const loading = ref(true)
    const error = ref(null)
    const { user } = useAuth()
    const creatorId = computed(() => parseInt(user.value.id, 10))
    
    const fetchBookmarkedRecipes = async () => {
      try {
        const nuxtApp = useNuxtApp()
        const apolloClient = nuxtApp.$apollo.defaultClient
        const { data } = await apolloClient.query({
          query: GET_BOOKMARKED_RECIPES,
          variables: { user_id: creatorId.value },
          fetchPolicy: 'network-only'
        })
        bookmarkedRecipes.value = data.bookmarks
      } catch (err) {
        error.value = err
      } finally {
        loading.value = false
      }
    }
    
    const getFeaturedImage = (images) => {
      const featuredImage = images.find(image => image.is_featured)
      return featuredImage ? featuredImage.url : images[0]?.url || ''
    }
    
    onMounted(() => {
      fetchBookmarkedRecipes()
    })
    </script>
    
    <style scoped>
    button {
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    button:focus {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
    }
    </style>
    