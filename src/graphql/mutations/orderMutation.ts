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

const UpdateOrderStatusMutation = gql`
  mutation UpdateOrderStatus($status: OrderStatus!, $orderId: Int!) {
    updateOrderStatus(status: $status, orderId: $orderId) {
      id
    }
  }
`

export { CreateOrderMutation, UpdateOrderStatusMutation }
