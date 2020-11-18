import { getMap as map } from '@/store/mapStore'
import {
  setUserMarker,
  getUserMarker as userMarker,
  updateUserMarkerPosition,
} from '@/store/userMarkerStore'
import { getCurrentUserLocation as userLocation } from '@/store/userLocationStore'
import { toggleVisibility } from '@/composables/useComponent'

import { UserMarker, LngLat } from '@/types/types'

const onTap = () => toggleVisibility('newLocationMenu')

export const createUserMarker = (): void => {
  console.log('addMarker()')
  const initialValues: UserMarker = {
    id: '_user',
    lat: userLocation().lat,
    lng: userLocation().lng,
    onTap: () => onTap(),
  }
  const newUserMarker = [initialValues]
  map()
    .addMarkers(newUserMarker)
    .then(() => setUserMarker(initialValues))
}

export const updateUserMarker = (coordinates: LngLat): void => {
  // TODO: Add true type
  const values = {
    id: '_user',
    lat: coordinates.lat,
    lng: coordinates.lng,
  }
  const currentUserMarker: UserMarker = userMarker()
  if (currentUserMarker) {
    currentUserMarker.update(values)
    updateUserMarkerPosition(coordinates)
  } else {
    console.log('There is not user marker')
  }
}
