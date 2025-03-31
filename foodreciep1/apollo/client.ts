// apollo/client.ts

import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http'

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql', // Adjust URL based on your GraphQL endpoint
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default apolloClient
