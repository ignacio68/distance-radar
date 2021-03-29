import {
  startTrackingUser,
  stopTrackingUser,
  startSearchUserPosition,
  stopSearchUserPosition,
} from '@/api/geolocation'
import { getId } from '@/utils/commons'

import { getSecurityArea } from '@/store/securityAreasStore'

import { SecurityArea, Radar } from './types'

export const setRadarActivity = (searchId: number) => {
  if (typeof searchId === 'number') stopRadar(searchId)
  return
}

export const startRadar = (securityAreaId: string): void => {
  console.log(`radar.ts::startRadar()::securityArea id: ${securityAreaId}`)
  const securityArea = getSecurityArea(securityAreaId)
  const radar = setRadarOptions(securityArea)
  startTrackingUser().then(() => {
    startSearchUserPosition(radar)
  })
}

export const stopRadar = async (searchId: number): Promise<void> => {
  stopTrackingUser().then(() => stopSearchUserPosition(searchId))
}

const setRadarOptions = (securityArea: SecurityArea): Radar => ({
  id: getId(securityArea.owner, 'radar'),
  owner: securityArea.owner,
  initialLocation: securityArea.center,
  securityDistance: securityArea.radius,
  interval: 2000,
  alarmOwner: securityArea.alarm.id,
  alarmMode: securityArea.alarm.alarmMode,
})