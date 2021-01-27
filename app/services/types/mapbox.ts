import { LatLng } from "./"
export interface SetOnMapLongClickListener {
  (data: LatLng): boolean
}
