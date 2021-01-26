import { createSource } from './source'
import { SecurityAreaOptions, PolygonLayerStyleOptions, PolygonLayer } from '@/api/types'

export const createLayer = (options: SecurityAreaOptions): PolygonLayer =>
  getGeoJSONLayerOptions(options)

const getGeoJSONLayerOptions = (options: SecurityAreaOptions): PolygonLayer => {
  const { id } = options
  const layerId = getLayerId(id)
  const source = createSource(id, options)
  const style = getLayerStyle(options)
  const layerOptions: PolygonLayer = {
    id: layerId,
    sourceLayer: source,
    ...style,
  }
  return layerOptions
}

const getLayerId = (id: string): string => `${id}_layer`

const getLayerStyle = (args: SecurityAreaOptions): PolygonLayerStyleOptions => {
  const { fillColor, fillOpacity, isVisible } = args
  const style: PolygonLayerStyleOptions = {
    fillAntialias: true,
    fillColor,
    fillOpacity,
    fillOutlineColor: fillColor,
    visibility: isVisible,
  }
  return style
}
