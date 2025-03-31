<!-- 


<script setup>
import { ref } from 'vue';
import { gql } from '@apollo/client/core';
import { useNuxtApp } from '#app';



const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: Int!) {
    delete_recipes(where: { id: { _eq: $id } }) {
      affected_rows
    }
    delete_ingredients(where: { recipe_id: { _eq: $id } }) {
      affected_rows
    }
    delete_steps(where: { recipe_id: { _eq: $id } }) {
      affected_rows
    }
    delete_images(where: { recipe_id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const recipes = ref([]);

const nuxtApp = useNuxtApp();
const apolloClient = nuxtApp.$apollo.defaultClient;



  
 const deleteRecipe = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this recipe?')
  if(confirmed){


  try {
    const { data } = await apolloClient.mutate({
    mutation: DELETE_RECIPE,
      variables: { id }
     });
    if (data.delete_recipes.affected_rows > 0) {
      // Remove the deleted recipe from the list
      recipes.value = recipes.value.filter(recipe => recipe.id !== id);
      alert('Recipe deleted successfully!');
    } else {
       alert('Failed to delete recipe. Please try again.');
     }
  } catch (error) {
     console.error('Failed to delete recipe:', error.message);
     alert('Failed to delete recipe. Please try again.');
   }
  }
 };
</script> -->
// deleteRecipe.js
<script >
import { gql } from '@apollo/client/core'
import { useNuxtApp } from '#app'

const DELETE_RECIPE = gql`
mutation DeleteRecipe($id: Int!) {
   
  
 delete_ratings(where:{recipe_id:{_eq: $id  }}){
  affected_rows
}
    
 delete_comments(where:{recipe_id:{_eq: $id  }}){
  affected_rows
}
  delete_likes(where: { recipe_id: { _eq: $id } }) {
    affected_rows
  }
  delete_bookmarks(where: { recipe_id: { _eq: $id } }) {
    affected_rows
  }
   
    delete_ingredients(where: { recipe_id: { _eq: $id } }) {
      affected_rows
    }
    delete_steps(where: { recipe_id: { _eq: $id } }) {
      affected_rows
    }
    delete_images(where: { recipe_id: { _eq: $id } }) {
      affected_rows
    }
    delete_recipes(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }

  
`

export const useDeleteRecipe = () => {
  const nuxtApp = useNuxtApp()
  const apolloClient = nuxtApp.$apollo.defaultClient

  const deleteRecipe = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this recipe?')
    if (confirmed) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: DELETE_RECIPE,
          variables: { id }
        })
        return data.delete_recipes.affected_rows > 0
      } catch (error) {
        console.error('Failed to delete recipe:', error.message)
        return false
      }
    }
    return false
  }

  return { deleteRecipe }
}
</script>
