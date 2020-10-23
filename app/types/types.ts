import { Color } from '@nativescript/core/color'
import { AddPolygonOptions } from '@nstudio/nativescript-mapbox'

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

  radius: number
  /**
   * The number of points of the polygon of the security area circle.
   */
  numberOfPoints: number
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

export interface Marker extends LngLat {
  id: string
  group?: string
  title?: string
  subtitle?: string
  icon?: string
  iconPath?: string
  onTap?: Function
  onCalloutTap?: Function
  selected?: boolean
  isFollowed?: boolean
  update?: (newSettings: Marker) => void
  ios?: boolean
  android?: boolean
}

export interface PolygonOptions {
  id: any
  group?: string
  points?: LngLat[]
  radius?: number
  fillColor?: string | Color
  fillOpacity?: number
  oldFillOpacity?: number
  strokeColor?: string | Color
  strokeWidth?: number
  strokeOpacity?: number
  isVisible?: boolean
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

export interface ShortLocation {
  /**
   * The street address associated with the placemark.
   */
  thoroughfare?: string

  /**
   * Additional street-level information for the placemark.
   */
  subThoroughfare?: string

  /**
   * The city associated with the placemark.
   */
  locality?: string

  /**
   * The postal code associated with the placemark.
   */
  postalCode?: string

  /**
   * The name of the country associated with the placemark.
   */
  country?: string
}

export interface Location extends ShortLocation{
   /**
   * The name of the placemark.
   *
   */
  name: string;


  /**
   * The latitude of the geolocation, in degrees.
   */
  latitude: number;

  /**
   * The longitude of the geolocation, in degrees.
   */
  longitude: number;

  /**
   * The abbreviated country name.
   */
  isoCountryCode?: string;

  /**
   * The state or province associated with the placemark.
   */
  administrativeArea?: string;

  /**
   * Additional administrative area information for the placemark.
   */
  subAdministrativeArea?: string;

  /**
   * Additional city-level information for the placemark.
   */
  subLocality?: string;
}
/**************/