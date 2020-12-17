import * as geolocation from '@nativescript/geolocation'

import { Enums } from '@nativescript/core/'

import { LatLng } from '@/types/types'

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

const enableLocationRequest = (): void => {
  geolocation.enableLocationRequest(true, true).then(() => {
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

const fetchCurrentUserLocation = async (): Promise<LatLng> => {
  console.log('geolocationService::fetchCurrentUserLocation()')
  const fetchLocation = await geolocation.getCurrentLocation(locationOptions).then((result) => {
    const location: LatLng = {
      lat: result.latitude,
      lng: result.longitude,
    }
    console.log(`geolocationService::fetchCurrentUserLocation(): ${JSON.stringify(location)}`)
    return location
  })
  return fetchLocation
}

export const getCurrentUserLocation = async (): Promise<LatLng> => {
  console.log('geolocationService::getUserCurrentLocation()')
  await isLocationServicesEnabled()
  const location = await fetchCurrentUserLocation().catch((error) => {
    console.log(`geolocationService::getCurrentLocation() error: ${JSON.stringify(error)}`)
    throw error
  })
  setCurrentUserLocation(location)
  return location
}

export const watchUserLocation = async (): Promise<void> => {
  console.log('geolocationService::watchUserLocation()')
  await isLocationServicesEnabled()
  const watchId = geolocation.watchLocation(
    (position) => {
      const currentLocation: LatLng = {
        lat: position.latitude,
        lng: position.longitude,
      }
      console.log(
        `geolocationService::watchUserLocation():currentLocation: ${JSON.stringify(
          userCurrentLocation()
        )}`
      )
      setCurrentUserLocation(currentLocation)
    },
    (error) => {
      console.log(`geolocationService::watchUserLocation():error: ${error}`)
    },
    {
      desiredAccuracy: Enums.Accuracy.high,
      minimumUpdateTime: 500,
      updateDistance: 5,
    }
  )
  setWatchId(watchId)
}

export const stopWatchUserLocation = (watchId: number): void => {
  console.log('geolocationService::stopWatchUserLocation()')
  geolocation.clearWatch(watchId)
}

// export const calculateDistance = (loc1: LatLng, loc2: LatLng): LatLng => {
//   const distance = geolocation.distance(loc1, loc2)
//   return distance
//  }
