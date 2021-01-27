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
  isVisible: boolean
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

export interface Source extends Id {
  data: SourceOptions
}

export interface PolygonLayer extends Id, PolygonLayerStyleOptions {
  sourceLayer: Source | string
  type?: string
}

export interface PolygonLayerStyleOptions {
  fillAntialias?: boolean
  fillColor: string | Color
  fillOpacity: number
  fillOutlineColor?: string | Color
  fillSortKey?: number
  visibility: boolean
}

// export interface CircleLayer extends Layer {
//   circleColor?: string | Color
//   circleOpacity?: number
//   circleRadius?: number
//   circleStrokeColor?: string | Color
//   circleStrokeWidth?: number
// }

export { LatLng, Id, Location }
