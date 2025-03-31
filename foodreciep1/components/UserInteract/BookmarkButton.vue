<template>
    <button @click="toggleBookmark" :class="buttonClass">
      <!-- {{ isBookmarked ? 'Remove Bookmark' : 'Add Bookmark' }} -->
        <IconsBookmark1 v-if="isBookmarked"  />
        <IconsBookmark v-else/>
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect } from 'vue'
  import { gql } from '@apollo/client/core'
  import { useNuxtApp } from '#app'
  import { useAuth } from '@/composables/useAuth'


  const emit = defineEmits(['update'])
  
  const props = defineProps({
    recipeId: {
      type: Number,
      required: true,
    },
  })
  
  const ADD_BOOKMARK = gql`
    mutation AddBookmark($user_id: Int!, $recipe_id: Int!) {
      insert_bookmarks_one(object: { user_id: $user_id, recipe_id: $recipe_id }) {
        id
      }
    }
  `
  
  const REMOVE_BOOKMARK = gql`
    mutation RemoveBookmark($user_id: Int!, $recipe_id: Int!) {
      delete_bookmarks(where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }) {
        affected_rows
      }
    }
  `
  
  const IS_RECIPE_BOOKMARKED = gql`
    query IsRecipeBookmarked($user_id: Int!, $recipe_id: Int!) {
      bookmarks(where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }) {
        id
      }
    }
  `
  
  const { token, user } = useAuth();
  const creatorId=computed(()=>parseInt(user.value.id, 10))
  const isBookmarked = ref(false)
  const buttonClass = ref('bg-blue-500 text-white py-2 px-4 rounded')
  
  watchEffect(() => {
    buttonClass.value = isBookmarked.value
      // ? 'bg-red-500 text-white py-2 px-4 rounded'
      // : 'bg-blue-500 text-white py-2 px-4 rounded'
  })
  
  const fetchBookmarkStatus = async () => {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
  
    try {
      const { data } = await apolloClient.query({
        query: IS_RECIPE_BOOKMARKED,
        variables: { user_id:creatorId.value, recipe_id: props.recipeId },
        fetchPolicy: 'network-only'
      })
      isBookmarked.value = data.bookmarks.length > 0
    } catch (err) {
      console.error('Error fetching bookmark status:', err)
    }
  }
  
  const toggleBookmark = async () => {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
  
    if (isBookmarked.value) {
      await apolloClient.mutate({
        mutation: REMOVE_BOOKMARK,
        variables: { user_id: creatorId.value, recipe_id: props.recipeId },
      })
      isBookmarked.value = false
      emit('update');
    } else {
      await apolloClient.mutate({
        mutation: ADD_BOOKMARK,
        variables: { user_id: creatorId.value, recipe_id: props.recipeId },
      })
      isBookmarked.value = true;
      emit('update');
    }
  }
  
  onMounted(() => {
    fetchBookmarkStatus()
  })
   const expose = {
    fetchBookmarkStatus
}

defineExpose(expose)
 
  </script>
  
  <style scoped>
  button {
    transition: background-color 0.3s ease;
  }
  </style>
  