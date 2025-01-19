import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service'; // Adjust path to your UsersService

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

        if (token) {
            try {
                // Decode the token (you can adjust this based on how you encode it)
                const secretKey = process.env.JWT_SECRET || 'defaultSecret'
                const decoded: any = jwt.verify(token, secretKey); // Replace with actual secret

                // Extract user ID from decoded token (assuming user ID is part of the token)
                const userId = decoded?.sub; // Adjust according to your token structure
                console.log("in line 21", userId, decoded)
                if (userId) {
                    // Use UsersService to fetch user data
                    const user = await this.usersService.findById(userId); // Adjust this according to your method
                    if (user) {
                        console.log("in line 26", user)
                        req["user"] = user; // Attach user to request object
                    }
                }
                console.log("req user", req["user"])
            } catch (err) {
                console.error('Token verification failed:', err);
            }
        }

        next(); // Continue to the next middleware or guard
    }
}
