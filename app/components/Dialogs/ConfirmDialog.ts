import { confirm, ConfirmOptions } from '@nativescript/core'
import { ConfirmDialog } from './types'

export const loadConfirmDialog = (options: ConfirmDialog) => {
  const confirmOptions = setConfirmDialogOptions(options)
  confirm(confirmOptions).then(() => {
    console.log(`ConfirmDialog}`)
    options.callback
  })
}

const setConfirmDialogOptions = (options: ConfirmOptions): ConfirmOptions => ({
  title: options.title,
  message: options.message,
  okButtonText: options.okButtonText,
  cancelButtonText: options.cancelButtonText,
})
