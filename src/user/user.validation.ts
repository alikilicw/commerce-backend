import * as Joi from 'joi'
import { Gender } from 'src/common/enum/user.enum'

export default class UserValidation {
    public static find = Joi.object({
        username: Joi.string().min(5).max(20).optional(),
        email: Joi.string().email().optional(),
        gender: Joi.string()
            .valid(...Object.values(Gender))
            .optional(),
        phone: Joi.string().min(5).max(20).optional()
    })

    public static id = Joi.object({
        id: Joi.number().min(0).required()
    })

    public static update = Joi.object({
        username: Joi.string().min(5).max(20).optional(),
        email: Joi.string().email().optional(),
        gender: Joi.string()
            .valid(...Object.values(Gender))
            .optional(),
        phone: Joi.string().min(5).max(20).optional()
    })
}
