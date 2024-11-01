import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './common/db/database'
import { UserModule } from './user/user.module'

@Module({
    imports: [AuthModule, TypeOrmModule.forRoot(databaseConfig()), UserModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
