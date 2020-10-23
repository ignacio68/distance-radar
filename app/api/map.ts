import { getCurrentUserLocation } from '@/services/geolocationService'

import { getMap as map } from '@/store/mapStore'

import { LngLat } from '@/types/types'

export const setCenter = async () => {
  console.log('setCenter()')
  await getCurrentUserLocation().then((coordinates) => {
    console.log(`set Center coordinates: ${JSON.stringify(coordinates)}`)
    map().setCenter({
      lng: coordinates.lng,
      lat: coordinates.lat,
      animated: true,
    })
    map().setZoomLevel({
      level: 15,
      animated: true
    })
  })
}

export const flyTo = (location: LngLat) => {
  map().animateCamera({
     target: location,
     zoomLevel: 15, // Android
     bearing: 270, // Where the camera is pointing, 0-360 (degrees)
     tilt: 50,
     duration: 5000, // default 10000 (milliseconds)
   })
}

/****** MARKERS ******/

