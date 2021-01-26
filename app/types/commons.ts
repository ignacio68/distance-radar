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

export interface Location extends Id, LatLng {
  group?: string
  title?: string
  subtitle?: string
  icon?: string
  iconPath?: string
  onTap?: (id?: string) => void
  onCalloutTap?: (id?: string) => void
  selected?: boolean
  securityAreas?: string[]
  isFollowed?: boolean
  update?: (newSettings: unknown) => void
  ios?: boolean
  android?: boolean
}