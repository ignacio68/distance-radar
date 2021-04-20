import { LatLng } from '@/types'

export { LatLng } from '@/types'

export interface Circle {
  /**
   * The point of the center of the security area circle, lat & lng in degrees
   */
  center: LatLng

  /**
   * The radius of the security area circle.
   */

  radius?: number
  /**
   * The number of edges of security area polycircle.
   */
  numberOfEdges?: number
}

export interface Azimuth {
  theta: number
  radius: number
  center: LatLng
}

/**
 * A Position is an array of coordinates.
 */
export type Position = [number, number]

export interface LocationInCircle extends LatLng {
  circleLng: number
  circleLat: number
  circleRadius: number
}
