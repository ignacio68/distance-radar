import { Vibrate } from 'nativescript-vibrate'
import { TNSPlayer } from 'nativescript-audio-player'

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
    audioPlayer.debug = true
    audioPlayer.initFromFile(playerOptions).then(() => {
      console.log('api::common:: Sound audioPlayer is init')
      audioPlayer.getAudioTrackDuration().then((duration: string) => {
        // iOS: duration is in seconds
        // Android: duration is in milliseconds
        console.log(`api::common: song duration: ${duration}`)
      })
    })
  })
}

export const playVibration = (value: number | number[], repeat: number = 0): void => {
  vibrator.vibrate(value, repeat)
}

export const stopVibration = (): void => {
  vibrator.cancel()
}

export const playSound = (playMode: SoundPlayMode): void => {
  if (playMode === 'PLAY') {
    audioPlayer.play()
    console.log(`api::common:playSound::PLAY: Is sound playing?: ${audioPlayer.isAudioPlaying()}`)
  } else if (playMode === 'STOP') {
    if (audioPlayer.isAudioPlaying()) audioPlayer.pause()
    console.log(`api::common:playSound::STOP: Is sound playing?: ${audioPlayer.isAudioPlaying()}`)
    return
  }
}
