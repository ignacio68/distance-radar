import Vue from 'nativescript-vue'

import { UserMarker, LatLng } from '@/types'

const state = Vue.observable({
  userMarker: [],
})

export const getUserMarker = (): UserMarker => state.userMarker[0]

export const setUserMarker = (marker: UserMarker): void => {
  state.userMarker.push(marker)
}

export const updateUserMarkerPosition = (coordinates: LatLng): void => {
  state.userMarker[0].lat = coordinates.lat
  state.userMarker[0].lng = coordinates.lng
}
