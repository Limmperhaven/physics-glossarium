import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface FormulaCreationAttrs {
  name_rus: string
  name_lang: string
  value: string
  comment_rus: string
  comment_lang: string
  section: string
}

@Table({tableName: 'formulas'})
export class Formula extends Model<Formula, FormulaCreationAttrs> {

  @ApiProperty({example: 1, description: 'Уникальный id формулы'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя формулы на русском'})
  @Column({type: DataType.STRING, allowNull: false})
  name_rus: string

  @ApiProperty({example: 'ExampleName', description: 'Имя формулы на языке'})
  @Column({type: DataType.STRING, allowNull: false})
  name_lang: string

  @ApiProperty({example: 'ExampleValue', description: 'Тело формулы'})
  @Column({type: DataType.TEXT, allowNull: false})
  value: string

  @ApiProperty({example: 'ExampleComment', description: 'Комментарий на русском'})
  @Column({type: DataType.TEXT, allowNull: true})
  comment_rus: string

  @ApiProperty({example: 'ExampleComment', description: 'Комментарий на языке'})
  @Column({type: DataType.TEXT, allowNull: true})
  comment_lang: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык формулы'})
  @Column({type: DataType.STRING, allowNull: false})
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column({type: DataType.STRING, allowNull: false})
  section: string

}