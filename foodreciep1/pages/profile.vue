<template>
  <div class=" bg-gray-100 flex items-center justify-center">
    <UserProfile :user="user" />
  </div>
</template>

<script setup>
// import UserProfile from '~/components/UserProfile.vue';

const user = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
  bio: 'Web developer and tech enthusiast.',
  email: 'john.doe@example.com',
  joinedDate: 'January 1, 2020',
};
</script>

<style scoped>
/* Additional styles if necessary */
</style>





<!-- <template>
    <div>
      <h1>Profile</h1>
      <div v-if="user">
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <div v-else>
        <p>You are not logged in.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '~/stores/auth'
  
  const authStore = useAuthStore()
  
  const user = computed(() => authStore.getUser())
  </script>
   -->