import { Vibrate } from 'nativescript-vibrate'
import { TNSPlayer } from 'nativescript-audio'

import { SoundPlayMode } from './types'

const vibrator = new Vibrate()

let audioPlayer: TNSPlayer

const createAudioPlayer = async (): Promise<void> => {
  audioPlayer = new TNSPlayer()
}

const playerOptions = {
  audioFile: '~/assets/sounds/siren_loop.mp3',
  loop: true,
  completeCallback: () => console.log('finished playing'),
  errorCallback: (error: any) => console.log(JSON.stringify(error)),
  infoCallback: (args: any) => console.log(JSON.stringify(args)),
}

export const initAudioPlayer = () => {
  createAudioPlayer().then(() => {
    audioPlayer.debug = false // use only for development
    audioPlayer.initFromFile(playerOptions).then(() => {
      console.log('api::common:: Sound audioPlayer is init')
    })
  })
}

export const playVibration = (value: number | number[], repeat: number = 0): void => {
  vibrator.vibrate(value, repeat)
}

export const stopVibration = (): void => {
  vibrator.cancel()
}

export const playSound = () => audioPlayer.play()

export const stopSound = () => {
  if (audioPlayer.isAudioPlaying()) audioPlayer.pause()
  return
}
