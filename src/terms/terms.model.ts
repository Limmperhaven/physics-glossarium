import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {DataType} from "sequelize-typescript";

@Entity('terms')
export class Term {

  @ApiProperty({example: 1, description: 'Уникальный id термина'})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя термина на русском'})
  @Column()
  name_rus: string

  @ApiProperty({example: 'ExampleName', description: 'Имя термина на языке'})
  @Column()
  name_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык термина'})
  @Column()
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column()
  section: string

}