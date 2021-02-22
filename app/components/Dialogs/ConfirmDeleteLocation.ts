// import confirmDialog from './ConfirmDialog'
import { confirm, ConfirmOptions } from '@nativescript/core'
import { removeLocation } from '@/api/locations'

export const confirmDeleteLocation = (
  options: ConfirmOptions,
  id: string,
): void => {
  const confirmOptions: ConfirmOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    if (result) removeLocation(id)
  })
}

// export const confirmDeleteLocation = (options: ConfirmDialog, id: string): void =>
//   confirmDialog(options, deleteLocation(id))
