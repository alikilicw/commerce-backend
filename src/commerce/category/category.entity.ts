import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { ProductEntity } from '../product/product.entity'

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    depth: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'parent' })
    parent: CategoryEntity

    @OneToMany(() => CategoryEntity, (category) => category.parent)
    children: CategoryEntity[]
}
