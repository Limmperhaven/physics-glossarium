import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { DefinitionsService } from "./definitions.service";
import { CreateDefinitionDto } from "./dto/create-definition.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Definition } from "./definitions.model";

@ApiTags('Definitions')
@Controller('definitions')
export class DefinitionsController {

  constructor(private definitionsService: DefinitionsService) {}

  @ApiOperation({summary: 'Получение всех определений'})
  @ApiResponse({status: 200, type: [Definition]})
  @Get()
  getAll() {
    return this.definitionsService.getAll()
  }

  @ApiOperation({summary: 'Получение определения по языку и разделу'})
  @ApiResponse({status: 200, type: [Definition]})
  @Get('/getByParams/:lang/:section')
  getByLangAndSection(@Param('lang') lang: string, @Param('section') section: string) {
    return this.definitionsService.getByLangAndSection(lang, section)
  }

  @ApiOperation({summary: 'Получение определения по id'})
  @ApiResponse({status: 200, type: Definition})
  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    return this.definitionsService.getById(Number(id))
  }

  @ApiOperation({summary: 'Создание нового определения'})
  @ApiResponse({status: 201, type: [Definition]})
  @Post()
  create(@Body() dto: CreateDefinitionDto) {
    return this.definitionsService.create(dto)
  }

  @ApiOperation({summary: 'Обновление определения по id'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Body() dto: CreateDefinitionDto, @Param('id') id: string) {
    return this.definitionsService.update(dto, Number(id))
  }

  @ApiOperation({summary: 'Удаление определения по id'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.definitionsService.delete(Number(id))
  }

}
