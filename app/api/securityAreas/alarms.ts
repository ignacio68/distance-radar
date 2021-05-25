import { startRadar, stopRadar } from '@/api/radar'
import { playVibration, stopVibration, playSound, stopSound } from '@/api/media'
import { getId } from '@/utils/commons'

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
export const setAlarm = (alarm: Alarm): void => {
  console.log('alarms.ts::setAlarm::setAlarm()')
  if (alarm.isActivated) turnOnAlarm(alarm.id)
  return
}

export const turnOnAlarm = (alarmId: string): void => {
  console.log(`alarms.ts::turnOnAlarm():alarmId: ${alarmId}`)
  const securityAreaId = getSecurityAreaId(alarmId)
  startRadar(securityAreaId)
}

export const turnOffAlarm = (alarmId: string): void => {
  console.log(`alarms.ts::turnOffAlarm()`)
  const searchId = getSearchIdFromAlarmId(alarmId)
  console.log(`alarms.ts::turnOffAlarm()::searchId: ${searchId}`)
  setAlarmOff(alarmId).then(() => stopRadar(searchId))
}

const setAlarmOptions = (args: SecurityAreaOptions): Alarm => ({
  id: getId(args.owner, 'alarm'),
  isActivated: args.isActivated,
  alarmMode: args.alarmMode,
})

const getSecurityAreaId = (id: string): string => {
  console.log(`alarms.ts::getSecurityAreaId()`)
  const owner = id.substring(0, id.length - 6)
  const securityAreaId = getId(owner, 'area')
  console.log(`alarms.ts::getSecurityAreaId():alarmId: ${securityAreaId}`)
  return securityAreaId
}

export const alarmHandler = (args: Radar, isUserInside: boolean) => {
  if (
    (!isUserInside && args.alarmMode === 'EXIT') ||
    (isUserInside && args.alarmMode === 'ENTRANCE')
  ) {
    console.log(`alarms.ts::alarmHandler():activateAlarm()`)
    activateAlarm(args)
  } else {
    console.log(`alarms.ts::alarmHandler()`)
  }
}

export const activateAlarm = (args: Radar): void => {
  console.log(`alarms.ts::activateAlarm()::owner: ${args.owner}`)
  turnOffAlarm(args.alarmOwner)
  playAlarm().then(() => {
    if (args.alarmMode === 'EXIT') modeInAlarmDialog(args.owner)
    else if (args.alarmMode === 'ENTRANCE') modeOutAlarmDialog(args.owner)
    return
  })
}

const playAlarm = async (): Promise<void> => {
  console.log(`alarms.ts::playAlarm()`)
  playVibration([300, 500])
  playSound()
}

export const stopAlarm = () => {
  console.log(`alarms.ts::stopAlarm()`)
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
