import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation configuration
  app.useGlobalPipes(new ValidationPipe())

  // swagger configuration
  const config = new DocumentBuilder().setTitle('Smartlink API')
    .setDescription('Smartlink API swagger documentation')
    .setVersion('1.0.0')
    .build()

  const documentation = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, documentation)

  await app.listen(3000);
}
bootstrap();
