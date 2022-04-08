import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {DataType} from "sequelize-typescript";

@Entity('tasks')
export class Task {

  @ApiProperty({example: 1, description: 'Уникальный id задания'})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: "ExampleText", description: 'Текст задания'})
  @Column('text')
  text: string

  @ApiProperty({example: "a+b, 1", description: 'Описание выражения для вычисление верного ответа'})
  @Column({nullable: true})
  calc: string

  @ApiProperty({example: 0, description: 'Тип задания'})
  @Column()
  type: number

  @ApiProperty({example: ["ExampleAnswer"], description: 'Варианты ответов'})
  @Column("simple-array", {nullable: true})
  answers: string[]

  @ApiProperty({example: "ExampleAnswer", description: 'Правильный ответ'})
  @Column({nullable: true})
  right_answer: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык задания'})
  @Column()
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column()
  section: string

}