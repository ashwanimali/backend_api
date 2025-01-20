import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
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
        try {
            // Check if password is provided
            if (!createUserDto?.password) {
                throw new HttpException('Password is required', 400);
            }

            // // Ensure the name field is not missing
            if (!createUserDto?.name) {
                throw new HttpException('Name is required', 400);
            }

            if (!createUserDto?.email) {
                throw new HttpException('Email is required', 400);
            }

            const existUser = await this.findByEmail(createUserDto?.email)
            if (existUser && existUser?.email) {
                throw new HttpException('User found with email, try with different email', 400);
            }
            console.log("existUser", existUser)
            const hashedPassword = await HashUtil.hashPassword(createUserDto.password);
            const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
            return await this.userRepository.save(user);

        } catch (error) {
            if (error instanceof QueryFailedError) {

                throw new HttpException('Database query failed', 500);
            }
            throw error;
        }
    }


    async findAll() {
        return await this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async findByRole(role: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { role } })
    }

    async findById(userId: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id: userId } });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload({ id, ...updateUserDto });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.userRepository.save(user);
    }

    async delete(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.userRepository.delete(id);
        return { message: `User with ID ${id} successfully deleted` };
    }

}
