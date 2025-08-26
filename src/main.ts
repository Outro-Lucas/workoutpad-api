import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WorkoutPad API')
    .setDescription('Sistema de gerenciamento de treinos pessoais')
    .setVersion('1.0')
    // .addTag('workouts')
    // .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT || 3000}`);
  console.log(`📚 Swagger available at: http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();