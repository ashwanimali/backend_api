import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { DatabaseModule } from './database/database.module';
import { UserSeeder } from './seeder/user.seeder';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { UserMiddleware } from './common/middleware/user.middleware';
import { AllExceptionFilter } from './common/filters/exception.filter';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available throughout the app
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    DocumentsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    UserSeeder
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware) // Apply the UserMiddleware here
      .forRoutes('*'); // Apply to all routes or specify particular routes
  }
 }
