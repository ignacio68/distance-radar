import { getMap as map } from '@/store/mapStore'
import {
  addNewSecurityArea,
  getSecurityArea,
  deleteSecurityArea,
} from '@/store/securityAreasStore'
import { getLocations } from '@/store/locationsStore'
import { getCirclePointsCoordinates } from '@/utils/circle'

import {
  BasicPolygonOptions,
  PolygonOptions,
  CircleLayer,
  LngLat,
  Circle,
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

const fetchSecurityAreaPoints = async (
  center: LngLat,
  radius: number
): Promise<LngLat[]> => {
  const args: Circle = {
    center: center,
    radius: radius,
    numberOfPoints: 32,
  }
  return getCirclePointsCoordinates(args)
}

export const newSecurityArea = (args: BasicPolygonOptions): void => {
  console.log('securityAreas.ts::newSecurityArea()')
  console.dir(getLocations())
  fetchSecurityAreaPoints(args.center, args.radius).then((points) => {
    const polygonOptions: PolygonOptions = {
      points,
      ...args,
    }
    map()
      .addPolygon(polygonOptions)
      .then(() => addNewSecurityArea(polygonOptions))
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

const changeSecurityAreaVisibility = (
  securityArea: PolygonOptions,
  value: boolean
): void => {
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
