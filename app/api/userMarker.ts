// import * as map from '@/services/mapboxService'
import { mbAddMarkers } from '@/services/mapboxService'

import { getMap as map } from '@/store/mapStore'
import {
  setUserMarker,
  getUserMarker as userMarker,
  updateUserMarkerPosition,
} from '@/store/userMarkerStore'
import { getUserCurrentLocation as userLocation } from '@/store/userLocationStore'

import { setVisibility } from '@/composables/useComponent'

import { UserMarker, LatLng } from '@/types/commons'

const onTap = (): boolean => setVisibility('newLocationMenu', true)

const isUserMarker = (): boolean => (userMarker() ? true : false)

export const createUserMarker = (coordinates?: LatLng): void => {
  console.log('createUserMarker()')
  const initialValues: UserMarker = {
    id: '_user',
    lat: coordinates.lat || userLocation().lat,
    lng: coordinates.lng || userLocation().lng,
    onTap: () => onTap(),
  }
  const newUserMarker = [initialValues]
  mbAddMarkers(map(), newUserMarker).then(() => setUserMarker(initialValues))
}

export const updateUserMarker = (coordinates: LatLng): void => {
  console.log('updateUserMarker()')
  if (isUserMarker()) {
    const values = {
      id: '_user',
      lat: coordinates.lat,
      lng: coordinates.lng,
    }
    userMarker().update(values)
    updateUserMarkerPosition(coordinates)
  } else {
    createUserMarker(coordinates)
  }
}
