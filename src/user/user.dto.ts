import { Gender } from 'src/common/enum/user.enum'
import { UserEntity } from './user.entity'

export type CreateUserDto = Pick<UserEntity, 'username' | 'email' | 'gender' | 'phone' | 'password'>
export type FindUserDto = {
    username?: string
    email?: string
    gender?: Gender
    phone?: string
}
export type UpdateUserDto = FindUserDto
