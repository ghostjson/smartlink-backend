import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AccessTokenGuard } from './guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  // validation configuration
  app.useGlobalPipes(new ValidationPipe())

  // restrict all apis
  const reflector = new Reflector()
  app.useGlobalGuards(new AccessTokenGuard(reflector))

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
