import { confirm, ConfirmOptions } from '@nativescript/core'
import { FirstLocationAlert } from './types'
import { setVisibility } from '@/composables/useComponent'

export const firstLocationAlert = (options: FirstLocationAlert) => {
  const confirmOptions: ConfirmOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    if (result) setVisibility('newLocationMenu', true)
  })
}
