/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserMarker, updateUserMarker } from './userMarker'

import { getUserCurrentLocation } from '@/services/geolocationService'

import {
  mbSetMap,
  mbSetZoomLevel,
  mbSetCenter,
  mbAddMarkers,
  mbAnimateCamera,
  mbSetOnMapLongClickListener,
  mbSetMapStyle,
} from '@/services/mapboxService'

import { initialMapSettings } from '@/setup/map'

import { getMap } from '@/store/mapStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'
import { getLocations } from '@/store/locationsStore'

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
    console.log(`map.ts::setCenter() coordinates: ${JSON.stringify(coordinates)}`)
    mbSetZoomLevel(getMap(), {
      level: 15,
      animated: true,
    }).then(() => {
      mbSetCenter(getMap(), {
        lat: coordinates.lat,
        lng: coordinates.lng,
        animated: true,
      }).then(() => {
        if (userMarker()) updateUserMarker(coordinates)
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
  mbAddMarkers(getMap(), getLocations())
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

export const setOnMapLongClickListener = (listener: SetOnMapLongClickListener): Promise<boolean> =>
  mbSetOnMapLongClickListener(getMap(), listener)

export const setMapStyle = (style: string): Promise<unknown> => mbSetMapStyle(getMap(), style)
