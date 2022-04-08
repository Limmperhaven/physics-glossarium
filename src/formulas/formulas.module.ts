import { Module } from '@nestjs/common';
import { FormulasController } from './formulas.controller';
import { FormulasService } from './formulas.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Definition } from "../definitions/definitions.model";
import { Formula } from "./formulas.model";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Term} from "../terms/terms.model";

@Module({
  controllers: [FormulasController],
  providers: [FormulasService],
  imports: [
    TypeOrmModule.forFeature([Formula])
  ]
})
export class FormulasModule {}
