import { confirm, ConfirmOptions } from '@nativescript/core'
import { FirstMarkerAlert } from './types'
import { setVisibility } from '@/composables/useComponent'

//  TODO: Internationalizate
export const firstMarkerAlert = (options: FirstMarkerAlert) => {
  const confirmOptions: ConfirmOptions = {
    title: 'Markers',
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    if (result) setVisibility('newMarkerMenu', true)
  })
}
