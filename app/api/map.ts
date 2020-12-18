import { createUserMarker, updateUserMarker } from './userMarker'

import { getCurrentUserLocation } from '@/services/geolocationService'

import {
  mbSetZoomLevel,
  mbSetCenter,
  mbAddMarkers,
  mbAnimateCamera,
  mbSetOnMapLongClickListener,
  SetOnMapLongClickListener,
  mbSetMapStyle,
} from '@/services/mapboxService'

import { getMap } from '@/store/mapStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'
import { getLocations } from '@/store/locationsStore'

import { LatLng } from '@/types/types'

const map = getMap()

export const setCenter = async (): Promise<void> => {
  console.log('setCenter()')
  await getCurrentUserLocation().then((coordinates: LatLng) => {
    console.log(`setCenter() coordinates: ${JSON.stringify(coordinates)}`)
    mbSetZoomLevel(map, {
      level: 15,
      animated: true,
    }).then(() => {
      mbSetCenter(map, {
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
  mbAddMarkers(map, getLocations())
}

export const flyTo = (location: LatLng): void => {
  mbAnimateCamera(map, {
    target: location,
    zoomLevel: 15, // Android
    bearing: 270, // Where the camera is pointing, 0-360 (degrees)
    tilt: 50,
    //  TODO: calculate programmatically the duration
    duration: 5000, // default 10000 (milliseconds)
  }).then(() => updateUserMarker(location))
}

export const setOnMapLongClickListener = (listener: SetOnMapLongClickListener): Promise<boolean> =>
  mbSetOnMapLongClickListener(map, listener)

export const setMapStyle = (style: string): Promise<unknown> => mbSetMapStyle(map, style)
