import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface TaskCreationAttrs {
  text: string
  calc?: string
  type: number
  answers?: string[]
  right_answer?: string
  language: string
  section: string
}

@Table({tableName: 'tasks'})
export class Task extends Model<Task, TaskCreationAttrs> {

  @ApiProperty({example: 1, description: 'Уникальный id задания'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: "ExampleText", description: 'Текст задания'})
  @Column({type: DataType.TEXT, allowNull: false})
  text: string

  @ApiProperty({example: "a+b, 1", description: 'Описание выражения для вычисление верного ответа'})
  @Column({type: DataType.STRING, allowNull: true})
  calc: string

  @ApiProperty({example: 0, description: 'Тип задания'})
  @Column({type: DataType.INTEGER, allowNull: false})
  type: number

  @ApiProperty({example: ["ExampleAnswer"], description: 'Варианты ответов'})
  @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
  answers: string[]

  @ApiProperty({example: "ExampleAnswer", description: 'Правильный ответ'})
  @Column({type: DataType.STRING, allowNull: true})
  right_answer: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык задания'})
  @Column({type: DataType.STRING, allowNull: false})
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column({type: DataType.STRING, allowNull: false})
  section: string

}