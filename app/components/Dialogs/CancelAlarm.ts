import { alert, AlertOptions } from '@nativescript/core'
import { stopAlarmsWork } from '@/api/securityAreas'

export const CancelAlarm = (options: AlertOptions) => {
  const alertOptions = setAlertOptions(options)

  alert(alertOptions).then(() => stopAlarmsWork([options.title]))
}

const setAlertOptions = (options: AlertOptions): AlertOptions => ({
  title: options.title,
  message: options.message,
  okButtonText: options.okButtonText,
  cancelable: false,
})
