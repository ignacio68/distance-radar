import { LatLng } from '.'
export {
  MapboxApi as Map,
  SetViewportOptions,
  ShowOptions,
  Bounds,
} from '@nativescript-community/ui-mapbox'
export interface SetOnMapLongClickListener {
  (data: LatLng): boolean
}
