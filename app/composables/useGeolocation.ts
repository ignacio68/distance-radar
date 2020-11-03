import Vue from 'nativescript-vue'

const geolocation = Vue.observable({
  isEnabled: false,
})

export const getIsEnabled = (): boolean => geolocation.isEnabled

export const setIsEnabled = (isEnabled: boolean) => geolocation.isEnabled = isEnabled
