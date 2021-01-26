import { getGeoJSONPolygonCoordinates } from '@/utils/circle'

import { Source, SourceOptions } from '@/api/types'
import { Circle, Position } from '@/utils/types'
import { GeoJSON } from 'geojson'

export const createSource = (id: string, args: Circle): Source => {
  console.log('createSource()')
  const sourceId = getSourceId(id)
  const sourceOptions = getPolygonSourceOptions(args)
  const source = { id: sourceId, data: sourceOptions }
  return source
}

const getSourceId = (id: string): string => `${id}_source`

const getPolygonSourceOptions = (args: Circle): SourceOptions => {
  const sourceData = getPolygonSourceData(args)
  const options: SourceOptions = {
    type: 'geojson',
    data: sourceData,
  }
  return options
}

const getPolygonSourceData = (args: Circle): GeoJSON => {
  const coordinates = getPolygonCoordinates(args)
  const data: GeoJSON = {
    type: 'Feature',
    properties: null,
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates],
    },
  }
  return data
}

const getPolygonCoordinates = (args: Circle): Position[] => {
  const { radius, center } = args
  const circleArgs = { center, radius, numberOfEdges: 64 }
  const coordinates = getGeoJSONPolygonCoordinates(circleArgs)
  return coordinates
}
