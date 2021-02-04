import Vue from 'nativescript-vue'

import { createDatabase, getItem, addItem, updateItem, resetDatabase } from '@/api/storage'

import { Database } from '@/api/types'
import { Map } from '@/api/types'

const state = Vue.observable({
  map: null as Map,
})

// Create persist locations database
const database: Database = createDatabase('map')

const initializeMap = (): void => {
  const map: Map = getItem(database, 'map')

  map && setMap(map)
}

// initializeMap()

export const getMap = (): Map => state.map

export const setMap = (map: Map): void => {
  console.log(`mapStore::setMap()`)
  state.map = map

  // setMapToStorage(map)
}

// FIXME: map format
const setMapToStorage = (map: Map): void => {
  const isMap: Map | null = getItem(database, 'map')
  console.log(`mapStore::setMapToStorage::isMap: ${isMap}`)
  const userMap = JSON.parse(JSON.stringify(map))
  isMap !== null ? updateItem(database, 'map', userMap) : addItem<Map>(database, userMap, 'map')
  // isMap !== null ? updateItem(database, 'map', map) : console.log('The map is null')
}

export const deleteMap = (): void => {
  state.map = null
  resetDatabase(database)
}
