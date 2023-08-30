import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 全局管道
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 处理跨域
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3005);
}
bootstrap();
