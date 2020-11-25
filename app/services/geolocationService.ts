import * as geolocation from '@nativescript/geolocation'

import { Enums } from '@nativescript/core/'

import { LngLat } from '@/types/types'

import { setCurrentUserLocation } from '@/store/userLocationStore'

const locationOptions: geolocation.Options = {
  desiredAccuracy: Enums.Accuracy.high,
  maximumAge: 5000,
  timeout: 10000,
}

const enableLocationRequest = async (): Promise<void> =>
  await geolocation.enableLocationRequest(true).then(() => {
    console.log('enableLocationRequest()')
    isLocationServicesEnabled()
  })

const isLocationServicesEnabled = async (): Promise<boolean> => {
  console.log('isLocationServicesEnabled()')
  const isEnabled = await geolocation.isEnabled().then(async (isEnabled) => {
    if (!isEnabled) {
      console.log('The location service is not enabled')
      await enableLocationRequest()
    }
    console.log(`The location service is enabled? ${JSON.stringify(isEnabled)}`)
    return isEnabled
  })
  return isEnabled
}

const fetchCurrentUserLocation = async (): Promise<LngLat> => {
  console.log('fetchCurrentUserLocation()')
  const location = await geolocation.getCurrentLocation(locationOptions).then((result) => {
    const location: LngLat = {
      lat: result.latitude,
      lng: result.longitude,
    }
    console.log(`fetchCurrentUserLocation(): ${JSON.stringify(location)}`)
    return location
  })
  return location
}

export const getCurrentUserLocation = async (): Promise<LngLat> => {
  console.log('getUserCurrentLocation()')
  await isLocationServicesEnabled()
  const location = await fetchCurrentUserLocation()
    .then((location) => {
      console.log(`getUserCurrentLocation(): ${JSON.stringify(location)}`)
      setCurrentUserLocation(location)
      return location
    })
    .catch((error) => {
      console.log(`getCurrentLocation() error: ${JSON.stringify(error)}`)
      throw error
    })
  return location
}

export const watchUserLocation = (): void => {
  console.log('watchUserLocation()')
  geolocation.watchLocation(
    (position) => {
      const currentLocation: LngLat = {
        lat: position.latitude,
        lng: position.longitude,
      }
      setCurrentUserLocation(currentLocation)
    },
    (error) => {
      console.log(`failed to get location: ${error}`)
    },
    {
      desiredAccuracy: Enums.Accuracy.high,
      minimumUpdateTime: 500,
    }
  )
}
