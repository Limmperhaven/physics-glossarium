import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TaskTemplateInterface } from "./dto/task-template.interface";
import { TaskGenerator } from "./generator/generator";
import { InjectModel } from "@nestjs/sequelize";
import { Task } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { StudyMaterialDto } from "../study-materials/dto/sm.dto";
import { TaskTypesEnum } from "./enums/task-types.enum";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}

  async createTemplate(dto: CreateTaskDto) {
    if (dto.type === TaskTypesEnum.NOT_GENERATED_TEST && !dto.answers) {
      throw new BadRequestException({message: "Field answers is required in this type"})
    }
    if ((dto.type === TaskTypesEnum.NOT_GENERATED_TEST || dto.type === TaskTypesEnum.NOT_GENERATED_WRITE) && !dto.right_answer) {
      throw new BadRequestException({message: "Field right_answers is required in this type"})
    }

    return await this.tasksRepository.save(dto)
  }

  async getAllTemplates() {
    return await this.tasksRepository.find()
  }

  async getTemplateById(id: number) {
    const template = await this.tasksRepository.findOneBy({id})
    if(!template) {
      throw new BadRequestException({message: "Template was not found"})
    }
    return template
  }

  async getTemplateByLangAndSection(language: string, section: string) {
    if(language !== 'all' && section !== 'all')
      return await this.tasksRepository.find({where: {language, section}})
    if(language === 'all' && section !== 'all')
      return await this.tasksRepository.find({where: {section}})
    if(language !== 'all' && section === 'all')
      return await this.tasksRepository.find({where: {language}})
    if(language === 'all' && section === 'all')
      return await this.tasksRepository.find()
  }

  async getGeneratedById(id: number) {
    await this.tasksRepository.findOneBy({id}).then(task =>{
      return TaskGenerator.generate(task)
    })
  }

  async getGeneratedByLangAndSection(language: string, section: string) {
    let templates: Task[]
    if(language !== 'all' && section !== 'all')
      templates = await this.tasksRepository.find({where: {language, section}})
    if(language === 'all' && section !== 'all')
      templates = await this.tasksRepository.find({where: {section}})
    if(language !== 'all' && section === 'all')
      templates = await this.tasksRepository.find({where: {language}})
    if(language === 'all' && section === 'all')
      templates = await this.tasksRepository.find()

    let tasks: TaskTemplateInterface[] = []

    templates.map(template => {tasks.push(TaskGenerator.generate(template))})

    return tasks
  }

  async updateTemplate(dto: CreateTaskDto, id: number) {
    const task = await this.tasksRepository.findOneBy({id})
    if(!task) {
      throw new NotFoundException({message: 'Template was not found'})
    }
    return await this.tasksRepository.save(Object.assign(task, dto))
  }

  async deleteTemplate(id: number) {
    const task = await this.tasksRepository.delete({id})
    if(!task) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
  }

  test(dto: CreateTaskDto) {
    if (dto.type === TaskTypesEnum.NOT_GENERATED_TEST && !dto.answers) {
      throw new BadRequestException({message: "Field answers is required in this type"})
    }
    if ((dto.type === TaskTypesEnum.NOT_GENERATED_TEST || dto.type === TaskTypesEnum.NOT_GENERATED_WRITE) && !dto.right_answer) {
      throw new BadRequestException({message: "Field right_answer is required in this type"})
    }

    return TaskGenerator.generate(dto)
  }

}
