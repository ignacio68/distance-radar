import { getId } from '@/utils/commons'

import { mbAddLayer, mbRemoveLayer } from '@/services/mapboxService'

import { getMap } from '@/store/mapStore'

import { SecurityAreaOptions, PolygonLayerStyleOptions, PolygonLayer, Source } from '@/api/types'

export const createLayer = (options: SecurityAreaOptions, sourceId: string): PolygonLayer => {
  console.log('createLayer()')
  const map = getMap()
  const layerOptions = setLayerOptions(options, sourceId)
  mbAddLayer(map, layerOptions)

  return layerOptions
}

export const removeLayer = async (id: string) => {
  const layerId = getId(id, 'layer')
  mbRemoveLayer(getMap(), layerId)
}

const setLayerOptions = (options: SecurityAreaOptions, sourceId: string): PolygonLayer => {
  const id = getId(options.id, 'layer')
  const style = getLayerStyle(options)
  // const source = await createSource(id, options)
  const layerOptions = getLayerOptions(id, sourceId, style)
  return layerOptions
}

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
  id: string,
  source: Source | string,
  style: PolygonLayerStyleOptions,
): PolygonLayer => ({
  id,
  source,
  type: 'fill',
  layout: {},
  paint: style,
})
