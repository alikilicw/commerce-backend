import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'

export default class CategoryValidation extends BaseValidation {
    public static find = Joi.object({
        name: Joi.string().min(5).max(20).optional(),
        depth: Joi.number().optional(),
        parentId: Joi.number().optional(),
        filtable: Joi.boolean().optional(),
        searchable: Joi.boolean().optional()
    })

    public static create = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        depth: Joi.number().required(),
        parentId: Joi.number().optional(),
        filtable: Joi.boolean().optional(),
        searchable: Joi.boolean().optional()
    })

    public static update = Joi.object({
        name: Joi.string().min(5).max(20).optional(),
        depth: Joi.number().optional(),
        parentId: Joi.number().optional(),
        filtable: Joi.boolean().optional(),
        searchable: Joi.boolean().optional()
    })
}
