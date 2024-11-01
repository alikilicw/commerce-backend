import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UserEntity } from 'src/user/user.entity'
import { LoginReqDto, LoginServiceResDto, RegisterReqDto } from './auth.dto'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
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

    async register(body: RegisterReqDto): Promise<boolean> {
        const [userCheckWithUsername, userCheckWithEmail, userCheckWithPhone] = await Promise.all([
            this.userService.findByUsername(body.username),
            this.userService.findByEmail(body.email),
            this.userService.findByPhone(body.phone)
        ])

        if (userCheckWithUsername) throw new BadRequestException('Username is already in use.')
        if (userCheckWithEmail) throw new BadRequestException('Email is already in use.')
        if (userCheckWithPhone) throw new BadRequestException('Phone is already in use.')

        body.password = await hash(body.password, 10)

        let user = this.userService.create(body)

        const confirmationCode = generateRandomVerificationCode()

        user.confirmCode = confirmationCode
        await this.userService.save(user)

        await this.otpService.sendMail(user.email, user.id, confirmationCode)
        return true
    }

    async login(body: LoginReqDto): Promise<LoginServiceResDto> {
        const user = await this.userService.findByUsername(body.username, 'password')
        if (!user) throw new NotFoundException('User not found.')
        if (!user.isActive) throw new BadRequestException('Verify email first.')

        const passOk = await compare(body.password, user.password)
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
