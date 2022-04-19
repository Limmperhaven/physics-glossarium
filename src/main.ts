import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Glossary REST API')
    .setDescription('Документация к REST API глоссария физических терминов\n\nДля тех, кто не работал (или работал мало) с OpenAPI:\n' +
        '1. Вы можете рядом с каждой схемой нажать на <b>Schema</b> и посмотреть на обязательность полей (обязательные ' +
        'обозначены звездочкой)\n2. Все запросы вы можете потыкать, авторизация отключена\n\n<h3>P.S.</h3> \n\n' +
        'В эндпоинте <b>getByParams</b> оба параметра обязательны, поэтому если вы не хотите его учитывать, пишите в параметр <i><b>all</b></i>')
    .setVersion('2.0.1')
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/docs', app, swaggerDocument)

  app.enableCors()

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}

start()