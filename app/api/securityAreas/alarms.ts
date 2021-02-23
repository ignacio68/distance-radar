import { startTrackingUserLocation, isUserIntoSecurityArea } from '@/api/geolocation'

import { isWatcherEnabled } from '@/composables/useGeolocation'

import { getSecurityAreasActive } from '@/store/securityAreasStore'

import { SecurityArea, SecurityDistanceArgs } from '../types'

export const activateAlarms = (alarms: string[]): void => {
  console.log(`alarms.ts::activateAlarms():alarms: ${JSON.stringify(alarms)}`)
  const securityAreasActive = getSecurityAreasActive()
  setActiveAlarms(securityAreasActive)
  if (securityAreasActive.length > 0 && !isWatcherEnabled()) startTrackingUserLocation()
  return
}

export const fetchAlarmsActive = (): string[] =>
  getSecurityAreasActive().map((securityArea) => securityArea.id)

const setActiveAlarms = (securityAreas: SecurityArea[]): void => {
  const alarms: SecurityDistanceArgs[] = configureAlarms(securityAreas)
  alarms.forEach((alarm) => isUserIntoSecurityArea(alarm))
}

const configureAlarms = (securityAreas: SecurityArea[]): SecurityDistanceArgs[] =>
  securityAreas.map((securityArea) => setAlarmOptions(securityArea))

const setAlarmOptions = (securityArea: SecurityArea): SecurityDistanceArgs => ({
  id: securityArea.id,
  initialLocation: securityArea.center,
  securityDistance: securityArea.radius,
  interval: 1000,
  mode: securityArea.alertMode,
})

// const setActiveAlarms = (securityAreas: SecurityArea[]): void => {
//   const alarms: SecurityDistanceArgs[] = configureAlarms(securityAreas)
//   for (const alarm of alarms) {
//     console.log(`alarms.ts::activeAlarms():alarm: ${alarm.id}`)
//     isUserIntoSecurityArea(alarm)
//   }
// }
//
// const configureAlarms = (
//   securityAreas: SecurityArea[],
// ): SecurityDistanceArgs[] => {
//   const alarms: SecurityDistanceArgs[] = securityAreas.map(
//     (securityArea) => setAlarmOptions(securityArea),
//   )
//   console.log(`alarms.ts::setAlarm():alarms: ${JSON.stringify(alarms)}`)
//   return alarms
// }
//
// const setAlarmOptions = (
//   securityArea: SecurityArea,
// ): SecurityDistanceArgs => {
//   const alarmOptions: SecurityDistanceArgs = {
//     id: securityArea.id,
//     initialLocation: securityArea.center,
//     securityDistance: securityArea.radius,
//     interval: 1000,
//     mode: securityArea.alertMode,
//   }
//   console.log(
//     `alarms.ts::setAlarmOptions()::alarmOptions: ${JSON.stringify(
//       alarmOptions,
//     )}`,
//   )
//   return alarmOptions
// }
