import * as geolocation from '@nativescript/geolocation'

import { Enums } from '@nativescript/core/'

import { LatLng } from './types'

import {
  getUserCurrentLocation as userCurrentLocation,
  setCurrentUserLocation,
  setWatchId,
} from '@/store/userLocationStore'

const setLocationOptions = (): geolocation.Options => ({
  desiredAccuracy: Enums.Accuracy.high,
  maximumAge: 5000,
  timeout: 10000,
})

export const getUserCurrentLocation = async (): Promise<void | LatLng> => {
  console.log(`geolocationService::getUserCurrentLocation()`)
  const userLocation = isLocationServicesEnabled()
    .then(async () => {
      const userLocation = await getUserLocation()
      console.log(
        `geolocationService::getUserCurrentLocation()::userLocation: ${JSON.stringify(
          userLocation,
        )}`,
      )
      setCurrentUserLocation(userLocation)
      return userLocation
    })
    .catch((error) => console.log(`geolocationService::getUserCurrentLocation()::error: ${error}`))
  return userLocation
}

const isLocationServicesEnabled = async (): Promise<void> => {
  console.log('geolocationService::isLocationServicesEnabled()')
  geolocation.isEnabled() ? console.log('The location service is enabled') : enableLocationRequest()
}

const enableLocationRequest = (): void => {
  console.log('geolocationService::enableLocationRequest()')
  geolocation.enableLocationRequest(true, true).then(() => isLocationServicesEnabled())
}

const getUserLocation = (): Promise<LatLng> => {
  console.log('geolocationService::getUserLocation()')
  const locationOptions = setLocationOptions()
  const userLocation = geolocation.getCurrentLocation(locationOptions).then((position) => {
    const location = positionToCurrentLocation(position)
    console.log(`geolocationService::getUserLocation(): ${location.lat}`)
    return location
  })
  return userLocation
}

export const startWatchUserLocation = async (): Promise<void> => {
  console.log('geolocationService::watchUserLocation()')
  isLocationServicesEnabled().then((): void => {
    const watchId = geolocation.watchLocation(
      (position) => {
        const currentLocation = positionToCurrentLocation(position)
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
      setLocationOptions(),
    )
    setWatchId(watchId)
  })
}

export const stopWatchUserLocation = (watchId: number): void => {
  console.log('geolocationService::stopWatchUserLocation()')
  geolocation.clearWatch(watchId)
  setWatchId(null)
}

const positionToCurrentLocation = (position: geolocation.Location): LatLng => ({
  lat: position.latitude,
  lng: position.longitude,
})

// export const calculateDistance = (loc1: LatLng, loc2: LatLng): LatLng => {
//   const distance = geolocation.distance(loc1, loc2)
//   return distance
//  }
