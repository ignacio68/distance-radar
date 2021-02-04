import Vue from 'nativescript-vue'

import { removeSecurityAreaFromLocation } from './locationsStore'

import { SecurityArea, LayerVisibility } from '@/api/types'

const state = Vue.observable({
  securityAreas: [] as SecurityArea[],
})

const find = (id: string): SecurityArea =>
  state.securityAreas.find((securityArea) => securityArea.id === id)

const findIndex = (id: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.id === id)

export const hasId = (id: string): boolean => (findIndex(id) >= 0 ? true : false)

export const isSecurityAreaVisible = (id: string): LayerVisibility => {
  const index = findIndex(id)
  const isVisible = state.securityAreas[index].layer.paint.visibility
  return isVisible
}

export const getSecurityArea = (id: string): SecurityArea => {
  const securityArea = find(id)
  return securityArea
}

export const addNewSecurityArea = async (securityArea: SecurityArea): Promise<void> => {
  state.securityAreas.push(securityArea)
  // console.log(
  //   `securityAreasStore::addNewSecurityArea: ${JSON.stringify(
  //     state.securityAreas[state.securityAreas.length - 1]
  //   )}`
  // )
}

// Only for development
export const getAllSecurityAreas = (): void => {
  console.dir(`securityAreasStore::getAllSecurityAreas(): ${JSON.stringify(state.securityAreas)}`)
}

export const findSecurityAreaActive = (): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.isActive === true)

export const getSecurityAreaActive = (): SecurityArea => {
  const index = findSecurityAreaActive()
  console.dir(state.securityAreas[index])
  // console.log(
  //   `securityAreasStore::getSecurityAreaActive:center: ${JSON.stringify(
  //     state.securityAreas[index].center
  //   )}`
  // )
  return state.securityAreas[index]
}

// export const isVisible = (id: string, value: boolean): boolean => {
//   const index = findIndex(id)
//   const isVisible: boolean = state.securityAreas[index].layer.visibility
//   if (isVisible === value) {
//     console.log('The visibility is the same')
//     return
//   }
//   return isVisible
// }

export const deleteSecurityArea = (securityAreaId: string): void => {
  const index = findIndex(securityAreaId)
  const owner = state.securityAreas[index].owner
  state.securityAreas.splice(index, 1)
  removeSecurityAreaFromLocation(owner, securityAreaId)
  console.log('removed element!!')
}
