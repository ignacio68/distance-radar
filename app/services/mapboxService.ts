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

export interface SetOnMapLongClickListener {
  (data: LatLng): boolean
}

export const setCenter = (map: MapboxViewApi, options: SetCenterOptions): Promise<unknown> =>
  map.setCenter(options)

export const setZoomLevel = (map: MapboxViewApi, options: SetZoomLevelOptions): Promise<unknown> =>
  map.setZoomLevel(options)

export const animateCamera = (
  map: MapboxViewApi,
  options: AnimateCameraOptions
): Promise<unknown> => map.animateCamera(options)

export const setOnMapLongClickListener = (
  map: MapboxViewApi,
  listener: SetOnMapLongClickListener
): Promise<boolean> => map.setOnMapLongClickListener(listener)

export const setMapStyle = (map: MapboxViewApi, style: string | MapStyle): Promise<unknown> =>
  map.setMapStyle(style)

export const addMarkers = (map: MapboxViewApi, markers: MapboxMarker[]): Promise<unknown> =>
  map.addMarkers(markers)

export const removeMarkers = (map: MapboxViewApi, markers?: string[]): Promise<unknown> =>
  map.removeMarkers(markers)

export const addSource = (
  map: MapboxViewApi,
  id: string,
  options: AddSourceOptions
): Promise<unknown> => map.addSource(id, options)

export const removeSource = (map: MapboxViewApi, id: string): Promise<unknown> =>
  map.removeSource(id)

export const addLayer = (map: MapboxViewApi, style: AddLayerOptions): Promise<unknown> =>
  map.addLayer(style)

export const removeLayer = (map: MapboxViewApi, id: string): Promise<unknown> => map.removeLayer(id)
