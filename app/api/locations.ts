/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeSecurityArea } from '@/api/securityAreas'

import { mbAddMarkers, mbRemoveMarkers } from '@/services/mapboxService'

import { setVisibility } from '@/composables/useComponent'

import { getMap } from '@/store/mapStore'
import {
  addNewLocation,
  updateLocation as updateLocationInStore,
  getAllLocations,
  deleteLocations,
  resetLocationsStore,
  setSelectedLocation,
  isSecurityArea,
} from '@/store/locationsStore'
import { getUserMarker } from '@/store/userMarkerStore'

import { Location } from './types'
import { OnTap } from '@/types/commons'

export const showLocations = getAllLocations()

export const createLocation = (locationProps: Location): void => {
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
    selected: true,
    securityAreas: [],
    onTap: () => onTap(id),
    onCalloutTap: () => onCalloutTap(),
  }
  const location: Location = { ...locationProps, ...options }
  return location
}

export const onTap = (id: string): any => {
  if (!isSecurityArea(id)) {
    setVisibility('newSecurityAreaMenu', true)
    setSelectedLocation(id)
    console.log('MarkerTapped!!')
  }
}

export const onCalloutTap = (): void => console.log(`locations.ts::onCalloutTapLocation()`)

export const updateLocation = (location: Location): void => updateLocationInStore(location)

export const removeLocations = (locations: string[]): void => {
  console.log(`locations.ts::removeLocation()::locations: ${locations}`)
  const map = getMap()
  removeAllSecurityAreas(locations).then(() =>
    mbRemoveMarkers(map, locations).then(() => {
      deleteLocations(locations)
    }),
  )
}

// export const removeLocation = (id: string): void => {
//   console.log(`locations.ts::removeLocation()::id: ${id}`)
//   const map = getMap()
//   mbRemoveMarkers(map, [id]).then(() => deleteLocations(id))
// }

const removeAllSecurityAreas = async (locations: string[]): Promise<void> => {
  locations.forEach((location) => deleteSecurityArea(location))
}

const deleteSecurityArea = (location: string): void => {
  if (isSecurityArea(location)) removeSecurityArea(location)
}

export const removeAllLocations = (): void => resetLocationsStore()

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
