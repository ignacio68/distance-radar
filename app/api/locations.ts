import { getMap as map } from '@/store/mapStore'
import { addNewLocation, updateLocationsStore, getLocations } from '@/store/locationsStore'

import { Location, LngLat } from '@/types/types'

export const showLocations = () => getLocations()

const onTap = () => {
  console.log('onTapLocation()')
  // setVisibility('newLocationMenu', true)
}

const onCalloutTap = () => console.log('onCalloutTapLocation()')

export const newLocation = (location: Location) => {
  console.log('addLocation()')
  const opts = {
    selected: true,
    onTap: onTap(),
    onCalloutTap: onCalloutTap(),
  }
  location = Object.assign({...location, ...opts})
  const newLocation = []
  newLocation.push(location)
  map()
    .addMarkers(newLocation)
    .then(() => addNewLocation(location))
  console.log(`New location: ${JSON.stringify(getLocations)}`)
}

export const updateLocation = (location: Location) => {
  updateLocationsStore(location)
  console.dir(getLocations())
}

export const removeLocation = (id: string) => {

}