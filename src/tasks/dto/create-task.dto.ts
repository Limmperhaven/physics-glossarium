import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTaskDto {

  @ApiProperty({example: "ExampleText", description: 'Текст задания'})
  readonly text: string

  @ApiPropertyOptional({example: "a+b, 1", description: 'Описание выражения для вычисление верного ответа'})
  readonly calc: string

  @ApiProperty({example: 0, description: 'Тип задания'})
  readonly type: number

  @ApiProperty({example: ["ExampleAnswer"], description: 'Варианты ответов'})
  readonly answers: string[]

  @ApiPropertyOptional({example: "ExampleAnswer", description: 'Правильный ответ'})
  readonly right_answer: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык задания'})
  readonly language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  readonly section: string

}