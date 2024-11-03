import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { CreateUserDto, FindUserDto, UpdateUserDto } from './user.dto'
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

    async find(findUserDto: FindUserDto): Promise<UserEntity[]> {
        return this.userRepository.find({
            where: findUserDto
        })
    }

    async findOne(findUserDto: FindUserDto): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: findUserDto
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

    create(createUserDto: CreateUserDto): UserEntity {
        return this.userRepository.create(createUserDto)
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user)
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(id)
        if (!user) throw new NotFoundException('User not found.')

        Object.assign(user, updateUserDto)
        return this.save(user)
    }

    async delete(id: number): Promise<void> {
        const user = await this.findById(id)
        if (!user) throw new NotFoundException('User not found.')

        await this.userRepository.delete(id)
    }
}
