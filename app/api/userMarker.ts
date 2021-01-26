// import * as map from '@/services/mapboxService'
import { mbAddMarkers } from '@/services/mapboxService'

import { getMap } from '@/store/mapStore'
import {
  setUserMarker,
  getUserMarker as userMarker,
  updateUserMarkerPosition,
} from '@/store/userMarkerStore'
import { getCurrentUserLocation as userLocation } from '@/store/userLocationStore'
import { setVisibility } from '@/composables/useComponent'

import { UserMarker, LatLng } from '@/types/commons'

const map = getMap()

const onTap = (): boolean => setVisibility('newLocationMenu', true)

const isUserMarker = async (coordinates: LatLng): Promise<void> => {
  Promise.resolve(!userMarker() ? createUserMarker(coordinates) : console.log('User marker exits!'))
}

export const createUserMarker = (coordinates?: LatLng): void => {
  console.log('addMarker()')
  const initialValues: UserMarker = {
    id: '_user',
    lat: coordinates.lat || userLocation().lat,
    lng: coordinates.lng || userLocation().lng,
    onTap: () => onTap(),
  }
  const newUserMarker = [initialValues]
  mbAddMarkers(map, newUserMarker).then(() => setUserMarker(initialValues))
}

export const updateUserMarker = async (coordinates: LatLng): Promise<void> => {
  console.log('updateUserMarker()')
  await isUserMarker(coordinates).then(() => {
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
  })
}
