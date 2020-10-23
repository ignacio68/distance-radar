import { getCurrentUserLocation } from '@/services/geolocationService'
import { getCirclePointsCoordinates } from '@/utils/circle'

import { Coordinates, Circle } from '@/types/types'

import { getCurrentUserLocation as userCurrentLocation } from '@/store/userLocationStore'

// TODO: eliminar
export const coordinates: Coordinates = userCurrentLocation()

export const getSecurityAreaPoints = (radius: number) => {
  console.log('getSecurityAreaPoints')

  const points = getCurrentUserLocation().then( center => {
    const circlePolygonProps: Circle = {
    center: center,
    radius: radius,
    numberOfPoints: 32,
  }
    return getCirclePointsCoordinates(circlePolygonProps)
  })
  return points
}
