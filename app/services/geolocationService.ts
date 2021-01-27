import * as geolocation from '@nativescript/geolocation'

import { Enums } from '@nativescript/core/'

import { LatLng } from './types'

import {
  getCurrentUserLocation as userCurrentLocation,
  setCurrentUserLocation,
  setWatchId,
} from '@/store/userLocationStore'

const locationOptions: geolocation.Options = {
  desiredAccuracy: Enums.Accuracy.high,
  maximumAge: 5000,
  timeout: 10000,
}

export const getCurrentUserLocation = async (): Promise<LatLng> => {
  console.log('geolocationService::getUserCurrentLocation()')
  let userLocation: Promise<LatLng>
  await isLocationServicesEnabled()
    .then((): void => {
      userLocation = currentUserLocation()
    })
    .catch((error) => console.log(`geolocationService::getUserCurrentLocation()::error: ${error.message || error}`))
  return userLocation
}

const isLocationServicesEnabled = async (): Promise<void> => {
  console.log('geolocationService::isLocationServicesEnabled()')
  geolocation.isEnabled() ? console.log('The location service is enabled') : enableLocationRequest()
}

const enableLocationRequest = (): void => {
  console.log('geolocationService::enableLocationRequest()')
  geolocation.enableLocationRequest(true, true).then((): Promise<void> => isLocationServicesEnabled())
}

const currentUserLocation = async (): Promise<LatLng> => {
  console.log('geolocationService::fetchCurrentUserLocation()')
  const currentUserLocation = getUserLocation()
  return currentUserLocation
}

const getUserLocation = async (): Promise<LatLng> => {
  const userLocation = geolocation.getCurrentLocation(locationOptions).then((result) => {
    const location: LatLng = {
      lat: result.latitude,
      lng: result.longitude,
    }
    console.log(`geolocationService::fetchCurrentUserLocation()::: ${JSON.stringify(userLocation)}`)
    return location
  })
  return userLocation
}

export const watchUserLocation = async (): Promise<void> => {
  console.log('geolocationService::watchUserLocation()')
  isLocationServicesEnabled().then((): void => {
    const watchId = geolocation.watchLocation(
      (position) => {
        const currentLocation: LatLng = {
          lat: position.latitude,
          lng: position.longitude,
        }
        console.log(
          `geolocationService::watchUserLocation():currentLocation: ${JSON.stringify(
            userCurrentLocation(),
          )}`,
        )
        setCurrentUserLocation(currentLocation)
      },
      (error) => {
        console.log(`geolocationService::watchUserLocation():error: ${error}`)
      },
      locationOptions,
    )
    setWatchId(watchId)
  })
}

export const stopWatchUserLocation = (watchId: number): void => {
  console.log('geolocationService::stopWatchUserLocation()')
  geolocation.clearWatch(watchId)
}

// export const calculateDistance = (loc1: LatLng, loc2: LatLng): LatLng => {
//   const distance = geolocation.distance(loc1, loc2)
//   return distance
//  }
