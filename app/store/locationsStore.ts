import Vue from 'nativescript-vue'

import { removeSecurityArea } from '@/api/securityAreas'

import {
  createDatabase,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  resetDatabase,
} from '@/api/storage'

import { Location, Database } from '@/api/types'

const state = Vue.observable({
  locations: ([] as unknown) as Location[],
  selectedLocation: '',
})

// Create persist locations database
const database: Database = createDatabase('locations')

const initializeDatabase = (): void => {
  const locations = getAllItems(database)

  if (locations.length > 0) {
    getAllItems(database).forEach((location: Location) =>
      addLocationToState(location),
    )
  }
  return
}
const addLocationToState = (location: Location): void => {
  console.log(`locationsStore::addLocationToState: ${JSON.stringify(location)}`)
  state.locations.push(location)
}

initializeDatabase()

const findIndex = (id: string): number =>
  state.locations.findIndex((location) => location.id === id)

const updateLocation = async (location: Location): Promise<Location> => {
  const currentLocation = getLocation(location.id)
  const updatedLocation = { ...currentLocation, ...location }
  return updatedLocation
}

export const hasId = (id: string): boolean =>
  findIndex(id) >= 0 ? true : false

export const numberOfLocations = (): number => state.locations.length

export const getLocation = (id: string): Location =>
  state.locations.find((location) => location.id === id)

export const getLocations = (): Location[] => state.locations

export const addNewLocation = (location: Location): void => {
  addLocationToState(location)
  addItem<Location>(database, location, location.id)
}

export const updateLocationsStore = async (
  location: Location,
): Promise<void> => {
  const resolveLocation = await updateLocation(location)
  state.locations.splice(findIndex(location.id), 1, resolveLocation)
  updateItem(database, resolveLocation.id, resolveLocation)
}

export const deleteLocation = (id: string): void => {
  state.locations.splice(findIndex(id), 1)
  deleteItem(database, id)
  removeSecurityArea(id)
}

// TODO: improve the code
export const deleteAllLocations = (): void => {
  state.locations.length = 0
  resetDatabase(database)
}

export const setSelectedLocation = (id: string): string => {
  console.log(`locationsStore.ts::setSelectedLocation: ${id}`)
  return (state.selectedLocation = id)
}

export const getSelectedLocation = (): Location =>
  getLocation(state.selectedLocation)

export const hasSecurityArea = async (id: string): Promise<boolean> => {
  console.log(`locationsStore.ts::hasSecurityArea: ${id}`)
  const location = findIndex(id)
  return state.locations[location].securityAreas.length ? true : false
}

export const removeSecurityAreaFromLocation = (
  locationId: string,
  securityAreaId: string,
): void => {
  const locationIndex = findIndex(locationId)
  const securityAreaIndex = getSecurityAreaIndex(locationIndex, securityAreaId)
  state.locations[locationIndex].securityAreas.splice(securityAreaIndex, 1)
}

const getSecurityAreaIndex = (
  locationIndex: number,
  securityAreaId: string,
): number =>
  state.locations[locationIndex].securityAreas.findIndex(
    (securityArea) => securityArea === securityAreaId,
  )
