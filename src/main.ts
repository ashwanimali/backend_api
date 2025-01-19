import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserSeeder } from './seeder/user.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Run the UserSeeder to initialize the admin user
  const seeder = app.get(UserSeeder);
  await seeder.onModuleInit();

  // Start the application and listen on the specified port
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
