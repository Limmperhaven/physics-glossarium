import { ApiProperty } from "@nestjs/swagger";

export class CreateFormulaDto {

  @ApiProperty({example: 'ExampleName', description: 'Имя формулы на русском'})
  readonly name_rus: string

  @ApiProperty({example: 'ExampleName', description: 'Имя формулы на языке'})
  readonly name_lang: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело формулы'})
  readonly value: string

  @ApiProperty({example: 'ExampleComment', description: 'Комментарий на русском'})
  readonly comment_rus: string

  @ApiProperty({example: 'ExampleComment', description: 'Комментарий на языке'})
  readonly comment_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык формулы'})
  readonly language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  readonly section: string

}