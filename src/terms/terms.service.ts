import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Term } from "./terms.model";
import { CreateTermDto } from "./dto/create-term.dto";
import { CreateDefinitionDto } from "../definitions/dto/create-definition.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TermsService {

  constructor(@InjectRepository(Term) private termsRepository: Repository<Term>) {}

  async create(dto: CreateTermDto) {
    return this.termsRepository.create(dto)
  }

  async getAllDefinitions() {
    return await this.termsRepository.find()
  }

  async getDefinitionsByLang(language: string) {
    return await this.termsRepository.find({where: {language}})
  }

  async getDefinitionById(id: number) {
    const term = await this.termsRepository.findOneBy({id})
    if(!term) {
      throw new NotFoundException({message: "Definition was not found"})
    }
    return term
  }

  async createDefinition(dto: CreateTermDto) {
    return this.termsRepository.create(dto)
  }

  async updateDefinition(dto: CreateTermDto, id: number) {
    const term = await this.termsRepository.findOneBy({id})
    if(!term) {
      throw new NotFoundException({message: 'Term was not found'})
    }
    return await this.termsRepository.save({id, ...dto})
  }

  async deleteDefinition(id: number) {
    const destroy = await this.termsRepository.delete({id})
    if(!destroy) {
      throw new NotFoundException({message: 'Term was not found'})
    }
  }

}
