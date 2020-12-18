import { mbAddMarkers, mbAddSource } from '@/services/mapboxService'

import { setVisibility } from '@/composables/useComponent'

import { getMap } from '@/store/mapStore'
import {
  addNewLocation,
  updateLocationsStore,
  getLocation,
  getLocations,
  deleteLocation,
  deleteAllLocations,
  setSelectedLocation,
  getSelectedLocation,
  hasSecurityArea,
} from '@/store/locationsStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'

import { Location, SourceOptions, SecurityArea } from '@/types/types'
// import { AddSourceOptions } from '@nativescript-community/ui-mapbox'

const map = getMap()

export const showLocations = getLocations()

const setSourceOptions = (location: Location): SourceOptions => {
  const { lat, lng } = location
  const sourceOptions: SourceOptions = {
    type: 'geojson',
    url: '',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    },
  }
  console.log(`locations::setSourceOptions: ${JSON.stringify(sourceOptions)}`)
  return JSON.parse(JSON.stringify(sourceOptions))
}

const setLayerOptions = () => {
  console.log('locations::setLayerOptions')
}

const setLocationOpts = (location: Location): Location => {
  const opts: Location = {
    id: location.id,
    lat: userMarker().lat,
    lng: userMarker().lng,
    title: location.id,
    selected: true,
    securityAreas: [],
    onTap: () => onTap(opts.title),
    onCalloutTap: () => onCalloutTap(),
  }
  const completeLocation: Location = { ...location, ...opts }
  return completeLocation
}

const onTap = (id: string): void => {
  console.log(`locations::onTap(): ${id}`)
  hasSecurityArea(id).then((result) => {
    if (result) {
      console.log('The location has a security area')
    } else {
      setVisibility('newSecurityAreaMenu', true)
      setSelectedLocation(id)
    }
  })
}

const onCalloutTap = (): void => console.log(`locations.ts::onCalloutTapLocation()`)

export const newLocation = (location: Location): void => {
  const completeLocation: Location = setLocationOpts(location)
  console.log(`locations.ts::addLocation(): ${JSON.stringify(completeLocation)}`)
  const newLocation: Location[] = []
  newLocation.push(completeLocation)
  const sourceOptions = setSourceOptions(completeLocation)
  mbAddMarkers(map, newLocation).then(() => {
    addNewLocation(completeLocation)
    // map
    //   .addSource(completeLocation.id, sourceOptions)
    // map.addFakeSource()
    mbAddSource(map, completeLocation.id, sourceOptions)
    // .then(() => console.log('locations::addSource()'))
    // .catch((error) => console.log(`locations::addSource:Error: ${error.message | error}`))
  })
}

// export const fetchLocations = (): Locations[] => {
//   map.addMarkers(map, location)
// }

export const fetchSelectedLocation = (): Location => {
  console.log(`locations.ts::fetchSelectedLocation() ${JSON.stringify(getSelectedLocation())}`)
  return getSelectedLocation()
}

export const updateLocation = async (location: Location): Promise<void> => {
  await updateLocationsStore(location).then(() => {
    console.log(`locations.ts::updateLocation: ${JSON.stringify(location)}`)
  })
}

export const addSecurityAreaToLocation = (id: string, securityArea: SecurityArea): void => {
  const location: Location = getLocation(id)
  location.securityAreas.push(securityArea)
  updateLocationsStore(location)
}

export const removeLocation = (id: string): void => {
  deleteLocation(id)
  console.log(`locations.ts::removeLocation:`)
}

export const removeAllLocations = (): void => {
  deleteAllLocations()
  console.log(`locations.ts::removeAllLocation:`)
}

/**************************************/

export const updateLocationAtInit = async (location: Location): Promise<void> => {
  const options: Record<string, unknown> = {
    onTap: () => onTap(location.id),
    onCalloutTap: () => onCalloutTap(),
  }
  const updatedLocation: Location = { ...location, ...options }
  await updateLocation(updatedLocation)
}
