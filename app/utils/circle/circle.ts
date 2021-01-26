import { validateArgs } from './validations'
import { normalizeArgs } from './normalizations'
import { range, toRadians, toDegrees } from '../maths'
import { LatLng, Circle, Position, Azimuth, LocationInCircle } from '../types'

const EARTH_RADIUS = 6378.137 // km

export const getGeoJSONPolygonCoordinates = (args: Circle): Position[] => {
  console.log('getCirclePointsCoordinates()')

  validateArgs(args).catch((error) => console.log(error))
  normalizeArgs(args)

  const { center, radius, numberOfEdges } = args

  const thetasList = getThetas(numberOfEdges)

  const pointsCoordinatesList: Position[] = thetasList.map((theta) => {
    const values: Azimuth = {
      theta,
      radius: radius,
      center: center,
    }

    return getVertexCoordinates(values)
  })
  return pointsCoordinatesList
}

const getThetas = (numberOfEdges: number): number[] => range(0, 360, 360 / numberOfEdges)

const getVertexCoordinates = (args: Azimuth): Position => {
  const { theta, radius, center } = args
  const distanceY = getDistanceY(theta, radius)
  const distanceX = getDistanceX(theta, radius)
  const latitude = getVertexLatitude(center, distanceY)
  const longitude = getVertexLongitude(center, distanceX)

  const coordinates: Position = [latitude, longitude]

  return coordinates
}

const getDistanceY = (theta: number, radius: number): number => Math.sin(toRadians(theta)) * radius

const getDistanceX = (theta: number, radius: number): number => Math.cos(toRadians(theta)) * radius

const getVertexLatitude = (center: LatLng, distanceY: number): number =>
  center.lat + toDegrees(distanceY / EARTH_RADIUS)

const getVertexLongitude = (center: LatLng, distanceX: number): number =>
  center.lng + toDegrees(distanceX / EARTH_RADIUS) / Math.cos(toRadians(center.lat))

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

//  TODO: remove export attribute
export const calculateDistanceFromLocation = (args: LocationInCircle): number => {
  const { lat, lng, circleLat, circleLng } = args
  const PI = Math.PI
  const ky = 111.11111111 // TODO: ky -> change name
  const kx = Math.cos((PI * circleLat) / 180.0) * ky // TODO: kx -> change name
  const distanceX = Math.abs(circleLng - lng) * kx
  const distanceY = Math.abs(circleLat - lat) * ky

  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

  return distance
}

export const isLocationInCircle = (args: LocationInCircle): boolean => {
  const { circleRadius } = args
  const distance = calculateDistanceFromLocation(args)

  return distance < circleRadius / 1000 ? true : false
}
