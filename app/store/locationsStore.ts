import Vue from 'nativescript-vue'

import { Location } from '@/types/types'

const state = Vue.observable({
  locations: ([] as unknown) as [Location],
})

const findIndex = (id: string): number =>
  state.locations.findIndex((location) => location.id === id)

// export const hasId = (id: string): boolean =>
//   (findIndex(id) as unknown) as boolean
export const hasId = (id: string): boolean =>
  findIndex(id) >= 0 ? true : false

export const numberOfLocations = (): number => state.locations.length

export const getLocation = (id: string): Location =>
  state.locations.find((location) => (location.id = id))

export const getLocations = state.locations

export const addNewLocation = (location: Location): number =>
  state.locations.push(location)

// setStorage(location.id, location).then(success => {
//   console.log(`setStorage? ${success}`)
//   if(success){
//     addMarker(this.map, location)
//   }
// })

const updateLocation = (location: Location): Location => {
  const currentLocation = getLocation(location.id)
  const updatedLocation = Object.assign(currentLocation, location)
  return updatedLocation
}
export const updateLocationsStore = (location: Location): void => {
  const updatedLocation = updateLocation(location)
  state.locations.splice(findIndex(location.id), 1, updatedLocation)
}

export const deleteLocation = (id: string): Location[] =>
  state.locations.splice(findIndex(id), 1)
