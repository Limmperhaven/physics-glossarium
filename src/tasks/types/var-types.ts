export type IntVarType = {
  name: string,
  min: number,
  max: number,
  value?: number,
  place: number
}

export type FloatVarType = {
  name: string,
  min: number,
  max: number,
  accuracy: number,
  value?: number,
  place: number
}

export type CalcVarType = {
  name: string,
  calc: string,
  accuracy: number,
  value?: number,
  place: number
}