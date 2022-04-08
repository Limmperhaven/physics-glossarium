import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('EngiWorld REST API')
    .setDescription('Документация к REST API мультиязыковой платформы EngiWorld\n\nДля тех, кто не работал с OpenAPI:\n' +
        '1. Вы можете рядом с каждой схемой нажать на <b>Schema</b> и посмотреть на обязательность полей (обязательные' +
        'обозначены звездочкой)\n2. Все запросы вы можете потыкать, авторизация отключена\n\n<h3>P.S.</h3> В теге <b>Tasks</b> ' +
        'в эндпоинте <i>getParams</i> оба параметра обязательны, то если вы не хотите его учитывать, пишите в параметр <i><b>all</b></i>')
    .setVersion('2.0.1')
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/docs', app, swaggerDocument)

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}

start()