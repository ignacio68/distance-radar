import Vue from 'nativescript-vue'

const geolocation = Vue.observable({
  isEnabled: false, // TODO: to remove if is not in used
  isWatcherEnabled: false,
})

// TODO: to remove if is not in used
export const getIsGeolocationEnabled = (): boolean => geolocation.isEnabled
// TODO: to remove if is not in used
export const setIsGeolocationEnabled = (isEnabled: boolean): boolean =>
  (geolocation.isEnabled = isEnabled)

export const isWatcherEnabled = (): boolean => geolocation.isWatcherEnabled
export const setIsWatcherEnabled = (isEnabled: boolean): boolean =>
  (geolocation.isWatcherEnabled = isEnabled)
