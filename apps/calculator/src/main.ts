import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import configs from '../../../config';
import { urlencoded, json } from 'express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(json({ limit: '70mb' }));
  app.use(urlencoded({ extended: true, limit: '70mb' }));

  const options = new DocumentBuilder()
    .setTitle('calculator API')
    .setDescription('Manage calculator')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: configs.AUTH_PATH,
          scopes: {
            openid: 'openid token'
          },
        }
      }
    })
    .build();

  const storageDocument = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('', app, storageDocument);

  await app.listen(process.env.PORT || 5555);

  console.log(`\nAPI calculator running on: PORT ${process.env.PORT || 5555}`)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
