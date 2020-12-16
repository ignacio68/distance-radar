import { confirm, ConfirmOptions } from '@nativescript/core'
import { ConfirmDialog } from './types'

const confirmAlert = (options: ConfirmDialog, callback: unknown): void => {
  const confirmOptions: ConfirmOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    if (result) callback
  })
}

export default confirmAlert
