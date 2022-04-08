import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";
import { DefinitionsModule } from './definitions/definitions.module';
import { FormulasModule } from './formulas/formulas.module';
import { TermsModule } from './terms/terms.module';
import { TasksModule } from './tasks/tasks.module';
import { StudyMaterialsModule } from './study-materials/study-materials.module';
import * as path from 'path'
import { Definition } from "./definitions/definitions.model";
import { Formula } from "./formulas/formulas.model";
import { Term } from "./terms/terms.model";
import { Task } from "./tasks/tasks.model";
import { StudyMaterial } from "./study-materials/study-materials.model";

@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
  }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Definition, Formula, Term, Task, StudyMaterial],
      autoLoadModels: true,
      define: {
        timestamps: false
      }
    }),
    DefinitionsModule,
    FormulasModule,
    TermsModule,
    TasksModule,
    StudyMaterialsModule]
})
export class AppModule {}