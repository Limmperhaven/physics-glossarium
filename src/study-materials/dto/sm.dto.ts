import { ApiProperty } from "@nestjs/swagger";

export class StudyMaterialDto {

  @ApiProperty({example: 'ExampleName', description: 'Имя на языке'})
  readonly name_lang: string

  @ApiProperty({example: 'ExampleName', description: 'Имя на русском'})
  readonly name_rus: string

  @ApiProperty({example: 'ExamplePurpose', description: 'Назначение на языке'})
  readonly purpose_lang: string

  @ApiProperty({example: 'ExamplePurpose', description: 'Назначение на русском'})
  readonly purpose_rus: string

  @ApiProperty({example: 'https://youtube.com/', description: 'Ссылка на учебный материал'})
  readonly link: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык учебного материала'})
  readonly language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  readonly section: string

}