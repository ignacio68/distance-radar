import * as geocoding from 'nativescript-geocoding'

import { GeocoderLocation } from './types/geocoding'

type SearchLocationsResult = void | GeocoderLocation[]

export const searchLocations = async (query: string): Promise<SearchLocationsResult> => {
  const fetchLocations = await geocoding.getLocationListFromName(query, 5).then(
    (locations: SearchLocationsResult) => locations,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => console.log(`Error: ${error.message || error}`)
  )
  console.log(`fetchLocations: ${JSON.stringify(fetchLocations)}`)
  return fetchLocations
}
