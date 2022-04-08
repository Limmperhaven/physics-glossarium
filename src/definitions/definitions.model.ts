import { ApiProperty } from "@nestjs/swagger";
import {DataType} from "sequelize-typescript";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'definitions'})
export class Definition {

  @ApiProperty({example: 1, description: 'Уникальный id определения'})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя определения на русском'})
  @Column()
  name_rus: string

  @ApiProperty({example: 'ExampleName', description: 'Имя определения на языке'})
  @Column()
  name_lang: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело определения на русском'})
  @Column("text")
  value_rus: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело определения на языке'})
  @Column("text")
  value_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык'})
  @Column()
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column()
  section: string

}