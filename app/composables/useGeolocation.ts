import Vue from 'nativescript-vue'

const geolocation = Vue.observable({
  isEnabled: false, // TODO: to remove if is not in used
  isWatchUserLocationEnabled: false,
})

// TODO: to remove if is not in used
export const getIsEnabled = (): boolean => geolocation.isEnabled
// TODO: to remove if is not in used
export const setIsEnabled = (isEnabled: boolean): boolean => (geolocation.isEnabled = isEnabled)

export const getIsWatchUserLocationEnabled = (): boolean => geolocation.isWatchUserLocationEnabled
export const setIsWatchUserLocationEnabled = (isEnabled: boolean): boolean =>
  (geolocation.isWatchUserLocationEnabled = isEnabled)
