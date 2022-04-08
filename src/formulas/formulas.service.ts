import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Formula } from "./formulas.model";
import { CreateFormulaDto } from "./dto/create-formula.dto";
import { CreateDefinitionDto } from "../definitions/dto/create-definition.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class FormulasService {

  constructor(@InjectRepository(Formula) private formulasRepository: Repository<Formula>) {}

  async getAll() {
    return await this.formulasRepository.find()
  }

  async getByLangAndSection(language: string, section: string) {
    if(language !== 'all' && section !== 'all')
      return await this.formulasRepository.find({where: {language, section}})
    if(language === 'all' && section !== 'all')
      return await this.formulasRepository.find({where: {section}})
    if(language !== 'all' && section === 'all')
      return await this.formulasRepository.find({where: {language}})
    if(language === 'all' && section === 'all')
      return await this.formulasRepository.find()
  }

  async getById(id: number) {
    const formula = await this.formulasRepository.findOneBy({id})
    if(!formula) {
      throw new NotFoundException({message: "Formula was not found"})
    }
    return formula
  }

  async create(dto: CreateFormulaDto) {
    return await this.formulasRepository.save(dto)
  }

  async update(dto: CreateFormulaDto, id: number) {
    const formula = await this.formulasRepository.findOneBy({id})
    if(!formula) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
    return await this.formulasRepository.save(Object.assign(formula, dto))
  }

  async delete(id: number) {
    const destroy = await this.formulasRepository.delete({id})
    if(!destroy.affected) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
  }

}
