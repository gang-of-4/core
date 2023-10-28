import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Accounts Service')
    .setDescription('Manage accounts, roles, and permissions')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/accounts', app, document);

  await app.listen(3000);
}
bootstrap();
