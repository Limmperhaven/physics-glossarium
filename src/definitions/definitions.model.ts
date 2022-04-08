import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface DefinitionCreationAttrs {
  name: string
  value_rus: string
  value_lang: string
  language: string
  section: string
}

@Table({tableName: 'definitions'})
export class Definition extends Model<Definition, DefinitionCreationAttrs> {

  @ApiProperty({example: 1, description: 'Уникальный id определения'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя определения'})
  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело определения на русском'})
  @Column({type: DataType.TEXT, allowNull: false})
  value_rus: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело определения на языке'})
  @Column({type: DataType.TEXT, allowNull: false})
  value_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык'})
  @Column({type: DataType.STRING, allowNull: false})
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column({type: DataType.STRING, allowNull: false})
  section: string

}