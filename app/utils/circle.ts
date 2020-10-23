import {
  range,
  degreesToRadians as radians,
  radiansToDegrees as degrees
} from './maths'

import { LngLat, Circle, Azimuth, LocationInCircle } from '../types/types'

const PI = Math.PI
const EARTH_RADIUS = 6378 // km

const setDy = (theta: number, radius: number): number => Math.sin(radians(theta)) * radius
const setDx = (theta: number, radius: number): number => Math.cos(radians(theta)) * radius
const setLatitude = (center: LngLat, dy: number): number => center.lat + degrees(dy / EARTH_RADIUS)
const setLongitude = (center: LngLat, dx: number): number => center.lng + (degrees(dx / EARTH_RADIUS)) / Math.cos(radians((center.lat * PI) / 180))

const getPointCoordinates = ({ theta, radius, center }: Azimuth) => {
  // const dx = radius / (111.320 * Math.cos(radians(center.lat)))
  // const dy = radius / 110.574
  const dy = setDy(theta, radius)
  const dx = setDx(theta, radius)
  const newLatitude = setLatitude(center, dy)
  const newLongitude = setLongitude(center, dx)

  const coordinates: LngLat = { lat: newLatitude, lng: newLongitude }

  return coordinates
}
// const getPointCoordinates = ({ theta, radius, center }: Azimuth) => {
// const dy = Math.sin(radians(theta)) * radius
// const dx = Math.cos(radians(theta)) * radius
//   // const dx = radius / (111.320 * Math.cos(radians(center.lat)))
//   // const dy = radius / 110.574
//   const newLatitude = center.lat + degrees(dy / EARTH_RADIUS)
//   const newLongitude =
//     center.lng + (degrees(dx / EARTH_RADIUS)) / Math.cos(radians((center.lat * PI) / 180))

//   const coordinates: LngLat = { lat: newLatitude, lng: newLongitude }

//   return coordinates
// }

const getThetas = (numberOfPoints: number): number[] => range(0, 360, 360 / numberOfPoints)

export const getCirclePointsCoordinates = ({ center, radius, numberOfPoints }: Circle) => {
  console.log('getCirclePointsCoordinates()')

  const thetasList = getThetas(numberOfPoints)

  const allPointsCoordinates: LngLat[] = thetasList.map((theta) => {
    return getPointCoordinates({ theta, radius, center })
  })

  return allPointsCoordinates
}

  /**
  * Is the current location within the given circle?
  *
  * @param lng{number} longitude to check
  * @param lat{number} latitude to check
  * @param circleLng{number} longitude center of circle
  * @param circleLat{number} latitude center of circle
  * @param circleRadius{number} radius of circle in meters
  *
  * @return {boolean} true if the point is within the given geofence.
  *
  * @link https://stackoverflow.com/questions/24680247/check-if-a-latitude-and-longitude-is-within-a-circle-google-maps
  */

export const isLocationInCircle = ({ lng, lat, circleLng, circleLat, circleRadius }: LocationInCircle ): boolean => {
  const ky = 111.11111111
  const kx = Math.cos( Math.PI * circleLat / 180.0 ) * ky
  const dx = Math.abs( circleLng - lng ) * kx
  const dy = Math.abs( circleLat - lat ) * ky

  const distance = Math.sqrt(dx * dx + dy * dy)

  // return (distance < circleRadius / 1000) ? true : false
  return distance < circleRadius / 1000

}

// export { getCirclePointsCoordinates, isLocationInCircle }
