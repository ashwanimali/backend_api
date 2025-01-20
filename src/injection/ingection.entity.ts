import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ingestion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: string;

    @Column()
    completedAt: Date;

    @Column()
    errorMessage: string;

    @Column()
    documentId: string;
}
