import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
    preload: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('DocumentsService', () => {
    let service: DocumentsService;
    let repository: MockRepository<Document>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DocumentsService,
                {
                    provide: getRepositoryToken(Document),
                    useValue: mockRepository(),
                },
            ],
        }).compile();

        service = module.get<DocumentsService>(DocumentsService);
        repository = module.get<MockRepository<Document>>(getRepositoryToken(Document));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all documents', async () => {
            const documents = [{ id: '1', title: 'Test', description: 'Test description', filePath: '/path' }];
            repository.find.mockResolvedValue(documents);

            const result = await service.findAll();
            expect(result).toEqual(documents);
        });
    });

    describe('findOne', () => {
        it('should return a document if found', async () => {
            const document = { id: '1', title: 'Test', description: 'Test description', filePath: '/path' };
            repository.findOne.mockResolvedValue(document);

            const result = await service.findOne('1');
            expect(result).toEqual(document);
        });

        it('should throw NotFoundException if document is not found', async () => {
            repository.findOne.mockResolvedValue(null);

            await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should create and return a document', async () => {
            const document = { id: '1', title: 'Test', description: 'Test description', filePath: '/path' };
            repository.create.mockReturnValue(document);
            repository.save.mockResolvedValue(document);

            const result = await service.create({ title: 'Test', description: 'Test description' }, { path: '/path' } as any);
            expect(result).toEqual(document);
        });
    });

    describe('update', () => {
        it('should update and return a document', async () => {
            const document = { id: '1', title: 'Updated', description: 'Updated description', filePath: '/path' };
            repository.preload.mockResolvedValue(document);
            repository.save.mockResolvedValue(document);

            const result = await service.update('1', { title: 'Updated', description: 'Updated description' });
            expect(result).toEqual(document);
        });

        it('should throw NotFoundException if document is not found', async () => {
            repository.preload.mockResolvedValue(null);

            await expect(service.update('1', { title: 'Updated' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete a document', async () => {
            const document = { id: '1', title: 'Test', description: 'Test description', filePath: '/path' };
            repository.findOne.mockResolvedValue(document);
            repository.remove.mockResolvedValue(document);

            const result = await service.remove('1');
            expect(result).toEqual(document);
        });

        it('should throw NotFoundException if document is not found', async () => {
            repository.findOne.mockResolvedValue(null);

            await expect(service.remove('1')).rejects.toThrow(NotFoundException);
        });
    });
});
