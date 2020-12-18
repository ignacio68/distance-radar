import {
  MapboxViewApi,
  MapboxMarker,
  LatLng,
  MapStyle,
  SetCenterOptions,
  SetZoomLevelOptions,
  AnimateCameraOptions,
  AddLayerOptions,
  AddSourceOptions,
} from '@nativescript-community/ui-mapbox'

import { getMap } from '@/store/mapStore'

export interface SetOnMapLongClickListener {
  (data: LatLng): boolean
}

export const mbSetCenter = (map: MapboxViewApi, options: SetCenterOptions): Promise<unknown> =>
  map.setCenter(options)

export const mbSetZoomLevel = (
  map: MapboxViewApi,
  options: SetZoomLevelOptions
): Promise<unknown> => map.setZoomLevel(options)

export const mbAnimateCamera = (
  map: MapboxViewApi,
  options: AnimateCameraOptions
): Promise<unknown> => map.animateCamera(options)

export const mbSetOnMapLongClickListener = (
  map: MapboxViewApi,
  listener: SetOnMapLongClickListener
): Promise<boolean> => map.setOnMapLongClickListener(listener)

export const mbSetMapStyle = (map: MapboxViewApi, style: string | MapStyle): Promise<unknown> =>
  map.setMapStyle(style)

export const mbAddMarkers = (map: MapboxViewApi, markers: MapboxMarker[]): Promise<unknown> =>
  map.addMarkers(markers)

export const mbRemoveMarkers = (map: MapboxViewApi, markers?: string[]): Promise<unknown> =>
  map.removeMarkers(markers)

export const mbAddSource = (
  map: MapboxViewApi,
  id: string,
  options: AddSourceOptions
): Promise<unknown> =>
  map
    .addSource(id, options)
    .then(() => console.log('mapboxService::addSource: ADD SOURCE!!'))
    .catch((error) => console.log(`mapboxService::addSource: ERROR!!: ${error.message | error}`))

export const addFakeSource = (): void => {
  const id = 'Fake'
  const options = {
    type: 'geojson',
    url: '',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [40.456135, -3.6805851],
      },
    },
  }

  getMap()
    .addSource(id, options)
    .then(() => console.log('mapboxService::addFakeSource: ADD SOURCE!!'))
    .catch((error) =>
      console.log(`mapboxService::addFakeSource: ERROR!!: ${error.message | error}`)
    )
}

export const mbRemoveSource = (map: MapboxViewApi, id: string): Promise<unknown> =>
  map.removeSource(id)

export const mbAddLayer = (map: MapboxViewApi, style: AddLayerOptions): Promise<unknown> =>
  map.addLayer(style)

export const mbRemoveLayer = (map: MapboxViewApi, id: string): Promise<unknown> =>
  map.removeLayer(id)
