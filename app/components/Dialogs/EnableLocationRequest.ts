// import confirmDialog from './ConfirmDialog'
// import { confirm, ConfirmOptions } from '@nativescript/core'
import { alert, AlertOptions } from '@nativescript/core'
import { enableLocationRequest } from '@/services/geolocationService'
import { LatLng } from '@/types'

export const alertEnableLocationRequest = (callback: Promise<void | LatLng>): void => {
  const confirmOptions: AlertOptions = {
    title: 'Enable Location/GPS',
    message: 'You need to enabled the location/GPS to get an optimal use of the application',
    okButtonText: 'Enable',
    cancelable: false,
  }

  alert(confirmOptions).then(() => {
    enableLocationRequest(callback)
  })
}

// export const CancelAlarm = (options: AlertOptions) => {
//   const alertOptions = setAlertOptions(options)

//   alert(alertOptions).then(() => {
//     console.log('cancel button pressed!!')
//     stopAlarm()
//   })
// }

// const setAlertOptions = (options: AlertOptions): AlertOptions => ({
//   title: options.title,
//   message: options.message,
//   okButtonText: options.okButtonText,
//   cancelable: false,
// })

// export const confirmFirstLocation = (options: ConfirmOptions, callback: Promise<void | LatLng>): void => {
//   const confirmOptions: ConfirmOptions = {
//     title: options.title,
//     message: options.message,
//     okButtonText: options.okButtonText,
//     cancelButtonText: options.cancelButtonText,
//   }
//   confirm(confirmOptions).then((result) => {
//     if (result) enableLocationRequest(callback)
//   })
// }
