import gql from 'graphql-tag'

const ProductQuery = gql`
  query Products($categoryId: Float) {
    products(categoryId: $categoryId) {
      id
      name
      price
      location
      category {
        id
        name
      }
    }
  }
`

const ProductByIdQuery = gql`
  query Product($productId: Int!) {
    getProductById(id: $productId) {
      id
      name
      price
      location
      description
      category {
        name
      }
    }
  }
`

export { ProductQuery, ProductByIdQuery }
