/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as storage from '@/services/storageService'

export const setStorage = (id: string, value: any): Promise<boolean> =>
  storage.setStorage(id, value).then((success) => success)

export const getStorage = (id: string): Promise<any> => storage.getStorage(id)

// export const updateStorage = async <T>(id: string, value: T): Promise<void> => {
//   getStorage(id).then((result) => {
//     result.push(value)
//     replaceStorage(id, result)
//   })
// }
const replaceStorage = (id: string, value: any): void => {
  console.log(`storage::replaceStorage()`)
  removeStorage(id).then((result) => {
    if (result) setStorage(id, value)
    else console.log(`storage::replace: cannot replace ${id}`)
  })
}

const findIndex = (storage: any[], id: string): number =>
  storage.findIndex((item: any) => item.id === id)

export const addItemToStorage = (id: string, value: any): void => {
  console.log(`storage::addItemToStorage()`)
  getStorage(id).then((result) => {
    console.log(`storage::addItemToStorage():result: ${JSON.stringify(result)}`)
    if (result) {
      console.log('result is an array!!')
      result.push(value)
      replaceStorage(id, result)
    } else console.log('result is not an array!!')
  })
}

export const updateItemStorage = (id: string, value: any): void => {
  console.log(`storage::updateItemStorage()`)
  getStorage(id).then((result) => {
    removeItemStorage(result, value.id)
    addItemToStorage(id, value)
  })
}

export const removeItemStorage = (id: string, itemId: string): void => {
  console.log(`storage::removeItemStorage()`)
  getStorage(id).then((result) => {
    result.splice(findIndex(result, itemId), 1)
  })
}

export const removeStorage = (id: string): Promise<boolean> => storage.removeStorage(id)

export const removeAllStorage = (): Promise<boolean> => storage.removeAllStorage()
