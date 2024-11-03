import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './product.entity'
import { Repository } from 'typeorm'
import { CreateProductDto, FindProductDto, UpdateProductDto } from './product.dto'
import { CategoryService } from '../category/category.service'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        private categoryService: CategoryService
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find()
    }

    async find(findProductDto: FindProductDto): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            where: findProductDto,
            relations: {
                category: true
            }
        })
    }

    async findOne(findProductDto: FindProductDto): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({ relations: ['category'], where: findProductDto })
        if (!product) throw new NotFoundException('Product not found.')
        return product
    }

    async findById(id: number): Promise<ProductEntity> {
        return this.productRepository.findOneBy({ id })
    }

    async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: {
                sku: createProductDto.sku
            }
        })
        if (product) throw new BadRequestException('There is a product with this sku.')

        const category = await this.categoryService.findById(createProductDto.categoryId)
        if (!category) throw new NotFoundException('Category not found.')

        const newProduct = this.productRepository.create(createProductDto)
        newProduct.category = category

        return newProduct
    }

    async save(product: ProductEntity): Promise<ProductEntity> {
        return this.productRepository.save(product)
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        const product = await this.findById(id)
        if (!product) throw new NotFoundException('Product not found.')

        if ('categoryId' in updateProductDto) {
            const category = await this.categoryService.findById(updateProductDto.categoryId)
            product.category = category
        }

        Object.assign(product, updateProductDto)
        return this.save(product)
    }

    async delete(id: number): Promise<void> {
        const product = await this.findById(id)
        if (!product) throw new NotFoundException('Product not found.')

        await this.productRepository.delete(id)
    }
}
