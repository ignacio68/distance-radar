import { pipeJS } from './functional'

const removeEmptyKeys = (object: object): object => {
  Object.keys(object).forEach(
    (key) => !object[key] && object[key] !== undefined && delete object[key]
  )
  return object
}

const objectToArray = (object: object): unknown[] => {
  const newArray: unknown[] = Object.values(object)
  return newArray
}

const reduceToString = (array: any[]): string => `${array.join(', ')}`

export const formattedText = pipeJS(
  removeEmptyKeys,
  objectToArray,
  reduceToString
)
