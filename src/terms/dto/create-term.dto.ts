import { ApiProperty } from "@nestjs/swagger";

export class CreateTermDto {

  @ApiProperty({example: 'ExampleName', description: 'Имя термина на русском'})
  readonly name_rus: string

  @ApiProperty({example: 'ExampleName', description: 'Имя термина на языке'})
  readonly name_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык термина'})
  readonly language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  readonly section: string

}