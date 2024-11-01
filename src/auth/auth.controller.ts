import { Body, Controller, Get, Post, Query, Req, Request, UseGuards, UsePipes } from '@nestjs/common'
import { LoginReqDto, LoginResDto, RegisterReqDto, RegisterResDto } from './auth.dto'
import { AuthService } from './auth.service'
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe'
import AuthValidation from './auth.validation'
import { ResponseDto } from 'src/common/dto/response.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @UsePipes(new JoiValidationPipe({ bodySchema: AuthValidation.register }))
    async register(@Body() body: RegisterReqDto): Promise<RegisterResDto> {
        await this.authService.register(body)
        return {
            message:
                "Your account has been successfully created! Please verify your email by clicking on the link we've sent to your inbox."
        }
    }

    @Post('login')
    async login(@Body() body: LoginReqDto): Promise<LoginResDto> {
        const response = await this.authService.login(body)

        return {
            data: response,
            message: 'Login successfull.'
        }
    }

    @Get('confirm')
    async confirm(@Query() query: { userId: number; code: string }): Promise<boolean> {
        return this.authService.confirm(query.userId, query.code)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('whoami')
    async whoami(@Request() req): Promise<ResponseDto> {
        console.log('AAA')

        return {
            data: req.user,
            message: 'OK'
        }
    }
}
