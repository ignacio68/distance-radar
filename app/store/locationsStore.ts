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
    locations.forEach((location: Location) => addLocationToState(location))
  }
  return
}

initializeDatabase()

export const addNewLocation = (location: Location): void => {
  addLocationToState(location)
  addItem<Location>(database, location, location.id)
}

const addLocationToState = (location: Location): void => {
  console.log(`locationsStore::addLocationToState: ${JSON.stringify(location)}`)
  state.locations.push(location)
}

export const getLocation = (id: string): Location =>
  state.locations.find((location) => location.id === id)

export const getAllLocations = (): Location[] => state.locations

export const isId = (id: string): boolean => (findIndex(id) >= 0 ? true : false)

const findIndex = (id: string): number =>
  state.locations.findIndex((location) => location.id === id)

export const numberOfLocations = (): number => state.locations.length

export const updateLocation = (location: Location): void => {
  const updatedLocation = setUpdateLocation(location)
  replaceLocationInState(updatedLocation)
  updateItem(database, updatedLocation.id, updatedLocation)
}

const setUpdateLocation = (location: Location): Location => {
  const currentLocation = getLocation(location.id)
  const updatedLocation = { ...currentLocation, ...location }
  return updatedLocation
}

const replaceLocationInState = (location: Location) =>
  state.locations.splice(findIndex(location.id), 1, location)

export const deleteLocation = (id: string): void => {
  deleteLocationFromState(id)
  deleteItem(database, id)
  removeSecurityArea(id)
}

const deleteLocationFromState = (id: string): void => {
  state.locations.splice(findIndex(id), 1)
}

export const deleteAllLocations = (): void => {
  deleteAllLocationsFromState()
  resetDatabase(database)
}

const deleteAllLocationsFromState = (): void => {
  state.locations.length = 0
}

export const setSelectedLocation = (id: string): void => {
  state.selectedLocation = id
}

export const getSelectedLocation = (): Location =>
  getLocation(state.selectedLocation)

export const isSecurityArea = (id: string): boolean => {
  console.log(`locationsStore.ts::isSecurityArea: ${id}`)
  const location = findIndex(id)
  return state.locations[location].securityAreas.length > 0 ? true : false
}

export const removeSecurityAreaFromLocation = (
  locationId: string,
  securityAreaId: string,
): void => {
  const locationIndex = findIndex(locationId)
  const securityAreaIndex = getSecurityAreaIndex(locationIndex, securityAreaId)
  removeSecurityAreaFromState(locationIndex, securityAreaIndex)
}

const getSecurityAreaIndex = (
  locationIndex: number,
  securityAreaId: string,
): number =>
  state.locations[locationIndex].securityAreas.findIndex(
    (securityArea) => securityArea === securityAreaId,
  )

const removeSecurityAreaFromState = (
  locationIndex: number,
  securityAreaIndex: number,
): void => {
  state.locations[locationIndex].securityAreas.splice(securityAreaIndex, 1)
}
