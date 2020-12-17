import * as map from '@/services/mapboxService'

import { setVisibility } from '@/composables/useComponent'

import { getMap } from '@/store/mapStore'
import {
  addNewLocation,
  updateLocationsStore,
  getLocation,
  getLocations,
  deleteLocation,
  deleteAllLocations,
  setSelectedLocation,
  getSelectedLocation,
  hasSecurityArea,
} from '@/store/locationsStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'

import { Location, SecurityArea } from '@/types/types'

export const showLocations = getLocations()

const setLocationOpts = (location: Location): Location => {
  const opts: Location = {
    id: location.id,
    lat: userMarker().lat,
    lng: userMarker().lng,
    title: location.id,
    selected: true,
    securityAreas: [],
    onTap: () => onTap(opts.title),
    onCalloutTap: () => onCalloutTap(),
  }
  const completeLocation: Location = { ...location, ...opts }
  return completeLocation
}

const onTap = (id: string): void => {
  console.log(`locations::onTap(): ${id}`)
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
  const completeLocation: Location = setLocationOpts(location)
  console.log(`locations.ts::addLocation(): ${JSON.stringify(completeLocation)}`)
  const newLocation: Location[] = []
  newLocation.push(completeLocation)
  map.addMarkers(getMap(), newLocation).then(() => {
    addNewLocation(completeLocation)
  })
}

// export const fetchLocations = (): Locations[] => {
//   map.addMarkers(getMap(), location)
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

export const addSecurityAreaToLocation = (id: string, securityArea: SecurityArea): void => {
  const location: Location = getLocation(id)
  location.securityAreas.push(securityArea)
  updateLocationsStore(location)
}

export const removeLocation = (id: string): void => {
  deleteLocation(id)
  console.log(`locations.ts::removeLocation:`)
}

export const removeAllLocations = (): void => {
  deleteAllLocations()
  console.log(`locations.ts::removeAllLocation:`)
}

/**************************************/

export const updateLocationAtInit = async (location: Location): Promise<void> => {
  const options: Record<string, unknown> = {
    onTap: () => onTap(location.id),
    onCalloutTap: () => onCalloutTap(),
  }
  const updatedLocation: Location = { ...location, ...options }
  await updateLocation(updatedLocation)
}
