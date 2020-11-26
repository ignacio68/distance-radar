import { validateArgs } from './validations'
import { normalizeArgs } from './normalizations'
import { range, toRadians, toDegrees } from '../maths'

import { LngLat, Circle, Azimuth, LocationInCircle } from '@/types/types'

const PI = Math.PI
const EARTH_RADIUS = 6378.137 // km

const setDy = (theta: number, radius: number): number => Math.sin(toRadians(theta)) * radius

const setDx = (theta: number, radius: number): number => Math.cos(toRadians(theta)) * radius

const setLatitude = (center: LngLat, dy: number): number =>
  center.lat + toDegrees(dy / EARTH_RADIUS)

const setLongitude = (center: LngLat, dx: number): number =>
  center.lng + toDegrees(dx / EARTH_RADIUS) / Math.cos(toRadians((center.lat * PI) / 180))

const getPointCoordinates = (args: Azimuth): LngLat => {
  const dy = setDy(args.theta, args.radius)
  const dx = setDx(args.theta, args.radius)
  const newLatitude = setLatitude(args.center, dy)
  const newLongitude = setLongitude(args.center, dx)

  const coordinates: LngLat = { lat: newLatitude, lng: newLongitude }

  return coordinates
}

const getThetas = async (numberOfEdges: number): Promise<number[]> =>
  range(0, 360, 360 / numberOfEdges)

export const getCirclePointsCoordinates = async (args: Circle): Promise<LngLat[]> => {
  console.log('getCirclePointsCoordinates()')
  await validateArgs(args).catch((error: string) => console.log(error))
  await normalizeArgs(args)

  const thetasList = await getThetas(args.numberOfEdges)

  const allPointsCoordinates: LngLat[] = thetasList.map((theta) => {
    const values: Azimuth = {
      theta,
      radius: args.radius,
      center: args.center,
    }

    return getPointCoordinates(values)
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

export const calculateDistanceFromLocation = (args: LocationInCircle): number => {
  const ky = 111.11111111
  const kx = Math.cos((Math.PI * args.circleLat) / 180.0) * ky
  const dx = Math.abs(args.circleLng - args.lng) * kx
  const dy = Math.abs(args.circleLat - args.lat) * ky

  const distance = Math.sqrt(dx * dx + dy * dy)

  return distance
}

export const isLocationInCircle = (args: LocationInCircle): boolean => {
  const distance = calculateDistanceFromLocation(args)

  return distance < args.circleRadius / 1000 ? true : false
}
// export const isLocationInCircle = (args: LocationInCircle): boolean => {
//   const ky = 111.11111111
//   const kx = Math.cos((Math.PI * args.circleLat) / 180.0) * ky
//   const dx = Math.abs(args.circleLng - args.lng) * kx
//   const dy = Math.abs(args.circleLat - args.lat) * ky

//   const distance = Math.sqrt(dx * dx + dy * dy)

//   return distance < args.circleRadius / 1000 ? true : false
//   // return distance < args.circleRadius / 1000
// }
