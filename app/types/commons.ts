export interface LatLng {
  /**
   * The latitude of the geolocation, in degrees.
   */
  lat: number
  /**
   * The longitude of the geolocation, in degrees.
   */
  lng: number
}

export interface LngLat {
  /**
   * The latitude of the geolocation, in degrees, to match the GeoJSON specification.
   */
  lng: number
  /**
   * The longitude of the geolocation, in degrees. to match the GeoJSON specification.
   */
  lat: number
}

export type Position = [number, number]

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

export interface Id {
  id: string
}

export interface User extends Id {
  location?: LatLng
  phoneNumber: string
}

export interface UserMarker extends Id, LatLng {
  onTap?: () => unknown
  update?: (newSettings: UserMarker) => void
}

export type OnTap = {
  (id: string): any
}
export interface Location extends Id, LatLng {
  group?: string
  icon?: string
  // onTap?(id?: string): any
  onTap?: (id?: string) => any
  // onTap?: OnTap
  onCalloutTap?: (id?: string) => void
  selected?: boolean
  securityAreas?: string[]
  followers?: string[]
  following?: string[]
  update?: (newSettings: unknown) => void
  ios?: boolean
  android?: boolean
}
