<template>
  <div class="mt-12">
    <h3 class="text-xl font-semibold mb-2">Add a Comment</h3>
    <form @submit.prevent="addComment">
      <div class="mb-4">
        <label for="comment" class="block text-sm font-medium text-gray-700">Your Comment</label>
        <textarea id="comment" v-model="newComment" rows="3" class="mt-1 px-2  block border w-1/2 border-gray-300 rounded-md shadow-sm"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth'

const props = defineProps({
  recipeId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['comment-added'])

const ADD_COMMENT = gql`
  mutation AddComment($recipe_id: Int!, $user_id: Int!, $comment: String!) {
    insert_comments_one(object: { recipe_id: $recipe_id, user_id: $user_id, comment: $comment }) {
      id
      user_id
      recipe_id
      comment
      created_at
      updated_at
    }
  }
`

const newComment = ref('')
const { token, user } = useAuth()
const creatorId = computed(() => parseInt(user.value.id, 10))

const addComment = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    if (!user) throw new Error('User not found')
    const { data } = await apolloClient.mutate({
      mutation: ADD_COMMENT,
      variables: { recipe_id: props.recipeId, user_id: creatorId.value, comment: newComment.value },
    })
    newComment.value = ''
    alert('succsess')
    emit('comment-added') // Emit the new comment data
  } catch (err) {
    alert('Failed to add comment')
  }
}
</script>





<!-- <template>
  <div class="mt-6">
    <h3 class="text-xl font-semibold mb-2">Add a Comment</h3>
    <form @submit.prevent="addComment">
      <div class="mb-4">
        <label for="comment" class="block text-sm font-medium text-gray-700">Your Comment</label>
        <textarea id="comment" v-model="newComment" rows="3" class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth'

const props = defineProps({
  recipeId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['comment-added'])

const ADD_COMMENT = gql`
  mutation AddComment($recipe_id: Int!, $user_id: Int!, $comment: String!) {
    insert_comments_one(object: {recipe_id: $recipe_id, user_id: $user_id, comment: $comment}) {
      id
      user_id
      recipe_id
      comment
      created_at
      updated_at
    }
  }
`

const newComment = ref('')
const { token, user } = useAuth();
const creatorId=computed(()=>parseInt(user.value.id, 10))

const addComment = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    // const user = JSON.parse(localStorage.getItem('user'))
    if (!user) throw new Error('User not found')
    const { data } = await apolloClient.mutate({
      mutation: ADD_COMMENT,
      variables: { recipe_id: props.recipeId, user_id: creatorId.value, comment: newComment.value },
    })
    newComment.value = ''
    emit('comment-added')
  } catch (err) {
    alert('Failed to add comment')
  }
}
</script> -->

<!-- <template>
  <div class="mt-6">
    <h3 class="text-xl font-semibold mb-2">Add a Comment</h3>
    <form @submit.prevent="addComment">
      <div class="mb-4">
        <label for="comment" class="block text-sm font-medium text-gray-700">Your Comment</label>
        <textarea id="comment" v-model="newComment" rows="3" class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth' 

const props = defineProps({
  recipeId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['comment-added'])

const ADD_COMMENT = gql`
  mutation AddComment($recipe_id: Int!, $user_id: Int!, $comment: String!) {
    insert_comments_one(object: {recipe_id: $recipe_id, user_id: $user_id, comment: $comment}) {
      id
      user_id
      recipe_id
      comment
      created_at
      updated_at
    }
  }
`

const newComment = ref('')
const { token, user } = useAuth();
const creatorId=computed(()=>parseInt(user.value.id, 10))



const addComment = async () => {
  try {
    const nuxtApp = useNuxtApp()
    const apolloClient = nuxtApp.$apollo.defaultClient
    // const user = JSON.parse(localStorage.getItem('user'))
    if (!user) throw new Error('User not found')
    const { data } = await apolloClient.mutate({
      mutation: ADD_COMMENT,
      variables: { recipe_id: props.recipeId, user_id: creatorId.value, comment: newComment.value }
    })
    alert("successfully")
    newComment.value = ''
    emit('comment-added')
    // Optionally trigger a refresh of the comments list
  } catch (err) {
    alert('Failed to add comment')
  }
}
</script> -->
