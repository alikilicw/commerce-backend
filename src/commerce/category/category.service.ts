import { Injectable, NotFoundException } from '@nestjs/common'
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
            where: findCategoryDto
        })
    }

    async findOne(findCategoryDto: FindCategoryDto): Promise<CategoryEntity> {
        return this.categoryRepository.findOneBy(findCategoryDto)
    }

    async findById(id: number): Promise<CategoryEntity> {
        return this.categoryRepository.findOneBy({ id })
    }

    create(createCategoryDto: CreateCategoryDto): CategoryEntity {
        return this.categoryRepository.create(createCategoryDto)
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