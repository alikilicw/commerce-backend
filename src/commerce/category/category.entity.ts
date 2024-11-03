import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm'
import { ProductEntity } from '../product/product.entity'

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    depth: number

    @Column({ nullable: true })
    parentId: number

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}
