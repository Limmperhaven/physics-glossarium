import { ApiProperty } from "@nestjs/swagger";

export class CreateDefinitionDto {

  @ApiProperty({description: "Имя определения", example: 'TestName'})
  readonly name: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело определения на русском'})
  readonly value_rus: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело определения на языке'})
  readonly value_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык'})
  readonly language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  readonly section: string

}