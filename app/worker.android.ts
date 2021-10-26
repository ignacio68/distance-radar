// TODO: Nativescript doesn't support Android Workers

// @NativeClass()
// @JavaProxy('com.distance.radar.BackgroundWorkerService')
// export class BackgroundWorkerService extends androidx.work.Worker {
//   constructor() {
//     super()
//     return global.__native(this)
//   }
//   doWork() {
//     let result: unknown
//     try {
//       console.log('doWork from BackgroundWorkerService!!')
//       _startWatch()
//       result = androidx.work.ListenableWorker.Result.success()
//     } catch (error) {
//       console.log(`backgroundWorkerService ERROR:: ${error}`)
//       result = androidx.work.ListenableWorker.Result.failure()
//     }
//     return result
//   }

//   onStopped() {
//     console.log('onStopped from BackgroundWorkerService!!')
//     _clearWatch()
//   }
// }
