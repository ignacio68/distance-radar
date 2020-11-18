import { getMap as map } from '@/store/mapStore'
import {
  addNewLocation,
  updateLocationsStore,
  getLocations,
  deleteLocation,
} from '@/store/locationsStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'

import { Location } from '@/types/types'

export const showLocations = getLocations

const onTap = () => {
  console.log(`Tap Location`)
  // setVisibility('newLocationMenu', true)
}

const onCalloutTap = () => console.log('onCalloutTapLocation()')

export const newLocation = (location: Location): void => {
  console.log('addLocation()')
  const opts = {
    lat: userMarker().lat,
    lng: userMarker().lng,
    title: location.id,
    selected: true,
    onTap: onTap(),
    onCalloutTap: onCalloutTap(),
  }
  location = Object.assign({ ...location, ...opts })
  const newLocation = []
  newLocation.push(location)
  map()
    .addMarkers(newLocation)
    .then(() => addNewLocation(location))
  console.log(`New location: ${JSON.stringify(getLocations)}`)
}

export const updateLocation = (location: Location): void => {
  updateLocationsStore(location)
  console.dir(getLocations)
}

export const removeLocation = (id: string): Location[] => deleteLocation(id)
