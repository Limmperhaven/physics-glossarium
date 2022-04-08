import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Formula } from "./formulas.model";
import { CreateFormulaDto } from "./dto/create-formula.dto";
import { CreateDefinitionDto } from "../definitions/dto/create-definition.dto";

@Injectable()
export class FormulasService {

  constructor(@InjectModel(Formula) private formulasRepository: typeof Formula) {}

  async getAll() {
    return await this.formulasRepository.findAll()
  }

  async getByLang(language: string) {
    return await this.formulasRepository.findAll({where: {language}})
  }

  async getById(id: number) {
    const formula = await this.formulasRepository.findByPk(id)
    if(!formula) {
      throw new NotFoundException({message: "Formula was not found"})
    }
    return formula
  }

  async create(dto: CreateFormulaDto) {
    return await this.formulasRepository.create(dto)
  }

  async update(dto: CreateFormulaDto, id: number) {
    const formula = await this.formulasRepository.findByPk(id)
    if(!formula) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
    return await this.formulasRepository.update(dto, {where: {id}})
  }

  async delete(id: number) {
    const formula = await this.formulasRepository.destroy({where: {id}})
    if(!formula) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
  }

}
