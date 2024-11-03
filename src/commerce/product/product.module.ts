import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from './product.entity'
import { AuthModule } from 'src/auth/auth.module'
import { CategoryModule } from '../category/category.module'

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), AuthModule, CategoryModule],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
