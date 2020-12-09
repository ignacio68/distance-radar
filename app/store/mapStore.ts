import Vue from 'nativescript-vue'
import { MapboxApi } from '@nstudio/nativescript-mapbox'

const state = Vue.observable({
  map: null as MapboxApi,
})

export const getMap = (): MapboxApi => state.map

export const setMap = (map: MapboxApi): void => {
  state.map = map
}
