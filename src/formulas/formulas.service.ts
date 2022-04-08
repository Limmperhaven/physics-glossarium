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

  async getByLang(language: string) {
    return await this.formulasRepository.findBy({language})
  }

  async getById(id: number) {
    const formula = await this.formulasRepository.findOneBy({id})
    if(!formula) {
      throw new NotFoundException({message: "Formula was not found"})
    }
    return formula
  }

  async create(dto: CreateFormulaDto) {
    return this.formulasRepository.create(dto)
  }

  async update(dto: CreateFormulaDto, id: number) {
    const formula = await this.formulasRepository.findOneBy({id})
    if(!formula) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
    return await this.formulasRepository.save({id, ...dto})
  }

  async delete(id: number) {
    const formula = await this.formulasRepository.delete({id})
    if(!formula) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
  }

}
