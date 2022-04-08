import { TaskTemplateInterface } from "../dto/task-template.interface";
import { InternalServerErrorException } from "@nestjs/common";
import { GeneratedTaskInterface } from "../dto/generated-task.interface";
import { TaskTypesEnum } from "../enums/task-types.enum";
import { CalcVarType, FloatVarType, IntVarType } from "../types/var-types";

export class TaskGenerator {

  static generate(template: TaskTemplateInterface): GeneratedTaskInterface {

    let response_object = {
      text: template.text,
      type: template.type,
      answers: template.answers,
      right_answer: template.right_answer,
      language: template.language,
      section: template.section
    }

    if(template.type === TaskTypesEnum.NOT_GENERATED_TEST || template.type === TaskTypesEnum.NOT_GENERATED_WRITE)
      return response_object

    let vars_init: string[] = response_object.text.match(/\$\$.+?\$\$/g)

    let vars_int: IntVarType[] = []
    let vars_float: FloatVarType[] = []
    let vars_calc: CalcVarType[] = []

    for(let i = 0; i < vars_init.length; i++) {

      const options: string[] = vars_init[i].match(/\(.+\)/g)[0].replace(/^\(|\)$/g, '').split(', ')

      if(vars_init[i].match('INT')) {
        vars_int.push({name: options[0], min: Number(options[1]), max: Number(options[2]), place: i})
        continue
      }
      if(vars_init[i].match('FLOAT')) {
        vars_float.push({name: options[0], min: Number(options[1]), max: Number(options[2]), accuracy: Number(options[3]), place: i})
        continue
      }

      if(vars_init[i].match('CALC')) {
        vars_calc.push({name: options[0], calc: options[1], accuracy: Number(options[2]), place: i})
        continue
      }

      throw new InternalServerErrorException({message: 'GENERATION ERROR: incorrect amount of options'})

    }

    for(let i = 0; i < vars_int.length; i++) {
      vars_int[i].value = Math.floor(Math.random() * (vars_int[i].max - vars_int[i].min)) + vars_int[i].min
    }

    for(let i = 0; i < vars_float.length; i++) {
      vars_float[i].value = Math.random() * (vars_int[i].max - vars_int[i].min) + vars_int[i].min
    }

    let cycledFlag: boolean = false

    while(vars_calc.find(item => item.value === null)) {

      cycledFlag = true

      for(let i = 0; i < vars_calc.length; i++) {

        if(!vars_calc[i].calc.match(/(^|[(+\-*/])[a-z]/g)) {
          vars_calc[i].value = eval(vars_calc[i].calc)
          if(vars_calc[i].accuracy) vars_calc[i].value = Number(vars_calc[i].value.toFixed(vars_calc[i].accuracy))
          cycledFlag = false
          continue
        }

        for(let j = 0; j < vars_int.length; j++) {
          const regexp = new RegExp(`(^|[\(\+\\-\*\/])[${vars_int[j].name}]`, 'g')
          if(vars_calc[i].calc.match(regexp)) {
            vars_calc[i].calc = vars_calc[i].calc.replace(regexp, `$1${vars_int[j].value}`)
            cycledFlag = false
          }
        }

        for(let j = 0; j < vars_float.length; j++) {
          const regexp = new RegExp(`(^|[\(\+\\-\*\/])[${vars_float[j].name}]`, 'g')
          if(vars_calc[i].calc.match(regexp)) {
            vars_calc[i].calc = vars_calc[i].calc.replace(regexp, `$1${vars_float[j].value}`)
            cycledFlag = false
          }
        }

        for(let j = 0; j < vars_calc.length; j++) {
          const regexp = new RegExp(`(^|[\(\+\\-\*\/])[${vars_calc[j].name}]`, 'g')
          if(vars_calc[i].calc.match(regexp) && vars_calc[j].value) {
            vars_calc[i].calc = vars_calc[i].calc.replace(regexp, `$1${vars_calc[j].value}`)
            cycledFlag = false
          }
        }

      }

      if(cycledFlag) {
        throw new InternalServerErrorException({message: 'GENERATION ERROR: vars implementation cycled'})
      }

    }

    for(let i = 0; i < vars_init.length; i++) {
      let toReplace: any = vars_int.find(item => item.place === i)
      if(toReplace) {
        response_object.text = response_object.text.replace(vars_init[i], String(toReplace.value))
        continue
      }
      toReplace = vars_float.find(item => item.place === i)
      if(toReplace) {
        response_object.text = response_object.text.replace(vars_init[i], String(toReplace.value))
        continue
      }
      toReplace = vars_calc.find(item => item.place === i)
      if(toReplace) {
        response_object.text = response_object.text.replace(vars_init[i], String(toReplace.value))
        continue
      }
      throw new InternalServerErrorException({message: 'GENERATION ERROR: unknown error'})
    }

    if(template.right_answer && template.answers) {
      response_object.answers = template.answers
      response_object.right_answer = template.right_answer
    } else if(template.calc) {
      
      let rightAnswerBuffer: string = template.calc.split(', ')[0]
      
      let accuracy: number = Number(template.calc.split(', ')[1])

      for(let i = 0; i < vars_int.length; i++) {
        const regexp = new RegExp(`(^|[\(\+\\-\*\/])[${vars_int[i].name}]`, 'g')
        if(rightAnswerBuffer.match(regexp)) {
          rightAnswerBuffer = rightAnswerBuffer.replace(regexp, `$1${vars_int[i].value}`)
        }
      }

      for(let i = 0; i < vars_float.length; i++) {
        const regexp = new RegExp(`(^|[\(\+\\-\*\/])[${vars_float[i].name}]`, 'g')
        if(rightAnswerBuffer.match(regexp)) {
          rightAnswerBuffer = rightAnswerBuffer.replace(regexp, `$1${vars_float[i].value}`)
        }
      }

      for(let i = 0; i < vars_calc.length; i++) {
        const regexp = new RegExp(`(^|[\(\+\\-\*\/])[${vars_calc[i].name}]`, 'g')
        if(rightAnswerBuffer.match(regexp)) {
          rightAnswerBuffer = rightAnswerBuffer.replace(regexp, `$1${vars_calc[i].value}`)
        }
      }

      response_object.right_answer = eval(rightAnswerBuffer).toFixed(accuracy)

      if(template.type === TaskTypesEnum.GENERATED_TEST) {
        response_object.answers = [response_object.right_answer]

        response_object.answers.push(
          (Number(response_object.right_answer) * (Math.random() * 0.999998 + 0.000001)).toFixed(accuracy),
          (Number(response_object.right_answer) / (Math.random() * 0.999998 + 0.000001)).toFixed(accuracy),
          (Number(response_object.right_answer) * (Math.random() * 0.999998 + 0.000001)).toFixed(accuracy),
        )

        for(let i = response_object.answers.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1))
          const buffer = response_object.answers[i]
          response_object.answers[i] = response_object.answers[j]
          response_object.answers[j] = buffer
        }
      }
      
    }

    return response_object
  }

}