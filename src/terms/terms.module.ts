import { Module } from '@nestjs/common';
import { TermsController } from './terms.controller';
import { TermsService } from './terms.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { StudyMaterial } from "../study-materials/study-materials.model";
import { Term } from "./terms.model";

@Module({
  controllers: [TermsController],
  providers: [TermsService],
  imports: [
    SequelizeModule.forFeature([Term])
  ]
})
export class TermsModule {}
