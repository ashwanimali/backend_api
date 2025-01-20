import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionManagementController } from './ingection.controller';
import { IngestionManagementService } from './ingection.service';
import { Ingestion } from './ingection.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ingestion])],
    controllers: [IngestionManagementController],
    providers: [IngestionManagementService],
    exports: [IngestionManagementService]
})
export class IngectionModule { }
