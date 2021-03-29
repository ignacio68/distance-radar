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
  LayerCommon,
  SetViewportOptions,
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

export const mbSetViewport = (map: MapboxViewApi, options: SetViewportOptions): Promise<void> =>
  map.setViewport(options)

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

export const mbAddMarkers = async (map: MapboxViewApi, markers: MapboxMarker[]): Promise<void> => {
  map.addMarkers(markers)
  console.log(`mapboxService::addMarkers()::markers: ${JSON.stringify(markers)}`)
}

export const mbRemoveMarkers = (map: MapboxViewApi, markers?: string[]): Promise<void> =>
  map.removeMarkers(markers)

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
    .catch((error) => console.log(`mapboxService::addSource: ERROR!!: ${error}`))

export const mbRemoveSource = (map: MapboxViewApi, id: string): Promise<void> =>
  map
    .removeSource(id)
    .then((result) => console.log(`mapboxService::removeSource: REMOVED SOURCE!!`))
    .catch((error) => console.log(`mapboxService::removeSource: ERROR!!: ${error}`))

export const mbAddLayer = (map: MapboxViewApi, style: any): Promise<void> =>
  map
    .addLayer(style)
    .then(() => console.log('mapboxService::addLayer(): ADDED LAYER!!'))
    .catch((error) => console.log(`mapboxService::addLayer(): ERROR!!: ${error}`))

export const mbGetLayer = (map: MapboxViewApi, id: string): Promise<LayerCommon> => map.getLayer(id)

export const mbGetLayers = (map: MapboxViewApi): Promise<LayerCommon[]> => map.getLayers()

export const mbRemoveLayer = (map: MapboxViewApi, id: string): Promise<void> =>
  map
    .removeLayer(id)
    .then(() => console.log('mapboxService::removeLayer(): REMOVED LAYER!!'))
    .catch((error) => console.log(`mapboxService::removeLayer(): ERROR!!: ${error}`))
