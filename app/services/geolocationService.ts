import * as geolocation from '@nativescript/geolocation'

import { setIsEnabled as setGeolocationServicesEnabled } from '@/composables/useGeolocation'

import { Accuracy } from '@nativescript/core/ui/enums'

import { LngLat } from '@/types/types'

import { setCurrentUserLocation } from '@/store/userLocationStore'

const locationOptions: geolocation.Options = {
  desiredAccuracy: Accuracy.high,
  maximumAge: 5000,
  timeout: 10000,
}

const enableLocationRequest = (option: boolean) =>
  geolocation.enableLocationRequest(option).then(() => {
    console.log('enableLocationRequest()')
  })

const isLocationServicesEnabled = async () =>
  await geolocation.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
      console.log('The location service is not enabled')
      enableLocationRequest(true)
    }
    console.log('The location service is enabled')
    return isEnabled
  })

const fetchCurrentUserLocation = () =>
  geolocation.getCurrentLocation(locationOptions).then((result) => {
    const location: LngLat = {
      lat: result.latitude,
      lng: result.longitude,
    }
    console.log(`fetchCurrentUserLocation(): ${JSON.stringify(location)}`)
    return location
  })

export const getCurrentUserLocation = async () => {
  console.log('getUserCurrentLocation()')
  const isEnabled = await isLocationServicesEnabled()
  if (!isEnabled) {
    console.log(`Cannot return the user current coordinates`)
    return
  }
  const location = await fetchCurrentUserLocation().catch((error) =>
    console.log(`getCurrentLocation() error: ${error.message || error}`)
  )
  if (location) {
    console.log(`getUserCurrentLocation(): ${JSON.stringify(location)}`)
    setCurrentUserLocation(location)
    return location
  }
}



export const watchUserLocation = () => {
  // TODO: revisar sintaxis
  console.log('watchUserLocation()')
  geolocation.watchLocation(
    position => {
      const currentLocation: LngLat = {
        lat: position.latitude,
        lng: position.longitude,
      }
      return currentLocation
    },
    error => {
      console.log(`failed to get location: ${error}`)
    },
    {
      desiredAccuracy: Accuracy.high,
      minimumUpdateTime: 500,
    }
  )
}
