import { Utils } from '@nativescript/core'
import {
  initTrackingUser,
  removeTrackingUser,
  startSearchUser,
  stopSearchUser,
} from '@/api/geolocation'
import { removeAllSecurityAreas } from '@/api/securityAreas'
import { playVibration, stopVibration, playSound, stopSound } from '@/api/common'

import { getWatchId as watchId } from '@/store/userLocationStore'
import { getSecurityAreasActive as securityAreasActive } from '@/store/securityAreasStore'
import { removeAlarms } from '@/store/alarmsStore'

import { i18n } from '@/locales'

import { SecurityArea, SecurityDistanceArgs, AlertMode, Alarm } from '../types'

import { CancelAlarm } from '@/components/Dialogs/CancelAlarm'

export const createAlarm = (args: any) => {}

export const startAlarmsWork = (alarms: string[]): void => {
  console.log(`alarms.ts::startAlarmsWork():alarms: ${JSON.stringify(alarms)}`)
  startTrackingUser(securityAreasActive()).then(() => setActiveAlarms(securityAreasActive()))
}

export const stopAlarmsWork = (alarms: string[]): void => {
  stopTrackingUser().then(() => {
    removeAllSecurityAreas(alarms).then(() => {
      removeAlarms(alarms)
    })
    turnOffAlarm()
  })
}

// TODO: review this use case
export const fetchActiveAlarms = (): string[] =>
  securityAreasActive().map((securityArea) => securityArea.id)

const startTrackingUser = async (securityAreasActive: SecurityArea[]): Promise<void> => {
  if (securityAreasActive.length > 0 && watchId() !== null) initTrackingUser()
  return
}

const stopTrackingUser = async (): Promise<void> => {
  if (securityAreasActive().length === 1) removeTrackingUser(watchId())
  return
}

const setActiveAlarms = (securityAreas: SecurityArea[]): void => {
  const alarms: SecurityDistanceArgs[] = configureAlarms(securityAreas)
  alarms.forEach((alarm) => startSearchUser(alarm))
}

const configureAlarms = (securityAreas: SecurityArea[]): SecurityDistanceArgs[] =>
  securityAreas.map((securityArea) => setAlarmOptions(securityArea))

const setAlarmOptions = (securityArea: SecurityArea): SecurityDistanceArgs => ({
  id: securityArea.id,
  initialLocation: securityArea.center,
  securityDistance: securityArea.radius,
  interval: 1000,
  alertMode: securityArea.alertMode,
})

const getAlarmId = (id: string): string => `${id}_alarm`

export const turnOnAlarm = (searchId: any, id: string, mode: AlertMode): void => {
  activeAlarm(searchId).then(() => {
    if (mode === 'EXIT') modeInAlertDialog(id)
    else if (mode === 'ENTRANCE') modeOutAlertDialog(id)
    return
  })
}

const turnOffAlarm = () => {
  stopVibration()
  stopSound()
}

const activeAlarm = async (searchId: NodeJS.Timeout): Promise<void> => {
  stopSearchUser(searchId)
  playVibration([300, 500])
  playSound()
}

const modeInAlertDialog = (id: string) => {
  const cancelAlarmOptions = setCancelEntranceAlarmDialogOptions(id)
  CancelAlarm(cancelAlarmOptions)
}

const setCancelEntranceAlarmDialogOptions = (id: string) => ({
  title: id,
  message: i18n.tc('lang.dialogs.cancelAlarmIn.message'),
  okButtonText: i18n.tc('lang.dialogs.cancelAlarmIn.okButtonText'),
})

const modeOutAlertDialog = (id: string) => {
  const cancelAlarmOptions = setCancelExitAlarmDialogOptions(id)
  CancelAlarm(cancelAlarmOptions)
}

const setCancelExitAlarmDialogOptions = (id: string) => ({
  title: id,
  message: i18n.tc('lang.dialogs.cancelAlarmOut.message'),
  okButtonText: i18n.tc('lang.dialogs.cancelAlarmOut.okButtonText'),
})
