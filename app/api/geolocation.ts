import { Utils } from '@nativescript/core'

import { i18n } from '@/locales'

import { latLngToPosition } from '@/utils/commons'
import { playVibration, playSound, stopSound } from '@/api/common'
import {
  getUserCurrentLocation,
  watchUserLocation,
  stopWatchUserLocation,
} from '@/services/geolocationService'
import distance from '@turf/distance'
import { point } from '@turf/helpers'

import {
  getUserCurrentLocation as currentUserLocation,
  setDistanceToCenter,
  getWatchId,
} from '@/store/userLocationStore'

import { isWatcherEnabled, setIsWatcherEnabled } from '@/composables/useGeolocation'

import { LatLng, Position } from '@/types/commons'
import { AlertOptions, CalculateSecurityDistance, AlertMode } from './types'

import { CancelAlarm } from '@/components/Dialogs/CancelAlarm'

// TODO: Revisar
export const getUserLocation = () => getUserCurrentLocation()

export const startTrackingUserLocation = async (): Promise<void> => {
  setIsWatcherEnabled(true)
  watchUserLocation()
}

export const stopTrackingUserLocation = (watchId: number): void => {
  setIsWatcherEnabled(false)
  stopWatchUserLocation(watchId)
}

export const isUserIntoSecurityArea = (args: CalculateSecurityDistance): void => {
  searchUserPosition(args)
}

const searchUserPosition = (args: CalculateSecurityDistance): any => {
  const { id, mode } = args

  const searchId = Utils.setInterval(() => {
    const userIsIntoSecurityArea = isUserPositionIntoSecurityArea(args)
    console.log(`geolocation.ts::modeIn::user is into ${id} area? ${userIsIntoSecurityArea}`)

    if (!userIsIntoSecurityArea && mode === 'IN') turnOnAlarm(searchId, id, mode)
    else if (userIsIntoSecurityArea && mode === 'OUT') turnOnAlarm(searchId, id, mode)
    return
  }, args.interval)
}

const isUserPositionIntoSecurityArea = (args: CalculateSecurityDistance): boolean => {
  const { initialLocation: center, securityDistance } = args
  const currentDistance = calculateDistanceToCenter(center, currentUserLocation())
  setDistanceToCenter(currentDistance)
  // console.log(`${id} alarm: distance: ${securityDistance}, current distance: ${currentDistance}`)
  const isIntoSecurityArea = currentDistance <= securityDistance ? true : false
  return isIntoSecurityArea
}

const calculateDistanceToCenter = (center: LatLng, userLocation: LatLng): number => {
  const from = point(latLngToPosition(center))
  const to = point(latLngToPosition(userLocation))
  const options = { units: 'kilometers' as const }

  const currentDistance = distance(from, to, options)
  console.log(`geolocation::calculateCurrentDistance:distance is: ${currentDistance}`)
  return currentDistance
}

const turnOnAlarm = (searchId: any, id: string, mode: AlertMode): void => {
  activeAlarm(searchId)
  if (mode === 'IN') modeInAlertDialog(id)
  else modeOutAlertDialog(id)
}

const activeAlarm = (searchId: any): void => {
  Utils.clearInterval(searchId)
  playVibration([300, 500])
  playSound()
}

const modeInAlertDialog = (id: string) => {
  const cancelAlarmOptions = {
    title: id,
    message: i18n.tc('lang.dialogs.cancelAlarmIn.message'),
    okButtonText: i18n.tc('lang.dialogs.cancelAlarmIn.okButtonText'),
  }
  CancelAlarm(cancelAlarmOptions)
}

const modeOutAlertDialog = (id: string) => {
  const cancelAlarmOptions = {
    title: id,
    message: i18n.tc('lang.dialogs.cancelAlarmOut.message'),
    okButtonText: i18n.tc('lang.dialogs.cancelAlarmOut.okButtonText'),
  }
  CancelAlarm(cancelAlarmOptions)
}
