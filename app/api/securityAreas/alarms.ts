import { startTrackingUserLocation, isUserIntoSecurityArea } from '@/api/geolocation'

import { isWatcherEnabled } from '@/composables/useGeolocation'

import { getSecurityAreasActive } from '@/store/securityAreasStore'

import { SecurityArea, CalculateSecurityDistance } from '../types'

export const activateAlarms = (alarms: string[]): void => {
  console.log(`alarms.ts::activateAlarms():alarms: ${JSON.stringify(alarms)}`)
  const securityAreasActive = getSecurityAreasActive(alarms)
  setActiveAlarms(securityAreasActive)
  if (securityAreasActive.length > 0 && !isWatcherEnabled()) startTrackingUserLocation()
  return
}

const setActiveAlarms = (securityAreas: SecurityArea[]): void => {
  const alarms: CalculateSecurityDistance[] = configureAlarms(securityAreas)
  for (const alarm of alarms) {
    console.log(`alarms.ts::activeAlarms():alarm: ${alarm.id}`)
    isUserIntoSecurityArea(alarm)
  }
}

const configureAlarms = (securityAreas: SecurityArea[]): CalculateSecurityDistance[] => {
  console.log(
    `alarms.ts::configureAlarm():securityAreas: ${JSON.stringify(securityAreas[0].alertMode)}`,
  )
  const alarms: CalculateSecurityDistance[] = securityAreas.map((securityArea) =>
    setAlarmOptions(securityArea),
  )
  console.log(`alarms.ts::setAlarm():alarms: ${JSON.stringify(alarms)}`)
  return alarms
}

const setAlarmOptions = (securityArea: SecurityArea): CalculateSecurityDistance => {
  const alarmOptions: CalculateSecurityDistance = {
    id: securityArea.id,
    initialLocation: securityArea.center,
    securityDistance: securityArea.radius,
    interval: 1000,
    mode: securityArea.alertMode,
  }
  console.log(`alarms.ts::setAlarmOptions()::alarmOptions: ${JSON.stringify(alarmOptions)}`)
  return alarmOptions
}
