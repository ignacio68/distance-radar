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

import { startBackgroundService, stopBackgroundService } from './background'
// import { startBackgroundWorker, stopBackgroundWorker } from '@/api/backgroundWorker'

import {
  getUserCurrentLocation as currentUserLocation,
  getWatchId,
} from '@/store/userLocationStore'
import { setAlarmOn, getActivatedAlarms } from '@/store/securityAreasStore'

import { LatLng, Radar } from './types'

// TODO: Revisar
export const getUserLocation = () => getUserCurrentLocation()

export const startTrackingUser = (radar: Radar): void => {
  const areActivatedAlarms = getActivatedAlarmsLength()
  const watchId = getWatchId()
  console.log(`geolocation.ts::startTrackingUser():activated alarms: ${areActivatedAlarms}`)
  console.log(`geolocation.ts::startTrackingUser():getWatchId(): ${watchId}`)
  if (areActivatedAlarms > 0 && (watchId === 0 || watchId === null)) {
    console.log(`geolocation.ts::call to startWatchUserLocation`)
    // startBackground().then(() => startSearchUserPosition(radar)) // background Worker
    startBackgroundService().then(() => startSearchUserPosition(radar)) // background
    // startWatchUserLocation()
    // startSearchUserPosition(radar)
  }
  return
}

export const stopTrackingUser = (searchId: number): void => {
  console.log(`geolocation.ts::stopTrackingUser()::searchId: ${searchId}`)
  const len = getActivatedAlarmsLength()
  const watchId = getWatchId()
  if ((len <= 1 || len === undefined) && watchId > 0) {
    // stopBackgroundWorker().then(() => stopSearchUserPosition(searchId)) // background Worker
    stopBackgroundService().then(() => stopSearchUserPosition(searchId)) // background
    // stopWatchUserLocation(watchId)
    // stopSearchUserPosition(searchId)
  }
  return
}

const getActivatedAlarmsLength = (): number => getActivatedAlarms().length

// TODO: Change name
export const startSearchUserPosition = (args: Radar): void => {
  const searchId = startTimer(args)
  const alarmId = args.alarmOwner
  console.log(`geolocation.ts::startSearchUserPosition()::searchId: ${searchId}`)
  setAlarmOn(alarmId, searchId)
}

// TODO: Change name
export const stopSearchUserPosition = (searchId: number): void => stopTimer(searchId)

const startTimer = (args: Radar): number => {
  console.log(`geolocation.ts::startTimer()`)
  const { owner, interval } = args
  const searchId = Utils.setInterval(() => {
    const isUserInside = getIsUserInside(args)
    console.log(
      `geolocation.ts::modeIn::${owner} is into  area? ${isUserInside}, alert mode is ${args.alarmMode}`,
    )
    alarmHandler(args, isUserInside)
  }, interval)

  return searchId as unknown as number
}

const stopTimer = (searchId: number): void => Utils.clearInterval(searchId)

const getIsUserInside = (args: Radar): boolean => {
  console.log(`geolocation.ts::getIsUserInside()`)
  const { owner, initialLocation: center, securityDistance } = args
  const currentDistance = calculateDistanceToCenter(owner, center, currentUserLocation())
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
