import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { TermsService } from "./terms.service";
import { CreateTermDto } from "./dto/create-term.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTaskDto} from "../tasks/dto/create-task.dto";
import {Term} from "./terms.model";

@ApiTags('Terms')
@Controller('terms')
export class TermsController {

  constructor(private termsService: TermsService) {}

  @ApiOperation({summary: 'Получение всех терминов'})
  @ApiResponse({status: 200, type: [Term]})
  @Get()
  getAll() {
    return this.termsService.getAll()
  }

  @ApiOperation({summary: 'Получение терминов по языку и разделу'})
  @ApiResponse({status: 200, type: [Term]})
  @Get('/getByParams/:lang/:section')
  getByLangAndSection(@Param('lang') lang: string, @Param('section') section: string) {
    return this.termsService.getByLangAndSection(lang, section)
  }

  @ApiOperation({summary: 'Получение термина по id'})
  @ApiResponse({status: 200, type: Term})
  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    return this.termsService.getById(Number(id))
  }

  @ApiOperation({summary: 'Создание нового термина'})
  @ApiResponse({status: 201, type: Term})
  @Post()
  create(@Body() dto: CreateTermDto) {
    return this.termsService.create(dto)
  }

  @ApiOperation({summary: 'Обновление существующего термина'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Body() dto: CreateTermDto, @Param('id') id: string) {
    return this.termsService.update(dto, Number(id))
  }

  @ApiOperation({summary: 'Удаление существующего термина'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.termsService.delete(Number(id))
  }

}
