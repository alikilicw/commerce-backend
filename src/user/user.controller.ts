import { Controller, Get, Post, Param, Body, NotFoundException, Query, UsePipes, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { findUserDto, updateUserDto } from './user.dto'
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe'
import UserValidation from './user.validation'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: UserValidation.find }))
    async find(@Query() query: findUserDto): Promise<UserEntity[]> {
        return await this.userService.find(query)
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<UserEntity> {
        const user = await this.userService.findOne({ id: params.id })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id, bodySchema: UserValidation.update }))
    async update(@Param() params: { id: number }, @Body() body: updateUserDto): Promise<UserEntity> {
        return this.userService.update(params.id, body)
    }
}
