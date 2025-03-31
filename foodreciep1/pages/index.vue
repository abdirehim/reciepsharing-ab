
<template>
<div class='Main'>
  
 <!-- //<Header/> -->
 

  <Navbar />
 
  <Home/>
  <Catagories/>
  <Popular/>
  <!-- <Search/>   -->
 <RecipeSearch/> 
   <!-- <Card/>
    //<RecipeFilter/>
  <RecipeCard/>  -->
  <Footer/>
 
 
</div>

</template>

<script  >

 export default {
  middleware: 'auth',
  
}


// import { onMounted } from 'vue'
// import { useAuth } from '~/composables/auth'
// import { useAuthStore } from '~/stores/auth'


// const { getUser } = useAuthStore()

// onMounted(() => {
  // getUser() 
  // Ensure user state is loaded on app start
// })
</script>



 
