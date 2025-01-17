import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: Partial<UsersService>;

    const mockUsersService = {
        create: jest.fn(),
        findByEmail: jest.fn(),
        updateRole: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [{ provide: UsersService, useValue: mockUsersService }],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call UsersService.create and return the result', async () => {
            const userDto = { email: 'test@example.com', password: 'password', name: "nameOfUser", role: "admin" };
            const createdUser = { id: '1', ...userDto };

            jest.spyOn(service, 'create').mockResolvedValue(createdUser);

            const result = await controller.create(userDto);

            expect(service.create).toHaveBeenCalledWith(userDto);
            expect(result).toEqual(createdUser);
        });
    });

    describe('updateRole', () => {
        it('should call UsersService.updateRole and return the result', async () => {
            const userId = '1';
            const role = 'admin';
            const updatedUser = { id: userId, email: 'test@example.com', password: 'password', role, name: "nameOfUser changed" };

            jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

            const result = await controller.update(userId, { role });

            expect(service.update).toHaveBeenCalledWith(userId, role);
            expect(result).toEqual(updatedUser);
        });
    });
});
