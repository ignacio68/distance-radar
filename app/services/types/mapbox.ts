import { LatLng } from '.'
import {
  MapboxApi as Map,
  SetViewportOptions,
  ShowOptions,
  Bounds,
} from '@nativescript-community/ui-mapbox'
export { Map, SetViewportOptions, ShowOptions, Bounds }
export interface SetOnMapLongClickListener {
  (data: LatLng): boolean
}
