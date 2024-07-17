// import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  connectToDevTools: true,
  uri: 'http://localhost:4000/graphql',
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient
// })

export { apolloClient }
