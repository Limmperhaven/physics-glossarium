import { Module } from '@nestjs/common';
import { StudyMaterialsController } from './study-materials.controller';
import { StudyMaterialsService } from './study-materials.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Formula } from "../formulas/formulas.model";
import { StudyMaterial } from "./study-materials.model";

@Module({
  controllers: [StudyMaterialsController],
  providers: [StudyMaterialsService],
  imports: [
    SequelizeModule.forFeature([StudyMaterial])
  ]
})
export class StudyMaterialsModule {}
