<!-- <template>
    <Navbar/>
    <div class=" mx-auto p-8 rounded-lg shadow-lg my-8 bg-gray-100 min-h-screen">
      <h2 class="text-2xl font-semibold mb-4">Bookmarked Recipes</h2>
      <div v-if="loading" class="text-center text-gray-500">Loading bookmarks...</div>
      <div v-if="error" class="text-center text-red-500">Error loading bookmarks: {{ error.message }}</div>
      <div v-if="bookmarkedRecipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="bookmark in bookmarkedRecipes" :key="bookmark.recipe.id" >
          <NuxtLink :to="`/recipes/${bookmark.recipe.id}`" class="text-xl font-bold">{{ bookmark.recipe.title }}</NuxtLink>
          <p>{{ bookmark.recipe.description }}</p>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No bookmarks yet.</div>
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
          preparation_time
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
      })
      bookmarkedRecipes.value = data.bookmarks
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }--->
  <template>
      <Navbar />
      
      <div class="p-6 bg-gray-100 min-h-screen mt-32">
       
        <div v-if="loading" class="text-center text-gray-600">Loading bookmarks...</div>
        <div v-if="error" class="text-center text-red-600">Error: {{ error.message }}</div>
        <div v-if="!loading && !error && bookmarkedRecipes.length === 0" class="text-center text-gray-600">No bookmarks yet.</div>
    
       
        <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="recipe in bookmarkedRecipes" :key="recipe.recipe.id" class="relative bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
            <BookmarkButton v-if="recipe" :recipeId="recipe.recipe.id" @update="bookmark" />
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
    import BookmarkButton from '~/components/UserInteract/BookmarkButton.vue'
    
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
    const bookmark=()=>{
     fetchBookmarkedRecipes()
      fetchBookmarkStatus()
   }

    const expose = {
    fetchBookmarkedRecipes
    }

   defineExpose(expose)
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
  
  