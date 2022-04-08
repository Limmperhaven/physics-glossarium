import { Module } from '@nestjs/common';
import { DefinitionsController } from './definitions.controller';
import { DefinitionsService } from './definitions.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Definition } from "./definitions.model";

@Module({
  controllers: [DefinitionsController],
  providers: [DefinitionsService],
  imports: [
    SequelizeModule.forFeature([Definition])
  ]
})
export class DefinitionsModule {}
