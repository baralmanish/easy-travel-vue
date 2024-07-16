import gql from 'graphql-tag'

const CategoryQuery = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`

export { CategoryQuery }
