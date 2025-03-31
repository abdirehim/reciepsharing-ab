 <!-- <template>
  <Navbar  />
  <div class="h-dvh w-full bg-cover  bg-image " :class="{ 'bg-image': true }">
    <div class="  m-auto p-8 pt-0   bg-blue-700 rounded-lg absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 shadow-md max-w-2xl md:max-w-xl lg:max-w-2xl">
      <h1 class="text-2xl mb-8 text-blue-100 ml-16 ">Signup</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="username" class="block text-white">Username:</label>
          <input v-model="username" type="text" id="username" class="mt-1  pl-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-white">Email:</label>
          <input v-model="email" type="email" id="email" class="mt-1  pl-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-white">Password:</label>
          <input v-model="password" type="password" id="password" class="mt-1  pl-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"  required/>
        </div>
        <div class="text-center">
          <button type="submit" class="text-white bg-blue-500 px-4 py-2 rounded-md hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out">Signup</button>
        </div>
        <p class="text-white mt-4 text-center">Already have an account? <router-link to="/login" class="text-red-400">Login</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const { signup } = useAuth()
const router = useRouter()

const submitForm = async () => {
  try {
    await signup(username.value, email.value, password.value)
  } catch (error) {
    console.error(error)
    alert('Signup failed.')
  }
}
</script>

<style>
/* .container {
  max-width: 400px;
} */
  .bg-image {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('@/assets/a3.jpg');
  background-size: cover;
  background-position:center}
</style> --> -->




<!-- <template>
 <Navbar/>


  <div class="container mx-auto">
    <h1 class="text-2xl mb-4">Signup</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username:</label>
        <input v-model="username" type="text" id="username" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email:</label>
        <input v-model="email" type="email" id="email" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required/>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password:</label>
        <input v-model="password" type="password" id="password" class="mt-1 p-2 border border-gray-300 rounded-md w-full"  required/>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Signup</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const username = ref('')
const email = ref('')
const password = ref('')
const { signup } = useAuth()
const router=useRouter()

const submitForm = async () => {
  try {
    await signup(username.value, email.value, password.value)
  } catch (error) {
    console.error(error)
    alert('Signup failed.')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style> -->
<!-- <!-- <template>



  <Navbar class="mb-0" />
  <div class="h-screen w-full bg-cover bg-center"  :class="{ 'bg-image': true }">
    <div class="container mx-auto p-4 pt-0 mt-0 mb-10 bg-blue-700 rounded-lg shadow-md w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 class="text-2xl mb-4 text-white ml-20 ">Signup</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="username" class="block text-white">Username:</label>
          <input v-model="username" type="text" id="username" class="mt-1 p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-white">Email:</label>
          <input v-model="email" type="email" id="email" class="mt-1 p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-white">Password:</label>
          <input v-model="password" type="password" id="password" class="mt-1 p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"  required/>
        </div>
        <div class="text-center">
          <button type="submit" class="text-white bg-blue-500 px-4 py-2 rounded-md hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out">Signup</button>
        </div>
        <p class="text-white mt-4 text-center">Already have an account? <router-link to="/login" class="text-red-400">Login</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const { signup } = useAuth()
const router = useRouter()

const submitForm = async () => {
  try {
    await signup(username.value, email.value, password.value)
  } catch (error) {
    console.error(error)
    alert('Signup failed.')
  }
}
</script>

<style >
.container {
  max-width: 300px;
}
  .bg-image {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('@/assets/a3.jpg');
  background-size: cover;
  background-position: center;

}
</style>-->



<!-- 
:validation-schema="schema" -->


<template>
  <Navbar />
  <div class="h-dvh w-full bg-cover bg-center bg-image">
    <div class="m-auto mt-8 p-8 pt-0 bg-white text-gray-800 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md max-w-2xl md:max-w-xl lg:max-w-2xl">
      <h1 class="text-2xl mb-8 text-blue-800 ml-16">Signup</h1>
      <form @submit="submitForm" :validation-schema="signupSchema">
        <div class="mb-4">
          <label for="username" class="block text-black">Username:</label>
          <Field v-model="username" name="username" type="text" id="username" class="mt-1 pl-4 border bg-gray-100 border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
          <ErrorMessage name="username" class="text-red-500" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-black">Email:</label>
          <Field v-model="email" name="email" type="email" id="email" class="mt-1 pl-4 border bg-gray-100 border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
          <ErrorMessage name="email" class="text-red-500" />
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
          <button type="submit" class="text-white bg-blue-500 px-4 py-2 rounded-md hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out">Signup</button>
        </div>
        <p class="text-black mt-4 text-center">Already have an account? <router-link to="/login" class="text-red-400">Login</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'
import { useForm, Form, Field, ErrorMessage } from 'vee-validate'
import { signupSchema } from '~/components/validationSchema' // Ensure this path is correct
// import { useToast } from 'vue3-toastify'
// const toast = useToast()

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const { handleSubmit } = useForm({
  validationSchema: signupSchema,
})

const username = ref('')
const email = ref('')
const password = ref('')
const { signup } = useAuth()
const router = useRouter()

const submitForm = handleSubmit(async (values) => {
  try {
    await signup(values.username, values.email, values.password)
    // router.push('/login') // Redirect to login page on success
  } catch (error) {
    console.error(error)
    // Use toast notifications if configured
  }
})
</script>

<style>
.bg-image {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('@/assets/a4.jpg');
  background-size: cover;
  background-position: center;
}
</style>
