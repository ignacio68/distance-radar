import { Color } from '@nativescript/core/color'
import { CouchBase, Query } from '@triniwiz/nativescript-couchbase'
import { ShowOptions } from '@nativescript-community/ui-mapbox'
import { GeoJSON } from 'geojson'
import { LatLng, Id, Location } from '@/types/commons'
export { Map, GeocoderLocation, SetViewportOptions, Bounds } from '@/services/types'
export { Position } from '@/utils/types'
export { LatLng, Id, Location, GeoJSON }

export type Database = CouchBase

export type QueryDB = Query

export type MapEvent = {
  (event?: unknown): unknown
}
export interface MapSettings extends ShowOptions {
  onLocationPermissionGranted?: MapEvent
  onLocationPermissionDenied?: MapEvent
  onMapReady?: MapEvent
  onScrollEvent?: MapEvent
  onMoveBeginEvent?: MapEvent
}

export interface SecurityAreaOptions extends Id {
  radius: number
  center: LatLng
  isActive: boolean
  alertMode?: AlertMode
  fillColor: string | Color
  fillOpacity: number
  visibility: LayerVisibility
}

export type AlertMode = 'EXIT' | 'ENTRANCE'

export interface SecurityArea {
  id: string
  owner: string
  radius: number
  center: LatLng
  isActive: boolean
  alertMode?: AlertMode
  layer: PolygonLayer
  source: Source
}

export interface AlertOptions extends Id {
  initialLocation: LatLng
  securityDistance: number
  alertMode: AlertMode
}

export interface SecurityDistanceArgs extends AlertOptions {
  interval: number
}

export interface Alarm extends Id {
  searchId?: NodeJS.Timeout
  isActive: boolean
  alertMode: AlertMode
}
export interface SourceOptions {
  type: 'geojson'
  data: GeoJSON
}

export interface Source extends Partial<Id>, SourceOptions {}

export interface PolygonLayer extends Id {
  source: Source | string
  type?: string
  paint: PolygonLayerStyleOptions
  layout?: Record<string, string>
}

export type LayerVisibility = 'visible' | 'none'
export interface PolygonLayerStyleOptions {
  'fill-antialias'?: boolean
  'fill-color': string | Color
  'fill-opacity': number
  'fill-outlineColor'?: string | Color
  'fill-sortKey'?: number
  visibility?: LayerVisibility
}

export type SoundPlayMode = 'PLAY' | 'STOP'

// export interface CircleLayer extends Layer {
//   circleColor?: string | Color
//   circleOpacity?: number
//   circleRadius?: number
//   circleStrokeColor?: string | Color
//   circleStrokeWidth?: number
// }
