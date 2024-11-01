import { ResponseDto } from 'src/common/dto/response.dto'
import { Gender } from 'src/common/enum/user.enum'
import { UserEntity } from 'src/user/user.entity'

export type LoginReqDto = {
    username: string
    password: string
}

export type LoginServiceResDto = {
    user: UserEntity
    token: string
}
export type LoginResDto = ResponseDto & {
    data: LoginServiceResDto
}

export type RegisterReqDto = {
    username: string
    email: string
    gender: Gender
    phone: string
    password: string
}
export type RegisterResDto = ResponseDto & {}
