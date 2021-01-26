import { Utils } from '@nativescript/core'
import * as dialogs from '@nativescript/core/ui/dialogs'
import { watchUserLocation, stopWatchUserLocation } from '@/services/geolocationService'
import { toRadians } from '@/utils/maths'

// import { calculateDistanceFromLocation } from '@/utils/circle'

import {
  getCurrentUserLocation as currentUserLocation,
  setDistanceToCenter,
} from '@/store/userLocationStore'

import {
  getIsWatchUserLocationEnabled as isWatchUserLocationEnabled,
  setIsWatchUserLocationEnabled,
} from '@/composables/useGeolocation'

import { LatLng } from '@/types/commons'
import { InsideSecurityArea, CalculateSecurityDistance } from './types'

// TODO: Create a enum for constants
const EARTH_RADIUS = 6378.137

export const startTrackingUserLocation = (): void => {
  setIsWatchUserLocationEnabled(true)
  watchUserLocation()
}

export const stopTrackingUserLocation = (watchId: number): void => {
  setIsWatchUserLocationEnabled(false)
  stopWatchUserLocation(watchId)
}

//  TODO: Rename the variables and refactore to functional programming
const calculateDistance = (initialLocation: LatLng, currentLocation: LatLng): number => {
  console.log(
    `geolocation::calculateDistance():initialLocation: ${JSON.stringify(initialLocation)}`
  )
  const difLatitude = toRadians(currentLocation.lat - initialLocation.lat)
  const difLongitude = toRadians(currentLocation.lng - initialLocation.lng)

  const a =
    Math.sin(difLatitude / 2) ** 2 +
    Math.cos(toRadians(initialLocation.lat)) *
      Math.cos(toRadians(currentLocation.lat)) *
      Math.sin(difLongitude) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = EARTH_RADIUS * c
  console.log(`geolocation::calculateDistance():distance: ${distance}`)
  return distance
}

const calculateDistanceUserFromLocation = (args: InsideSecurityArea): boolean => {
  const currentDistance = calculateDistance(args.initialLocation, currentUserLocation())
  setDistanceToCenter(currentDistance)
  console.log(`distance: ${args.securityDistance}, current distance: ${currentDistance}`)
  const isValidDistance = currentDistance <= args.securityDistance ? true : false
  return isValidDistance
}

export const isUserInSecurityArea = (args: CalculateSecurityDistance): void => {
  const searchId = Utils.setInterval(() => {
    const distance = calculateDistanceUserFromLocation({
      initialLocation: args.initialLocation,
      securityDistance: args.securityDistance,
    })
    if (args.mode === 'IN') {
      if (!distance) {
        Utils.clearInterval(searchId)
        dialogs.alert('You are OUT of your SECURITY AREA!!!').then((r) => {
          console.log(JSON.stringify(r))
        })
        setIsWatchUserLocationEnabled(false)
      } else if (!isWatchUserLocationEnabled()) Utils.clearInterval(searchId)
    } else if (args.mode === 'OUT') {
      if (distance) {
        Utils.clearInterval(searchId)
        dialogs.alert('You are INSIDE of the SECURITY AREA!!!').then((r) => {
          console.log(JSON.stringify(r))
        })
        setIsWatchUserLocationEnabled(false)
      } else if (!isWatchUserLocationEnabled()) Utils.clearInterval(searchId)
    }
  }, args.interval)
}
