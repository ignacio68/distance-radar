/* eslint-disable @typescript-eslint/no-explicit-any */
import { mbAddMarkers, mbRemoveMarkers } from '@/services/mapboxService'

import { setVisibility } from '@/composables/useComponent'

import { getMap } from '@/store/mapStore'
import {
  addNewLocation,
  updateLocation as updateLocationInStore,
  getLocation,
  getAllLocations,
  deleteLocation,
  deleteAllLocations,
  setSelectedLocation,
  isSecurityArea,
} from '@/store/locationsStore'
import { getUserMarker } from '@/store/userMarkerStore'

import { Location } from './types'

export const showLocations = getAllLocations()

export const newLocation = (locationProps: Location): void => {
  const map = getMap()
  const newLocation: Location = setLocationOptions(locationProps)
  mbAddMarkers(map, [newLocation]).then(() => {
    addNewLocation(newLocation)
  })
}

const setLocationOptions = (locationProps: Location): Location => {
  const { id } = locationProps
  const { lat, lng } = getUserMarker()
  const options: Location = {
    id,
    lat,
    lng,
    title: id,
    selected: true,
    securityAreas: [],
    onTap: () => onTap(options.title),
    onCalloutTap: () => onCalloutTap(),
  }
  const location: Location = { ...locationProps, ...options }
  return location
}

const onTap = (id: string): void => {
  if (!isSecurityArea(id)) {
    setVisibility('newSecurityAreaMenu', true)
    setSelectedLocation(id)
  }
  return
}

const onCalloutTap = (): void =>
  console.log(`locations.ts::onCalloutTapLocation()`)

export const updateLocation = (location: Location): void =>
  updateLocationInStore(location)

export const addSecurityAreaToLocation = (id: string): void => {
  const location: Location = getLocation(id)
  location.securityAreas.push(id)
  updateLocationInStore(location)
}

export const removeLocation = (id: string): void => {
  const map = getMap()
  mbRemoveMarkers(map, [id]).then(() => deleteLocation(id))
}

export const removeAllLocations = (): void => deleteAllLocations()

// export const updateLocationAtInit = async (
//   location: Location,
// ): Promise<void> => {
//   const options: Record<string, unknown> = {
//     onTap: () => onTap(location.id),
//     onCalloutTap: () => onCalloutTap(),
//   }
//   const updatedLocation: Location = { ...location, ...options }
//   await updateLocation(updatedLocation)
// }
