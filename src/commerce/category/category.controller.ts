import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common'
import { CategoryEntity } from './category.entity'
import { CategoryService } from './category.service'
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe'
import CategoryValidation from './category.validation'
import { CreateCategoryDto, FindCategoryDto, UpdateCategoryDto } from './category.dto'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: CategoryValidation.find }))
    async find(@Query() findCategoryDto: FindCategoryDto): Promise<CategoryEntity[]> {
        return this.categoryService.find(findCategoryDto)
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: CategoryValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<CategoryEntity> {
        const category = await this.categoryService.findById(params.id)
        if (!category) {
            throw new NotFoundException('Category not found')
        }
        return category
    }

    @Post()
    @UsePipes(new JoiValidationPipe({ bodySchema: CategoryValidation.create }))
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        const category = this.categoryService.create(createCategoryDto)
        return this.categoryService.save(category)
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: CategoryValidation.id, querySchema: CategoryValidation.update }))
    async update(@Param() param: { id: number }, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
        return this.categoryService.update(param.id, updateCategoryDto)
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: CategoryValidation.id }))
    async delete(@Param() param: { id: number }): Promise<void> {
        return this.categoryService.delete(param.id)
    }
}
