import { pipe } from './functional'
interface ObjectToString {
  [key: string]: string
}

export const objectToArray = (obj: ObjectToString): string[] => Object.values(obj)

export const removeEmptyStrings = (arr: string[]): string[] => arr.filter(Boolean)

export const reduceToString = (arr: string[]): string => `${arr.join(', ')}`

export const formattedText = pipe(objectToArray, removeEmptyStrings, reduceToString)
