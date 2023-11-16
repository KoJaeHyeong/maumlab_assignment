import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

class Application {
  private logger = new Logger(Application.name);
  private corsOriginList: string[];
  private PORT = process.env.PORT;

  constructor(private server: NestExpressApplication) {
    this.server = server;

    this.corsOriginList = process.env.CORS_LIST
      ? process.env.COR_LIST.split(',').map((origin) => origin.trim())
      : ['*'];
  }

  private async setGlobalMiddleWare() {
    this.server.enableCors({
      origin: this.corsOriginList,
      credentials: true,
    });
    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    // new RequestValidationPipe(),
    //   // );
    this.server.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.server.get(Reflector)),
    );
    this.server.useGlobalFilters(new HttpExceptionFilter());
  }

  async bootstrap() {
    await this.setGlobalMiddleWare();
    await this.server.listen(this.PORT);
    this.serverLog();
  }

  serverLog() {
    if (process.env.DEV_MODE === 'dev') {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}/graphql`);
    } else {
      this.logger.log(`✅ Server on ${this.PORT}/graphql`);
    }
  }
}

const init = async (): Promise<void> => {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.bootstrap();
};

init().catch((err) => {
  new Logger('init').error(err);
});
