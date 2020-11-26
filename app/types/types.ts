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
   * The number of edges of security area polycircle.
   */
  numberOfEdges?: number
}

export interface Azimuth {
  theta: number
  radius: number
  center: LngLat
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
  onTap?: () => unknown
  onCalloutTap?: () => unknown
  selected?: boolean
  hasSecurityArea?: boolean
  securityAreas?: SecurityArea[]
  isFollowed?: boolean
  update?: (newSettings: unknown) => void
  ios?: boolean
  android?: boolean
}
export interface BasicPolygonOptions {
  id: string
  radius: number
  center: LngLat
  isActive: boolean
  fillColor?: string | Color
  fillOpacity?: number
  isVisible?: boolean
}
export interface SecurityArea extends BasicPolygonOptions {
  group?: string
  points: LngLat[]
  oldFillOpacity?: number
  strokeColor?: string | Color
  strokeWidth?: number
  strokeOpacity?: number
}

export interface InsideSecurityArea {
  initialLocation: LngLat
  securityDistance: number
}

type DistanceMode = 'IN' | 'OUT'
export interface CalculateSecurityDistance extends InsideSecurityArea {
  interval: number
  mode: DistanceMode
}

export interface LocationInCircle extends LngLat {
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
