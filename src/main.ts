import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('EngiWorld REST API')
    .setDescription('Документация к REST API мультиязыковой платформы EngiWorld')
    .setVersion('2.0.1')
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/docs', app, swaggerDocument)

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}

start()