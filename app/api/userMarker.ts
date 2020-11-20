import { getMap as map } from '@/store/mapStore'
import {
  setUserMarker,
  getUserMarker as userMarker,
  updateUserMarkerPosition,
} from '@/store/userMarkerStore'
import { getCurrentUserLocation as userLocation } from '@/store/userLocationStore'
import { setVisibility } from '@/composables/useComponent'

import { UserMarker, LngLat } from '@/types/types'

const onTap = (): boolean => setVisibility('newLocationMenu', true)

const isUserMarker = async (coordinates: LngLat): Promise<void> => {
  Promise.resolve(
    !userMarker()
      ? createUserMarker(coordinates)
      : console.log('User marker exits!')
  )
}

export const createUserMarker = (coordinates?: LngLat): void => {
  console.log('addMarker()')
  const initialValues: UserMarker = {
    id: '_user',
    lat: coordinates.lat || userLocation().lat,
    lng: coordinates.lng || userLocation().lng,
    onTap: () => onTap(),
  }
  const newUserMarker = [initialValues]
  map()
    .addMarkers(newUserMarker)
    .then(() => setUserMarker(initialValues))
}

export const updateUserMarker = async (coordinates: LngLat): Promise<void> => {
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
