import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, PrimaryGeneratedColumn, Table} from "typeorm";
import {DataType} from "sequelize-typescript";

@Entity('study_materials')
export class StudyMaterial {

  @ApiProperty({example: 1, description: 'Уникальный id учебного материала'})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя на языке'})
  @Column()
  name_lang: string

  @ApiProperty({example: 'ExampleName', description: 'Имя на русском'})
  @Column()
  name_rus: string

  @ApiProperty({example: 'ExamplePurpose', description: 'Назначение на языке'})
  @Column("text")
  purpose_lang: string

  @ApiProperty({example: 'ExamplePurpose', description: 'Назначение на русском'})
  @Column("text")
  purpose_rus: string

  @ApiProperty({example: 'https://youtube.com/', description: 'Ссылка на учебный материал'})
  @Column("text")
  link: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык учебного материала'})
  @Column()
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column()
  section: string

}