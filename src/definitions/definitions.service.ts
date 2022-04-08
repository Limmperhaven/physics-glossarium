import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Definition } from "./definitions.model";
import { CreateDefinitionDto } from "./dto/create-definition.dto";

@Injectable()
export class DefinitionsService {

  constructor(@InjectModel(Definition) private definitionsRepository: typeof Definition) {}

  async getAllDefinitions() {
    return await this.definitionsRepository.findAll()
  }

  async getDefinitionsByLang(language: string) {
    return await this.definitionsRepository.findAll({where: {language}})
  }

  async getDefinitionById(id: number) {
    const definition = await this.definitionsRepository.findByPk(id)
    if(!definition) {
      throw new NotFoundException({message: "Definition was not found"})
    }
    return definition
  }

  async createDefinition(dto: CreateDefinitionDto) {
    return await this.definitionsRepository.create(dto)
  }

  async updateDefinition(dto: CreateDefinitionDto, id: number) {
    const definition = await this.definitionsRepository.findByPk(id)
    if(!definition) {
      throw new NotFoundException({message: 'Definition was not found'})
    }
    return await this.definitionsRepository.update(dto, {where: {id}})
  }

  async deleteDefinition(id: number) {
    const destroy = await this.definitionsRepository.destroy({where: {id}})
    if(!destroy) {
      throw new NotFoundException({message: 'Definition was not found'})
    }
  }

}
