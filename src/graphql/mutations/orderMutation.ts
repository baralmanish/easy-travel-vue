import gql from 'graphql-tag'

const CreateOrderMutation = gql`
  mutation CreateOrder(
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
    }
  }
`

export { CreateOrderMutation }
