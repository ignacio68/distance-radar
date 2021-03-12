import circle from '@turf/circle'

import { mbAddSource, mbRemoveSource } from '@/services/mapboxService'

import { latLngToPosition, getId } from '@/utils/commons'

import { getMap } from '@/store/mapStore'

import { Source, LatLng, SecurityAreaOptions } from '@/api/types'
import { Circle } from '@/utils/types'
import { Position } from '@/types/commons'
import { GeoJSON } from 'geojson'

export const createSource = (args: SecurityAreaOptions): Source => {
  console.log('createSource()')
  const id = getId(args.id, 'source')
  const source: Source = getSource(id, args)
  mbAddSource(getMap(), id, source)
  return source
}

export const removeSource = async (id: string): Promise<void> => {
  const sourceId = getId(id, 'source')
  sourceId.length > 0
    ? mbRemoveSource(getMap(), sourceId)
    : console.log(`source.ts::removeSource: The source doesn't exist!!`)
}

const getSource = (id: string, args: Circle): Source => {
  const sourceData = getSourceData(args)
  const source: Source = {
    id,
    type: 'geojson' as const,
    data: sourceData,
  }
  return source
}

const getSourceData = (args: Circle): GeoJSON => {
  const { radius, center } = args
  const centerPosition = getCircleCenter(center)
  const options = getCircleOptions()
  const sourceData = circle(centerPosition, radius, options)
  return sourceData
}

const getCircleCenter = (center: LatLng): Position => latLngToPosition(center)

const getCircleOptions = (): Record<string, unknown> => ({
  steps: 64,
  units: 'kilometers' as const,
  properties: {},
})
