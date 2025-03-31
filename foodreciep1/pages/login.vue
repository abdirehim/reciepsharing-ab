 <!-- <template>
  <Navbar />
  <div class="h-screen w-full bg-cover bg-center"  :class="{ 'bg-image': true }">
    <div class="  m-auto p-10 pt-2   bg-blue-700 rounded-lg absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 shadow-md max-w-md md:max-w-2xl lg:max-w-sm ">
      <h1 class="text-2xl mb-8 text-blue-100 ml-20 ">Login</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="username" class="block text-white">Username:</label>
          <input v-model="username" type="text" id="username" class="mt-1  pl-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
        </div>
       
        <div class="mb-4">
          <label for="password" class="block text-white">Password:</label>
          <input v-model="password" type="password" id="password" class="mt-1  pl-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"  required/>
        </div>
        <div class="text-center">
          <button type="submit" class="text-white bg-blue-500 px-4 py-1 my-4 rounded-md hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out">Login</button>
        </div>
        <div class="mt-4">
        <label class="block text-white">Don't have an account? <NuxtLink to="/Register" class="text-red-400 hover:text-blue-300">Sign up</NuxtLink></label>
      </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const username = ref('')
const password = ref('')
const { login } = useAuth()
const router = useRouter()

const submitForm = async () => {
  try {
    await login(username.value, password.value)
   
  } catch (error) {
    console.error(error)
    alert('Login failed.')
  }
}
</script>

<style scoped>

  .bg-image {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('@/assets/a3.jpg');
  background-size: cover;
  background-position: center;
  }
</style> -->
 







<!-- 


 <template>
  <Navbar />
  <div class="h-screen w-full bg-cover bg-center" :class="{ 'bg-image': true }">
    <div class="m-auto mt-8 p-10 pt-2 bg-blue-700 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md max-w-md md:max-w-2xl lg:max-w-sm">
      <h1 class="text-2xl mb-8 text-blue-100 ml-20">Login</h1>
      <form @submit="handleSubmit(submitForm)" :validation-schema="loginSchema">
        <div class="mb-4">
          <label for="username" class="block text-white">Username:</label>
          <Field v-model="username" name="username" type="text" id="username" class="mt-1 pl-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
          <ErrorMessage name="username" class="text-red-500" />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-white">Password:</label>
          <Field v-model="password" name="password" type="password" id="password" class="mt-1 pl-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
          <ErrorMessage name="password" class="text-red-500" />
        </div>
        <div class="text-center">
          <button type="submit" class="text-white bg-blue-500 px-4 py-1 my-4 rounded-md hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out">Login</button>
        </div>
        <div class="mt-4">
          <label class="block text-white">Don't have an account? <NuxtLink to="/Register" class="text-red-400 hover:text-blue-300">Sign up</NuxtLink></label>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { loginSchema } from '~/components/validationSchema';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from '#app';

// Use VeeValidate with Yup schema
const { handleSubmit, resetForm,errors } = useForm({
  validationSchema: loginSchema,
});

const username = ref('')
const password = ref('')
const { login } = useAuth()
const router = useRouter()

const submitForm = async () => {
  try {
    await login(username.value, password.value);
    console.log('Attempting to login with:', values.username, values.password);
    console.log('Login successful');
    router.push('/home'); // Redirect on success
  } catch (error) {
    console.error(error)
    alert('Login failed.')
  
  }
};
</script>

<style scoped>
.bg-image {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('@/assets/a7.jpg');
  background-size: cover;
  background-position: center;
}
</style> -->






<template>
  <Navbar />
  <div class="h-screen w-full bg-cover bg-center" :class="{ 'bg-image': true }">
    <div class="m-auto p-10 pt-2 bg-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md max-w-md md:max-w-2xl lg:max-w-sm">
      <h1 class="text-2xl mb-8 text-blue-800 ml-20">Login</h1>
      <form @submit="submitForm">
        <div class="mb-4">
          <label for="username" class="block text-black">Username:</label>
          <Field name="username" v-model="username" type="text" id="username" class="mt-1 pl-4 border border-gray-300 bg-gray-100 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
          <ErrorMessage name="username" class="text-red-500" />
        </div>
        <div class="mb-4 relative">
          <label for="password" class="block text-black">Password:</label>
          <Field 
            name="password" 
            v-model="password" 
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password" 
            class="pl-4 border border-gray-300 bg-gray-100 rounded-md w-full pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute  top-7 px-2 right-0 flex items-center  cursor-pointer"
          >
            <i
              :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              class="text-gray-500"
            ></i>
          </button>
          <ErrorMessage name="password" class="text-red-500" />
        </div>
        
        <div class="text-center">
          <button type="submit" class="text-black bg-blue-500 px-4 py-1 my-4 rounded-md hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out">Login</button>
        </div>

        <div class="mt-4">
          <label class="block text-black">Don't have an account? <NuxtLink to="/Register" class="text-red-400 hover:text-blue-300">Sign up</NuxtLink></label>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useForm,Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from '#app';

// Define validation schema
const loginSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

// Use VeeValidate with Yup schema
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: loginSchema,
});

const username = ref('');
const password = ref('');
const { login } = useAuth();
const router = useRouter();

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};


const submitForm = handleSubmit(async (values) => {
  try {
    await login(values.username, values.password);
    console.log('Login successful');
    // router.push('/home'); // Redirect on success
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed.');
  }
});
</script>
