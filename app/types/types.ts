import { Color } from '@nativescript/core/color'
// import { AddPolygonOptions } from '@nstudio/nativescript-mapbox'

export interface InitialCoordinates {
  /**
   * The latitude of the initial coordinates, in degrees.
   */
  lat: string

  /**
   * The longitude of the initial coordinates, in degrees.
   */
  lng: string
}

export interface LngLat {
  /**
   * The latitude of the geolocation, in degrees.
   */
  lat: number
  /**
   * The longitude of the geolocation, in degrees.
   */
  lng: number
}

export interface GeocodingCoordinates {
  /**
   * The latitude of the geolocation, in degrees.
   */
  latitude: number
  /**
   * The longitude of the geolocation, in degrees.
   */
  longitude: number
}

export interface Circle {
  /**
   * The point of the center of the security area circle, lat & lng in degrees
   */
  center: LngLat

  /**
   * The radius of the security area circle.
   */

  radius?: number
  /**
   * The number of points of the polygon of the security area circle.
   */
  numberOfEdges?: number
}

export interface Azimuth {
  theta: number
  radius: number
  center: LngLat
}

export interface LocationInCircle extends LngLat {
  circleLng: number
  circleLat: number
  circleRadius: number
}

export interface UserMarker extends LngLat {
  id: string
  onTap?: () => unknown
  update?: (newSettings: UserMarker) => void
}

export interface Location extends LngLat {
  id: string
  group?: string
  title?: string
  subtitle?: string
  icon?: string
  iconPath?: string
  onTap?: () => void
  onCalloutTap?: () => void
  selected?: boolean
  hasSecurityArea: boolean
  isFollowed?: boolean
  update?: (newSettings: unknown) => void
  ios?: boolean
  android?: boolean
}

export interface BasicPolygonOptions {
  id: string
  radius: number
  center: LngLat
  fillColor?: string | Color
  fillOpacity?: number
  isVisible?: boolean
}
export interface PolygonOptions extends BasicPolygonOptions {
  group?: string
  points: LngLat[]
  oldFillOpacity?: number
  strokeColor?: string | Color
  strokeWidth?: number
  strokeOpacity?: number
}

export interface LocationInCircle {
  lng: number
  lat: number
  circleLng: number
  circleLat: number
  circleRadius: number
}

export interface Layer {
  id: string
  source?: string
  sourceLayer?: string
  type?: string
}

export interface CircleLayer extends Layer {
  circleColor?: string | Color
  circleOpacity?: number
  circleRadius?: number
  circleStrokeColor?: string | Color
  circleStrokeWidth?: number
}

export interface User {
  id: string
  location?: LngLat
  phoneNumber: string
}
