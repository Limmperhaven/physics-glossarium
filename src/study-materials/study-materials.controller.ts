import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateFormulaDto } from "../formulas/dto/create-formula.dto";
import { StudyMaterialsService } from "./study-materials.service";
import { StudyMaterialDto } from "./dto/sm.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Formula } from "../formulas/formulas.model";
import { StudyMaterial } from "./study-materials.model";

@ApiTags('Study Materials')
@Controller('study-materials')
export class StudyMaterialsController {

  constructor(private smService: StudyMaterialsService) {}

  @ApiOperation({summary: 'Получение всех учебных материалов'})
  @ApiResponse({status: 200, type: [StudyMaterial]})
  @Get()
  getAll() {
    return this.smService.getAll()
  }

  @ApiOperation({summary: 'Получение учебных материалов по языку и разделу'})
  @ApiResponse({status: 200, type: [StudyMaterial]})
  @Get('/getByParams/:lang/:section')
  getByLangAndSection(@Param('lang') lang: string, @Param('section') section: string) {
    return this.smService.getByLangAndSection(lang, section)
  }

  @ApiOperation({summary: 'Получение учебного материала по id'})
  @ApiResponse({status: 200, type: StudyMaterial})
  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    return this.smService.getById(Number(id))
  }

  @ApiOperation({summary: 'Создание учебного материала'})
  @ApiResponse({status: 201, type: StudyMaterial})
  @Post()
  create(@Body() dto: StudyMaterialDto) {
    return this.smService.create(dto)
  }

  @ApiOperation({summary: 'Обновление учебного материала'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Body() dto: StudyMaterialDto, @Param('id') id: string) {
    return this.smService.update(dto, Number(id))
  }

  @ApiOperation({summary: 'Удаление учебного материала'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.smService.delete(Number(id))
  }

}
