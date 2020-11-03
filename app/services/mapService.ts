import { getCurrentUserLocation } from '@/services/geolocationService'
import { getCirclePointsCoordinates } from '@/utils/circle'

import { LngLat, Circle } from '@/types/types'

import { getCurrentUserLocation as userCurrentLocation } from '@/store/userLocationStore'

// TODO: eliminar
export const coordinates: LngLat = userCurrentLocation()

export const getSecurityAreaPoints = async (radius: number): Promise<LngLat[]> => {
  console.log('getSecurityAreaPoints')

  const points = await getCurrentUserLocation().then( center => {
    const circlePolygonProps: Circle = {
    center: center as LngLat,
    radius: radius,
    numberOfPoints: 32,
  }
    return getCirclePointsCoordinates(circlePolygonProps)
  })
  return points
}
