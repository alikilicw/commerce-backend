import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UserEntity } from 'src/user/user.entity'
import { LoginReqDto, LoginResDto, RegisterReqDto } from './auth.dto'
import { sign } from 'jsonwebtoken'
import { Constants } from 'src/common/constants.config'
import { hash, compare } from 'bcrypt'
import { UserService } from 'src/user/user.service'
import { OtpService } from 'src/auth/otp/otp.service'
import generateRandomVerificationCode from 'src/common/util/generate-code'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private otpService: OtpService
    ) {}

    async register(registerReqDto: RegisterReqDto): Promise<boolean> {
        registerReqDto.password = await hash(registerReqDto.password, 10)

        let user = await this.userService.create(registerReqDto)

        const confirmationCode = generateRandomVerificationCode()

        user.confirmCode = confirmationCode
        await this.userService.save(user)

        await this.otpService.sendMail(user.email, user.id, confirmationCode)
        return true
    }

    async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
        const user = await this.userService.findByUsername(loginReqDto.username, 'password')
        if (!user) throw new NotFoundException('User not found.')
        if (!user.isActive) throw new BadRequestException('Verify email first.')

        const passOk = await compare(loginReqDto.password, user.password)
        if (!passOk) throw new BadRequestException('Password is incorrect.')

        const token = await this.createToken(user)

        delete user.password

        return {
            user,
            token
        }
    }

    async createToken(user: UserEntity): Promise<string> {
        return sign({ id: user.id, email: user.email }, Constants.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '30d' })
    }

    async confirm(userId: number, code: string): Promise<boolean> {
        const user = await this.userService.findById(userId, 'confirmCode')

        if (!user || code != user.confirmCode) throw new UnauthorizedException('Inactive link.')

        user.isActive = true
        user.confirmCode = null
        await this.userService.save(user)

        return true
    }
}
