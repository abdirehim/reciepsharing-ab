<template>
  <nav class="bg-gray-800 p-2  fixed top-0 left-0 z-50 w-full" v-if="!loading">
    <div class="container mx-auto flex items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center flex-grow rounded-full" >
        <img src="@/assets/l8.png" alt="Logo" class="h-14 w-40 font-bold text-red-600 "  />
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white lg:hidden flex items-center ml-auto">
        <i class="fa fa-bars"></i>
        <span class="sr-only">Open menu</span>
      </button>

      <!-- Desktop Navigation Links -->
      <div class="hidden lg:flex lg:items-center lg:space-x-8 ml-auto ">
        <NuxtLink to="/" v-if="isLoggedIn" class="text-white">Home</NuxtLink>
        <NuxtLink to="/Bookmarklist" v-if="isLoggedIn" class="text-white">Bookmark</NuxtLink>

        <!-- Notification Icon -->
        <div v-if="isLoggedIn" class="relative">
          <NuxtLink to="/notification"  class="text-white focus:outline-none">
            <i class="fa fa-bell"></i>
            <span v-if="unreadCount > 0" class="absolute top-[-2] right-[-1] bg-red-600 text-red rounded-full px-1 text-xs">
          {{ unreadCount }}
            </span>
          </NuxtLink>
        </div>

        <!-- Account Dropdown -->
        <div v-if="isLoggedIn" class="relative">
          <button @click="accountDropdownOpen = !accountDropdownOpen" class="flex items-center space-x-2 text-white">
            <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
              <span v-if="user.photoUrl">{{ user.photoUrl[0] }}</span>
              <span v-else>{{ user.username.slice(0, 2).toUpperCase() }}</span>
            </div>
          </button>
          <!-- Desktop Dropdown Menu -->
          <div v-if="accountDropdownOpen" class="absolute mt-2 right-0 bg-white rounded-md shadow-lg z-10">
            <div class="p-2">
              <NuxtLink to="/recipeslist" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">PostRecipe</NuxtLink>
              <NuxtLink to="/Profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</NuxtLink>
              <button class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" @click.prevent="logout">Logout</button>
            </div>
          </div>
        </div>

        <!-- If not logged in -->
        <div v-else class="flex space-x-4  ">
          <NuxtLink to="/" class="text-white">Home</NuxtLink>
          <NuxtLink to="/login" class="text-white">Login</NuxtLink>
          <NuxtLink to="/register" class="text-white  px-4 py-2 bg-purple-700 rounded-lg">Signup</NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu Dropdown -->
    <div v-if="mobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-blue-800 rounded-md shadow-lg z-10">
      <div class="p-4">
        <NuxtLink to="/" v-if="isLoggedIn" class="block text-white py-2">Home</NuxtLink>
        <NuxtLink to="/Bookmarklist" v-if="isLoggedIn" class="block text-white py-2">Bookmark</NuxtLink>
        <NuxtLink to="/login" v-if="!isLoggedIn" class="block text-white py-2">Login</NuxtLink>
        <NuxtLink to="/register" v-if="!isLoggedIn" class="block text-white py-2">Register</NuxtLink>
        
        <div v-if="isLoggedIn">
          <button class="block text-white py-2" @click="accountDropdownOpen = !accountDropdownOpen">
            <div class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold">
              <span v-if="user.photoUrl">{{ user.photoUrl[0] }}</span>
              <span v-else>{{ user.username.slice(0, 2).toUpperCase() }}</span>
            </div>
          </button>
          
          <!-- Mobile Dropdown Menu -->
          <div v-if="accountDropdownOpen" class="bg-white rounded-md shadow-lg mt-2">
            <div class="p-2">
              <NuxtLink to="/recipeslist" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">PostRecipe</NuxtLink>
              <NuxtLink to="/Profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</NuxtLink>
              <button class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" @click.prevent="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div v-else class="flex ml-autoh-20 bg-blue-800">
    <div class="text-white  text-lg">Loading...</div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useUnreadNotificationCount } from '~/composables/useUnreadNotificationCount';

const { user, isLoggedIn, logout, loading:authLoading } = useAuth()

const accountDropdownOpen = ref(false)
const mobileMenuOpen = ref(false)  // Manage mobile menu visibility
const loading = ref(true)
  
const userId = computed(() => parseInt(user.value?.id, 10) || 0);
const plainUserId = userId.value;

const { unreadCount, fetchUnreadCount } = useUnreadNotificationCount(plainUserId);

let intervalId;

const startPolling = () => {
  intervalId = setInterval(fetchUnreadCount, 30000000); // Poll every 30 seconds
};



onMounted(() => {
  // Simulate a delay for the loading effect
  setTimeout(() => {
    loading.value = authLoading.value
  }, 5)  // Adjust this delay as needed

  fetchUnreadCount();
  startPolling();
})



onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>




















