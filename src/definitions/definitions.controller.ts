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
    return this.definitionsService.getAllDefinitions()
  }

  @ApiOperation({summary: 'Получение определения по языку'})
  @ApiResponse({status: 200, type: [Definition]})
  @Get('/getByLang/:lang')
  getByLang(@Param('lang') lang: string) {
    return this.definitionsService.getDefinitionsByLang(lang)
  }

  @ApiOperation({summary: 'Получение определения по id'})
  @ApiResponse({status: 200, type: Definition})
  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    return this.definitionsService.getDefinitionById(Number(id))
  }

  @ApiOperation({summary: 'Создание нового определения'})
  @ApiResponse({status: 201, type: [Definition]})
  @Post()
  create(@Body() dto: CreateDefinitionDto) {
    return this.definitionsService.createDefinition(dto)
  }

  @ApiOperation({summary: 'Обновление определения по id'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Body() dto: CreateDefinitionDto, @Param('id') id: string) {
    return this.definitionsService.updateDefinition(dto, Number(id))
  }

  @ApiOperation({summary: 'Удаление определения по id'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.definitionsService.deleteDefinition(Number(id))
  }

}
