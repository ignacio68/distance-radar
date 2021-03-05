import { removeCallback, start, stop, addCallback } from '@nativescript/core/fps-meter'

let callbackId: number

export function startFPSMeter() {
  callbackId = addCallback((fps: number, minFps: number) => {
    console.log(`Frames per seconds: ${fps.toFixed(2)}`)
    console.log(minFps.toFixed(2))
  })
  start()
}

export function stopFPSMeter() {
  removeCallback(callbackId)
  stop()
}
