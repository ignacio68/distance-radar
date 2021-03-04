import Vue from 'nativescript-vue'

import {
  createDatabase,
  getAllItemsFromDatabase,
  addItemToDatabase,
  updateItemInDatabase,
  deleteItemInDatabase as deleteItemFromDatabase,
  resetDatabase,
  deleteDatabase,
} from '@/api/storage'

import { getLocation, updateLocation, removeSecurityAreaFromLocation } from './locationsStore'
import { addNewAlarm, removeAlarm } from './alarmsStore'

import { SecurityArea, LayerVisibility, Database, Location } from '@/api/types'

const state = Vue.observable({
  securityAreas: [] as SecurityArea[],
})

// Create persist security areas database
const database: Database = createDatabase('securityAreas')

// const initializeDatabase = (): void => {
//   const securityAreas = getAllItemsFromDatabase(database)

//   if (securityAreas.length > 0) {
//     securityAreas.forEach((securityArea: SecurityArea) => addSecurityAreaToState(securityArea))
//   }
//   return
// }

const addSecurityAreaToState = (securityArea: SecurityArea): void => {
  console.log(`securityAreaStore.ts::addSecurityAreaToState: ${JSON.stringify(securityArea)}`)
  state.securityAreas.push(securityArea)
}

// initializeDatabase()

deleteDatabase(database)

export const addNewSecurityArea = async (securityArea: SecurityArea): Promise<void> => {
  console.log(
    `securityAreaStore.ts::addNewSecurityArea()::securityArea: ${JSON.stringify(securityArea)}`,
  )
  addSecurityAreaToState(securityArea)
  addSecurityAreaToLocation(securityArea.id)
  addItemToDatabase<SecurityArea>(database, securityArea, securityArea.id)
  // if (securityArea.isActive) addNewAlarm(securityArea.id)
  return
}

const addSecurityAreaToLocation = (id: string): void => {
  const location = setLocation(id)
  updateLocation(location)
}

const setLocation = (id: string): Location => {
  const location: Location = getLocation(id)
  location.securityAreas.push(id)
  return location
}

export const getSecurityArea = (id: string): SecurityArea =>
  state.securityAreas.find((securityArea) => securityArea.id === id)

export const getAllSecurityAreas = (): SecurityArea[] => state.securityAreas

export const getSecurityAreasActive = (): SecurityArea[] =>
  state.securityAreas.filter((securityArea) => securityArea.isActive === true)

export const isId = (id: string): boolean => (findIndex(id) >= 0 ? true : false)

export const isSecurityAreaVisible = (id: string): LayerVisibility => {
  const index = findIndex(id)
  const isVisible = state.securityAreas[index].layer.paint.visibility
  return isVisible
}

export const updateSecurityAreaStore = (securityArea: SecurityArea): void => {
  deleteSecurityArea(securityArea.id).then(() => addNewSecurityArea(securityArea))
}

export const deleteSecurityArea = async (id: string): Promise<void> => {
  const index = findIndex(id)
  const owner = getOwner(index)
  removeSecurityAreafromState(index).then(() => removeSecurityAreaFromLocation(owner, id))
  // removeAlarm(id)
  console.log(`securityAreaStore.ts::deleteSecurityArea()::id: ${id}`)
  deleteItemFromDatabase(database, id)
  console.log('removed Security Area!!')
}

const getOwner = (index: number): string => state.securityAreas[index].owner

const removeSecurityAreafromState = async (index: number): Promise<void> => {
  console.log(`securityAreaStore.ts::removeSecurityAreafromStatea()::index: ${index}`)
  state.securityAreas.splice(index, 1)
}

export const resetSecurityAreasStore = (): void => {
  deleteAllSecurityAreasFromState()
  resetDatabase(database)
}

const deleteAllSecurityAreasFromState = (): void => {
  state.securityAreas.length = 0
}

const findIndex = (id: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.id === id)
