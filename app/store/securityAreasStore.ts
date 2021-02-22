import Vue from 'nativescript-vue'

import {
  createDatabase,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  resetDatabase,
} from '@/api/storage'

import { removeSecurityAreaFromLocation } from './locationsStore'
import { addNewAlarm, removeAlarm } from './alarmsStore'

import { SecurityArea, LayerVisibility, Database } from '@/api/types'

const state = Vue.observable({
  securityAreas: [] as SecurityArea[],
})

// Create persist security areas database
const database: Database = createDatabase('securityAreas')

const initializeDatabase = (): void => {
  const securityAreas = getAllItems(database)

  if (securityAreas.length > 0) {
    securityAreas.forEach((securityArea: SecurityArea) =>
      addSecurityAreaToState(securityArea),
    )
  }
  return
}

const addSecurityAreaToState = (securityArea: SecurityArea): void => {
  console.log(
    `securityAreaStore.ts::addSecurityAreaToState: ${JSON.stringify(
      securityArea,
    )}`,
  )
  state.securityAreas.push(securityArea)
}

initializeDatabase()

// resetDatabase(database)

export const isId = (id: string): boolean => (findIndex(id) >= 0 ? true : false)

export const isSecurityAreaVisible = (id: string): LayerVisibility => {
  const index = findIndex(id)
  const isVisible = state.securityAreas[index].layer.paint.visibility
  return isVisible
}

const findIndex = (id: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.id === id)

export const getSecurityArea = (id: string): SecurityArea => {
  const securityArea = find(id)
  return securityArea
}

const find = (id: string): SecurityArea =>
  state.securityAreas.find((securityArea) => securityArea.id === id)

export const addNewSecurityArea = async (
  securityArea: SecurityArea,
): Promise<void> => {
  console.log(`securityAreaStore.ts::addNewSecurityArea()`)
  // addSecurityAreaToState(securityArea)
  state.securityAreas.push(securityArea)
  addItem<SecurityArea>(database, securityArea, securityArea.id)
  if (securityArea.isActive === true) addNewAlarm(securityArea.id)
  return
}

export const getAllSecurityAreas = (): SecurityArea[] => state.securityAreas

export const getSecurityAreasActive = (ids: string[]): SecurityArea[] =>
  fetchSecurityAreasActive(ids)

const fetchSecurityAreasActive = (ids: string[]): SecurityArea[] => {
  console.log(
    `securityAreasStore::fetchSecurityAreasActive(): ${JSON.stringify(ids)}`,
  )
  const securityAreasActive = state.securityAreas.filter((securityArea) => {
    for (const id of ids) {
      if (securityArea.id === id) return securityArea
      return
    }
  })

  return securityAreasActive
}

export const updateSecurityAreaStore = (securityArea: SecurityArea): void => {
  deleteSecurityArea(securityArea.id).then(() =>
    addNewSecurityArea(securityArea),
  )
}

export const deleteSecurityArea = async (id: string): Promise<void> => {
  const index = findIndex(id)
  const owner = state.securityAreas[index].owner
  state.securityAreas.splice(index, 1)
  removeSecurityAreaFromLocation(owner, id)
  removeAlarm(id)
  deleteItem(database, id)
  console.log('removed Security Area!!')
}

export const deleteAllSecurityAreas = (): void => {
  state.securityAreas.length = 0
  state.securityAreas.map((securityArea) => deleteSecurityArea(securityArea.id))
  resetDatabase(database)
}
