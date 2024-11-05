import { ResponseDto } from 'src/common/dto/response.dto'
import { Gender, UserEntity } from 'src/user/user.entity'

export type LoginReqDto = {
    username: string
    password: string
}

export type LoginResDto = {
    user: UserEntity
    token: string
}

export type RegisterReqDto = {
    username: string
    email: string
    gender: Gender
    phone: string
    password: string
}
export type RegisterResDto = {}
