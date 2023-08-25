import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './utils/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const PORT = config.PORT || 8000;
  await app.listen(PORT, () => {
    logger.warn(`Server started on port ${PORT}`);
  });
}
bootstrap();
