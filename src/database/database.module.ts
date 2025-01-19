import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule,TypeOrmModule.forRootAsync(DatabaseProviders)],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
