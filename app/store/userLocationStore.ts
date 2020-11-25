import Vue from 'Vue'
import { InitialCoordinates, LngLat } from '@/types/types'

const state = Vue.observable({
  currentUserLocation: {
    lat: 0,
    lng: 0,
  } as LngLat,
})

export const getInitialLocation = (): InitialCoordinates => {
  const initialLocation: InitialCoordinates = {
    lat: state.currentUserLocation.lat.toString(),
    lng: state.currentUserLocation.lng.toString(),
  }
  return initialLocation
}

export const getCurrentUserLocation = (): LngLat => state.currentUserLocation

export const setCurrentUserLocation = (coordinates: LngLat): void => {
  state.currentUserLocation.lat = coordinates.lat
  state.currentUserLocation.lng = coordinates.lng
}
