import Vue from 'nativescript-vue'

import { UserMarker, LngLat } from '@/types/types'

const state = Vue.observable({
    userMarker: [],
})

export const hasUserMarker = () => state.userMarker.length > 0

export const getUserMarker = (): UserMarker => state.userMarker[0]

export const setUserMarker = (marker: UserMarker) => state.userMarker.push(marker)

export const updateUserMarkerPosition = (coordinates: LngLat) => {
    state.userMarker[0].lat = coordinates.lat
    state.userMarker[0].lng = coordinates.lng
}
