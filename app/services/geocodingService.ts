import * as geocoding from '@nativescript-community/geocoding'

import { SearchLocationsResult } from './types/geocoding'

export const searchLocations = async (query: string): Promise<SearchLocationsResult> => {
  const fetchLocations = await geocoding.getLocationListFromName(query, 5).then(
    (locations: SearchLocationsResult) => locations,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => console.log(`Error: ${error.message || error}`),
  )
  console.log(`fetchLocations: ${JSON.stringify(fetchLocations)}`)
  return fetchLocations
}
