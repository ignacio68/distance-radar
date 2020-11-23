import Vue from 'nativescript-vue'

import { Location } from '@/types/types'

const state = Vue.observable({
  locations: ([] as unknown) as Location[],
  selectedLocation: '',
})

const findIndex = (id: string): number =>
  state.locations.findIndex((location) => location.id === id)

// const findSelectedLocation: number = state.locations.findIndex(
//   (location) => location.selected === true
// )

// export const hasId = (id: string): boolean =>
//   (findIndex(id) as unknown) as boolean
export const hasId = (id: string): boolean =>
  findIndex(id) >= 0 ? true : false

export const numberOfLocations = (): number => state.locations.length

export const getLocation = (id: string): Location =>
  state.locations.find((location) => location.id === id)

export const getLocations = (): Location[] => state.locations

export const addNewLocation = async (location: Location): Promise<number> =>
  state.locations.push(location)

// setStorage(location.id, location).then(success => {
//   console.log(`setStorage? ${success}`)
//   if(success){
//     addMarker(this.map, location)
//   }
// })

const updateLocation = async (location: Location): Promise<Location> => {
  const currentLocation = getLocation(location.id)
  const updatedLocation = { ...currentLocation, ...location }
  return updatedLocation
}

export const updateLocationsStore = async (
  location: Location
): Promise<void> => {
  const resolveLocation = await updateLocation(location)
  state.locations.splice(findIndex(location.id), 1, resolveLocation)
}

export const deleteLocation = (id: string): Location[] =>
  state.locations.splice(findIndex(id), 1)

export const setSelectedLocation = (id: string): string => {
  console.log(`locationsStore.ts::setSelectedLocation: ${id}`)
  return (state.selectedLocation = id)
}

// export const getSelectedLocation = (): Location => {
//   const index = findSelectedLocation
//   return state.locations[index]
// }

export const getSelectedLocation = (): Location =>
  getLocation(state.selectedLocation)
