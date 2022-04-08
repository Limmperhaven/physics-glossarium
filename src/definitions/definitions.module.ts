import { Module } from '@nestjs/common';
import { DefinitionsController } from './definitions.controller';
import { DefinitionsService } from './definitions.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Definition } from "./definitions.model";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Term} from "../terms/terms.model";

@Module({
  controllers: [DefinitionsController],
  providers: [DefinitionsService],
  imports: [
    TypeOrmModule.forFeature([Definition])
  ]
})
export class DefinitionsModule {}
