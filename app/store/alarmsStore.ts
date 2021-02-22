import Vue from 'nativescript-vue'

import {
  createDatabase,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  resetDatabase,
} from '@/api/storage'

import { Database } from '@/api/types'

const state = Vue.observable({
  alarms: [] as string[],
})

// Create persist alarms database
const database: Database = createDatabase('alarms')

const initializeDatabase = (): void =>
  getAllItems(database).forEach((alarm: string) => addAlarmToState(alarm))

const addAlarmToState = (alarm: string): void => {
  console.log(`locationsStore::addLocationToState: ${JSON.stringify(alarm)}`)
  state.alarms.push(alarm)
}

// resetDatabase(database)

initializeDatabase()

const findAlarm = (id: string): string =>
  state.alarms.find((alarm) => alarm === id)

export const addNewAlarm = (id: string): void => {
  if (findAlarm(id) === undefined) {
    addAlarmToState(id)
    addItem<string>(database, id, id)
    console.log(
      `alarmsStore::addNewAlar:alarms: ${JSON.stringify(state.alarms)}`,
    )
  }
  return
}

export const getAllAlarms = (): string[] => state.alarms

export const removeAlarm = (id: string): void => {
  const index = findIndex(id)
  if (index !== undefined || null) {
    state.alarms.splice(findIndex(id), 1)
    deleteItem(database, id)
  }
  return
}

const findIndex = (id: string): number =>
  state.alarms.findIndex((alarm) => alarm === id)

export const deleteAllAlarms = (): void => {
  state.alarms.length = 0
  resetDatabase(database)
}
