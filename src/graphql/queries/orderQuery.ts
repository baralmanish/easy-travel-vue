import gql from 'graphql-tag'

const OrderQuery = gql`
  query Orders {
    orders {
      id
      customerName
      customerEmail
      status
      product {
        name
        price
      }
      bundle {
        name
        price
      }
      bundleProducts {
        id
        name
      }
    }
  }
`

export { OrderQuery }
