import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'catalog',
      protoPath: 'src/grpc/catalog.proto',
      url: '0.0.0.0:50052',
      loader: {
        longs: Number,
        arrays: true,
      },
    },
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Catalog Service')
    .setDescription('Manage items, categories, options, and more ...')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/catalog', app, document);

  await app.startAllMicroservices();
  await app.listen(3006);
}
bootstrap();
