<!-- <template>
  <div class="user-profile">
    <div class="profile-header">
      <img :src="profilePhoto" alt="Profile Photo" class="profile-photo" />
      <div class="profile-details">
        <h2 class="username">{{ userProfile.username }}</h2>
        <p class="email">{{ userProfile.email }}</p>
        <p class="creation-date">Joined: {{ formattedCreationDate }}</p>
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { gql } from '@apollo/client/core';
import apolloClient from '~/apollo/client';
import { useAuth } from '@/composables/useAuth';

// GraphQL query to fetch user profile
const GET_USER_PROFILE = gql`
  query GetUserProfile($id: Int!) {
    users_by_pk(id: $id) {
      id
      username
      email
      created_at
      profile_photo_url  // Adjust field name as needed
    }
  }
`;

// Use the composable to get the authenticated user's ID
const { user } = useAuth();
const userProfile = ref({});

Id=computed(() => parseInt(user.value?.id, 10) || 0);
id=Id.value

// Fetch user profile on component mount
onMounted(async () => {
  if (!user.value) return; // Ensure user is authenticated

  try {
    const { data } = await apolloClient.query({
      query: GET_USER_PROFILE,
      variables: { id: id=Id.value },
    });
    userProfile.value = data.users_by_pk;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
});

// Compute formatted creation date
const formattedCreationDate = computed(() => {
  if (!userProfile.value.created_at) return '';
  return new Date(userProfile.value.created_at).toLocaleDateString();
});

// Compute profile photo URL
const profilePhoto = computed(() => userProfile.value.profile_photo_url || 'default-photo-url');
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background-color: #fff;
}

.profile-header {
  display: flex;
  align-items: center;
}

.profile-photo {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.profile-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 1.25rem;
  font-weight: bold;
}

.email {
  color: #666;
}

.creation-date {
  color: #999;
}
</style> -->





<!-- <template>
  <div class="user-profile flex flex-col items-center p-6 border border-gray-200 rounded-lg bg-white">
    <div class="relative">
      <!-- Avatar Upload 
      <input type="file" @change="onFileChange" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" ref="fileInput" />
      <img :src="profilePhoto" alt="Profile Photo" class="w-32 h-32 rounded-full object-cover border-4 border-gray-300" />
      <button @click="triggerFileInput" class="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
        Change
      </button>
    </div>
    <div class="mt-4 text-center">
      <h2 class="text-2xl font-semibold">{{ userProfile.username }}</h2>
      <p class="text-gray-600">{{ userProfile.email }}</p>
      <p class="text-gray-400 mt-1">Joined: {{ formattedCreationDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { gql } from '@apollo/client/core';
import apolloClient from '~/apollo/client';
import { useAuth } from '@/composables/useAuth';
import axios from 'axios';

// GraphQL query to fetch user profile
const GET_USER_PROFILE = gql`
  query GetUserProfile($id: Int!) {
    users_by_pk(id: $id) {
      id
      username
      email
      created_at
      avatar  // Ensure this field matches your schema
    }
  }
`;

// GraphQL mutation to update user profile
const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: Int!, $avatar: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { avatar: $avatar }) {
      id
      avatar
    }
  }
`;

// Use the composable to get the authenticated user's ID
const { user } = useAuth();
const userProfile = ref({});
const fileInput = ref(null);

// Compute user ID
const Id = computed(() => {
  if (user.value && user.value.id) {
    return parseInt(user.value.id, 10);
  }
  return null;
});

// Fetch user profile on component mount
onMounted(async () => {
  if (!user.value || !Id.value) return; // Ensure user is authenticated and ID is defined

  try {
    const { data } = await apolloClient.query({
      query: GET_USER_PROFILE,
      variables: { id: Id.value },
    });
    userProfile.value = data.users_by_pk;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
});

// Compute formatted creation date
const formattedCreationDate = computed(() => {
  if (!userProfile.value.created_at) return '';
  return new Date(userProfile.value.created_at).toLocaleDateString();
});

// Compute profile photo URL
const profilePhoto = computed(() => userProfile.value.avatar || 'default-photo-url');

// File input trigger
const triggerFileInput = () => {
  fileInput.value.click();
};

// Handle file change and upload
const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await axios.post('http://localhost:8081/upload-avatar', formData);
    const newPhotoUrl = data.url;
    
    // Update the user's profile photo URL on the server
    await apolloClient.mutate({
      mutation: UPDATE_USER_PROFILE,
      variables: {
        id: Id.value,
        avatar: newPhotoUrl,
      },
    });

    // Update local state with the new photo URL
    userProfile.value.avatar = newPhotoUrl;
  } catch (error) {
    console.error('Failed to upload image:', error);
  }
};
</script>

<style scoped>
/* Scoped styles are not required if using Tailwind CSS */
</style> -->
<template></template>
