import { Utils } from '@nativescript/core'
import distance from '@turf/distance'
import { point } from '@turf/helpers'
import { alarmHandler } from '@/api/securityAreas'

import { latLngToPosition } from '@/utils/commons'

import {
  getUserCurrentLocation,
  startWatchUserLocation,
  stopWatchUserLocation,
} from '@/services/geolocationService'

import {
  getUserCurrentLocation as currentUserLocation,
  getWatchId as watchId,
} from '@/store/userLocationStore'
import { setAlarmOn, getAlarmsActivated } from '@/store/securityAreasStore'

import { LatLng, Radar } from './types'

// TODO: Revisar
export const getUserLocation = () => getUserCurrentLocation()

export const startTrackingUser = async (): Promise<void> => {
  console.log(`geolocation.ts::startTrackingUser()`)
  if (getAlarmsActivated().length > 0 && watchId() === null) startWatchUserLocation()
  return
}

export const stopTrackingUser = async (): Promise<void> => {
  const len = getAlarmsActivated().length
  if ((len <= 1 || len === undefined) && watchId() !== null) stopWatchUserLocation(watchId())
  return
}

// TODO: Change name
export const startSearchUserPosition = (args: Radar): void => {
  console.log(`geolocation.ts::startSearchUserPosition()`)
  const searchId = startTimer(args)
  const alarmId = args.alarmOwner
  setAlarmOn(alarmId, searchId)
}

// TODO: Change name
export const stopSearchUserPosition = (searchId: number): void => stopTimer(searchId)

const startTimer = (args: Radar): number => {
  console.log(`geolocation.ts::startTimer()`)
  const { id, interval } = args
  const searchId = Utils.setInterval(() => {
    const isUserInside = getIsUserInside(args)
    console.log(
      `geolocation.ts::modeIn::${id} is into  area? ${isUserInside}, alert mode is ${args.alarmMode}`,
    )
    alarmHandler(args, isUserInside)
  }, interval)

  return (searchId as unknown) as number
}

const stopTimer = (searchId: number): void => Utils.clearInterval(searchId)

const getIsUserInside = (args: Radar): boolean => {
  console.log(`geolocation.ts::getIsUserInsider()`)
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
