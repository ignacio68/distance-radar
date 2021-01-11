import { validateArgs } from './validations'
import { normalizeArgs } from './normalizations'
import { range, toRadians, toDegrees } from '../maths'

import { LatLng, Circle, Azimuth, LocationInCircle } from '@/types/types'

const PI = Math.PI
const EARTH_RADIUS = 6378.137 // km

const getDistanceY = (theta: number, radius: number): number => Math.sin(toRadians(theta)) * radius

const getDistanceX = (theta: number, radius: number): number => Math.cos(toRadians(theta)) * radius

const getLatitude = (center: LatLng, distanceY: number): number =>
  center.lat + toDegrees(distanceY / EARTH_RADIUS)

const getLongitude = (center: LatLng, distanceX: number): number =>
  center.lng + toDegrees(distanceX / EARTH_RADIUS) / Math.cos(toRadians(center.lat))

const getPointCoordinates = (args: Azimuth): LatLng => {
  const { theta, radius, center } = args
  const distanceY = getDistanceY(theta, radius)
  const distanceX = getDistanceX(theta, radius)
  const newLatitude = getLatitude(center, distanceY)
  const newLongitude = getLongitude(center, distanceX)

  const coordinates: LatLng = { lat: newLatitude, lng: newLongitude }

  return coordinates
}

const getThetas = async (numberOfEdges: number): Promise<number[]> =>
  range(0, 360, 360 / numberOfEdges)

export const getCirclePointsCoordinates = async (args: Circle): Promise<LatLng[]> => {
  console.log('getCirclePointsCoordinates()')
  await validateArgs(args).catch((error) => console.log(error))
  await normalizeArgs(args)

  const { center, radius, numberOfEdges } = args

  const thetasList = await getThetas(numberOfEdges)

  const pointsCoordinatesList: LatLng[] = thetasList.map((theta) => {
    const values: Azimuth = {
      theta,
      radius: radius,
      center: center,
    }

    return getPointCoordinates(values)
  })
  return pointsCoordinatesList
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
  const kx = Math.cos((PI * args.circleLat) / 180.0) * ky
  const distanceX = Math.abs(args.circleLng - args.lng) * kx
  const distanceY = Math.abs(args.circleLat - args.lat) * ky

  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

  return distance
}

export const isLocationInCircle = (args: LocationInCircle): boolean => {
  const distance = calculateDistanceFromLocation(args)

  return distance < args.circleRadius / 1000 ? true : false
}
