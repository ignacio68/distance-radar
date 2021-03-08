import Vue from 'nativescript-vue'

const geolocation = Vue.observable({
  isEnabled: false, // TODO: to remove if is not in used
})

// TODO: to remove if is not in used
export const getIsGeolocationEnabled = (): boolean => geolocation.isEnabled
// TODO: to remove if is not in used
export const setIsGeolocationEnabled = (isEnabled: boolean): boolean =>
  (geolocation.isEnabled = isEnabled)
