import { Utils } from '@nativescript/core'
import distance from '@turf/distance'
import { point } from '@turf/helpers'
import { turnOnAlarm } from '@/api/securityAreas'

import { latLngToPosition } from '@/utils/commons'

import {
  getUserCurrentLocation,
  startWatchUserLocation,
  stopWatchUserLocation,
} from '@/services/geolocationService'

import { getUserCurrentLocation as currentUserLocation } from '@/store/userLocationStore'
import { addSearchId } from '@/store/alarmsStore'

import { LatLng, SecurityDistanceArgs } from './types'

// TODO: Revisar
export const getUserLocation = () => getUserCurrentLocation()

export const initTrackingUser = async (): Promise<void> => startWatchUserLocation()

export const removeTrackingUser = (watchId: number): void => stopWatchUserLocation(watchId)

export const startSearchUser = (args: SecurityDistanceArgs): NodeJS.Timeout => {
  const searchId = startTimer(args)
  addSearchId(args.id, searchId)
  return searchId
}

const startTimer = (args: SecurityDistanceArgs): NodeJS.Timeout => {
  const { id, alertMode, interval } = args
  const searchId = Utils.setInterval(() => {
    const isUserIntoSecurityArea = getIsUserIntoSecurityArea(args)
    console.log(`geolocation.ts::modeIn::user is into ${id} area? ${isUserIntoSecurityArea}`)
    if (!isUserIntoSecurityArea && alertMode === 'EXIT') turnOnAlarm(searchId, id, alertMode)
    else if (isUserIntoSecurityArea && alertMode === 'ENTRANCE')
      turnOnAlarm(searchId, id, alertMode)
    return
  }, interval)

  return searchId
}

export const stopSearchUser = (searchId: NodeJS.Timeout): void => Utils.clearInterval(searchId)

const getIsUserIntoSecurityArea = (args: SecurityDistanceArgs): boolean => {
  const { id, initialLocation: center, securityDistance } = args
  const currentDistance = calculateDistanceToCenter(id, center, currentUserLocation())
  return currentDistance <= securityDistance
}

const calculateDistanceToCenter = (id: string, center: LatLng, userLocation: LatLng): number => {
  const from = point(latLngToPosition(center))
  const to = point(latLngToPosition(userLocation))
  const options = { units: 'kilometers' as const }
  const currentDistance = distance(from, to, options)
  console.log(`geolocation::calculateCurrentDistance:the distance of ${id} is: ${currentDistance}`)
  return currentDistance
}
