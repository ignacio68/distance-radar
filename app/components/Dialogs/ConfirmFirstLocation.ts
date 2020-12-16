import confirmAlert from './ConfirmAlert'
import { setVisibility } from '@/composables/useComponent'
import { ConfirmDialog } from './types'

export const confirmFirstLocation = (
  confirmDialog: ConfirmDialog,
  callback = setVisibility('newLocationMenu', true)
): void => confirmAlert(confirmDialog, callback)
