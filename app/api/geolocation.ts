import { Utils } from '@nativescript/core'
import * as dialogs from '@nativescript/core/ui/dialogs'
import { latLngToPosition } from '@/utils/commons'
import { watchUserLocation, stopWatchUserLocation } from '@/services/geolocationService'
import distance from '@turf/distance'
import { point } from '@turf/helpers'

import {
  getCurrentUserLocation as currentUserLocation,
  setDistanceToCenter,
} from '@/store/userLocationStore'

import {
  getIsWatchUserLocationEnabled as isWatchUserLocationEnabled,
  setIsWatchUserLocationEnabled,
} from '@/composables/useGeolocation'

import { LatLng, Position } from '@/types/commons'
import { InsideSecurityArea, CalculateSecurityDistance } from './types'

// TODO: Create a enum for constants
const EARTH_RADIUS = 6378.137
const TO_RADIANS = 0.017453292519943295 // (PI / 180)

const toRadians = (degrees: number): number => degrees * TO_RADIANS

export const startTrackingUserLocation = (): void => {
  setIsWatchUserLocationEnabled(true)
  watchUserLocation()
}

export const stopTrackingUserLocation = (watchId: number): void => {
  setIsWatchUserLocationEnabled(false)
  stopWatchUserLocation(watchId)
}

const calculateCurrentDistance = (initialLocation: LatLng, currentLocation: LatLng): number => {
  const from = point(latLngToPosition(initialLocation))
  const to = point(latLngToPosition(currentLocation))
  const options = { units: 'kilometers' as const }

  const currentDistance = distance(from, to, options)
  console.log(`geolocation::calculateCurrentDistance:distance is: ${currentDistance}`)
  return currentDistance
}

const isIntoSecurityArea = (args: InsideSecurityArea): boolean => {
  const currentDistance = calculateCurrentDistance(args.initialLocation, currentUserLocation())
  setDistanceToCenter(currentDistance)
  console.log(`distance: ${args.securityDistance}, current distance: ${currentDistance}`)
  const isIntoSecurityArea = currentDistance <= args.securityDistance ? true : false
  return isIntoSecurityArea
}

export const isUserInSecurityArea = (args: CalculateSecurityDistance): void => {
  const searchId = Utils.setInterval(() => {
    const userIsIntoSecurityArea = isIntoSecurityArea({
      initialLocation: args.initialLocation,
      securityDistance: args.securityDistance,
    })
    if (args.mode === 'IN') {
      modeIsIn(userIsIntoSecurityArea, searchId)
    } else if (args.mode === 'OUT') {
      modeIsOut(userIsIntoSecurityArea, searchId)
    }
  }, args.interval)
}

const modeIsIn = (userIsIntoSecurityArea: boolean, intervalId: any): any => {
  if (!userIsIntoSecurityArea) {
    Utils.clearInterval(intervalId)
    dialogs.alert('You are OUT of your SECURITY AREA!!!').then((r) => {
      console.log(JSON.stringify(r))
    })
    setIsWatchUserLocationEnabled(false)
  } else if (!isWatchUserLocationEnabled()) Utils.clearInterval(intervalId)
}

const modeIsOut = (userIsIntoSecurityArea: boolean, intervalId: any) => {
  if (userIsIntoSecurityArea) {
    Utils.clearInterval(intervalId)
    dialogs.alert('You are INSIDE of the SECURITY AREA!!!').then((r) => {
      console.log(JSON.stringify(r))
    })
    setIsWatchUserLocationEnabled(false)
  } else if (!isWatchUserLocationEnabled()) Utils.clearInterval(intervalId)
}
