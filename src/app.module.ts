import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { CategoryModule } from './commerce/category/category.module'
import { ProductModule } from './commerce/product/product.module'
import { dataSourceOptions } from './common/db/database'

@Module({
    imports: [AuthModule, TypeOrmModule.forRoot(dataSourceOptions), UserModule, CategoryModule, ProductModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
