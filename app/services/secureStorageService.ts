import { SecureStorage } from '@nativescript/secure-storage'

const storage = new SecureStorage()

// interface KeyValue {
//   [key: string]: unknown
// }

export const setStorage = <T>(key: string, value: T): Promise<boolean> => {
  console.log(`storageService::setStorage()`)
  const set = storage
    .set({
      key: key,
      value: typeof value === 'string' ? value : JSON.stringify(value),
    })
    .then((success) => {
      console.log(`Successfully set a value? + ${success}`)
      return success
    })
  return set
}

export const getStorage = (key: string): Promise<unknown | null> => {
  const get = storage
    .get({
      key: key,
    })
    .then((value) => (typeof value === 'string' ? value : JSON.parse(value)))
  console.log(`storageService::getStorage(): ${JSON.stringify(get)}`)
  return get
}

export const removeStorage = (key: string): Promise<boolean> => {
  const remove = storage
    .remove({
      key: key,
    })
    .then((success) => {
      console.log(`Successfully removed a value? + ${success}`)
      return success
    })
  return remove
}

export const removeAllStorage = (): Promise<boolean> => {
  const removeAll = storage.removeAll().then((success) => {
    console.log(`Successfully removed a values? + ${success}`)
    return success
  })
  return removeAll
}
