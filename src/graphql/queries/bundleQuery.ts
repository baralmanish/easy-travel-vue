import gql from 'graphql-tag'

const BundleQuery = gql`
  query Bundles {
    bundles {
      id
      name
      price
      products {
        name
      }
    }
  }
`

const BundleByIdQuery = gql`
  query Bundle($bundleId: Int!) {
    bundle(id: $bundleId) {
      id
      name
      price
      description
      products {
        id
        name
        price
      }
    }
  }
`

export { BundleQuery, BundleByIdQuery }
