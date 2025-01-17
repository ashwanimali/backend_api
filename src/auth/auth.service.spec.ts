import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashUtil } from '../common/utils/hash.util';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: Partial<UsersService>;
    let jwtService: Partial<JwtService>;

    beforeEach(async () => {
        usersService = {
            findByEmail: jest.fn(),
            create: jest.fn(),
        };

        jwtService = {
            sign: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: usersService },
                { provide: JwtService, useValue: jwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('register', () => {
        it('should hash the password and create a user', async () => {
            const registerDto = { email: 'test@example.com', password: 'password', name: 'Name of user' };
            const hashedPassword = 'hashedPassword';
            jest.spyOn(HashUtil, 'hashPassword').mockResolvedValue(hashedPassword);
            jest.spyOn(usersService, 'create').mockResolvedValue({
                id: '1',
                email: 'test@example.com',
                password: hashedPassword,
                name: 'Name of user',
                role: 'viewer'
            });

            const result = await service.register(registerDto);

            expect(HashUtil.hashPassword).toHaveBeenCalledWith(registerDto.password);
            expect(usersService.create).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: hashedPassword,
            });
            expect(result).toEqual({
                id: '1',
                email: 'test@example.com',
                password: hashedPassword,
            });
        });
    });

    describe('login', () => {
        it('should return an access token for valid credentials', async () => {
            const loginDto = { email: 'test@example.com', password: 'password' };
            const user = { id: '1', email: 'test@example.com', password: 'hashedPassword', role: 'user', name: 'Name of user' };
            const token = 'jwt-token';

            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
            jest.spyOn(HashUtil, 'comparePasswords').mockResolvedValue(true);
            jest.spyOn(jwtService, 'sign').mockReturnValue(token);

            const result = await service.login(loginDto);

            expect(usersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
            expect(HashUtil.comparePasswords).toHaveBeenCalledWith(loginDto.password, user.password);
            expect(jwtService.sign).toHaveBeenCalledWith({ sub: user.id, role: user.role });
            expect(result).toEqual({ access_token: token });
        });

        it('should throw an UnauthorizedException for invalid credentials', async () => {
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

            await expect(service.login({ email: 'test@example.com', password: 'password' })).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });
});
