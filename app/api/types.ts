import { Color } from '@nativescript/core/color'
import { CouchBase, Query } from '@triniwiz/nativescript-couchbase'
import { ShowOptions } from '@nativescript-community/ui-mapbox'
import { GeoJSON } from 'geojson'
import { LatLng, Id, Location } from '@/types'
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

export interface SecurityAreaOptions {
  owner: string
  radius: number
  center: LatLng
  isActivated: boolean
  alarmMode?: AlarmMode
  fillColor: string | Color
  fillOpacity: number
  visibility: LayerVisibility
}

export type AlarmMode = 'EXIT' | 'ENTRANCE'

export interface SecurityArea {
  id: string
  owner: string
  radius: number
  center: LatLng
  layer: PolygonLayer
  source: Source
  alarm?: Alarm
}

export interface RadarOptions extends Id {
  initialLocation: LatLng
  securityDistance: number
  owner: string
  alarmOwner: string
  alarmMode: AlarmMode
}

export interface Radar extends RadarOptions {
  interval: number
  searchId?: number
}

export interface Alarm extends Id {
  searchId?: number
  isActivated: boolean
  alarmMode: AlarmMode
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
