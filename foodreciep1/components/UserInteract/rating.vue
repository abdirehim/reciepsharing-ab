<template>
  <div class="rating-stars">
    <span v-for="star in 5" :key="star" @click="rate(star)" :class="['star', { filled: star <= currentRating }]">
      ★
    </span>
    <p class="text-sm text-gray-600 ml-2">{{ formattedAverageRating }} ({{ ratingCount }} ratings)</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'
import { useAuth } from '~/composables/useAuth'

const emit = defineEmits(['update'])

const props = defineProps({
  recipeId: {
    type: Number,
    required: true,
  },
})

const ADD_OR_UPDATE_RATING = gql`
  mutation AddOrUpdateRating($user_id: Int!, $recipe_id: Int!, $rating: Int!) {
    insert_ratings_one(
      object: { user_id: $user_id, recipe_id: $recipe_id, rating: $rating },
      on_conflict: { constraint: ratings_user_id_recipe_id_key, update_columns: [rating] }
    ) {
      id
    }
  }
`

const GET_RECIPE_RATING = gql`
  query GetRecipeRating($recipe_id: Int!) {
    ratings_aggregate(where: { recipe_id: { _eq: $recipe_id } }) {
      aggregate {
        avg {
          rating
        }
        count
      }
    }
  }
`

const GET_USER_RATING = gql`
  query GetUserRating($user_id: Int!, $recipe_id: Int!) {
    ratings(where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }) {
      rating
    }
  }
`

const { token, user } = useAuth();
const creatorId=computed(()=>parseInt(user.value.id, 10))
const currentRating = ref(0)
const averageRating = ref(0)
const ratingCount = ref(0)

const formattedAverageRating = computed(() => {
  return averageRating.value.toFixed(1);
});

const fetchRatings = async () => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  try {
    const { data: recipeData } = await apolloClient.query({
      query: GET_RECIPE_RATING,
      variables: { recipe_id: props.recipeId },
      fetchPolicy: 'network-only'
    })
    averageRating.value = recipeData.ratings_aggregate.aggregate.avg.rating
    ratingCount.value = recipeData.ratings_aggregate.aggregate.count

    const { data: userData } = await apolloClient.query({
      query: GET_USER_RATING,
      variables: { user_id: creatorId.value, recipe_id: props.recipeId },
      fetchPolicy: 'network-only'
    })
    currentRating.value = userData.ratings.length ? userData.ratings[0].rating : 0
  } catch (err) {
    console.error('Error fetching ratings:', err)
  }
}

const rate = async (rating) => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  try {
    await apolloClient.mutate({
      mutation: ADD_OR_UPDATE_RATING,
      variables: { user_id: creatorId.value, recipe_id: props.recipeId, rating },
    })
    currentRating.value = rating
    fetchRatings() // Refresh the ratings after update
    emit('update')
  } catch (err) {
    console.error('Error rating recipe:', err)
  }
}

onMounted(() => {
  fetchRatings()
})
const expose = {
  fetchRatings
}

defineExpose(expose)
</script>

<style scoped>
.rating-stars {
  display: flex;
  align-items: center;
}

.star {
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s;
}

.star.filled {
  color: gold;
}

.star:not(.filled) {
  color: lightgray;
}
</style>
