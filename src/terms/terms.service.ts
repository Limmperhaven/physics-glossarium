import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Term } from "./terms.model";
import { CreateTermDto } from "./dto/create-term.dto";
import { CreateDefinitionDto } from "../definitions/dto/create-definition.dto";

@Injectable()
export class TermsService {

  constructor(@InjectModel(Term) private termsRepository: typeof Term) {}

  async create(dto: CreateTermDto) {
    return await this.termsRepository.create(dto)
  }

  async getAllDefinitions() {
    return await this.termsRepository.findAll()
  }

  async getDefinitionsByLang(language: string) {
    return await this.termsRepository.findAll({where: {language}})
  }

  async getDefinitionById(id: number) {
    const term = await this.termsRepository.findByPk(id)
    if(!term) {
      throw new NotFoundException({message: "Definition was not found"})
    }
    return term
  }

  async createDefinition(dto: CreateTermDto) {
    return await this.termsRepository.create(dto)
  }

  async updateDefinition(dto: CreateTermDto, id: number) {
    const term = await this.termsRepository.findByPk(id)
    if(!term) {
      throw new NotFoundException({message: 'Term was not found'})
    }
    return await this.termsRepository.update(dto, {where: {id}})
  }

  async deleteDefinition(id: number) {
    const destroy = await this.termsRepository.destroy({where: {id}})
    if(!destroy) {
      throw new NotFoundException({message: 'Term was not found'})
    }
  }

}
