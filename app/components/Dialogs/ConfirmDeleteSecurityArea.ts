// import confirmDialog from './ConfirmDialog'
import { confirm, ConfirmOptions } from '@nativescript/core'
import { removeSecurityArea } from '@/api/securityAreas'

export const confirmDeleteSecurityArea = (options: ConfirmOptions, id: string): void => {
  const confirmOptions: ConfirmOptions = {
    title: options.title,
    message: options.message,
    okButtonText: options.okButtonText,
    cancelButtonText: options.cancelButtonText,
  }
  confirm(confirmOptions).then((result) => {
    if (result) removeSecurityArea(id)
  })
}
