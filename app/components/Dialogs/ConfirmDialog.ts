import { confirm, ConfirmOptions } from '@nativescript/core'
import { ConfirmDialog } from './types'

const confirmDialog = (options: ConfirmDialog, callback: unknown): void => {
  const confirmOptions: ConfirmOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    console.log(`ConfirmDialog::result: ${result}`)
    if (result) callback
  })
}

export default confirmDialog
