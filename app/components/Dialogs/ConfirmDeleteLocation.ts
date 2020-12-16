// import confirmDialog from './ConfirmDialog'
import { confirm, ConfirmOptions } from '@nativescript/core'
import { deleteLocation } from '@/store/locationsStore'

export const confirmDeleteLocation = (options: ConfirmOptions, id: string): void => {
  const confirmOptions: ConfirmOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    if (result) deleteLocation(id)
  })
}

// export const confirmDeleteLocation = (options: ConfirmDialog, id: string): void =>
//   confirmDialog(options, deleteLocation(id))
