import { Controller, Get, Post, Patch, Delete, Param, Body, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer-config.util';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Roles('admin', 'editor')
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async create(
        @Body() createDocumentDto: CreateDocumentDto,
        @UploadedFile() file: any,
        @Req() req: any
    ) {
        console.log("in document", req.user)
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

    @Roles('admin', 'editor')
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
        return this.documentsService.update(id, updateDocumentDto);
    }

    @Roles('admin', 'editor')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.documentsService.remove(id);
    }
}
