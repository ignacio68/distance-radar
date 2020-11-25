import * as geolocation from '@nativescript/geolocation'

import { Enums } from '@nativescript/core/'

import { LngLat } from '@/types/types'

import { setCurrentUserLocation } from '@/store/userLocationStore'

const locationOptions: geolocation.Options = {
  desiredAccuracy: Enums.Accuracy.high,
  maximumAge: 5000,
  timeout: 10000,
}

const enableLocationRequest = (): void => {
  geolocation.enableLocationRequest(true).then(() => {
    console.log('geolocationService::enableLocationRequest()')
    isLocationServicesEnabled()
  })
}

const isLocationServicesEnabled = async (): Promise<void> => {
  console.log('geolocationService::isLocationServicesEnabled()')
  await geolocation.isEnabled().then(async (isEnabled) => {
    if (!isEnabled) {
      console.log('The location service is not enabled')
      enableLocationRequest()
    }
  })
}

const fetchCurrentUserLocation = async (): Promise<LngLat> => {
  console.log('geolocationService::fetchCurrentUserLocation()')
  const fetchLocation = await geolocation.getCurrentLocation(locationOptions).then((result) => {
    const location: LngLat = {
      lat: result.latitude,
      lng: result.longitude,
    }
    console.log(`geolocationService::fetchCurrentUserLocation(): ${JSON.stringify(location)}`)
    return location
  })
  return fetchLocation
}

export const getCurrentUserLocation = async (): Promise<LngLat> => {
  console.log('geolocationService::getUserCurrentLocation()')
  await isLocationServicesEnabled()
  const location = await fetchCurrentUserLocation().catch((error) => {
    console.log(`geolocationService::getCurrentLocation() error: ${JSON.stringify(error)}`)
    throw error
  })
  setCurrentUserLocation(location)
  return location
  // const location = await fetchCurrentUserLocation()
  //   .then((location) => {
  //     console.log(`getUserCurrentLocation(): ${JSON.stringify(location)}`)
  //     setCurrentUserLocation(location)
  //     return location
  //   })
  //   .catch((error) => {
  //     console.log(`getCurrentLocation() error: ${JSON.stringify(error)}`)
  //     throw error
  //   })
  // return location
}

export const watchUserLocation = async (): Promise<void> => {
  console.log('watchUserLocation()')
  await isLocationServicesEnabled()
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
