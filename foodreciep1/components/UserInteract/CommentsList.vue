<!-- <template>
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">Comments</h2>
    <div v-if="loading" class="text-center text-gray-500">Loading comments...</div>
    <div v-if="error" class="text-center text-red-500">Error loading comments: {{ error.message }}</div>
    <div v-if="comments.length" class="mb-4">
      <div v-for="comment in comments" :key="comment.id" class="bg-gray-100 p-4 rounded-lg shadow-md mb-2">
        <p>{{ comment.comment }}</p>
        <p class="text-sm text-gray-500">{{ comment.created_at }}</p>
      
      </div>
    </div>
    <div v-else class="text-center text-gray-500">No comments yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'

const props = defineProps({
  recipeId: {
    type: Number,
    required: true
  }
})

const GET_COMMENTS = gql`
  query GetComments($recipe_id: Int!) {
    comments(where: { recipe_id: { _eq: $recipe_id } }) {
      id
      user_id
      recipe_id
      comment
      created_at
      updated_at
    }
  }
`

const comments = ref([])
const loading = ref(true)
const error = ref(null)

const fetchComments = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    const { data } = await apolloClient.query({
      query: GET_COMMENTS,
      variables: { recipe_id: props.recipeId },
    })
    comments.value = data.comments
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

watch(() => props.recipeId, fetchComments, { immediate: true })
</script> -->

<template>
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">Comments</h2>
    <div v-if="loading" class="text-center text-gray-500">Loading comments...</div>
    <div v-if="error" class="text-center text-red-500">Error loading comments: {{ error.message }}</div>
    <div v-if="comments.length" class="mb-4">
      <div v-for="comment in comments" :key="comment.id" class="bg-gray-100 p-2 rounded-lg shadow-md mb-4 w-1/2  ">
        
        <p> {{ comment.comment }}</p>
        <p class="text-sm text-gray-500">{{ comment.created_at }}</p>
        <div class="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold  ">
              <span v-if="comment.user.photoUrl">{{comment.user.photoUrl[0] }}</span>
              <span v-else>{{ comment.user.username.slice(0, 2).toUpperCase() }}</span>
            </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">No comments yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineExpose } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'

const props = defineProps({
  recipeId: {
    type: Number,
    required: true
  }
})

const comments = ref([])
const loading = ref(true)
const error = ref(null)

const GET_COMMENTS = gql`
  query GetComments($recipe_id: Int!) {
    comments(where: { recipe_id: { _eq: $recipe_id } }, order_by: { created_at: desc }) {
      id
      user_id
      comment
      created_at
      updated_at
      user{
        username
      }
    }
  }
`

const fetchComments = async () => {
  try {

    // if (!recipe.value || !recipe.value.id) {
    //   throw new Error('Recipe ID is not available');
    // }
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    const { data } = await apolloClient.query({
      query: GET_COMMENTS,
      variables: { recipe_id: props.recipeId },
      fetchPolicy: 'network-only'
    })
    comments.value = data.comments
   
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

// Watch for recipeId prop changes and fetch comments
watch(() => props.recipeId, fetchComments, { immediate: true })

// Expose fetchComments method to the parent
const expose = {
  fetchComments
}

defineExpose(expose)
</script>
