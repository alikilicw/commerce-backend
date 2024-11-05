import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common'
import { CategoryEntity } from './category.entity'
import { CategoryService } from './category.service'
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe'
import CategoryValidation from './category.validation'
import { CreateCategoryDto, FindCategoryDto, UpdateCategoryDto } from './category.dto'
import { AuthGuard } from '@nestjs/passport'
import { ResponseDto } from 'src/common/dto/response.dto'

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: CategoryValidation.find }))
    async find(@Query() findCategoryDto: FindCategoryDto): Promise<ResponseDto<CategoryEntity[]>> {
        return {
            data: await this.categoryService.find(findCategoryDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: CategoryValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<ResponseDto<CategoryEntity>> {
        const category = await this.categoryService.findById(params.id)
        if (!category) {
            throw new NotFoundException('Category not found')
        }
        return {
            data: category
        }
    }

    @Post()
    @UsePipes(new JoiValidationPipe({ bodySchema: CategoryValidation.create }))
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<ResponseDto<CategoryEntity>> {
        const category = this.categoryService.create(createCategoryDto)
        return {
            data: await this.categoryService.save(category)
        }
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: CategoryValidation.id, querySchema: CategoryValidation.update }))
    async update(
        @Param() param: { id: number },
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<ResponseDto<CategoryEntity>> {
        return {
            data: await this.categoryService.update(param.id, updateCategoryDto)
        }
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: CategoryValidation.id }))
    async delete(@Param() param: { id: number }): Promise<void> {
        await this.categoryService.delete(param.id)
    }
}
