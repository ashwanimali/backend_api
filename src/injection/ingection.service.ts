import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion } from './ingection.entity'

@Injectable()
export class IngestionManagementService {
    constructor(
        @InjectRepository(Ingestion)
        private readonly ingestionRepository: Repository<Ingestion>,
    ) { }

    async createIngestion(documentId: string): Promise<Ingestion> {
        const ingestion = this.ingestionRepository.create({ documentId, status: 'pending' });
        return this.ingestionRepository.save(ingestion);
    }

    async updateStatus(id: number, status: string, errorMessage?: string): Promise<void> {
        const updateData: Partial<Ingestion> = { status };
        if (status === 'completed') updateData.completedAt = new Date();
        if (errorMessage) updateData.errorMessage = errorMessage;

        await this.ingestionRepository.update(id, updateData);
    }

    async getIngestionStatus(documentId: string): Promise<Ingestion> {
        return this.ingestionRepository.findOne({ where: { documentId } });
    }

    async getIngestions() {
        return await this.ingestionRepository.find();
    }
}
