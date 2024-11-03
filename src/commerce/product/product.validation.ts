import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'
import { ProductType } from './product.entity'

export default class ProductValidation extends BaseValidation {
    public static find = Joi.object({
        name: Joi.string().min(5).max(20).optional(),
        type: Joi.string()
            .valid(...Object.values(ProductType))
            .optional(),
        categoryId: Joi.number().optional(),
        sku: Joi.string().optional(),
        baseCode: Joi.string().optional(),
        price: Joi.number().optional()
    })

    public static create = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        type: Joi.string()
            .valid(...Object.values(ProductType))
            .required(),
        categoryId: Joi.number().required(),
        sku: Joi.string().required(),
        baseCode: Joi.string().optional(),
        price: Joi.number().required()
    })

    public static update = Joi.object({
        name: Joi.string().min(5).max(20).optional(),
        type: Joi.string()
            .valid(...Object.values(ProductType))
            .optional(),
        categoryId: Joi.number().optional(),
        sku: Joi.string().optional(),
        baseCode: Joi.string().optional(),
        price: Joi.number().optional()
    })
}
