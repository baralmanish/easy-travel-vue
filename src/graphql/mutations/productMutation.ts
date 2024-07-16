import gql from 'graphql-tag'

const CreateProductMutation = gql`
  mutation CreateProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
    }
  }
`

const UpdateProductMutation = gql`
  mutation UpdateProduct($data: UpdateProductInput!, $id: Int!) {
    updateProduct(data: $data, id: $id) {
      id
    }
  }
`

export { CreateProductMutation, UpdateProductMutation }
