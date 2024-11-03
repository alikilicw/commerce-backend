export type FindCategoryDto = {
    name?: string
    depth?: number
    parentId?: number
    filtrable?: boolean
    searchable?: boolean
}

export type CreateCategoryDto = {
    name: string
    depth: number
    parentId?: number
    filtrable?: boolean
    searchable?: boolean
}

export type UpdateCategoryDto = {
    name?: string
    depth?: number
    parentId?: number
    filtrable?: boolean
    searchable?: boolean
}
