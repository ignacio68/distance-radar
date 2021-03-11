import { alert, AlertOptions } from '@nativescript/core'
import { stopAlarm } from '@/api/securityAreas'

export const CancelAlarm = (options: AlertOptions) => {
  const alertOptions = setAlertOptions(options)

  alert(alertOptions).then(() => {
    console.log('cancel button pressed!!')
    stopAlarm()
  })
}

const setAlertOptions = (options: AlertOptions): AlertOptions => ({
  title: options.title,
  message: options.message,
  okButtonText: options.okButtonText,
  cancelable: false,
})
