import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ResponseDto } from './common/dto/response.dto'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('entities')
    getEntities(): ResponseDto<string[]> {
        return {
            data: this.appService.getEntities()
        }
    }
}
