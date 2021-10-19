import Vue from 'nativescript-vue'

const isVisible = Vue.observable({
  drawer: false,
  geocoder: false,
  newLocationMenu: false,
  newSecurityAreaMenu: false,
  locationsList: false,
  securityArea: false,
  textFieldSoftKeyboard: true,
} as { [component: string]: boolean })

export const getVisibility = (item: string): boolean => isVisible[item]

export const toggleVisibility = (item: string): boolean => (isVisible[item] = !isVisible[item])

export const setVisibility = (item: string, visibility: boolean): boolean =>
  (isVisible[item] = visibility)

export const resetBottomSheet = (): void => {
  setVisibility('newLocationMenu', false)
  setVisibility('newSecurityAreaMenu', false)
  setVisibility('textFieldSoftKeyboard', false)
}
