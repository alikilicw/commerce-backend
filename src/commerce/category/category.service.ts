import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from './category.entity'
import { Repository } from 'typeorm'
import { CreateCategoryDto, FindCategoryDto, UpdateCategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ) {}

    async findAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find()
    }

    async find(findCategoryDto: FindCategoryDto): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find({
            where: findCategoryDto,
            relations: {
                parent: true
            }
        })
    }

    async findOne(findCategoryDto: FindCategoryDto): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({ relations: { parent: true }, where: findCategoryDto })
        if (!category) throw new NotFoundException('Category not found.')
        return category
    }

    async findById(id: number): Promise<CategoryEntity> {
        const category = this.categoryRepository.findOne({ relations: { parent: true }, where: { id } })
        if (!category) throw new NotFoundException('Category not found.')
        return category
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        const categoryCheck = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } })
        if (categoryCheck) throw new BadRequestException('There is a category with this name.')

        const newCategory = this.categoryRepository.create(createCategoryDto)

        if (createCategoryDto.depth > 0) {
            const category = await this.findById(createCategoryDto.parentId)
            newCategory.parent = category
        }

        return newCategory
    }

    async save(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryRepository.save(category)
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
        const category = await this.findById(id)
        if (!category) throw new NotFoundException('Category not found.')

        Object.assign(category, updateCategoryDto)
        return this.save(category)
    }

    async delete(id: number): Promise<void> {
        const category = await this.findById(id)
        if (!category) throw new NotFoundException('Category not found.')

        await this.categoryRepository.delete(id)
    }
}
