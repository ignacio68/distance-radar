/* eslint-disable @typescript-eslint/no-explicit-any */
import { mbAddMarkers, mbRemoveMarkers } from '@/services/mapboxService'

import { setVisibility } from '@/composables/useComponent'

import { getMap } from '@/store/mapStore'
import {
  addNewLocation,
  updateLocationsStore,
  getLocation,
  getAllLocations,
  deleteLocation,
  deleteAllLocations,
  setSelectedLocation,
  getSelectedLocation,
  isSecurityArea,
} from '@/store/locationsStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'

import { Location } from './types'

export const showLocations = getAllLocations()

export const newLocation = (locationProps: Location): void => {
  const map = getMap()
  const newLocation: Location = setLocationOpts(locationProps)
  mbAddMarkers(map, [newLocation]).then(() => {
    addNewLocation(newLocation)
  })
}

const setLocationOpts = (locationProps: Location): Location => {
  const { id } = locationProps
  const options: Location = {
    id,
    lat: userMarker().lat,
    lng: userMarker().lng,
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

export const updateLocation = async (location: Location): Promise<void> => {
  await updateLocationsStore(location).then(() => {
    console.log(`locations.ts::updateLocation: ${JSON.stringify(location)}`)
  })
}

export const addSecurityAreaToLocation = (id: string): void => {
  const location: Location = getLocation(id)
  location.securityAreas.push(id)
  updateLocationsStore(location)
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
