import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setUpSwagger(app: NestFastifyApplication) {
  const options = new DocumentBuilder()
    .setTitle('Zombie API')
    .setDescription('Zombie API')
    .setVersion('1.0')
    .addTag('zombie')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  setUpSwagger(app);

  await app.listen(3000);
}
bootstrap();
