import circle from '@turf/circle'

import { mbAddSource, mbRemoveSource } from '@/services/mapboxService'

import { latLngToPosition } from '@/utils/commons'

import { getMap } from '@/store/mapStore'

import { Source, LatLng } from '@/api/types'
import { Circle } from '@/utils/types'
import { Position } from '@/types/commons'
import { GeoJSON } from 'geojson'

export const createSource = async (id: string, args: Circle): Promise<Source> => {
  console.log('createSource()')
  const sourceId = getSourceId(id)
  const source: Source = getSource(sourceId, args)
  await mbAddSource(getMap(), sourceId, source)
  return source
}
// export const createSource = (id: string, args: Circle): Source => {
//   console.log('createSource()')
//   const sourceId = getSourceId(id)
//   const source = { id: sourceId, type: 'geojson' as const, data: sourceData }
//   const source = { type: 'geojson' as const, data: sourceData }
//   return source
// }

export const removeSource = async (id: string): Promise<void> => {
  const sourceId = getSourceId(id)
  sourceId.length > 0
    ? mbRemoveSource(getMap(), sourceId)
    : console.log(`source.ts::removeSource: The source doesn't exist!!`)
}

const getSourceId = (id: string): string => `${id}_source`

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
