import { CategoryEntity } from '../category/category.entity'
import { ProductType } from './product.entity'

export type FindProductDto = {
    name?: string
    type?: ProductType
    sku?: string
    baseCode?: string
    price?: number
    categoryId?: CategoryEntity
}

export type CreateProductDto = {
    name: string
    type: ProductType
    sku: string
    baseCode?: string
    price: number
    categoryId: number
}

export type UpdateProductDto = {
    name?: string
    type?: ProductType
    sku?: string
    baseCode?: string
    price?: number
    categoryId?: number
}
