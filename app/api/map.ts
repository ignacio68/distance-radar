/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserMarker, updateUserMarker } from './userMarker'

import { getUserCurrentLocation } from '@/services/geolocationService'

import {
  mbSetMap,
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
import { getLocations } from '@/store/locationsStore'
import { getAllSecurityAreas } from '@/store/securityAreasStore'

import { MapSettings, LatLng, Map } from './types'
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
  await getUserCurrentLocation().then((coordinates: LatLng) => {
    console.log(
      `map.ts::setCenter() coordinates: ${JSON.stringify(coordinates)}`,
    )
    mbSetZoomLevel(getMap(), {
      level: 15,
      animated: true,
    }).then(() => {
      mbSetCenter(getMap(), {
        lat: coordinates.lat,
        lng: coordinates.lng,
        animated: true,
      }).then(() => {
        if (userMarker() !== undefined) updateUserMarker(coordinates)
        else {
          console.log('There is not user marker, create one!')
          createUserMarker(coordinates)
        }
      })
    })
  })
}

export const addMarkers = (): void => {
  console.log(`map.ts::addMarkers: ${JSON.stringify(getLocations())}`)
  mbAddMarkers(getMap(), getLocations()).then(() =>
    addUserMarker().then(() => addSecurityAreas()),
  )
}

const addUserMarker = async () => {
  if (userMarker() !== undefined) mbAddMarkers(getMap(), [userMarker()])
  return
}

const addSecurityAreas = (): void => {
  console.log(
    `map.ts::addSecurityAreas: ${JSON.stringify(getAllSecurityAreas())}`,
  )
  const securityAreas = getAllSecurityAreas()
  securityAreas.map((securityArea) => mbAddLayer(getMap(), securityArea.layer))
}

export const flyTo = (location: LatLng): void => {
  mbAnimateCamera(getMap(), {
    target: location,
    zoomLevel: 15, // Android
    bearing: 270, // Where the camera is pointing, 0-360 (degrees)
    tilt: 50,
    //  TODO: calculate programmatically the duration
    duration: 5000, // default 10000 (milliseconds)
  }).then(() => updateUserMarker(location))
}

export const setOnMapLongClickListener = (
  listener: SetOnMapLongClickListener,
): Promise<boolean> => mbSetOnMapLongClickListener(getMap(), listener)

export const setMapStyle = (style: string): Promise<unknown> =>
  mbSetMapStyle(getMap(), style)
