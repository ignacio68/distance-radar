/* eslint-disable @typescript-eslint/no-explicit-any */
import { mbAddMarkers, mbRemoveMarkers } from '@/services/mapboxService'

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

import { Location } from './types'

export const showLocations = getLocations()

export const newLocation = (locationProps: Location): void => {
  const newLocation: Location = setLocationOpts(locationProps)
  mbAddMarkers(getMap(), [newLocation]).then(() => {
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
  console.log(`locations::onTap(): ${id}`)
  hasSecurityArea(id).then((result) => {
    if (result) {
      console.log('The locationProps has a security area')
      return
    } else {
      setVisibility('newSecurityAreaMenu', true)
      setSelectedLocation(id)
    }
  })
}

const onCalloutTap = (): void =>
  console.log(`locations.ts::onCalloutTapLocation()`)
// export const fetchLocations = (): Locations[] => {
//   map.addMarkers(getMap(), locationProps)
// }

export const fetchSelectedLocation = (): Location => {
  console.log(
    `locations.ts::fetchSelectedLocation() ${JSON.stringify(
      getSelectedLocation(),
    )}`,
  )
  return getSelectedLocation()
}

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
  mbRemoveMarkers(getMap(), [id]).then(() => {
    deleteLocation(id)
    console.log(`locations.ts::removeLocation:`)
  })
}

export const removeAllLocations = (): void => {
  deleteAllLocations()
  console.log(`locations.ts::removeAllLocation:`)
}

export const updateLocationAtInit = async (
  location: Location,
): Promise<void> => {
  const options: Record<string, unknown> = {
    onTap: () => onTap(location.id),
    onCalloutTap: () => onCalloutTap(),
  }
  const updatedLocation: Location = { ...location, ...options }
  await updateLocation(updatedLocation)
}
