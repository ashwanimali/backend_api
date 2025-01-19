import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - should login and return access token', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password' })
            .expect(201);

        expect(response.body).toHaveProperty('access_token');
    });

    afterAll(async () => {
        await app.close();
    });
});
