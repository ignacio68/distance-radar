import circle from '@turf/circle'

import { latLngToPosition } from '@/utils/commons'

import { Source, LatLng } from '@/api/types'
import { Circle } from '@/utils/types'
import { Position } from '@/types/commons'
import { GeoJSON } from 'geojson'

export const createSource = (id: string, args: Circle): Source => {
  console.log('createSource()')
  const sourceId = getSourceId(id)
  const sourceData = getSourceData(args)
  const source = { id: sourceId, type: 'geojson' as const, data: sourceData }
  return source
}

export const getSourceId = (id: string): string => `${id}_source`

const getSourceData = (args: Circle): GeoJSON => {
  const { radius } = args
  const center = getCircleCenter(args.center)
  const options = getCircleOptions()
  const sourceData = circle(center, radius, options)
  return sourceData
}

const getCircleCenter = (center: LatLng): Position => latLngToPosition(center)

const getCircleOptions = (): Record<string, unknown> => ({
  steps: 32,
  units: 'kilometers' as const,
  properties: {},
})
