import { createUserMarker, updateUserMarker } from './userMarker'

import { getCurrentUserLocation } from '@/services/geolocationService'

import { getMap as map } from '@/store/mapStore'
import { getUserMarker as userMarker } from '@/store/userMarkerStore'
import { getLocations } from '@/store/locationsStore'

import { LngLat } from '@/types/types'

export const setCenter = async (): Promise<void> => {
  console.log('setCenter()')
  await getCurrentUserLocation().then((coordinates: LngLat) => {
    console.log(`setCenter() coordinates: ${JSON.stringify(coordinates)}`)
    map()
      .setZoomLevel({
        level: 15,
        animated: true,
      })
      .then(() => {
        map()
          .setCenter({
            lat: coordinates.lat,
            lng: coordinates.lng,
            animated: true,
          })
          .then(() => {
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
  console.log(`map.ts::addMarkers: ${getLocations()}`)
  map().addMarkers(getLocations())
}

export const flyTo = (location: LngLat): void => {
  map()
    .animateCamera({
      target: location,
      zoomLevel: 15, // Android
      bearing: 270, // Where the camera is pointing, 0-360 (degrees)
      tilt: 50,
      //  TODO: calculate programmatically the duration
      duration: 5000, // default 10000 (milliseconds)
    })
    .then(() => updateUserMarker(location))
}
