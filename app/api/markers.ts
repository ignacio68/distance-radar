import { getMap as map } from '@/store/mapStore'
import { setNewMarker, updateMarkersStore, getMarkers } from '@/store/markersStore'

import { Marker, LngLat } from '@/types/types'

export const showMarkers = () => {}

export const addMarker = (marker: Marker) => {
  const newMarker = []
  newMarker.push(marker)
  map()
    .addMarkers(newMarker)
    .then(() => setNewMarker(marker))
}

export const updateMarker = (marker: Marker) => {
  updateMarkersStore(marker)
  console.dir(getMarkers())
}

export const removeMarker = (id: string) => map().removeMarkers(id)

export const setUserMarkerNewCoordinatesOptions = (coordinates: LngLat): Marker => {
  const { lat, lng } = coordinates
  const options: Marker = {
    id: '_user',
    lat,
    lng,
  }
  return options
}
