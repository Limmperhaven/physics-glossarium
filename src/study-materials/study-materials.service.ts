import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFormulaDto } from "../formulas/dto/create-formula.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StudyMaterial } from "./study-materials.model";
import { StudyMaterialDto } from "./dto/sm.dto";

@Injectable()
export class StudyMaterialsService {

  constructor(@InjectModel(StudyMaterial) private smRepository: typeof StudyMaterial) {
  }

  async getAll() {
    return await this.smRepository.findAll()
  }

  async getByLang(language: string) {
    return await this.smRepository.findAll({where: {language}})
  }

  async getById(id: number) {
    const sm = await this.smRepository.findByPk(id)
    if(!sm) {
      throw new NotFoundException({message: "Formula was not found"})
    }
    return sm
  }

  async create(dto: StudyMaterialDto) {
    return await this.smRepository.create(dto)
  }

  async update(dto: StudyMaterialDto, id: number) {
    const sm = await this.smRepository.findByPk(id)
    if(!sm) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
    return await this.smRepository.update(dto, {where: {id}})
  }

  async delete(id: number) {
    const sm = await this.smRepository.destroy({where: {id}})
    if(!sm) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
  }

}
