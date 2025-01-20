import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (POST) - should create a new user', async () => {
        const response = await request(app.getHttpServer())
            .post('/users')
            .send({ email: 'test@example.com', password: 'password' })
            .expect(201);

        expect(response.body).toMatchObject({
            id: expect.any(String),
            email: 'test@example.com',
        });
    });

    it('/users/:id/role (PATCH) - should update a user role', async () => {
        const response = await request(app.getHttpServer())
            .patch('/users/1/role')
            .send({ role: 'admin' })
            .expect(200);

        expect(response.body).toMatchObject({
            id: '1',
            role: 'admin',
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
