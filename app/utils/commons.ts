import { LatLng, Position } from '@/types/commons'

export const latLngToPosition = (coordinates: LatLng): Position => [
  coordinates.lng,
  coordinates.lat,
]
