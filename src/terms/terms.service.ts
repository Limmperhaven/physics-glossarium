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

  async getAll() {
    return await this.termsRepository.find()
  }

  async getByLangAndSection(language: string, section: string) {
    if(language !== 'all' && section !== 'all')
      return await this.termsRepository.find({where: {language, section}})
    if(language === 'all' && section !== 'all')
      return await this.termsRepository.find({where: {section}})
    if(language !== 'all' && section === 'all')
      return await this.termsRepository.find({where: {language}})
    if(language === 'all' && section === 'all')
      return await this.termsRepository.find()
  }

  async getById(id: number) {
    const term = await this.termsRepository.findOneBy({id})
    if(!term) {
      throw new NotFoundException({message: "Definition was not found"})
    }
    return term
  }

  async update(dto: CreateTermDto, id: number) {
    const term = await this.termsRepository.findOneBy({id})
    if(!term) {
      throw new NotFoundException({message: 'Term was not found'})
    }
    return await this.termsRepository.save(Object.assign(term, dto))
  }

  async delete(id: number) {
    const destroy = await this.termsRepository.delete({id})
    if(!destroy.affected) {
      throw new NotFoundException({message: 'Term was not found'})
    }
  }

}
