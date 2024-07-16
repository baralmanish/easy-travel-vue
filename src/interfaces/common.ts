export interface IError {
  name: string
  message: string
}

export interface IRes {
  getProductById: {
    id: number
    name: string
    price: number
    date?: string
    isActive?: string
    location?: string
    description: string
    category: {
      name: string
    }
  }
}
