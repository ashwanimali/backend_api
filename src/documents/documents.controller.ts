import { Controller, Get, Post, Patch, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer-config.util';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async create(
        @Body() createDocumentDto: CreateDocumentDto,
        @UploadedFile() file: any,
    ) {
        return this.documentsService.create(createDocumentDto, file);
    }

    @Get()
    async findAll() {
        return this.documentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.documentsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
        return this.documentsService.update(id, updateDocumentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.documentsService.remove(id);
    }
}
