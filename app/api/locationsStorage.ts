/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorage, setStorage } from './storage'
import { addNewLocation } from '@/store/locationsStore'

// export const initLocationStorage = (id: string, callback: any): void => {
//   getStorage(id).then((result) => {
//     if (result) {
//       console.log(`locationStorage::initLocationStorage: ${JSON.stringify(result)}`)
//       callback(result)
//     } else {
//       console.log('Created void location storage')
//       setStorage(id, [])
//     }
//   })
// }

export const initLocationStorage = (): void => {
  console.log(`locationStorage::initLocationStorage`)
  getStorage('location').then((result) => {
    if (result.length > 0) {
      // console.log(`locationStorage::initLocationStorage: ${JSON.stringify(result)}`)
      console.log(`locationStorage::initLocationStorage: ${JSON.parse(result)}`)
      console.log(`locationStorage::initLocationStorage: length: ${result.length}`)
      addNewLocation(result)
    } else if (result.length === 0)
      console.log(`locationStorage::initLocationStorage: storage is empty!!`)
    else {
      console.log('Created void location storage')
      setStorage('location', [])
    }
  })
}
