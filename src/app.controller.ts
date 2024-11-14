import { Controller, Get, UseGuards, UsePipes } from '@nestjs/common'
import { AppService } from './app.service'
import { ResponseDto } from './common/dto/response.dto'
import { AuthGuard } from '@nestjs/passport'
import { Entity } from './common/types/entities.type'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('entities')
    getEntities(): ResponseDto<Entity[]> {
        return {
            data: this.appService.getEntities()
        }
    }
}
