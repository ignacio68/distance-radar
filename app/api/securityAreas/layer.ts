import { createSource } from './source'

import { mbAddLayer, mbRemoveLayer } from '@/services/mapboxService'

import { getMap } from '@/store/mapStore'

import { SecurityAreaOptions, PolygonLayerStyleOptions, PolygonLayer, Source } from '@/api/types'

// export const createLayer = async (
//   options: SecurityAreaOptions,
// ): Promise<PolygonLayer> => {
//   const layerOptions = setLayerOptions(options)
//   await mbAddLayer(getMap(), layerOptions)
//   return layerOptions
// }

export const createLayer = async (
  options: SecurityAreaOptions,
  sourceId: string,
): Promise<PolygonLayer> => {
  const map = getMap()
  const layerOptions = await setLayerOptions(options, sourceId)
  mbAddLayer(map, layerOptions)

  return layerOptions
}

export const removeLayer = async (id: string) => {
  const layerId = getLayerId(id)
  mbRemoveLayer(getMap(), layerId)
}

const setLayerOptions = async (
  options: SecurityAreaOptions,
  sourceId: string,
): Promise<PolygonLayer> => {
  const { id } = options
  const layerId = getLayerId(id)
  const style = getLayerStyle(options)
  // const source = await createSource(id, options)
  const layerOptions = getLayerOptions(layerId, sourceId, style)
  return layerOptions
}

const getLayerId = (id: string): string => `${id}_layer`

const getLayerStyle = (args: SecurityAreaOptions): PolygonLayerStyleOptions => {
  const { fillColor, fillOpacity, visibility } = args
  const style: PolygonLayerStyleOptions = {
    'fill-color': fillColor,
    'fill-opacity': fillOpacity,
    visibility,
  }
  return style
}

const getLayerOptions = (
  layerId: string,
  source: Source | string,
  style: PolygonLayerStyleOptions,
): PolygonLayer => ({
  id: layerId,
  type: 'fill',
  source,
  layout: {},
  paint: style,
})
