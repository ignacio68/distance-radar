import { startRadar, stopRadar } from '@/api/radar'
import { playVibration, stopVibration, playSound, stopSound } from '@/api/common'

import { getSearchIdFromAlarmId, setAlarmOff } from '@/store/securityAreasStore'

import { i18n } from '@/locales'

import { SecurityAreaOptions, Alarm, Radar } from '../types'

import { CancelAlarm } from '@/components/Dialogs/CancelAlarm'

export const createAlarm = (args: SecurityAreaOptions): Alarm => {
  const alarm = setAlarmOptions(args)
  console.log(`alarms.ts::createAlarm::alarm: ${JSON.stringify(alarm)}`)
  return alarm
}

// export const setAlarm = (alarm: Pick<Alarm, 'id' | 'isActivated'>) => {
export const setAlarm = (alarm: Alarm) => {
  console.log('alarms.ts::setAlarm::setAlarm()')
  // if (alarm.isActivated) turnOnAlarm(alarm.id)
  alarm.isActivated && turnOnAlarm(alarm.id)
  // return
}

export const turnOnAlarm = (alarmId: string): void => {
  console.log(`alarms.ts::turnOnAlarm():alarmId: ${alarmId}`)
  const securityAreaId = getSecurityAreaId(alarmId)
  startRadar(securityAreaId)
}

export const turnOffAlarm = (alarmId: string): void => {
  const searchId = getSearchIdFromAlarmId(alarmId)
  setAlarmOff(alarmId).then(() => stopRadar(searchId))
}

const setAlarmOptions = (args: SecurityAreaOptions): Alarm => ({
  id: getAlarmId(args.id),
  isActivated: args.isActivated,
  alarmMode: args.alarmMode,
})

export const getAlarmId = (id: string): string => `${id}_alarm`

const getSecurityAreaId = (id: string): string => id.substring(0, id.length - 6)

export const alarmHandler = (args: Radar, isUserInside: boolean) => {
  if (
    (!isUserInside && args.alarmMode === 'EXIT') ||
    (isUserInside && args.alarmMode === 'ENTRANCE')
  )
    activateAlarm(args)
  return
}

export const activateAlarm = (args: Radar): void => {
  turnOffAlarm(args.alarmOwner)
  playAlarm().then(() => {
    if (args.alarmMode === 'EXIT') modeInAlarmDialog(args.id)
    else if (args.alarmMode === 'ENTRANCE') modeOutAlarmDialog(args.id)
    return
  })
}

const playAlarm = async (): Promise<void> => {
  playVibration([300, 500])
  playSound()
}

export const stopAlarm = () => {
  stopVibration()
  stopSound()
}

const modeInAlarmDialog = (id: string) => {
  const cancelAlarmOptions = setCancelEntranceAlarmDialogOptions(id)
  CancelAlarm(cancelAlarmOptions)
}

const setCancelEntranceAlarmDialogOptions = (id: string) => ({
  title: id,
  message: i18n.tc('lang.dialogs.cancelAlarmIn.message'),
  okButtonText: i18n.tc('lang.dialogs.cancelAlarmIn.okButtonText'),
})

const modeOutAlarmDialog = (id: string) => {
  const cancelAlarmOptions = setCancelExitAlarmDialogOptions(id)
  CancelAlarm(cancelAlarmOptions)
}

const setCancelExitAlarmDialogOptions = (id: string) => ({
  title: id,
  message: i18n.tc('lang.dialogs.cancelAlarmOut.message'),
  okButtonText: i18n.tc('lang.dialogs.cancelAlarmOut.okButtonText'),
})
