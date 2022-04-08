import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { FormulasService } from "./formulas.service";
import { CreateFormulaDto } from "./dto/create-formula.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Definition } from "../definitions/definitions.model";
import { Formula } from "./formulas.model";

@ApiTags('Formulas')
@Controller('formulas')
export class FormulasController {

  constructor(private formulasService: FormulasService) {}

  @ApiOperation({summary: 'Получение всех формул'})
  @ApiResponse({status: 200, type: [Formula]})
  @Get()
  getAll() {
    return this.formulasService.getAll()
  }

  @ApiOperation({summary: 'Получение формул по языку'})
  @ApiResponse({status: 200, type: [Formula]})
  @Get('/getByLang/:lang')
  getByLang(@Param('lang') lang: string) {
    return this.formulasService.getByLang(lang)
  }

  @ApiOperation({summary: 'Получение формулы по id'})
  @ApiResponse({status: 200, type: Formula})
  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    return this.formulasService.getById(Number(id))
  }

  @ApiOperation({summary: 'Создание формулы'})
  @ApiResponse({status: 201, type: Formula})
  @Post()
  create(@Body() dto: CreateFormulaDto) {
    return this.formulasService.create(dto)
  }

  @ApiOperation({summary: 'Обновление формулы по id'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Body() dto: CreateFormulaDto, @Param('id') id: string) {
    return this.formulasService.update(dto, Number(id))
  }

  @ApiOperation({summary: 'Удаление формулы по id'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.formulasService.delete(Number(id))
  }

}
