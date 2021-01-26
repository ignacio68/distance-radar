import { pipe } from './functional'
interface ObjectToString {
  [key: string]: string
}

export const removeEmptyKeys = (object: ObjectToString): ObjectToString => {
  Object.keys(object).forEach(
    (key) => !object[key] && object[key] !== undefined && delete object[key]
  )
  return object
}

export const objectToArray = (object: ObjectToString): string[] => {
  const newArray: string[] = Object.values(object)
  return newArray
}

export const reduceToString = (array: string[]): string => `${array.join(', ')}`

export const formattedText = pipe(removeEmptyKeys, objectToArray, reduceToString)
