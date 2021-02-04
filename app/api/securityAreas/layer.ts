import { createSource } from './source'
import { SecurityAreaOptions, PolygonLayerStyleOptions, PolygonLayer, Source } from '@/api/types'

export const createLayer = (options: SecurityAreaOptions): PolygonLayer => setLayerOptions(options)

const setLayerOptions = (options: SecurityAreaOptions): PolygonLayer => {
  const { id } = options
  const layerId = getLayerId(id)
  const source = createSource(id, options)
  const style = getLayerStyle(options)
  const layerOptions = getLayerOptions(layerId, source, style)

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
  source: Source,
  style: PolygonLayerStyleOptions,
): PolygonLayer => ({
  id: layerId,
  type: 'fill',
  source,
  layout: {},
  paint: style,
})
