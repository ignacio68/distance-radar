/* eslint-disable @typescript-eslint/no-explicit-any */
import bBox from '@turf/bbox'
import { BBox } from '@turf/helpers'
import { createUserMarker, updateUserMarker } from './userMarker'
import { pipe } from '@/utils/functional'

import { getUserCurrentLocation } from '@/services/geolocationService'

import {
  mbSetMap,
  mbSetViewport,
  mbSetZoomLevel,
  mbSetCenter,
  mbAddMarkers,
  mbAddLayer,
  mbAnimateCamera,
  mbSetOnMapLongClickListener,
  mbSetMapStyle,
} from '@/services/mapboxService'

import { initialMapSettings } from '@/setup/map'

import { getMap } from '@/store/mapStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'
import { getAllLocations } from '@/store/locationsStore'
import { getAllSecurityAreas } from '@/store/securityAreasStore'

import { MapSettings, LatLng, Location, Bounds, SetViewportOptions, GeoJSON } from './types'
import { SetOnMapLongClickListener } from '@/services/types'

export const initMap = (): void => {
  //  TODO: load init map with markers and security areas(layers)
}

// TODO: improve the code
export const setMap = (settings?: MapSettings): void => {
  getMap() ? mbSetMap(settings) : mbSetMap(initialMapSettings)
}

export const setCenter = async (): Promise<void> => {
  console.log('map.ts::setCenter()')
  const map = getMap()
  await getUserCurrentLocation().then((coordinates: LatLng) => {
    console.log(`map.ts::setCenter() coordinates: ${JSON.stringify(coordinates)}`)
    mbSetZoomLevel(map, {
      level: 15,
      animated: true,
    }).then(() => {
      mbSetCenter(map, {
        lat: coordinates.lat,
        lng: coordinates.lng,
        animated: true,
      }).then(() => {
        if (!!userMarker()) updateUserMarker(coordinates)
        else {
          console.log('There is not user marker, create one!')
          createUserMarker(coordinates)
        }
      })
    })
  })
}

export const addMarkers = (): void => {
  const map = getMap()
  const locations = getAllLocations()
  if (locations.length > 0) {
    console.log(`map.ts::addMarkers: ${JSON.stringify(locations)}`)
    mbAddMarkers(map, locations).then(() => addUserMarker().then(() => addSecurityAreas()))
  }
  return
}

const addUserMarker = async () => {
  const map = getMap()
  if (!!userMarker()) mbAddMarkers(map, [userMarker()])
  return
}

const addSecurityAreas = (): void => {
  console.log(`map.ts::addSecurityAreas: ${JSON.stringify(getAllSecurityAreas())}`)
  const map = getMap()
  const securityAreas = getAllSecurityAreas()
  securityAreas.map((securityArea) => mbAddLayer(map, securityArea.layer))
}

export const flyTo = (location: LatLng): void => {
  const map = getMap()
  mbAnimateCamera(map, {
    target: location,
    zoomLevel: 15, // Android
    // bearing: 270, // Where the camera is pointing, 0-360 (degrees)
    // tilt: 50,
    //  TODO: calculate programmatically the duration
    duration: 5000, // default 10000 (milliseconds)
  }).then(() => updateUserMarker(location))
}

export const setOnMapLongClickListener = (listener: SetOnMapLongClickListener): Promise<boolean> =>
  mbSetOnMapLongClickListener(getMap(), listener)

export const setMapStyle = (style: string): Promise<unknown> => mbSetMapStyle(getMap(), style)

export const setViewport = (): void => {
  const map = getMap()
  const options = setViewportOptions()
  mbSetViewport(map, options)
}

const setViewportOptions = (): SetViewportOptions => {
  const bounds = getBounds()
  const animation = { animation: true }
  const padding = { padding: 10000 }
  const options = { bounds, ...animation, ...padding }
  return options
}

const getBounds = (): Bounds =>
  getBBox(convertToGeoJSON(getLocationsCoordinates(getAllLocations())))

const getBBox = (geoJSONObject: GeoJSON): Bounds => convertBBoxToBounds(bBox(geoJSONObject))

const convertBBoxToBounds = (bbox: BBox): Bounds => ({
  north: bbox[0],
  east: bbox[1],
  south: bbox[2],
  west: bbox[3],
})

const convertToGeoJSON = (coordinates: number[][]): GeoJSON => ({
  type: 'Feature',
  geometry: {
    type: 'MultiPoint',
    coordinates,
  },
  properties: {},
})

const getLocationsCoordinates = (locations: Location[]): number[][] => {
  const coordinates = locations.map((location) => [location.lat, location.lng])
  console.log(`map.ts::fetchLocationCoordinates::coordinates: ${JSON.stringify(coordinates)}`)
  return coordinates
}
