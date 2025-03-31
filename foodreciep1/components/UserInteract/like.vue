<!-- <template>
  <button @click="toggleLike" :class="buttonClass">
    <!-- {{ isLiked ? 'Unlike' : 'Like' }} 
      <IconsLike1 v-if="isLiked"/>
      <IconsLike v-else/>
      
  </button>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '@/composables/useAuth' 

const props = defineProps({
  recipeId: {
    type: Number,
    required: true,
  },
})

const ADD_LIKE = gql`
  mutation AddLike($user_id: Int!, $recipe_id: Int!) {
    insert_likes_one(object: { user_id: $user_id, recipe_id: $recipe_id }) {
      id
    }
  }
`

const REMOVE_LIKE = gql`
  mutation RemoveLike($user_id: Int!, $recipe_id: Int!) {
    delete_likes(where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }) {
      affected_rows
    }
  }
`

const IS_RECIPE_LIKED = gql`
  query IsRecipeLiked($user_id: Int!, $recipe_id: Int!) {
    likes(where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }) {
      id
    }
  }
`

const { token, user } = useAuth();
const creatorId=computed(()=>parseInt(user.value.id, 10))

const isLiked = ref(false)
const buttonClass = ref('bg-blue-500 text-white py-2 px-2 rounded')

watchEffect(() => {
  buttonClass.value = isLiked.value
    // ? 'bg-red-500 text-white py-2 px-2 rounded'
    // : 'bg-blue-500 text-white py-2 px-2 rounded'
})

const fetchLikeStatus = async () => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  try {
    const { data } = await apolloClient.query({
      query: IS_RECIPE_LIKED,
      variables: { user_id: creatorId.value, recipe_id: props.recipeId },
    })
    isLiked.value = data.likes.length > 0
  } catch (err) {
    console.error('Error fetching like status:', err)
  }
}

const toggleLike = async () => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  if (isLiked.value) {
    await apolloClient.mutate({
      mutation: REMOVE_LIKE,
      variables: { user_id: creatorId.value, recipe_id: props.recipeId },
    })
    isLiked.value = false
  } else {
    await apolloClient.mutate({
      mutation: ADD_LIKE,
      variables: { user_id:creatorId.value, recipe_id: props.recipeId },
    })
    isLiked.value = true
  }
}

onMounted(() => {
  fetchLikeStatus()
})
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
</style> -->

<template>
  <div>
    <button @click="toggleLike" :class="buttonClass">
      <IconsLike1 v-if="isLiked"/>
      <IconsLike v-else/>
    </button>
    <span class="ml-2 text-gray-600">{{ likeCount }} Likes</span>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
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

const ADD_LIKE = gql`
  mutation AddLike($user_id: Int!, $recipe_id: Int!) {
    insert_likes_one(object: { user_id: $user_id, recipe_id: $recipe_id }) {
      id
    }
  }
`

const REMOVE_LIKE = gql`
  mutation RemoveLike($user_id: Int!, $recipe_id: Int!) {
    delete_likes(where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }) {
      affected_rows
    }
  }
`

const IS_RECIPE_LIKED = gql`
  query IsRecipeLiked($user_id: Int!, $recipe_id: Int!) {
    likes(where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }) {
      id
    }
  }
`

const GET_LIKE_COUNT = gql`
  query GetLikeCount($recipe_id: Int!) {
    likes_aggregate(where: { recipe_id: { _eq: $recipe_id } }) {
      aggregate {
        count
      }
    }
  }
`

const { user } = useAuth()
const creatorId = computed(() => parseInt(user.value.id, 10))

const isLiked = ref(false)
const likeCount = ref(0)
const buttonClass = ref('bg-blue-500 text-white py-2 px-2 rounded')

watchEffect(() => {
  buttonClass.value = isLiked.value
    // ? 'bg-red-500 text-white py-2 px-2 rounded'
    // : 'bg-blue-500 text-white py-2 px-2 rounded'
})

const fetchLikeStatus = async () => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  try {
    const { data } = await apolloClient.query({
      query: IS_RECIPE_LIKED,
      variables: { user_id: creatorId.value, recipe_id: props.recipeId },
      fetchPolicy: 'network-only'
    })
    isLiked.value = data.likes.length > 0
  } catch (err) {
    console.error('Error fetching like status:', err)
  }
}

const fetchLikeCount = async () => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  try {
    const { data } = await apolloClient.query({
      query: GET_LIKE_COUNT,
      variables: { recipe_id: props.recipeId },
      fetchPolicy: 'network-only'
    })
    likeCount.value = data.likes_aggregate.aggregate.count
  } catch (err) {
    console.error('Error fetching like count:', err)
  }
}

const toggleLike = async () => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  if (isLiked.value) {
    await apolloClient.mutate({
      mutation: REMOVE_LIKE,
      variables: { user_id: creatorId.value, recipe_id: props.recipeId },
    })
    isLiked.value = false
    likeCount.value -= 1
    emit('updaate')
  } else {
    await apolloClient.mutate({
      mutation: ADD_LIKE,
      variables: { user_id: creatorId.value, recipe_id: props.recipeId },
    })
    isLiked.value = true
    likeCount.value += 1
    emit('update')
  }
}

onMounted(() => {
  fetchLikeStatus()
  fetchLikeCount()
})

const expose = {
  fetchLikeStatus,
  fetchLikeCount
}

defineExpose(expose)
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
</style>
