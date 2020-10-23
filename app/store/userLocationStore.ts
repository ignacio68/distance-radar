import Vue from 'Vue'
import { InitialCoordinates, LngLat } from '@/types/types'

const state = Vue.observable({
  currentUserLocation: {
    lat: 0,
    lng: 0,
  } as LngLat,
})

export const getInitialLocation = () => {
  const initialLocation: InitialCoordinates = {
    lat: String(state.currentUserLocation.lat),
    lng: String(state.currentUserLocation.lng),
  }
  return initialLocation
}

export const getCurrentUserLocation = (): LngLat => state.currentUserLocation

export const setCurrentUserLocation = (coordinates: LngLat) => {
  state.currentUserLocation.lat = coordinates.lat
  state.currentUserLocation.lng = coordinates.lng
}
