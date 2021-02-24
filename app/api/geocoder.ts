import { searchLocations } from '@/services/geocodingService'
import { pipe } from '@/utils/functional'
import { formattedText } from '@/utils/text'

import { GeocoderShortLocation, GeocoderLocation, SearchLocationsResult } from '@/services/types'

export const getAllLocations = async (query: string): Promise<SearchLocationsResult> =>
  await searchLocations(query)

const getSortLocation = (location: GeocoderLocation): GeocoderShortLocation => ({
  thoroughfare: location.thoroughfare,
  subThoroughfare: location.subThoroughfare,
  locality: location.locality,
  postalCode: location.postalCode,
  country: location.country,
})

export const formattedLocation = pipe(getSortLocation, formattedText)
