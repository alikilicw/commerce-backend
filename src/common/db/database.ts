import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Constants } from '../constants.config'
import { UserEntity } from 'src/user/user.entity'

export const databaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: Constants.DB_HOST,
    port: Constants.DB_PORT,
    username: Constants.DB_USERNAME,
    password: Constants.DB_PASSWORD,
    database: Constants.DB_NAME,
    entities: [UserEntity],
    synchronize: true
})
