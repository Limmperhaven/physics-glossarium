import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFormulaDto } from "../formulas/dto/create-formula.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StudyMaterial } from "./study-materials.model";
import { StudyMaterialDto } from "./dto/sm.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class StudyMaterialsService {

  constructor(@InjectRepository(StudyMaterial) private smRepository: Repository<StudyMaterial>) {
  }

  async getAll() {
    return await this.smRepository.find()
  }

  async getByLang(language: string) {
    return await this.smRepository.find({where: {language}})
  }

  async getById(id: number) {
    const sm = await this.smRepository.findOneBy({id})
    if(!sm) {
      throw new NotFoundException({message: "Formula was not found"})
    }
    return sm
  }

  async create(dto: StudyMaterialDto) {
    return this.smRepository.create(dto)
  }

  async update(dto: StudyMaterialDto, id: number) {
    const sm = await this.smRepository.findOneBy({id})
    if(!sm) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
    return await this.smRepository.save({id, ...dto})
  }

  async delete(id: number) {
    const sm = await this.smRepository.delete({id})
    if(!sm) {
      throw new NotFoundException({message: 'Formula was not found'})
    }
  }

}
