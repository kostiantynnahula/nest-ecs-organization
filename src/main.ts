import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      skipMissingProperties: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Organization API')
    .setDescription('The Organization API description')
    .setVersion('0.1')
    .build();

  app.setGlobalPrefix('organization');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('organization/api', app, document);

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
