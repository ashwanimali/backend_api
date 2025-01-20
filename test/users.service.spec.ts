import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/users.entity';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userDto = { email: 'test@example.com', password: 'password', name: "nameofuser" };
            const createdUser = { id: '1', ...userDto };

            jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser as User);

            const result = await service.create(userDto);

            expect(userRepository.save).toHaveBeenCalledWith(userDto);
            expect(result).toEqual(createdUser);
        });
    });

    describe('findByEmail', () => {
        it('should return a user by email', async () => {
            const email = 'test@example.com';
            const user = { id: '1', email, password: 'hashedPassword' };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);

            const result = await service.findByEmail(email);

            expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
            expect(result).toEqual(user);
        });
    });

    describe('updateRole', () => {
        it('should update the role of a user', async () => {
            const userId = '1';
            const role = 'admin';
            const updatedUser = { id: userId, email: 'test@example.com', password: 'hashedPassword', role };

            jest.spyOn(userRepository, 'update').mockResolvedValue({ affected: 1 } as any);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(updatedUser as User);

            const result = await service.update(userId, updatedUser);

            expect(userRepository.update).toHaveBeenCalledWith(userId, { role });
            expect(result).toEqual(updatedUser);
        });
    });
});
