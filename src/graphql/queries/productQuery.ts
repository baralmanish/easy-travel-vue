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

const AllProductsQuery = gql`
  query Products {
    products {
      id
      name
      price
      location
      isActive
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
      isActive
      category {
        id
        name
      }
    }
  }
`

export { ProductQuery, AllProductsQuery, ProductByIdQuery }
