// import * as map from '@/services/mapboxService'
import { mbAddMarkers, mbRemoveMarkers } from '@/services/mapboxService'

import { getMap } from '@/store/mapStore'
import {
  setUserMarker,
  getUserMarker as userMarker,
  updateUserMarkerPosition,
  deleteUserMarker,
} from '@/store/userMarkerStore'
import { getUserCurrentLocation as userLocation } from '@/store/userLocationStore'

import { setVisibility } from '@/composables/useComponent'

import { UserMarker, LatLng } from '@/types'

const onTap = (): boolean => setVisibility('newLocationMenu', true)

export const createUserMarker = (coordinates?: LatLng): void => {
  console.log('userMarker.ts::createUserMarker()')

  if (userMarker()) {
    console.log(`There is an user marker: ${JSON.stringify(userMarker())}`)
  } else {
    const userMarker = coordinates ? setUserMarkerOptions(coordinates) : setUserMarkerOptions()
    console.log(`userMarker.ts::createUserMarker::userMarker: ${JSON.stringify(userMarker)}`)
    mbAddMarkers(getMap(), [userMarker]).then(() => setUserMarker(userMarker))
  }
}

const setUserMarkerOptions = (coordinates?: LatLng): UserMarker => ({
  id: '_user',
  lat: coordinates.lat || userLocation().lat,
  lng: coordinates.lng || userLocation().lng,
  onTap: () => onTap(),
})

export const updateUserMarker = (coordinates: LatLng): void => {
  if (userMarker()) {
    console.log('userMarker::updateUserMarker()')
    const values = {
      id: '_user',
      lat: coordinates.lat,
      lng: coordinates.lng,
    }
    userMarker().update(values)
    updateUserMarkerPosition(coordinates)
  } else {
    console.log('userMarker::updateUserMarker():createUserMarker')
    createUserMarker(coordinates)
  }
}

export const removeUserMarker = (): void => {
  mbRemoveMarkers(getMap(), ['_user']).then(() => deleteUserMarker())
}
