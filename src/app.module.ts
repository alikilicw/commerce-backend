import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './common/db/database'
import { UserModule } from './user/user.module'
import { CategoryModule } from './commerce/category/category.module'

@Module({
    imports: [AuthModule, TypeOrmModule.forRoot(databaseConfig()), UserModule, CategoryModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}