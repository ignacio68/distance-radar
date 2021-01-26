import Vue from 'nativescript-vue'

import { createDatabase, getItem, addItem, updateItem, resetDatabase } from '@/api/storage'

import { Database } from '@/api/types'
import { Map } from '@/api/types'

const state = Vue.observable({
  map: null as Map,
})

// Create persist locations database
const database: Database = createDatabase('map')

const initializeDatabase = (): void => {
  const map: Map = getItem(database, 'map')

  map && setMap(map)
}

// initializeDatabase()

export const getMap = (): Map => state.map

export const setMap = (map: Map): void => {
  state.map = map

  const isMap: Map = getItem(database, 'map')
  isMap ? updateItem(database, 'map', map) : addItem<Map>(database, map, 'map')
}

export const deleteMap = (): void => {
  state.map = null
  resetDatabase(database)
}
