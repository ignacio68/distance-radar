import { pipeJS } from '@/utils/functional'
import { formattedText } from '@/utils/text'

import { ShortLocation, Location } from '@/services/types'

const CopyMatchingKeyValues = (target: object, source: object) => {
  Object.keys(target).forEach(key => {
    if (source[key] !== undefined) {
      target[key] = source[key]
    }
  })
}

const getShortLocation = (location: Location): ShortLocation => {
  let shortLocation: ShortLocation = new Object()
  // shortLocation = location as ShortLocation
  // CopyMatchingKeyValues(shortLocation, location)

  shortLocation.thoroughfare = location.thoroughfare
  shortLocation.subThoroughfare = location.subThoroughfare
  shortLocation.locality = location.locality
  shortLocation.postalCode = location.postalCode
  shortLocation.country = location.country

  console.log(`shortLocation: ${JSON.stringify(shortLocation)}`)

  return shortLocation
}

export const formattedLocation = pipeJS(getShortLocation, formattedText)
