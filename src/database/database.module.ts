import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseProviders } from './database.providers';

@Module({
    imports: [TypeOrmModule.forRootAsync(DatabaseProviders)],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
