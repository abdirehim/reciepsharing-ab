// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
// import { defineNuxtPlugin } from '#app';

// export default defineNuxtPlugin(nuxtApp => {
//   const httpLink = createHttpLink({
//     uri: 'http://localhost:8080/v1/graphql', // Your GraphQL endpoint
//   });

//   const cache = new InMemoryCache();

//   const apolloClient = new ApolloClient({
//     link: httpLink,
//     cache,
//   });

//   // console.log('apolloClient:', apolloClient); // Add this line

//   nuxtApp.provide('apolloClient', apolloClient); // Provide the apolloClient instance
// });




import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client/core'
import { defineNuxtPlugin } from '#app'


export default defineNuxtPlugin(nuxtApp => {

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/v1/graphql', // Your GraphQL endpoint
  })

  

  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    link:  httpLink,
    cache,
  })

  nuxtApp.provide('apolloClient', apolloClient) // Provide the apolloClient instance
})


