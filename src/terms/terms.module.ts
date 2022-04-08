import { Module } from '@nestjs/common';
import { TermsController } from './terms.controller';
import { TermsService } from './terms.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { StudyMaterial } from "../study-materials/study-materials.model";
import { Term } from "./terms.model";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  controllers: [TermsController],
  providers: [TermsService],
  imports: [
    TypeOrmModule.forFeature([Term])
  ]
})
export class TermsModule {}
