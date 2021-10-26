// TODO: Nativescript doesn't support Android Workers

// import { Application, Utils } from '@nativescript/core'
// import { BackgroundWorkerServiceClass } from '@/services/backgroundWorkerService'

// const getJobConstrains = () => {
//   const constrains = new androidx.work.Constraints.Builder()
//     // .setRequiredNetworkType(NetworkType.CONNECTED)
//     .build()
//   console.log(`backgroundWorker::getJobConstrains()::constrains: ${JSON.stringify(constrains)}`)

//   return constrains
// }

// const getWorkRequest = () => {
//   const constrains = getJobConstrains()
//   console.log(`backgroundWorker::getWorkRequest()`)
//   const backgroundWorkerServiceClass = BackgroundWorkerServiceClass.class

//   const req = new androidx.work.OneTimeWorkRequest.Builder(backgroundWorkerServiceClass)
//     .setConstrains(constrains)
//     .build()

//   return req
// }

// const getContext = (): any => Utils.ad.getApplicationContext()

// const getWorkManager = () => {
//   console.log(`backgroundWorker::getWorkManager()`)
//   const context = getContext()
//   // const workManager = androidx.work.WorkManager.getInstance(context)
//   const workManager = androidx.

//   return workManager
// }

// export const startBackgroundWorker = async () => {
//   if (Application.android) {
//     console.log('backgroundWorker::startBackgroundWorker()')
//     const worker = getWorkRequest()
//     const workManager = getWorkManager()

//     workManager.enqueueUniqueWork(
//       'soldierGirlWorker',
//       androidx.work.ExistingWorkPolicy.KEEP,
//       worker,
//     )
//   }
// }
// export const stopBackgroundWorker = async () => {
//   if (Application.android) {
//     const worker = getWorkRequest()
//     const workManager = getWorkManager()
//     console.log(`backgroundWorker::stopBackgroundWorker()::worker: ${worker.id}`)
//     workManager.cancelWorkById(worker.id)
//   }
// }
