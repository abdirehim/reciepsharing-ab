<!-- <template class="">

<div class="">
<img src="@/assets/a2.jpg"  alt=""  class="relative h-dvh w-full" >
<div class="absolute top-40 right-20 text-black">
<h1 class="   text-6xl font-bold text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent " >Learn.Coock.Share.<br/>Cooking Made Easy.</h1>
<p class="mt-4 ml-4 text-gray-500 text-xl">Say good bye to long and frustrating<br/> food blogs and recipe videos Access<br/>
    our recipe cards to prepare any dish<br/> in minuts
</p>
<button class="  bg-blue-500 mt-4 ml-6 text-white p-2 rounded-md ">Browse Reciepe</button>
</div>
</img>
</div>
</template> -->

<template>
    <div class="relative h-screen w-full overflow-hidden">
      <!-- Background Image -->
      <img src="@/assets/i14.jfif" alt="Background" class="absolute top-0 left-0 w-full h-full object-cover" />
      
      <!-- Content -->
      <div class="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-blue-700 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Learn. Cook. Share. <br />Cooking Made Easy.
        </h1>
        <p class="m-4 text-gray-800 text-lg  md:text-xl">
          Say goodbye to long and frustrating <br />food blogs and recipe videos. Access <br />
          our recipe cards to prepare any dish <br />in minutes.
        </p>
        <a href="#search" class=" bg-blue-600 text-white px-4 py-3 rounded-md shadow-lg hover:bg-purple-700 transition duration-300">
          Browse Recipe
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
//   import a1 from '@/assets/a1.jpg';
//  import a2 from '@/assets/a2.jpg';
//  import a3 from '@/assets/a3.jpg';
 import i12 from '@/assets/i12.jfif';
//  import a5 from '@/assets/a5.jpg';
//  import a6 from '@/assets/a6.jpg';
//  import a7 from '@/assets/a7.jpg';
  
  const images = [
  // a1,
  //  a2,
  //  a3,
  i12
  //  a5,
  //  a6,
  //  a7
  ];
  const currentImage = ref(images[0]);
  
  const changeBackgroundImage = () => {
    let currentIndex = images.indexOf(currentImage.value);
    currentIndex = (currentIndex + 1) % images.length;
    currentImage.value = images[currentIndex];
  };
  
  onMounted(() => {
    setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds
  });
  </script>
  
  <style scoped>
  /* Optional: Add any additional custom styles here */
  </style>
  
  
  <style scoped>
  /* Ensure Tailwind is used for all styling, no extra CSS needed */
  </style>
  