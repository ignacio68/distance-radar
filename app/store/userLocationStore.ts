import Vue from 'Vue'
import { InitialCoordinates, Coordinates } from '@/types/types'

const state = Vue.observable({
  currentUserLocation: {
    lat: 0,
    lng: 0,
  } as Coordinates,
})

export const getInitialLocation = () => {
  const initialLocation: InitialCoordinates = {
    lat: String(state.currentUserLocation.lat),
    lng: String(state.currentUserLocation.lng),
  }
  return initialLocation
}

export const getCurrentUserLocation = (): Coordinates => state.currentUserLocation

export const setCurrentUserLocation = (coordinates: Coordinates) => {
  state.currentUserLocation.lat = coordinates.lat
  state.currentUserLocation.lng = coordinates.lng
}
