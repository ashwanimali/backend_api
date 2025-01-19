import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,private userService: UsersService) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log("in line 15", requiredRoles)

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        console.log("in line 27 user", user)

        if (!requiredRoles.includes(user?.role)) {
            throw new ForbiddenException('Access denied');
        }
        return true;
    }
}
