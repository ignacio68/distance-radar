import { getMap as map } from '@/store/mapStore'
import {
  setUserMarker,
  getUserMarker as userMarker,
  updateUserMarkerPosition,
} from '@/store/userMarkerStore'
import { getCurrentUserLocation as userLocation } from '@/store/userLocationStore'
import { getVisibility, toggleVisibility } from '@/composables/useComponent'

import { UserMarker, LngLat } from '@/types/types'

const onTap = () => !getVisibility('newLocationMenu') ? toggleVisibility('newLocationMenu') : console.log('The new location menu is just activated!')
export const setNewUserMarker = () => {
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

export const updateUserMarker = (coordinates: LngLat) => { // TODO: Add true type
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
