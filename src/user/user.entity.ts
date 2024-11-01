import { Gender } from 'src/common/enum/user.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column({ type: 'enum', enum: Gender, default: Gender.UNKNOWN })
    gender: Gender

    @Column({ unique: true })
    phone: string

    @Column({ type: 'boolean', default: false })
    isActive: boolean

    @Column({ select: false })
    password: string

    @Column({ select: false, nullable: true })
    confirmCode: string
}
