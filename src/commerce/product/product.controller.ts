import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common'
import { ProductEntity } from './product.entity'
import { ProductService } from './product.service'
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe'
import { CreateProductDto, FindProductDto, UpdateProductDto } from './product.dto'
import { AuthGuard } from '@nestjs/passport'
import ProductValidation from './product.validation'
import { ResponseDto } from 'src/common/dto/response.dto'

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: ProductValidation.find }))
    async find(@Query() findProductDto: FindProductDto): Promise<ResponseDto<ProductEntity[]>> {
        return {
            data: await this.productService.find(findProductDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: ProductValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<ResponseDto<ProductEntity>> {
        const product = await this.productService.findById(params.id)
        if (!product) {
            throw new NotFoundException('Product not found')
        }
        return {
            data: product
        }
    }

    @Post()
    @UsePipes(new JoiValidationPipe({ bodySchema: ProductValidation.create }))
    async create(@Body() createProductDto: CreateProductDto): Promise<ResponseDto<ProductEntity>> {
        const product = await this.productService.create(createProductDto)
        return {
            data: await this.productService.save(product)
        }
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: ProductValidation.id, querySchema: ProductValidation.update }))
    async update(
        @Param() param: { id: number },
        @Body() updateProductDto: UpdateProductDto
    ): Promise<ResponseDto<ProductEntity>> {
        return {
            data: await this.productService.update(param.id, updateProductDto)
        }
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: ProductValidation.id }))
    async delete(@Param() param: { id: number }): Promise<void> {
        await this.productService.delete(param.id)
    }
}
