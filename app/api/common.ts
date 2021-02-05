import { Vibrate } from 'nativescript-vibrate'

const vibrator = new Vibrate()

export const vibrationOn = (value: number): void => {
  vibrator.vibrate(value)
}
