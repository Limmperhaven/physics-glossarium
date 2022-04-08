export interface TaskTemplateInterface {

  readonly id?: number

  readonly text: string

  readonly type: number

  readonly calc?: string

  readonly answers?: string[]

  readonly right_answer?: string

  readonly language: string

  readonly section: string

}