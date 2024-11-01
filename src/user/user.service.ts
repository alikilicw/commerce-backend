import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { CreateUserDto, updateUserDto } from './user.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async find(user: Partial<UserEntity>): Promise<UserEntity[]> {
        return this.userRepository.find({
            where: user
        })
    }

    async findOne(user: Partial<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: user
        })
    }

    async findById(id: number, addSelect?: string): Promise<UserEntity> {
        const query = this.userRepository.createQueryBuilder('user').where('user.id = :id', { id })

        if (addSelect) query.addSelect(`user.${addSelect}`)

        return query.getOne()
    }

    async findByUsername(username: string, addSelect?: string): Promise<UserEntity> {
        const query = this.userRepository.createQueryBuilder('user').where('user.username = :username', { username })

        if (addSelect) query.addSelect(`user.${addSelect}`)

        return query.getOne()
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOneBy({ email })
    }

    async findByPhone(phone: string): Promise<UserEntity> {
        return this.userRepository.findOneBy({ phone })
    }

    create(user: CreateUserDto): UserEntity {
        return this.userRepository.create(user)
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user)
    }

    async update(id: number, updateUser: updateUserDto): Promise<UserEntity> {
        const user = await this.findById(id)

        if (!user) throw new NotFoundException('User not found.')

        Object.assign(user, updateUser)
        return this.save(user)
    }
}
