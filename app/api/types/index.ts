import { Color } from '@nativescript/core/color'
import {
  Map,
  GeocoderLocation,
  SetViewportOptions,
  Bounds,
  Database,
  ShowOptions,
  Query as QueryDB,
} from '@/services/types'
import { GeoJSON } from 'geojson'
import { LatLng, Id, Location } from '@/types'
import { Position } from '@/utils/types'
export {
  Map,
  GeocoderLocation,
  SetViewportOptions,
  Bounds,
  Database,
  ShowOptions,
  QueryDB,
  LatLng,
  Id,
  Location,
  GeoJSON,
  Position,
}

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
