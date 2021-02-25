import { pipe } from './functional'
interface ObjectToString {
  [key: string]: string
}

const objectToArray = (obj: ObjectToString): string[] => {
  const newArray: string[] = Object.values(obj)
  return newArray
}

const removeEmptyStrings = (arr: string[]): string[] => arr.filter(Boolean)

const reduceToString = (arr: string[]): string => `${arr.join(', ')}`

export const formattedText = pipe(objectToArray, removeEmptyStrings, reduceToString)
