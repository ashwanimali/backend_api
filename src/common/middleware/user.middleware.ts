import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            try {
                const secretKey = process.env.JWT_SECRET || 'defaultSecret'
                const decoded: any = jwt.verify(token, secretKey);
                const userId = decoded?.sub;
                if (userId) {
                    const user = await this.usersService.findById(userId);
                    if (user) {
                        req["user"] = user;
                    }
                }
            } catch (err) {
                console.error('Token verification failed:', err);
            }
        }

        next();
    }
}
