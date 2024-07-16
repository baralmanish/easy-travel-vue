// import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql'
})

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient
// })

export { apolloClient }
