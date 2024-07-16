import gql from 'graphql-tag'

const OrderQuery = gql`
  query Orders {
    orders {
      id
      customerName
      customerEmail
      status
      createdAt
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

const OrderByIdQuery = gql`
  query Order($id: Int!) {
    order(id: $id) {
      id
      customerName
      customerEmail
      createdAt
      status
      bundle {
        id
        name
        price
      }
      bundleProducts {
        id
        name
        price
        category {
          name
        }
      }
      product {
        id
        name
        price
        location
        category {
          name
        }
      }
    }
  }
`

export { OrderQuery, OrderByIdQuery }
