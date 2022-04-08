import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Definition } from "./definitions.model";
import { CreateDefinitionDto } from "./dto/create-definition.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class DefinitionsService {

  constructor(@InjectRepository(Definition) private definitionsRepository: Repository<Definition>) {}

  async getAllDefinitions() {
    return await this.definitionsRepository.find()
  }

  async getDefinitionsByLang(language: string) {
    return await this.definitionsRepository.findBy({language})
  }

  async getDefinitionById(id: number) {
    const definition = await this.definitionsRepository.findOneBy({id})
    if(!definition) {
      throw new NotFoundException({message: "Definition was not found"})
    }
    return definition
  }

  async createDefinition(dto: CreateDefinitionDto) {
    return await this.definitionsRepository.save(dto)
  }

  async updateDefinition(dto: CreateDefinitionDto, id: number) {
    const definition = await this.definitionsRepository.findOneBy({id})
    if(!definition) {
      throw new NotFoundException({message: 'Definition was not found'})
    }
    return this.definitionsRepository.save(Object.assign(definition, dto));
  }

  async deleteDefinition(id: number) {
    const destroy = await this.definitionsRepository.delete(id)
    if(!destroy.affected) {
      throw new NotFoundException({message: 'Definition was not found'})
    }
  }

}
