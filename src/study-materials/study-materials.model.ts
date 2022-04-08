import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface StudyMaterialCreationAttrs {
  name_lang: string
  name_rus: string
  purpose_lang: string
  purpose_rus: string
  link: string
  language: string
  section: string
}

@Table({tableName: 'study_materials'})
export class StudyMaterial extends Model<StudyMaterial, StudyMaterialCreationAttrs> {

  @ApiProperty({example: 1, description: 'Уникальный id учебного материала'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'ExampleName', description: 'Имя на языке'})
  @Column({type: DataType.STRING, allowNull: false})
  name_lang: string

  @ApiProperty({example: 'ExampleName', description: 'Имя на русском'})
  @Column({type: DataType.STRING, allowNull: false})
  name_rus: string

  @ApiProperty({example: 'ExamplePurpose', description: 'Назначение на языке'})
  @Column({type: DataType.TEXT, allowNull: false})
  purpose_lang: string

  @ApiProperty({example: 'ExamplePurpose', description: 'Назначение на русском'})
  @Column({type: DataType.TEXT, allowNull: false})
  purpose_rus: string

  @ApiProperty({example: 'https://youtube.com/', description: 'Ссылка на учебный материал'})
  @Column({type: DataType.TEXT, allowNull: false})
  link: string

  @ApiProperty({example: 'ExampleLanguage', description: 'Язык учебного материала'})
  @Column({type: DataType.STRING, allowNull: false})
  language: string

  @ApiProperty({example: 'ExampleSection', description: 'Раздел'})
  @Column({type: DataType.STRING, allowNull: false})
  section: string

}