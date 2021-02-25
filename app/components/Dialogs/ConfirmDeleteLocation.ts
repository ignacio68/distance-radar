// import confirmDialog from './ConfirmDialog'
import { confirm, ConfirmOptions } from '@nativescript/core'
import { removeLocations } from '@/api/locations'

export const confirmDeleteLocation = (options: ConfirmOptions, id: string): void => {
  const confirmOptions: ConfirmOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    if (result) removeLocations([id])
  })
}

// export const confirmDeleteLocation = (options: ConfirmDialog, id: string): void =>
//   confirmDialog(options, deleteLocation(id))
