import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { IngestionManagementService } from './ingection.service'

@Controller('ingestion-management')
export class IngestionManagementController {
    constructor(private readonly ingestionManagementService: IngestionManagementService) { }

    @Post('start')
    async startIngestion(@Body() { documentId }: { documentId: string }) {
        const ingestion = await this.ingestionManagementService.createIngestion(documentId);
        return { message: 'Ingestion process started', ingestion };
    }

    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: number,
        @Body() { status, errorMessage }: { status: string; errorMessage?: string },
    ) {
        await this.ingestionManagementService.updateStatus(id, status, errorMessage);
        return { message: 'Ingestion status updated' };
    }

    @Get(':documentId/status')
    async getStatus(@Param('documentId') documentId: string) {
        const ingestion = await this.ingestionManagementService.getIngestionStatus(documentId);
        return ingestion ? ingestion : { message: 'No ingestion process found for this document' };
    }

    @Get()
    async getAllInjections() {
        return await this.ingestionManagementService.getIngestions();
    }

}
