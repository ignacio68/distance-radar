import { Application, Utils, Device } from '@nativescript/core'
import { BackgroundServiceClass } from '@/services/backgroundService'
import { ForegroundServiceClass } from '@/services/foregroundService'
import { MAGIC_NUMBER } from '@/utils/constants'

const jobId = MAGIC_NUMBER

const getContext = (): any => Utils.ad.getApplicationContext()

const getJobScheduler = (context: any): any =>
  context.getSystemService((<any>android.content.Context).JOB_SCHEDULER_SERVICE)

const getComponent = (context: any): globalAndroid.content.ComponentName =>
  new android.content.ComponentName(context, ForegroundServiceClass.class)
// new android.content.ComponentName(context, BackgroundServiceClass.class)

const getBuilder = (component: globalAndroid.content.ComponentName): any =>
  new (<any>android.app).job.JobInfo.Builder(jobId, component)

const getIntent = (context: any) =>
  new android.content.Intent(context, BackgroundServiceClass.class)

const stopBackgroundJob = (): void => {
  console.log('background::stopBackgroundJob()')
  if (Application.android) {
    const context = getContext()
    const jobScheduler = getJobScheduler(context)
    if (jobScheduler.getPendingJob(jobId) !== null) {
      jobScheduler.cancel(jobId)
      console.log(`Job Canceled: ${jobId}`)
    }
  }
}

const stopForegroundJob = (): void => {
  console.log('background::stopForegroundJob()')
  if (Application.android) {
    const context = getContext()
    const jobScheduler = getJobScheduler(context)
    if (jobScheduler.getPendingJob(jobId) !== null) {
      jobScheduler.cancel(jobId)
      console.log(`Job Canceled: ${jobId}`)
    }
  }
}

export const startBackgroundService = async (): Promise<void> => {
  console.log('background::startBackgroundService()')
  if (Application.android) {
    const context = getContext()
    if (Device.sdkVersion >= '26') {
      const jobScheduler = getJobScheduler(context)
      const component = getComponent(context)
      const builder = getBuilder(component)
      builder.setOverrideDeadline(0)
      jobScheduler.schedule(builder.build())
    } else {
      const intent = getIntent(context)
      context.startService(intent)
    }
  }
}

export const stopBackgroundService = async (): Promise<void> => {
  console.log('background::stopBackgroundService()')
  if (Application.android) {
    if (Device.sdkVersion >= '26') {
      // stopBackgroundJob()
      stopForegroundJob()
    } else {
      const context = getContext()
      const intent = getIntent(context)
      context.stopService(intent)
    }
  }
}
