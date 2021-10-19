import Vue from 'nativescript-vue'

import { alert } from '@nativescript/core'

import { removeSecurityArea } from '@/api/securityAreas'

import {
  createDatabase,
  getAllItemsFromDatabase,
  addItemToDatabase,
  updateItemInDatabase,
  deleteItemInDatabase,
  resetDatabase,
  deleteDatabase,
  isDatabaseEmpty,
} from '@/api/storage'

import { Location, Database } from '@/api/types'
import { CouchBase } from '@triniwiz/nativescript-couchbase'

const state = Vue.observable({
  locations: [] as unknown as Location[],
  selectedLocation: '' as string,
})

// Create persist locations database
// const database: Database = createDatabase('locations')
let database: Database
//
export const initializeDatabase = (name: string): void => {
  database = createDatabase(name)
  // hydratingState(database)
  resetDatabase(database)
}

const hydratingState = (database: CouchBase) => {
  const locations = getAllItemsFromDatabase(database)
  if (!isDatabaseEmpty(database))
    locations.forEach((location: Location) => addLocationToState(location))
  else console.log(`_______NO HAY ELEMENTOS EN LA BASE DE DATOS DE LOCATIONS DB______`)
}

const addLocationToState = (location: Location): void => {
  state.locations.push(location)
  console.log(`locationsStore::addLocationToState::location: ${JSON.stringify(location)}`)
}

// initializeDatabase('locations')

export const addNewLocation = (location: Location): void => {
  addLocationToState(location)
  addItemToDatabase<Location>(database, location, location.id)
  const locations = getAllItemsFromDatabase(database)
  console.log(`####_locationsStore::addNewLocation::locations: ${JSON.stringify(locations)}`)
}

export const getLocation = (id: string): Location =>
  state.locations.find((location) => location.id === id)

export const getAllLocations = (): Location[] => state.locations

export const isLocationId = (id: string): boolean => (findIndex(id) >= 0 ? true : false)

const findIndex = (id: string): number => {
  const index = state.locations.findIndex((location) => location.id === id)
  console.log(`locationsStore::findIndex()::index[${id}]: ${index}`)
  return index
}

export const hasLocations = (): boolean => !!state.locations.length

export const updateLocation = (location: Location): void => {
  const updatedLocation = setUpdateLocation(location)
  replaceLocationInState(updatedLocation)
  updateItemInDatabase(database, updatedLocation.id, updatedLocation)
}

const setUpdateLocation = (location: Location): Location => {
  const currentLocation = getLocation(location.id)
  const updatedLocation = { ...currentLocation, ...location }
  return updatedLocation
}

const replaceLocationInState = (location: Location) =>
  state.locations.splice(findIndex(location.id), 1, location)

export const deleteLocations = (locations: string[]): void => {
  locations.forEach((location) => {
    deleteLocationFromState(location).then(() => deleteItemInDatabase(database, location))
  })
}

const deleteLocationFromState = async (id: string): Promise<Location[]> =>
  state.locations.splice(findIndex(id), 1)

export const resetLocationsStore = (): void => {
  deleteAllLocationsFromState()
  resetDatabase(database)
}

const deleteAllLocationsFromState = (): void => {
  state.locations.length = 0
}

export const setSelectedLocation = (id: string): void => {
  state.selectedLocation = id
}

export const getSelectedLocationId = (): string => state.selectedLocation

export const getSelectedLocation = (): Location => {
  const location = getLocation(getSelectedLocationId())
  console.log(`selected location: ${JSON.stringify(location)}`)
  return location
}

export const isSecurityArea = (id: string): boolean => {
  const location = findIndex(id)
  console.log(
    `locationsStore::isSecurityArea()::is ${id}? ${state.locations[location].securityAreas.length}`,
  )
  return state.locations[location].securityAreas.length > 0
}

export const removeAllSecurityAreas = (id: string) => {
  const location = findIndex(id)
  const securityAreas = state.locations[location].securityAreas
  securityAreas.forEach((securityArea: string) => removeSecurityArea(securityArea))
}

export const removeSecurityAreaFromLocation = async (
  locationId: string,
  securityAreaId: string,
): Promise<void> => {
  const locationIndex = findIndex(locationId)
  if (locationIndex >= 0) {
    const securityAreaIndex = getSecurityAreaIndex(locationIndex, securityAreaId)
    removeSecurityAreaFromState(locationIndex, securityAreaIndex)
  }
  return
}

const getSecurityAreaIndex = (locationIndex: number, securityAreaId: string): number =>
  state.locations[locationIndex].securityAreas.findIndex(
    (securityArea) => securityArea === securityAreaId,
  )

const removeSecurityAreaFromState = (locationIndex: number, securityAreaIndex: number) =>
  state.locations[locationIndex].securityAreas.splice(securityAreaIndex, 1)
