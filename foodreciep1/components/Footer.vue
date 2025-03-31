<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="@/assets/l8.png" alt="Logo" class="w-32 h-auto"/>
      </div>

      <!-- Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Us -->
        <div>
          <h3 class="text-lg font-semibold mb-4">About Us</h3>
          <p class="mb-4">
            We are dedicated to bringing you the best recipes and cooking tips. Discover delicious dishes and find inspiration for your next meal.
          </p>
          <a href="/about" class="text-blue-400 hover:underline">Learn More</a>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li class="mb-2">
              <a href="/" class="flex items-center text-gray-300 hover:text-white">
                <i class="fas fa-home mr-2"></i> Home
              </a>
            </li>
            <li class="mb-2">
              <a href="/recipes" class="flex items-center text-gray-300 hover:text-white">
                <i class="fas fa-utensils mr-2"></i> Recipes
              </a>
            </li>
            <li class="mb-2">
              <a href="/contact" class="flex items-center text-gray-300 hover:text-white">
                <i class="fas fa-envelope mr-2"></i> Contact Us
              </a>
            </li>
          </ul>
        </div>

        <!-- Follow Us -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="https://facebook.com" class="text-gray-300 hover:text-blue-600">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" class="text-gray-300 hover:text--blue-600">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" class="text-gray-300 hover:text-blue-600">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" class="text-gray-300 hover:text-blue-600">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div  class=" mt-8 flex items-center justify-center ">
      <p class=" ">@copright developed by abdrehim /2024</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
/* Ensure FontAwesome icons are included */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
