import { LocationInCircle } from '../types'

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
