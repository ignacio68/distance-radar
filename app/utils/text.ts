import { GeocoderShortLocation, GeocoderLocation } from '@/services/types'
import { pipe } from './functional'
interface ObjectToString {
  [key: string]: string
}

const getShortLocation = (location: GeocoderLocation): GeocoderShortLocation => {
  let shortLocation: GeocoderShortLocation = new Object()

  shortLocation.thoroughfare = location.thoroughfare
  shortLocation.subThoroughfare = location.subThoroughfare
  shortLocation.locality = location.locality
  shortLocation.postalCode = location.postalCode
  shortLocation.country = location.country

  return shortLocation
}

export const removeEmptyKeys = (object: ObjectToString): ObjectToString => {
  Object.keys(object).forEach(
    (key) => !object[key] && object[key] !== undefined && delete object[key],
  )
  return object
}

export const objectToArray = (object: ObjectToString): string[] => {
  const newArray: string[] = Object.values(object)
  return newArray
}

export const reduceToString = (array: string[]): string => `${array.join(', ')}`

export const formattedText = pipe(removeEmptyKeys, objectToArray, reduceToString)
