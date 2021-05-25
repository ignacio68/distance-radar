import {
  startTrackingUser,
  stopTrackingUser,
  startSearchUserPosition,
  stopSearchUserPosition,
} from '@/api/geolocation'
import { getId } from '@/utils/commons'

import { getSecurityArea } from '@/store/securityAreasStore'

import { SecurityArea, Radar } from './types'

const setRadarOptions = (securityArea: SecurityArea): Radar => ({
  id: getId(securityArea.owner, 'radar'),
  owner: securityArea.owner,
  initialLocation: securityArea.center,
  securityDistance: securityArea.radius,
  interval: 2000,
  alarmOwner: securityArea.alarm.id,
  alarmMode: securityArea.alarm.alarmMode,
})

export const stopRadar = async (searchId: number): Promise<void> => {
  stopTrackingUser(searchId)
  // stopTrackingUser().then(() => stopSearchUserPosition(searchId))
}

export const setRadarActivity = (searchId: number) => {
  if (typeof searchId === 'number') stopRadar(searchId)
  return
}

export const startRadar = (securityAreaId: string): void => {
  console.log(`radar.ts::startRadar()::securityArea id: ${securityAreaId}`)
  const securityArea = getSecurityArea(securityAreaId)
  console.log(`radar.ts::startRadar()::securityArea: ${JSON.stringify(securityArea)}`)
  const radar = setRadarOptions(securityArea)
  startTrackingUser(radar)
  //   startTrackingUser().then(() => {
  //     startSearchUserPosition(radar)
  //   })
  // }
}
