import Vue from 'nativescript-vue'
import { InitialCoordinates, LatLng } from '@/types'

const state = Vue.observable({
  currentUserLocation: {
    lat: 0,
    lng: 0,
  } as LatLng,
  watchId: 0,
})

export const getInitialLocation = (): InitialCoordinates => {
  const initialLocation: InitialCoordinates = {
    lat: state.currentUserLocation.lat.toString(),
    lng: state.currentUserLocation.lng.toString(),
  }
  return initialLocation
}

export const getUserCurrentLocation = (): LatLng => state.currentUserLocation

export const setCurrentUserLocation = (coordinates: LatLng): void => {
  state.currentUserLocation.lat = coordinates.lat
  state.currentUserLocation.lng = coordinates.lng
}

export const getWatchId = (): number => state.watchId

export const setWatchId = (id: number): number => (state.watchId = id)
