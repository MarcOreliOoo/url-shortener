import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	// Starting the application
	const app = await NestFactory.create(AppModule);

	// Enabling CORS
	app.enableCors();

	// Adding a global validation pipe for dto with class-validator and transformer
	app.useGlobalPipes(new ValidationPipe());

	// Listening on port 3000
	await app.listen(3000);
}
bootstrap();
