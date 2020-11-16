import Vue from 'nativescript-vue'

const isVisible = Vue.observable({
  geocoder: false,
  newLocationMenu: false,
  securityArea: false,
  textFieldSoftKeyboard: true,
})

export const getVisibility = (item: string): boolean => isVisible[item]

export const toggleVisibility = (item: string) =>
  (isVisible[item] = !isVisible[item])

export const setVisibility = (item: string, visibility: boolean) => isVisible[item] = visibility

export default {
  getVisibility,
  toggleVisibility,
  setVisibility,
}
