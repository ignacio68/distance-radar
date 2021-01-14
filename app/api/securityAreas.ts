import { mbAddSource, mbAddLayer } from '@/services/mapboxService'

import { addSecurityAreaToLocation } from './locations'

import { getMap } from '@/store/mapStore'

import {
  addNewSecurityArea,
  getSecurityArea,
  deleteSecurityArea,
  getAllSecurityAreas,
} from '@/store/securityAreasStore'

import { getGeoJSONPolygon } from '@/utils/circle/index'

import {
  BasicPolygonOptions,
  SecurityArea,
  CircleLayer,
  LatLng,
  Circle,
  Location,
} from '@/types/types'

// // TODO: using layers
// // TODO: move to maps. API
// export const addSource = (id: string): void => {
//   console.log('addSource()')
//   // TODO: Add AddSourceOptions{url: string, type: string, data?: any }
//   mbAddSource(id)
// }

// export const addCircleLayer = (options: CircleLayer): void => {
//   mbAddLayer(getMap(), {
//     id: options.id,
//     source: options.source,
//     type: 'circle',
//     circleColor: 'red',
//     circleRadius: 500,
//     circleStrokeColor: 'blue',
//     circleStrokeWidth: 3,
//   })
// }

// TODO: change to layer method
export const newSecurityArea = async (args: BasicPolygonOptions): Promise<void> => {
  const securityAreaArgs = await getNewSecurityAreaArgs(args)
  getMap()
    .addPolygon(securityAreaArgs)
    .then((): void => {
      console.log(
        `securityAreas.ts::newSecurityArea():map:center: ${JSON.stringify(securityAreaArgs.center)}`
      )
      addNewSecurityArea(securityAreaArgs).then(() => {
        addSecurityAreaToLocation(securityAreaArgs.id, securityAreaArgs)
        getAllSecurityAreas()
      })
    })
}

const getNewSecurityAreaArgs = async (args: BasicPolygonOptions): Promise<SecurityArea> => {
  const points = await getSecurityAreaVertex(args.center, args.radius)
  const securityAreaArgs: SecurityArea = {
    points,
    ...args,
  }
  return securityAreaArgs
}

const getSecurityAreaVertex = async (center: LatLng, radius: number): Promise<LatLng[]> => {
  console.log('securityAreas.ts::getSecurityAreaVertex()')
  const args: Circle = {
    center,
    radius,
    numberOfEdges: 64,
  }
  return getGeoJSONPolygon(args)
}

// TODO: Revisar todos los métodos
export const updateSecurityArea = (securityArea: SecurityArea): void => {
  console.log('securityAreas.ts::updateSecurityArea()')
  removeSecurityArea(securityArea.id).then(() => {
    newSecurityArea(securityArea)
    console.log('Security area is updated!')
  })
}

export const showSecurityArea = (id: string, value: boolean): void => {
  console.log('securityAreas.ts::showSecurityArea()')
  const securityArea = getSecurityArea(id)
  validateSecurityArea(securityArea, value)
  changeSecurityAreaVisibility(securityArea, value)
}

const validateSecurityArea = (securityArea: SecurityArea, value: boolean): void => {
  if (!isSecurityArea(securityArea)) {
    console.log('The security area not exist')
    return
  }
  // TODO: review this function use
  if (isSecurityAreaVisible(securityArea, value)) {
    console.log('The security visibility is the same!')
    return
  }
}

const isSecurityArea = (securityArea: SecurityArea): boolean => securityArea !== undefined || null

const isSecurityAreaVisible = (securityArea: SecurityArea, value: boolean): boolean =>
  securityArea.isVisible === value

const changeSecurityAreaVisibility = (securityArea: SecurityArea, value: boolean): void => {
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

//  TODO: to remove
export const removeSecurityArea = async (id: string): Promise<void> => {
  console.log('securityAreas.ts::removeSecurityArea()')
  const isSecurityArea = getSecurityArea(id)
  if (!isSecurityArea) {
    console.log('SecurityArea not exist')
    return
  }
  const ids = [id]
  getMap()
    .removePolygons(ids)
    .then(() => deleteSecurityArea(id))
}
