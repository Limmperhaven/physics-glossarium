import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { TermsService } from "./terms.service";
import { CreateTermDto } from "./dto/create-term.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Terms')
@Controller('terms')
export class TermsController {

  constructor(private termsService: TermsService) {}

  @Get()
  getAll() {
    return this.termsService.getAllDefinitions()
  }

  @Get('/getByLang/:lang')
  getByLang(@Param('lang') lang: string) {
    return this.termsService.getDefinitionsByLang(lang)
  }

  @Get('/getById/:id')
  getById(@Param('id') id: string) {
    return this.termsService.getDefinitionById(Number(id))
  }

  @Post()
  create(@Body() dto: CreateTermDto) {
    return this.termsService.createDefinition(dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Body() dto: CreateTermDto, @Param('id') id: string) {
    return this.termsService.updateDefinition(dto, Number(id))
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  patch(@Body() dto: CreateTermDto, @Param('id') id: string) {
    return this.termsService.updateDefinition(dto, Number(id))
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.termsService.deleteDefinition(Number(id))
  }

}
