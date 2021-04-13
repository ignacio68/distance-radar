import { RESTART_RECEIVER_CLASSNAME } from './restart-receiver.android'
import { Application as app } from '@nativescript/core'

export const CONTINUOUS_SERVICE_CLASSNAME = 'com.ignacio68.distanceradar.Continuous_Service'

// @JavaProxy('com.ignacio68.distanceradar.Continuous_Service')
// class Continuous_Service extends android.app.Service {
//   private timerId: NodeJS.Timeout

//   onBind(): android.os.IBinder {
//     return null
//   }

//   onCreate(): void {
//     super onCreate()
//     console.log('__SERVICE CREATED__')

//     if (!this.timerId) {
//       this.timerId = setInterval(() => {
//         console.log('PING')
//       }, 1000)
//     }

//     const builder: android.app.Notification.Builder = new android.app.Notification.Builder(app.android.context)
//     // Need to check api level, NotificationChannel is required but only available on Oreo and above
//     if (android.os.Build.VERSION.SDK_INT >= 26) {
//       const channel: android.app.NotificationChannel = new android.app.NotificationChannel(
//         "persistence", "Service running indicator", android.app.NotificationManager.IMPORTANCE_LOW
//       )
//       const manager: android.app.NotificationManager = (<android.app.Activity>app.android.context).getSystemService(android.content.Context.NOTIFICATION_SERVICE)
//       channel.enableLights(false)
//       channel.enableVibration(false)
//       manager.createNotificationChannel(channel)
//       builder.setChannelId('persistence')
//     }
//     const notification: android.app.Notification = builder.build()
//     this.startForeground(13, notification)
//   }

//   onStartCommand(intent: android.content.Intent, flags: number, startId: number): number {
//     console.log('__SERVICE STARTED__')
//     return android.app.Service.START_REDELIVER_INTENT
//   }

//   onDestroy(): void {
//     console.log('__SERVICE DESTROYED__')
//     super.onDestroy()
//     clearInterval(this.timerId)

//     const restartIntent = new android.content.Intent()
//     restartIntent.setClassName(this, RESTART_RECEIVER_CLASSNAME)
//     this.sendBroadcast(restartIntent)
//   }

//   onTaskRemoved(intent: android.content.Intent): void {
//     console.log('__TASK REMOVED__')
//     this.stopSelf()
//   }
// }
