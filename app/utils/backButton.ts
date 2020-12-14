import { android, AndroidApplication } from '@nativescript/core/application'
import { isAndroid } from '@nativescript/core'

export const onBackEvent = (customEvent: () => void): void => {
  if (!isAndroid) return
  android.on(AndroidApplication.activityBackPressedEvent, customEvent)
}

export const clearBackEvent = (customEvent: () => void): void => {
  if (!isAndroid) return
  android.off(AndroidApplication.activityBackPressedEvent, customEvent)
}
