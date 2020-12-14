import { setVisibility } from '@/composables/useComponent'

import { getMap as map } from '@/store/mapStore'
import {
  addNewLocation,
  updateLocationsStore,
  getLocations,
  deleteLocation,
  deleteAllLocations,
  setSelectedLocation,
  getSelectedLocation,
  hasSecurityArea,
} from '@/store/locationsStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'

import { Location } from '@/types/types'

export const showLocations = getLocations()

const onTap = (id: string): void => {
  console.log(`locations::onTap()`)
  hasSecurityArea(id).then((result) => {
    if (result) {
      console.log('The location has a security area')
    } else {
      setVisibility('newSecurityAreaMenu', true)
      setSelectedLocation(id)
    }
  })
}

const onCalloutTap = (): void => console.log(`locations.ts::onCalloutTapLocation()`)

export const newLocation = (location: Location): void => {
  const opts = {
    lat: userMarker().lat,
    lng: userMarker().lng,
    title: location.id,
    selected: true,
    hasSecurityArea: false,
    onTap: () => onTap(location.id),
    onCalloutTap: () => onCalloutTap(),
  }
  const completeLocation: Location = { ...location, ...opts }
  console.log(`locations.ts::addLocation(): ${JSON.stringify(completeLocation)}`)
  const newLocation: Location[] = []
  newLocation.push(completeLocation)
  map()
    .addMarkers(newLocation)
    .then(() => {
      addNewLocation(completeLocation)
    })
}

// export const fetchLocations = (): Locations[] => {
//   map().addMarkers(location)
// }

export const fetchSelectedLocation = (): Location => {
  console.log(`locations.ts::fetchSelectedLocation() ${JSON.stringify(getSelectedLocation())}`)
  return getSelectedLocation()
}

export const updateLocation = async (location: Location): Promise<void> => {
  await updateLocationsStore(location).then(() => {
    console.log(`locations.ts::updateLocation: ${JSON.stringify(location)}`)
  })
}

export const updateLocationAtInit = async (location: Location): Promise<void> => {
  const options: Record<string, unknown> = {
    onTap: () => onTap(location.id),
    onCalloutTap: () => onCalloutTap(),
  }
  const updatedLocation: Location = { ...location, ...options }
  await updateLocation(updatedLocation)
}

export const removeLocation = (id: string): void => {
  deleteLocation(id)
  console.log(`locations.ts::removeLocation:`)
}

export const removeAllLocations = (): void => {
  deleteAllLocations()
  console.log(`locations.ts::removeAllLocation:`)
}
