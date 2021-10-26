import * as geolocation from '@nativescript/geolocation'

import { Application, Device } from '@nativescript/core'
import { startWatchUserLocation, stopWatchUserLocation } from './geolocationService'
import { getWatchId } from '@/store/userLocationStore'

const _clearWatch = (): void => {
  const watchId = getWatchId()
  if (watchId) {
    stopWatchUserLocation(watchId)
  }
  return
}

const _startWatch = (): void => {
  startWatchUserLocation()
}

Application.on(Application.exitEvent, _clearWatch)

export const getBackgroundServiceClass = () => {
  if (Application.android) {
    if (Device.sdkVersion < '26') {
      @NativeClass()
      @JavaProxy('com.distance.radar.BackgroundService')
      class BackgroundService extends (<any>android).app.Service {
        constructor() {
          super()
          return global.__native(this)
        }
        onStartCommand(intent: android.content.Intent, flags: number, startId: number): number {
          console.log('__SERVICE STARTED__')
          return android.app.Service.START_STICKY
        }
        onCreate(): void {
          console.log('__SERVICE CREATED__')
          _startWatch()
        }
        onBind(intent: android.content.Intent): android.os.IBinder {
          console.log('__SERVICE BINDDED__')
          return null
        }
        onDestroy(): void {
          console.log('__SERVICE DESTROYED__')
          _clearWatch()
        }
      }
      return BackgroundService
    } else {
      @NativeClass()
      @JavaProxy('com.distance.radar.BackgroundService26')
      class BackgroundService extends (<any>android.app).job.JobService {
        constructor() {
          super()
          return global.__native(this)
        }
        onStartJob(): boolean {
          console.log('__SERVICE JOB STARTTED__')
          _startWatch()
          return true
        }
        onStopJob(jobParameters: unknown): boolean {
          console.log('__SERVICE JOB STOPPED_')
          this.jobFinished(jobParameters, false)
          _clearWatch()
          return false
        }
      }
      return BackgroundService
    }
  } else {
    return null
  }
}

export const BackgroundServiceClass = getBackgroundServiceClass()
