import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto }  from './dto/login-user.dto';
import { HashUtil } from '../common/utils/hash.util';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterUserDto) {
        const hashedPassword = await HashUtil.hashPassword(registerDto.password);
        return this.usersService.create({ ...registerDto, password: hashedPassword });
    }

    async login(loginDto: LoginUserDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user || !(await HashUtil.comparePasswords(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }
}
