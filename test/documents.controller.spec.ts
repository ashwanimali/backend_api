import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from '../src/documents/documents.controller';
import { DocumentsService } from '../src/documents/documents.service';
import { CreateDocumentDto } from '../src/documents/dto/create-document.dto';
import { UpdateDocumentDto } from '../src/documents/dto/update-document.dto';

describe('DocumentsController', () => {
    let controller: DocumentsController;
    let service: DocumentsService;

    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DocumentsController],
            providers: [
                {
                    provide: DocumentsService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<DocumentsController>(DocumentsController);
        service = module.get<DocumentsService>(DocumentsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a document', async () => {
            const dto: CreateDocumentDto = { title: 'Test', description: 'Test description' };
            const file = { path: '/path' } as any;
            mockService.create.mockResolvedValue({ ...dto, id: '1', filePath: file.path });

            const result = await controller.create(dto, file);
            expect(result).toEqual({ ...dto, id: '1', filePath: file.path });
        });
    });

    describe('findAll', () => {
        it('should return all documents', async () => {
            mockService.findAll.mockResolvedValue([]);
            const result = await controller.findAll();
            expect(result).toEqual([]);
        });
    });

    describe('findOne', () => {
        it('should return a document', async () => {
            const document = { id: '1', title: 'Test', description: 'Test description', filePath: '/path' };
            mockService.findOne.mockResolvedValue(document);

            const result = await controller.findOne('1');
            expect(result).toEqual(document);
        });
    });

    describe('update', () => {
        it('should update a document', async () => {
            const dto: UpdateDocumentDto = { title: 'Updated' };
            const document = { id: '1', ...dto, description: 'Test description', filePath: '/path' };
            mockService.update.mockResolvedValue(document);

            const result = await controller.update('1', dto);
            expect(result).toEqual(document);
        });
    });

    describe('remove', () => {
        it('should delete a document', async () => {
            const document = { id: '1', title: 'Test', description: 'Test description', filePath: '/path' };
            mockService.remove.mockResolvedValue(document);

            const result = await controller.remove('1');
            expect(result).toEqual(document);
        });
    });
});
