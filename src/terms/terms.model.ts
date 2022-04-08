import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface TermCreationAttrs {
  name_rus: string
  name_lang: string
  language: string
  section: string
}

@Table({tableName: 'terms'})
export class Term extends Model<Term, TermCreationAttrs> {

  @ApiProperty({example: 1, description: 'Уникальный id термина'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя термина на русском'})
  @Column({type: DataType.STRING, allowNull: false})
  name_rus: string

  @ApiProperty({example: 'ExampleName', description: 'Имя термина на языке'})
  @Column({type: DataType.STRING, allowNull: false})
  name_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык термина'})
  @Column({type: DataType.STRING, allowNull: false})
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column({type: DataType.STRING, allowNull: false})
  section: string

}