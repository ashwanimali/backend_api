import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HashUtil } from '../common/utils/hash.util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await HashUtil.hashPassword(createUserDto.password);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async findAll() {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload({ id, ...updateUserDto });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.userRepository.save(user);
    }
}
