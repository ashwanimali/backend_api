import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    createdBy: string;
}
