import gql from 'graphql-tag'

const ProductQuery = gql`
  query Products($isActive: Boolean, $categoryId: Float) {
    products(isActive: $isActive, categoryId: $categoryId) {
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
