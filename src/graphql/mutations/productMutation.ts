import gql from 'graphql-tag'

const CreateProductMutation = gql`
  mutation CreateProduct(
    $customerEmail: String!
    $customerName: String!
    $bundleId: Int
    $productId: Int
  ) {
    createOrder(
      customerEmail: $customerEmail
      customerName: $customerName
      bundleId: $bundleId
      productId: $productId
    ) {
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

const UpdateProductMutation = gql`
  mutation CreateProduct(
    $customerEmail: String!
    $customerName: String!
    $bundleId: Int
    $productId: Int
  ) {
    createOrder(
      customerEmail: $customerEmail
      customerName: $customerName
      bundleId: $bundleId
      productId: $productId
    ) {
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

export { CreateProductMutation, UpdateProductMutation }
