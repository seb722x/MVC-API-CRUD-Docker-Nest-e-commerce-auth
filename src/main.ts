import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.enableCors({
    origin: 'http://localhost:3200', // o true para permitir todas las solicitudes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.setGlobalPrefix('api');

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  const config = new DocumentBuilder()
  .setTitle('SoftLabs API')
  .setDescription('This is an API simulating an e-shop ')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  await app.listen(process.env.PORT);
  logger.log(`App running on port ${ process.env.PORT }`);

}
bootstrap();




//const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useStaticAssets(join(__dirname, '..', 'public'));
 

  //app.setViewEngine('hbs');
  //app.use(
  //  session({
  //    secret: 'nest-book',
  //    resave: false,
  //    saveUninitialized: false,
  //  }),
  //);
  //app.use(function (req, res, next) {
  //  res.locals.session = req.session;
  //  const flashErrors: string[] = req.session.flashErrors;
  //  if (flashErrors) {
  //    res.locals.flashErrors = flashErrors;
  //    req.session.flashErrors = null;
  //  }
  //  next();
  //});



   //app.use('/admin*', function (req, res, next) {
  //  if (req.session.user && req.session.user.role == 'admin') {
  //    next();
  //  } else {
  //    res.redirect('/');
  //  }
  //});

  //app.use('/account*', function (req, res, next) {
  //  if (req.session.user) {
  //  next();
  //  } else {
  //  res.redirect('/');
  //  }
  //  });