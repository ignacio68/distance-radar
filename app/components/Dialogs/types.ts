import { ConfirmOptions } from '@nativescript/core'

export interface ConfirmDialog extends ConfirmOptions {
  callback: (options: unknown) => unknown
}
