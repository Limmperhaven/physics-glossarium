import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { StudyMaterial } from "../study-materials/study-materials.model";
import { Task } from "./tasks.model";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Task])
  ]
})
export class TasksModule {}
