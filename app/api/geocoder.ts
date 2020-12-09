import { pipeJS } from '@/utils/functional'
import { formattedText } from '@/utils/text'

import { ShortLocation, Location } from '@/services/types'

const getShortLocation = (location: Location): ShortLocation => {
  const shortLocation: ShortLocation = new Object()

  shortLocation.thoroughfare = location.thoroughfare
  shortLocation.subThoroughfare = location.subThoroughfare
  shortLocation.locality = location.locality
  shortLocation.postalCode = location.postalCode
  shortLocation.country = location.country

  console.log(`shortLocation: ${JSON.stringify(shortLocation)}`)

  return shortLocation
}

export const formattedLocation = pipeJS(getShortLocation, formattedText)
