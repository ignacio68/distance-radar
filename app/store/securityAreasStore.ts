import Vue from 'Vue'

import { PolygonOptions } from '@/types/types'

const state = Vue.observable({
  securityAreas: [],
})

const find = (id: string): PolygonOptions =>
  state.securityAreas.find((securityArea) => securityArea.id === id)

const findIndex = (id: string): number =>
  state.securityAreas.findIndex((securityArea) => securityArea.id === id)

export const hasId = (id: string): boolean =>
  findIndex(id) >= 0 ? true : false

export const isSecurityAreaVisible = (id: string): boolean => {
  const index = findIndex(id)
  const isVisible: boolean = state.securityAreas[index].isVisible
  return isVisible
}

export const getSecurityArea = (id: string): PolygonOptions => {
  const securityArea = find(id)
  return securityArea
}

export const addNewSecurityArea = (securityArea: PolygonOptions): void => {
  state.securityAreas.push(securityArea)
}

// export const isVisible = (id: string, value: boolean): boolean => {
//   const index = findIndex(id)
//   const isVisible: boolean = state.securityAreas[index].isVisible
//   if (isVisible === value) {
//     console.log('The visibility is the same')
//     return
//   }s
//   return isVisible
// }

export const deleteSecurityArea = (id: string): void => {
  const index: number = findIndex(id)
  state.securityAreas.splice(index, 1)
  console.log('removed element!!')
}
