import { Injectable, OnModuleInit } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class UserSeeder implements OnModuleInit {
    constructor(private readonly userService: UsersService) { }

    async onModuleInit() {
        // Check if the admin user already exists
        const adminUser = await this.userService.findByRole('admin');

        if (!adminUser) {
            // Create admin user without pre-hashing the password
            await this.userService.create({
                name: 'administrator',
                password: 'adminpassword', // Pass plain text password
                email: 'admin@gmail.com',
                role: 'admin',
            });

            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    }
}
