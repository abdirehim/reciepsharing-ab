<template>
  <Navbar/>
    <div class="mt-32">
      <div v-if="notifications.length">
        <ul>
          <li v-for="notification in notifications" :key="notification.id">
            <span>{{ notification.notification_type }} on "{{ notification.recipe.title }}"</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No new notifications.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useNotifications } from '@/composables/useNotifications '
  import {useAuth}   from '@/composables/useAuth'

  const { token, user } = useAuth();
  const userId=computed(()=>parseInt(user.value.id, 10))// Replace with the actual user ID
  const plainUserId = userId.value;
  const { notifications, fetchNotifications } = useNotifications(plainUserId);
 
  onMounted(() => {
    fetchNotifications();
  });
  </script>
  