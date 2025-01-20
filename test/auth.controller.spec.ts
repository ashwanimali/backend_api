import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: Partial<AuthService>;

    const mockAuthService = {
        register: jest.fn(),
        login: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should call AuthService.login and return the result', async () => {
            const loginDto = { email: 'test@example.com', password: 'password' };
            const token = { access_token: 'jwt-token' };

            jest.spyOn(mockAuthService, 'login').mockResolvedValue(token);

            const result = await controller.login(loginDto);

            expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
            expect(result).toEqual(token);
        });
    });

    describe('logout', () => {
        it('should return a logout success message', async () => {
            const result = await controller.logout();
            expect(result).toEqual({ message: 'Logged out successfully' });
        });
    });
});
