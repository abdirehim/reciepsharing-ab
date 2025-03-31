//queries.js
import { gql } from '@apollo/client/core';

// Get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      category_name
    }
  }
`;

// Get recipes by category
export const GET_RECIPES_BY_CATEGORY = gql`
  query GetRecipesByCategory($categoryId: Int!) {
    recipes(where: { category_id: { _eq: $categoryId } }) {
      id
      title
      description
    }
  }
`;

// Get recipes by creator
export const GET_RECIPES_BY_CREATOR = gql`
  query GetRecipesByCreator($creatorId: Int!) {
    recipes(where: { creator_id: { _eq: $creatorId } }) {
      id
      title
      description
    }
  }
`;

// Get recipes by preparation time
export const GET_RECIPES_BY_PREP_TIME = gql`
  query GetRecipesByPrepTime($prepTime: Int!) {
    recipes(where: { preparation_time: { _lte: $prepTime } }) {
      id
      title
      description
    }
  }
`;

// Get recipes by ingredients
export const GET_RECIPES_BY_INGREDIENT = gql`
  query GetRecipesByIngredient($ingredient: String!) {
    recipes(where: { ingredients: { ingredient_name: { _ilike: $ingredient } } }) {
      id
      title
      description
    }
  }
`;

// Search recipes by title
export const SEARCH_RECIPES_BY_TITLE = gql`
  query SearchRecipesByTitle($title: String!) {
    recipes(where: { title: { _ilike: $title } }) {
      id
      title
      description
    }
  }
`;
