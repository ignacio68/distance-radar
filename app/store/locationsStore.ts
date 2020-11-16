import Vue from 'nativescript-vue'

import { Location } from '@/types/types'

const state = Vue.observable({
    locations: [],
})

const findIndex = (id: string): number => state.locations.findIndex(location => location.id === id)

export const hasId = (id: string): boolean => findIndex(id) ? true : false

export const numberOfLocations = () => state.locations.length

export const getLocation = (id: string) =>
    state.locations.find((location) => (location.id = id))

export const getLocations = () => state.locations

export const addNewLocation = (location: Location) => state.locations.push(location)

const updateLocation = (location: Location): Location => {
    const currentLocation = getLocation(location.id)
    const updatedLocation = Object.assign(currentLocation, location)
    return updatedLocation
}
export const updateLocationsStore = (location: Location) => {
    const updatedLocation = updateLocation(location)
    state.locations.splice(findIndex(location.id), 1, updatedLocation)
}

export const deleteLocation = (id: string) => state.locations.splice(findIndex(id), 1)
