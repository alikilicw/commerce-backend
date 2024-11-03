import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn
} from 'typeorm'
import { CategoryEntity } from '../category/category.entity'

export enum ProductType {
    BASE = 'base',
    SUB = 'sub'
}

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'enum', enum: ProductType, default: ProductType.SUB })
    type: ProductType

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category' })
    category: CategoryEntity

    @Column({ unique: true })
    sku: string

    @Column({ nullable: true })
    baseCode: string
    @BeforeInsert()
    setBaseCode() {
        if (this.baseCode == null) this.baseCode = this.sku
    }

    @Column()
    price: number

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp
}
