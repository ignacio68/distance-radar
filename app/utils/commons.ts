import validateColor from 'validate-color'
import { LatLng, Position } from '@/types'

export const latLngToPosition = (coordinates: LatLng): Position => [
  coordinates.lng,
  coordinates.lat,
]

export const isColor = (color: string): boolean => (color && validateColor(color) ? true : false)

export const getId = (id: string, substr: string): string => `${id}_${substr}`
