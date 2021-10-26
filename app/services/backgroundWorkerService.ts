// TODO: Nativescript doesn't support Android Workers

// import { Application } from '@nativescript/core'
// import { startWatchUserLocation, stopWatchUserLocation } from './geolocationService'
// import { getWatchId } from '@/store/userLocationStore'

// const _clearWatch = (): void => {
//   const watchId = getWatchId()
//   if (watchId) {
//     stopWatchUserLocation(watchId)
//   }
//   return
// }

// const _startWatch = (): void => {
//   startWatchUserLocation()
// }

// Application.on(Application.exitEvent, _clearWatch)

// export const getBackgroundWorkerServiceClass = () => {
//   if (Application.android) {
//     console.log(`backgroundWorkerService::getBackgroundWorkerServiceClass()`)
//     @NativeClass()
//     @JavaProxy('com.distance.radar.BackgroundWorkerService')
//     class BackgroundWorkerService extends androidx.work.Worker {
//       constructor() {
//         super()
//         return global.__native(this)
//       }
//       doWork() {
//         let result: unknown
//         try {
//           console.log('doWork from BackgroundWorkerService!!')
//           _startWatch()
//           result = androidx.work.ListenableWorker.Result.success()
//         } catch (error) {
//           console.log(`backgroundWorkerService ERROR:: ${error}`)
//           result = androidx.work.ListenableWorker.Result.failure()
//         }
//         return result
//       }

//       onStopped() {
//         console.log('onStopped from BackgroundWorkerService!!')
//         _clearWatch()
//       }
//     }
//     return BackgroundWorkerService
//   } else {
//     return
//   }
// }

// export const BackgroundWorkerServiceClass = getBackgroundWorkerServiceClass()
