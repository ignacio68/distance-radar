import Vue from 'nativescript-vue'

import {
  createDatabase,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  resetDatabase,
} from '@/api/storage'

import { Location } from '@/types/types'

const state = Vue.observable({
  locations: ([] as unknown) as Location[],
  selectedLocation: '',
})

const database = createDatabase('locations')

const addLocationToState = (location: Location): void => {
  console.log(`locationsStore::addLocationToState: ${JSON.stringify(location)}`)
  state.locations.push(location)
}

const initializeDatabase = (): void =>
  getAllItems(database).forEach((location: Location) => addLocationToState(location))

initializeDatabase()

// deleteItem(database, 'casa')

const findIndex = (id: string): number =>
  state.locations.findIndex((location) => location.id === id)

// export const hasId = (id: string): boolean =>
//   (findIndex(id) as unknown) as boolean
export const hasId = (id: string): boolean => (findIndex(id) >= 0 ? true : false)

export const numberOfLocations = (): number => state.locations.length

export const getLocation = (id: string): Location =>
  state.locations.find((location) => location.id === id)

export const getLocations = (): Location[] => state.locations

export const addNewLocation = (location: Location): void => {
  addLocationToState(location)
  addItem(database, location, location.id)
}

const updateLocation = async (location: Location): Promise<Location> => {
  const currentLocation = getLocation(location.id)
  const updatedLocation = { ...currentLocation, ...location }
  return updatedLocation
}

export const updateLocationsStore = async (location: Location): Promise<void> => {
  const resolveLocation = await updateLocation(location)
  state.locations.splice(findIndex(location.id), 1, resolveLocation)
  updateItem(database, resolveLocation.id, resolveLocation)
}

export const deleteLocation = (id: string): void => {
  state.locations.splice(findIndex(id), 1)
  deleteItem(database, id)
}

export const deleteAllLocations = (): void => {
  state.locations.length = 0
  resetDatabase(database)
}

export const setSelectedLocation = (id: string): string => {
  console.log(`locationsStore.ts::setSelectedLocation: ${id}`)
  return (state.selectedLocation = id)
}

export const getSelectedLocation = (): Location => getLocation(state.selectedLocation)

export const hasSecurityArea = async (id: string): Promise<boolean> => {
  const location = findIndex(id)
  return state.locations[location].hasSecurityArea
}
