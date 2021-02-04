/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MapboxView,
  ShowOptions,
  MapboxViewApi,
  MapboxMarker,
  MapStyle,
  SetCenterOptions,
  SetZoomLevelOptions,
  AnimateCameraOptions,
  AddLayerOptions,
  AddSourceOptions,
} from '@nativescript-community/ui-mapbox'

import { SetOnMapLongClickListener } from './types'

export const mbSetMap = (settings: ShowOptions): MapboxView => {
  const mapView = new MapboxView()
  mapView.setConfig(settings)
  return mapView
}

export const mbSetCenter = (map: MapboxViewApi, options: SetCenterOptions): Promise<unknown> =>
  map.setCenter(options)

export const mbSetZoomLevel = (
  map: MapboxViewApi,
  options: SetZoomLevelOptions,
): Promise<unknown> => map.setZoomLevel(options)

export const mbAnimateCamera = (
  map: MapboxViewApi,
  options: AnimateCameraOptions,
): Promise<unknown> => map.animateCamera(options)

export const mbSetOnMapLongClickListener = (
  map: MapboxViewApi,
  listener: SetOnMapLongClickListener,
): Promise<boolean> => map.setOnMapLongClickListener(listener)

export const mbSetMapStyle = (map: MapboxViewApi, style: string | MapStyle): Promise<unknown> =>
  map.setMapStyle(style)

export const mbAddMarkers = (map: MapboxViewApi, markers: MapboxMarker[]): Promise<unknown> => {
  console.log('mapboxService::addMarkers()')
  return map.addMarkers(markers)
}
export const mbRemoveMarkers = (map: MapboxViewApi, markers?: string[]): Promise<void> =>
  map.removeMarkers(markers)

// CURRENT IT'S NOT USED
export const mbAddSource = (
  map: MapboxViewApi,
  id: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  options: any,
  // options: AddSourceOptions
): Promise<void> =>
  map
    .addSource(id, options)
    .then(() => console.log('mapboxService::addSource: ADDED SOURCE!!'))
    .catch((error) => console.log(`mapboxService::addSource: ERROR!!: ${error.message | error}`))

// CURRENT IT'S NOT USED
export const mbRemoveSource = (map: MapboxViewApi, id: string): Promise<void> =>
  map.removeSource(id)

export const mbAddLayer = async (map: MapboxViewApi, style: any): Promise<void> => {
  console.log(`mapboxService::addLayer(): ${JSON.stringify(style.paint)}`)
  map
    .addLayer(style)
    .then(() => console.log('mapboxService::addLayer(): ADDED LAYER!!'))
    .catch((error) => console.log(`mapboxService::addLayer(): ERROR!!: ${error.message}`))
}

export const mbRemoveLayer = (map: MapboxViewApi, id: string): Promise<void> => map.removeLayer(id)
