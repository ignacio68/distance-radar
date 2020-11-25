import { updateLocation } from './locations'

import { getMap as map } from '@/store/mapStore'

import { addNewSecurityArea, getSecurityArea, deleteSecurityArea } from '@/store/securityAreasStore'

import { getCirclePointsCoordinates } from '@/utils/circle/index'

import {
  BasicPolygonOptions,
  PolygonOptions,
  CircleLayer,
  LngLat,
  Circle,
  Location,
} from '@/types/types'

// TODO: using layers
// TODO: move to maps. API
// export const addSource = (id: string): void => {
//   console.log('addSource()')
//   // TODO: Add AddSourceOptions{url: string, type: string, data?: any }
//   // map().addSource(id)
// }

export const addCircleLayer = (options: CircleLayer): void => {
  map().addLayer({
    id: options.id,
    source: options.source,
    type: 'circle',
    circleColor: 'red',
    circleRadius: 500,
    circleStrokeColor: 'blue',
    circleStrokeWidth: 3,
  })
}

const fetchSecurityAreaPoints = async (center: LngLat, radius: number): Promise<LngLat[]> => {
  console.log('securityAreas.ts::fetchSecurityAreaPoints()')
  const args: Circle = {
    center: center,
    radius: radius,
    numberOfEdges: 32,
  }
  // const numberOfEdges = 4
  return (await getCirclePointsCoordinates(args)) as LngLat[]
}

export const newSecurityArea = async (args: BasicPolygonOptions): Promise<void> => {
  console.log('securityAreas.ts::newSecurityArea()')
  const points = await fetchSecurityAreaPoints(args.center, args.radius)
  const polygonOptions: PolygonOptions = {
    points,
    ...args,
  }
  map()
    .addPolygon(polygonOptions)
    .then(() => addNewSecurityArea(polygonOptions))
    .then(() => {
      const newSettings: Location = {
        id: polygonOptions.id,
        lat: polygonOptions.center.lat,
        lng: polygonOptions.center.lng,
        hasSecurityArea: true,
      }
      updateLocation(newSettings)
    })
}

// TODO: Revisar todos los métodos
export const updateSecurityArea = (securityArea: PolygonOptions): void => {
  console.log('securityAreas.ts::updateSecurityArea()')
  removeSecurityArea(securityArea.id).then(() => {
    newSecurityArea(securityArea)
    console.log('Security area is updated!')
  })
}

export const showSecurityArea = (id: string, value: boolean): void => {
  console.log('securityAreas.ts::showSecurityArea()')
  const currentSecurityArea = getSecurityArea(id)
  if (!currentSecurityArea) {
    console.log('The security area not exist')
    return
  }
  if (currentSecurityArea.isVisible === value) {
    console.log('The security visibility is the same!')
    return
  }
  changeSecurityAreaVisibility(currentSecurityArea, value)
}

const changeSecurityAreaVisibility = (securityArea: PolygonOptions, value: boolean): void => {
  console.log('securityAreas.ts::changeSecurityAreaVisibility()')
  securityArea.isVisible = value
  console.log(`visibility value: ${value}`)
  console.log(`${securityArea.id} is visible?  ${securityArea.isVisible}`)

  if (value) {
    securityArea.fillOpacity = securityArea.oldFillOpacity
    console.log(`Opacity ${securityArea.id}? ${securityArea.fillOpacity}`)
  } else {
    securityArea.oldFillOpacity = securityArea.fillOpacity
    securityArea.fillOpacity = 0

    console.log(`Opacity ${securityArea.id}? ${securityArea.fillOpacity}`)
  }
  updateSecurityArea(securityArea)
}

export const removeSecurityArea = async (id: string): Promise<void> => {
  console.log('securityAreas.ts::removeSecurityArea()')
  const isSecurityArea = getSecurityArea(id)
  if (!isSecurityArea) {
    console.log('SecurityArea not exist')
    return
  }
  const ids = [id]
  map()
    .removePolygons(ids)
    .then(() => deleteSecurityArea(id))
}
