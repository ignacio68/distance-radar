import * as geocoding from 'nativescript-geocoding'

import { Location } from './types'

type SearchLocationsResult =  void | Location[]

export const searchLocations = async(query: string): Promise<SearchLocationsResult> => {
  const fetchLocations = await geocoding
    .getLocationListFromName(query, 5)
    .then(
      (locations: SearchLocationsResult) => locations,
      (error: any) => console.log(`Error: ${error.message || error}`)
    )
  console.log(`fetchLocations: ${JSON.stringify(fetchLocations)}`)
  return fetchLocations
}
