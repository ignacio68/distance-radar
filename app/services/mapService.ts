import { getMap as map } from '@/store/mapStore'
import { Location } from '@/types/types'

// TODO: import types from nativescript-mapbox
// TODO: create all the mapbox functions here
// TODO: change file name to mapboxService

export const addMarkers = (markers: Location[]): void => {
  map().addMarkers(markers)
}
