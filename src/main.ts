import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  console.log(configService.get('PATIENT_HOST'), 'host');
  console.log(configService.get('PATIENT_PORT'), 'port');

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP'),
    },
  });

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

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
