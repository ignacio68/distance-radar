import confirmAlert from './ConfirmAlert'
import { deleteLocation } from '@/store/locationsStore'
import { ConfirmDialog } from './types'

export const confirmDeleteLocation = (confirmDialog: ConfirmDialog, id: string): void =>
  confirmAlert(confirmDialog, deleteLocation(id))
