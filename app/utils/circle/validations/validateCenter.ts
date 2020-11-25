import { LngLat } from '@/types/types'

const validateLongitude = (longitude: number): void => {
  if (longitude < -180 || longitude > 180)
    throw new Error('VALIDATION ERROR: Longitude must be between -180 and 180 degrees')
}

const validateLatitude = (latitude: number): void => {
  if (latitude < -90 || latitude > 90)
    throw new Error('VALIDATION ERROR: Latitude must be between -90 and 90 degrees')
}

export const validateCenter = (center: LngLat): void => {
  validateLongitude(center.lng)
  validateLatitude(center.lat)
}
