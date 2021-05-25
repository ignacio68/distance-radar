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
  isDatabaseEmpty,
} from '@/api/storage'

import { getLocation, updateLocation, removeSecurityAreaFromLocation } from './locationsStore'

import { SecurityArea, LayerVisibility, Database, Location, Alarm } from '@/api/types'
import { CouchBase } from '@triniwiz/nativescript-couchbase'

const state = Vue.observable({
  securityAreas: [] as SecurityArea[],
})

// Create persist security areas database
let database: Database

export const initializeDatabase = (name: string): void => {
  database = createDatabase(name)
  // hydratingState(database)
  resetDatabase(database)
}

export const hydratingState = (database: CouchBase) => {
  const securityAreas = getAllItemsFromDatabase(database)
  if (!isDatabaseEmpty(database))
    securityAreas.forEach((securityArea: SecurityArea) => addSecurityAreaToState(securityArea))
  else console.log(`_______NO HAY ELEMENTOS EN LA BASE DE DATOS DE SECURITY AREAS DB______`)
}

const addSecurityAreaToState = async (securityArea: SecurityArea): Promise<void> => {
  console.log(`securityAreaStore.ts::addSecurityAreaToState: ${JSON.stringify(securityArea)}`)
  state.securityAreas.push(securityArea)
}

// initializeDatabase()

export const addNewSecurityArea = async (securityArea: SecurityArea): Promise<void> => {
  console.log(`securityAreaStores::addNewSecurityArea()`)
  addSecurityAreaToState(securityArea)
    .then(() => {
      addSecurityAreaToLocation(securityArea.id, securityArea.owner)
      console.log(`securityAreaStores::addNewSecurityArea()::securityAreaId: ${securityArea.id}`)
    })
    .then(() => {
      addItemToDatabase<SecurityArea>(database, securityArea, securityArea.id)
      // const securityAreas = getAllItemsFromDatabase(database)
      // console.log(
      //   `####_securityAreaStores::addNewSecurityArea()::securityAreas: ${JSON.stringify(
      //     securityAreas,
      //   )}`,
      // )
    })
}

const addSecurityAreaToLocation = async (id: string, owner: string): Promise<void> => {
  console.log(`securityAreaStores::addSecurityAreaToLocation()`)
  const location = setLocation(id, owner)
  updateLocation(location)
}

const setLocation = (id: string, owner: string): Location => {
  const location: Location = getLocation(owner)
  if (!!location) {
    location.securityAreas.push(id)
    console.log(`securityAreaStore::setLocation()::securityArea id: ${id}`)
    return location
  } else console.log('the location not exist')
}

export const getSecurityArea = (id: string): SecurityArea => {
  const index = findSecurityAreaIndex(id)
  const securityArea = state.securityAreas[index]
  return securityArea
}

export const getAllSecurityAreas = (): SecurityArea[] => state.securityAreas

export const isId = (id: string): boolean => {
  if (hasSecurityAreas()) findSecurityAreaIndex(id) >= 0
  return
}

export const isSecurityAreaVisible = (id: string): LayerVisibility => {
  if (hasSecurityAreas()) {
    const index = findSecurityAreaIndex(id)
    return state.securityAreas[index].layer.paint.visibility
  }
  return
}

// TODO: to review code
export const updateSecurityAreaStore = (securityArea: SecurityArea): void => {
  if (hasSecurityAreas()) {
    deleteSecurityArea(securityArea.id).then(() => {
      addNewSecurityArea(securityArea)
      updateItemInDatabase(database, securityArea.id, securityArea)
    })
  }
  return
}

export const deleteSecurityArea = (id: string): Promise<void> => {
  console.log(`securityAreaStore::deleteSecurityArea()::securityArea id: ${id}`)
  if (hasSecurityAreas()) {
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
  return
}

const getOwner = (index: number): string => state.securityAreas[index].owner

const removeSecurityAreafromState = async (index: number): Promise<void> => {
  state.securityAreas.splice(index, 1)
}

export const resetSecurityAreasStore = (): void => {
  if (hasSecurityAreas()) {
    deleteAllSecurityAreasFromState()
    resetDatabase(database)
  }
  return
}

const deleteAllSecurityAreasFromState = (): void => {
  state.securityAreas.length = 0
}

const findSecurityAreaIndex = (id: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.id === id)

const hasSecurityAreas = (): boolean => !!getAllSecurityAreas() && getAllSecurityAreas().length > 0

/******** ALARMS ********/

export const getAlarm = (id: string): Alarm => {
  if (areAlarms()) {
    const alarm = getSecurityAreaFromAlarmId(id).alarm
    console.log(`securityAreasStore::getAlarm()::alarm: ${alarm.id}`)
    return alarm
  }
  return
}

export const getAllAlarms = (): Alarm[] =>
  state.securityAreas.map((securityArea) => securityArea.alarm)

export const getActivatedAlarms = (): Alarm[] => {
  if (areAlarms()) {
    const activatedAlarms = getAllAlarms().filter((alarm) => alarm.isActivated === true)
    console.log(
      `securityAreaStore::getActivatedAlarms::activated alarms: ${activatedAlarms.length}`,
    )
    return activatedAlarms
  } else {
    console.log('securityAreaStore::getActivatedAlarms::error: ARE NOT ACTIVATED ALARMS!!')
    return
  }
}

export const getSecurityAreaFromAlarmId = (alarmId: string): SecurityArea => {
  console.log('securityAreasStore::getSecurityAreaFromAlarmId()')
  if (areAlarms()) {
    const securityArea = state.securityAreas.find(
      (securityArea) => securityArea.alarm.id === alarmId,
    )
    return securityArea
  }
  return
}

export const setAlarmOn = (alarmId: string, searchId: number): void => {
  if (areAlarms()) {
    console.log('securityAreasStore::setAlarmOn()')
    const index = findSecurityAreaIndexFromAlarmId(alarmId)
    setAlarmActivation(index, true)
    setSearchId(index, searchId)
    updateItemInDatabase(database, state.securityAreas[index].id, state.securityAreas[index])
  }
  return
}

export const setAlarmOff = async (alarmId: string): Promise<void> => {
  console.log('securityAreasStore::setAlarmOf()')
  if (areAlarms()) {
    const index = findSecurityAreaIndexFromAlarmId(alarmId)
    setAlarmActivation(index, false)
    setSearchId(index, null)
    updateItemInDatabase(database, state.securityAreas[index].id, state.securityAreas[index])
  }
  return
}

const findSecurityAreaIndexFromAlarmId = (alarmId: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.alarm.id === alarmId)

const setSearchId = (index: number, searchId: number): void => {
  state.securityAreas[index].alarm.searchId = searchId
}

export const getSearchIdFromAlarmId = (alarmId: string): number => {
  if (areAlarms()) {
    const id = getAlarm(alarmId).searchId
    console.log(`securityAreasStore::getSearchIdFromAlarmId()::id: ${id}`)
    return id
  }
  return
}

const getSearchId = (index: number): number => state.securityAreas[index].alarm.searchId

const setAlarmActivation = (index: number, value: boolean): void => {
  state.securityAreas[index].alarm.isActivated = value
}

const areAlarms = (): boolean => !!getAllAlarms() && getAllAlarms().length > 0
