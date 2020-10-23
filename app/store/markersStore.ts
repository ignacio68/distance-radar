import Vue from 'nativescript-vue'

import { Marker } from '@/types/types'

const state = Vue.observable({
    markers: [],
})

const findIndex = (id: string): number => state.markers.findIndex(marker => marker.id === id)

export const hasMarkers = () => state.markers.length > 0

export const numberOfMarkers = () => state.markers.length

export const getMarker = (id: string) =>
    state.markers.find((marker) => (marker.id = id))

export const getMarkers = () => state.markers

export const setNewMarker = (marker: Marker) => state.markers.push(marker)

export const updateMarkersStore = (marker: Marker) =>
  state.markers.splice(findIndex(marker.id), 1, marker)
    // deleteMarker(marker.id)
    // setNewMarker(marker)


export const deleteMarker = (id: string) => state.markers.splice(findIndex(id), 1)
