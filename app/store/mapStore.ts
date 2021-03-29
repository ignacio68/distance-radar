import Vue from 'nativescript-vue'

import {
  createDatabase,
  getItemFromDatabase,
  addItemToDatabase,
  updateItemInDatabase,
  resetDatabase,
} from '@/api/storage'

import { Database } from '@/api/types'
import { Map } from '@/api/types'

const state = Vue.observable({
  map: null as Map,
})

// Create persist locations database
let database: Database

export const initializeDatabase = (): void => {
  database = createNewDatabase()

  const map: Map = getItemFromDatabase(database, 'map')

  if (map !== null || map !== undefined) setMap(map)
}

const createNewDatabase = (): Database => createDatabase('map')

// initializeMap()

export const getMap = (): Map => state.map

export const setMap = (map: Map): void => {
  console.log(`mapStore::setMap()`)
  state.map = map

  // setMapToStorage(map)
}

// FIXME: map format
const setMapToStorage = (map: Map): void => {
  const isMap: Map | null = getItemFromDatabase(database, 'map')
  console.log(`mapStore::setMapToStorage::isMap: ${isMap}`)
  const userMap = JSON.parse(JSON.stringify(map))
  isMap !== null
    ? updateItemInDatabase(database, 'map', userMap)
    : addItemToDatabase<Map>(database, userMap, 'map')
  // isMap !== null ? updateItemInDatabase(database, 'map', map) : console.log('The map is null')
}

export const deleteMap = (): void => {
  state.map = null
  resetDatabase(database)
}
