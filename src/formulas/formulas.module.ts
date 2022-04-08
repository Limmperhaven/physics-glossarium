import { Module } from '@nestjs/common';
import { FormulasController } from './formulas.controller';
import { FormulasService } from './formulas.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Definition } from "../definitions/definitions.model";
import { Formula } from "./formulas.model";

@Module({
  controllers: [FormulasController],
  providers: [FormulasService],
  imports: [
    SequelizeModule.forFeature([Formula])
  ]
})
export class FormulasModule {}
