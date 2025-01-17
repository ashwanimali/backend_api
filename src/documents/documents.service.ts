import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) { }

    async create(createDocumentDto: CreateDocumentDto, file: any) {
        const document = this.documentRepository.create({
            ...createDocumentDto,
            filePath: file.path,
        });
        return this.documentRepository.save(document);
    }

    async findAll() {
        return this.documentRepository.find();
    }

    async findOne(id: string) {
        const document = await this.documentRepository.findOne({ where: { id } });
        if (!document) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
        return document;
    }

    async update(id: string, updateDocumentDto: UpdateDocumentDto) {
        const document = await this.documentRepository.preload({
            id,
            ...updateDocumentDto,
        });
        if (!document) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
        return this.documentRepository.save(document);
    }

    async remove(id: string) {
        const document = await this.findOne(id);
        return this.documentRepository.remove(document);
    }
}
