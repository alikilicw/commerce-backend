import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Constants } from '../constants.config'
import { UserEntity } from 'src/user/user.entity'
import { CategoryEntity } from 'src/commerce/category/category.entity'
import { ProductEntity } from 'src/commerce/product/product.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: Constants.DB_HOST,
    port: Constants.DB_PORT,
    username: Constants.DB_USERNAME,
    password: Constants.DB_PASSWORD,
    database: Constants.DB_NAME,
    entities: [UserEntity, CategoryEntity, ProductEntity],
    synchronize: true
}

export const dataSource = new DataSource(dataSourceOptions)
dataSource.initialize()

export const listEntities = (): string[] => {
    const entities = dataSource.entityMetadatas.map((meta) => meta.name)
    return entities
}
