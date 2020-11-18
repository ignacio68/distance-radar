import { Application, isAndroid } from '@nativescript/core'

/**
 * Hide the keyboard with a conditional Android platform check.
 */
export const hideSoftKeyboard = (): void => {
  if (isAndroid) {
    try {
      const activity = Application.android.foregroundActivity
      const Context = Application.android.context
      const inputManager = Context.getSystemService(
        android.content.Context.INPUT_METHOD_SERVICE
      )
      inputManager.hideSoftInputFromWindow(
        activity.getCurrentFocus().getWindowToken(),
        android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS
      )
    } catch (err) {
      console.log(err)
    }
  }
}
