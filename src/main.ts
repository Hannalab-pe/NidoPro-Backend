import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); // Prefijo global para todas las rutas
  // Ejemplo: /api/v1/users

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades no definidas
    transform: true, // Transforma automáticamente los datos
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
