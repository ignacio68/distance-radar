// import confirmDialog from './ConfirmDialog'
import { confirm, ConfirmOptions } from '@nativescript/core'
import { setVisibility } from '@/composables/useComponent'

export const confirmFirstLocation = (options: ConfirmOptions): void => {
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
