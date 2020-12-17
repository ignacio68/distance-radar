import Vue from 'nativescript-vue'
import { Map } from '@/services/types'

const state = Vue.observable({
  map: null as Map,
})

export const getMap = (): Map => state.map

export const setMap = (map: Map): void => {
  state.map = map
}
