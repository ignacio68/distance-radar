import Vue from 'nativescript-vue'

import {
  createDatabase,
  getAllItemsFromDatabase,
  addItemToDatabase,
  updateItemInDatabase,
  deleteItemInDatabase,
  resetDatabase,
  deleteDatabase,
} from '@/api/storage'

import { Database, Alarm } from '@/api/types'

const state = Vue.observable({
  alarms: [] as Alarm[],
})

// Create persist alarms database
const database: Database = createDatabase('alarms')

// const initializeDatabase = (): void =>
//   getAllItemsFromDatabase(database).forEach((alarm: string) =>
//     addAlarmToState(alarm),
//   )

const addAlarmToState = (alarm: Alarm): void => {
  console.log(`locationsStore::addAlarmToState: ${JSON.stringify(alarm)}`)
  state.alarms.push(alarm)
}

deleteDatabase(database)

// initializeDatabase()

export const addNewAlarm = (alarm: Alarm): void => {
  addAlarmToState(alarm)
  addItemToDatabase<Alarm>(database, alarm, alarm.id)
  return
}

export const getAllAlarms = (): Alarm[] => state.alarms

export const addSearchId = (alarmId: string, searchId: NodeJS.Timeout): void => {
  const index = findIndex(alarmId)
  state.alarms[index].searchId = searchId
}

export const removeSearchId = (alarmId: string): void => {
  const index = findIndex(alarmId)
  state.alarms[index].searchId = null
}

export const removeAlarms = (alarms: string[]): void => {
  alarms.forEach((alarm) => removeAlarm(alarm))
}

const removeAlarm = (id: string): void => {
  const index = findIndex(id)
  if (index !== undefined) {
    removeAlarmFromState(id)
    deleteItemInDatabase(database, id)
  }
  return
}

const removeAlarmFromState = (id: string) => state.alarms.splice(findIndex(id), 1)

export const deleteAllAlarms = (): void => {
  deleteAllAlarmsFromState()
  resetDatabase(database)
}

const deleteAllAlarmsFromState = (): void => {
  state.alarms.length = 0
}

const findIndex = (id: string): number => state.alarms.findIndex((alarm) => alarm.id === id)
