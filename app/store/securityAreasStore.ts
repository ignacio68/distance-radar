import Vue from 'nativescript-vue'

import { stopRadar } from '@/api/radar'

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

import { SecurityArea, LayerVisibility, Database, Location, Alarm } from '@/api/types'

const state = Vue.observable({
  securityAreas: [] as SecurityArea[],
})

// Create persist security areas database
const database: Database = createDatabase('securityAreas')

const initializeDatabase = (): void => {
  const securityAreas = getAllItemsFromDatabase(database)

  if (securityAreas.length > 0) {
    securityAreas.forEach((securityArea: SecurityArea) => addSecurityAreaToState(securityArea))
  }
  return
}

const addSecurityAreaToState = async (securityArea: SecurityArea): Promise<void> => {
  console.log(`securityAreaStore.ts::addSecurityAreaToState: ${JSON.stringify(securityArea)}`)
  state.securityAreas.push(securityArea)
}

initializeDatabase()

// deleteDatabase(database)

export const addNewSecurityArea = async (securityArea: SecurityArea): Promise<void> => {
  console.log(
    `securityAreaStores::addNewSecurityArea()::securityArea: ${JSON.stringify(securityArea)}`,
  )
  addSecurityAreaToState(securityArea)
    .then(() => addSecurityAreaToLocation(securityArea.id))
    .then(() => {
      addItemToDatabase<SecurityArea>(database, securityArea, securityArea.id)
    })
}

const addSecurityAreaToLocation = async (id: string): Promise<void> => {
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

export const isId = (id: string): boolean => (findSecurityAreaIndex(id) >= 0 ? true : false)

export const isSecurityAreaVisible = (id: string): LayerVisibility => {
  const index = findSecurityAreaIndex(id)
  const isVisible = state.securityAreas[index].layer.paint.visibility
  return isVisible
}

// TODO: to review code
export const updateSecurityAreaStore = (securityArea: SecurityArea): void => {
  deleteSecurityArea(securityArea.id).then(() => {
    addNewSecurityArea(securityArea)
    updateItemInDatabase(database, securityArea.id, securityArea)
  })
}

export const deleteSecurityArea = async (id: string): Promise<void> => {
  const index = findSecurityAreaIndex(id)
  const owner = getOwner(index)
  const searchId = getSearchId(index)
  stopRadar(searchId)
  removeSecurityAreafromState(index)
    .then(() => removeSecurityAreaFromLocation(owner, id))
    .then(() => {
      deleteItemFromDatabase(database, id)
      console.log('removed Security Area!!')
    })
}

const getOwner = (index: number): string => state.securityAreas[index].owner

const removeSecurityAreafromState = async (index: number): Promise<void> => {
  state.securityAreas.splice(index, 1)
}

export const resetSecurityAreasStore = (): void => {
  deleteAllSecurityAreasFromState()
  resetDatabase(database)
}

const deleteAllSecurityAreasFromState = (): void => {
  state.securityAreas.length = 0
}

const findSecurityAreaIndex = (id: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.id === id)

/******** ALARMS ********/

export const getAlarm = (id: string): Alarm => {
  const securityArea = getSecurityAreaFromAlarmId(id)
  const alarm = securityArea.alarm
  console.log(`securityAreasStore::getAlarm::alarm: ${JSON.stringify(alarm)}`)
  return alarm
}

export const getAllAlarms = (): Alarm[] =>
  state.securityAreas.map((securityArea) => securityArea.alarm)

export const getAlarmsActivated = (): Alarm[] =>
  getAllAlarms().filter((alarm) => alarm.isActivated === true)

export const getSecurityAreaFromAlarmId = (alarmId: string): SecurityArea =>
  state.securityAreas.find((securityArea) => securityArea.alarm.id === alarmId)

export const setAlarmOn = (alarmId: string, searchId: number): void => {
  console.log('securityAreasStore::setAlarmOn()')
  const index = findSecurityAreaIndexFromAlarmId(alarmId)
  setAlarmActivation(index, true)
  setSearchId(index, searchId)
  updateItemInDatabase(database, state.securityAreas[index].id, state.securityAreas[index])
}

export const setAlarmOff = async (alarmId: string): Promise<void> => {
  const index = findSecurityAreaIndexFromAlarmId(alarmId)
  setAlarmActivation(index, false)
  setSearchId(index, null)
  updateItemInDatabase(database, state.securityAreas[index].id, state.securityAreas[index])
}

const findSecurityAreaIndexFromAlarmId = (alarmId: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.alarm.id === alarmId)

const setSearchId = (index: number, searchId: number): void => {
  state.securityAreas[index].alarm.searchId = searchId
}

export const getSearchIdFromAlarmId = (alarmId: string): number => {
  const alarm = getAlarm(alarmId)
  const searchId = alarm.searchId
  return searchId
}

const getSearchId = (index: number): number => state.securityAreas[index].alarm.searchId

const setAlarmActivation = (index: number, value: boolean): void => {
  state.securityAreas[index].alarm.isActivated = value
}
