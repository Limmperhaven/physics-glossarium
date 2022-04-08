import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Task } from "./tasks.model";
import {GeneratedTaskDto} from "./dto/generated-task-dto";

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {

  constructor(public tasksService: TasksService) {}

  @ApiOperation({summary: 'Создание задания'})
  @ApiResponse({status: 201, type: Task})
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTemplate(dto)
  }

  @ApiOperation({summary: 'Получение всех шаблонов'})
  @ApiResponse({status: 200, type: [Task]})
  @Get('template')
  getAllTemplates() {
    return this.tasksService.getAllTemplates()
  }

  @ApiOperation({summary: 'Получение задания по id'})
  @ApiResponse({status: 200, type: Task})
  @Get("template/getById/:id")
  getTemplateById(@Param('id') id: string) {
    return this.tasksService.getTemplateById(Number(id))
  }

  @ApiOperation({summary: 'Получение заданий по языку и разделу'})
  @ApiResponse({status: 200, type: [Task]})
  @Get('template/getByParams/:lang/:section')
  getTemplateByLangAndSection(@Param('lang') lang: string, @Param('section') section: string) {
    return this.tasksService.getTemplateByLangAndSection(lang, section)
  }

  @ApiOperation({summary: 'Получение сгенерированного задания по id'})
  @ApiResponse({status: 201, type: GeneratedTaskDto})
  @Get('generate/getById/:id')
  getGeneratedById(@Param('id') id: string) {
    return this.tasksService.getGeneratedById(Number(id))
  }

  @ApiOperation({summary: 'Получение сгенерированных заданий по языку и разделу'})
  @ApiResponse({status: 201, type: [CreateTaskDto]})
  @Get('generate/getByParams/:lang/:section')
  getGeneratedByLangAndSection(@Param('lang') lang: string, @Param('section') section: string) {
    return this.tasksService.getGeneratedByLangAndSection(lang, section)
  }

  @ApiOperation({summary: 'Обновление шаблона задания'})
  @Put('template/:id')
  updateTemplateById(@Param('id') id: string, dto: CreateTaskDto) {
    return this.tasksService.updateTemplate(dto, Number(id))
  }

  @ApiOperation({summary: 'Удаление шаблона задания'})
  @Delete('template/:id')
  deleteTemplateById(@Param('id') id: string) {
    return this.tasksService.deleteTemplate(Number(id))
  }

  @ApiOperation({summary: 'Проверка генерации задания из шаблона'})
  @Post('test')
  test(@Body() dto: CreateTaskDto) {
    return this.tasksService.test(dto)
  }

}
