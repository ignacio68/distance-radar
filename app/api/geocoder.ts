import { searchLocations } from '@/services/geocodingService'
import { pipe } from '@/utils/functional'
import { formattedText } from '@/utils/text'

import { GeocoderShortLocation, GeocoderLocation, SearchLocationsResult } from '@/services/types'

export const getLocations = async(query: string): Promise<SearchLocationsResult> => await searchLocations(query)

const getShortLocation = (location: GeocoderLocation): GeocoderShortLocation => {
  const shortLocation: GeocoderShortLocation = {}

  shortLocation.thoroughfare = location.thoroughfare
  shortLocation.subThoroughfare = location.subThoroughfare
  shortLocation.locality = location.locality
  shortLocation.postalCode = location.postalCode
  shortLocation.country = location.country

  console.log(`shortLocation: ${JSON.stringify(shortLocation)}`)

  return shortLocation
}

export const formattedLocation = (location: any): string => pipe(getShortLocation, formattedText) as unknown as string
