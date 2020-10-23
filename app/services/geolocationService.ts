import * as geolocation from '@nativescript/geolocation'

import { Accuracy } from '@nativescript/core/ui/enums'

import { Coordinates } from '@/types/types'

import { setCurrentUserLocation } from '@/store/userLocationStore'

export const enableLocationRequest = (option: boolean) =>
  geolocation.enableLocationRequest(option).then(() => {
    console.log('enableLocationRequest()')
  })

export const isLocationServicesEnabled = async () =>
  await geolocation.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
      console.log('The location service is not enabled')
      enableLocationRequest(true)
    }
    console.log('The location service is enabled')
    return isEnabled
  })

const fetchCurrentUserLocation = () =>
  geolocation.getCurrentLocation({}).then(
    result => {
      const location: Coordinates = {
        lat: result.latitude,
        lng: result.longitude,
      }
      console.log(`fetchCurrentUserLocation(): ${JSON.stringify(location)}`)
      return location
    }
  )

export const getCurrentUserLocation = async() => {
  console.log('getUserCurrentLocation()')
  const isEnabled = await isLocationServicesEnabled()
  if (!isEnabled) {
    console.log(`It cannot return the user current coordinates`)
    return
  }
  const location = await fetchCurrentUserLocation().catch(error =>
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
      const currentLocation: Coordinates = {
        lat: position.latitude,
        lng: position.longitude,
      }
      return currentLocation
    },
    (error) => {
      console.log(`failed to get location: ${error}`)
    },
    {
      desiredAccuracy: Accuracy.high,
      minimumUpdateTime: 500,
    }
  )
}
