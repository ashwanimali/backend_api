import { Controller, Get, Post, Patch, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            console.log("createUserDto", createUserDto)
            return this.usersService.create(createUserDto);

        } catch (error) {
            throw error
        }
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
