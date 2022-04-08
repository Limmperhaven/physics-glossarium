import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {DataType} from "sequelize-typescript";

@Entity('formulas')
export class Formula {

  @ApiProperty({example: 1, description: 'Уникальный id формулы'})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя формулы на русском'})
  @Column()
  name_rus: string

  @ApiProperty({example: 'ExampleName', description: 'Имя формулы на языке'})
  @Column()
  name_lang: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело формулы'})
  @Column("text")
  value: string

  @ApiProperty({example: 'ExampleComment', description: 'Комментарий на русском'})
  @Column("text", {nullable: true})
  comment_rus?: string

  @ApiProperty({example: 'ExampleComment', description: 'Комментарий на языке'})
  @Column("text", {nullable: true})
  comment_lang?: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык формулы'})
  @Column()
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column()
  section: string

}