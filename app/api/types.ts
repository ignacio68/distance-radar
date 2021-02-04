import { Color } from '@nativescript/core/color'
import { CouchBase, Query } from '@triniwiz/nativescript-couchbase'
import { ShowOptions } from '@nativescript-community/ui-mapbox'
import { GeoJSON } from 'geojson'
import { LatLng, Id, Location } from '@/types/commons'
export { Map, GeocoderLocation } from '@/services/types'

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
  fillColor: string | Color
  fillOpacity: number
  visibility: LayerVisibility
}

export interface SecurityArea {
  id: string
  owner: string
  radius: number
  center: LatLng
  isActive: boolean
  layer: PolygonLayer
}

export interface InsideSecurityArea {
  initialLocation: LatLng
  securityDistance: number
}

type DistanceMode = 'IN' | 'OUT'
export interface CalculateSecurityDistance extends InsideSecurityArea {
  interval: number
  mode: DistanceMode
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

// export interface CircleLayer extends Layer {
//   circleColor?: string | Color
//   circleOpacity?: number
//   circleRadius?: number
//   circleStrokeColor?: string | Color
//   circleStrokeWidth?: number
// }

export { LatLng, Id, Location }
