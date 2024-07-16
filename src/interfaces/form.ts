export interface IProductForm {
  name: string
  date: string
  price: string | number
  location: string
  categoryId: number | null
  description: string
  isActive?: boolean
}

export interface IProductFormInput {
  name: string
  date?: Date
  price: number
  location?: string
  isActive?: boolean
  categoryId: number
  description: string
}
