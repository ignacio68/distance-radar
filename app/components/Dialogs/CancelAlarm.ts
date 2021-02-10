import { alert, AlertOptions } from '@nativescript/core'
import { stopTrackingUserLocation } from '@/api/geolocation'
import { stopVibration, stopSound } from '@/api/common'
import { getWatchId } from '@/store/userLocationStore'

export const CancelAlarm = (options: AlertOptions) => {
  const alertOptions: AlertOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelable: false,
  }

  alert(alertOptions).then(() => {
    stopVibration()
    stopSound()
    stopTrackingUserLocation(getWatchId())
  })
}
