import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

    @Column({ default: true })
    filtrable: boolean

    @Column({ default: true })
    searchable: boolean
}
