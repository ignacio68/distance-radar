import { BackgroundServiceClass } from './backgroundService'
import { Application, Utils } from '@nativescript/core'
import { MAGIC_NUMBER, CHANNEL_ID } from '@/utils/constants'

export const getForegroundServiceClass = () => {
  if (Application.android) {
    @NativeClass()
    @JavaProxy('com.distance.radar.ForegroundService')
    class ForegroundService extends (<any>android).app.Service {
      constructor() {
        super()
        return global.__native(this)
      }
      onStartCommand(intent: android.content.Intent, flags: number, startId: number): number {
        console.log('__FOREGROUND_SERVICE STARTED__')
        return android.app.Service.START_STICKY
      }
      onBind(intent: android.content.Intent): android.os.IBinder {
        console.log('__FOREGROUND_SERVICE BINDDED__')
        return null
      }

      onCreate(): void {
        console.log('__FOREGROUND_SERVICE CREATED__')
        this.startForeground(MAGIC_NUMBER, _getNotification())
      }

      onDestroy(): void {
        console.log('__FOREGROUND_SERVICE DESTROYED__')
        this.stopForeground(true)
      }
    }
    return ForegroundService
  }
}

const _getNotification = (): globalAndroid.app.Notification => {
  createNotificationChannel()

  const notification = setNotification()

  return notification
  // return notification.build()
}

const createNotificationChannel = (): void => {
  const serviceChannel = getServiceChannel()

  const notificationManager = getNotificationManager()

  notificationManager.createNotificationChannel(serviceChannel)
}

const getServiceChannel = () =>
  new android.app.NotificationChannel(
    CHANNEL_ID,
    'ForegroundService Channel',
    android.app.NotificationManager.IMPORTANCE_DEFAULT,
  )

const getNotificationManager = () =>
  android.content.Context.prototype.getSystemService(android.content.Context.NOTIFICATION_SERVICE)

const setNotification = (): android.app.Notification => {
  const notification = new android.app.Notification.Builder(getContext(), CHANNEL_ID)
    .setContentTitle('Foreground Service')
    .setContentText('input Extra')
    .setSmallIcon('res://icon')
    .setContentIntent(getPendingIntent())
    .build()

  return notification
}

const getContext = (): any => Utils.ad.getApplicationContext()

const getPendingIntent = (): android.app.PendingIntent => {
  const context = getContext()
  const notificationIntent = getNotificationIntent()
  const pendingIntent = android.app.PendingIntent.getActivity(context, 0, notificationIntent, 0)
  return pendingIntent
}

const getNotificationIntent = (): globalAndroid.content.Intent => {
  const context = getContext()
  const intent = new android.content.Intent(context, BackgroundServiceClass.class)
  return intent
}

export const ForegroundServiceClass = getForegroundServiceClass()
