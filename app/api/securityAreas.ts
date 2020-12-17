import * as map from '@/services/mapboxService'

import { addSecurityAreaToLocation } from './locations'

import { getMap } from '@/store/mapStore'

import {
  addNewSecurityArea,
  getSecurityArea,
  deleteSecurityArea,
  getAllSecurityAreas,
} from '@/store/securityAreasStore'

import { getCirclePointsCoordinates } from '@/utils/circle/index'

import {
  BasicPolygonOptions,
  SecurityArea,
  CircleLayer,
  LatLng,
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

// export const addCircleLayer = (options: CircleLayer): void => {
//   map.addLayer(getMap(), {
//     id: options.id,
//     source: options.source,
//     type: 'circle',
//     circleColor: 'red',
//     circleRadius: 500,
//     circleStrokeColor: 'blue',
//     circleStrokeWidth: 3,
//   })
// }

const fetchSecurityAreaPoints = async (center: LatLng, radius: number): Promise<LatLng[]> => {
  console.log('securityAreas.ts::fetchSecurityAreaPoints()')
  const args: Circle = {
    center: center,
    radius: radius,
    numberOfEdges: 36,
  }
  // const numberOfEdges = 4
  return (await getCirclePointsCoordinates(args)) as LatLng[]
}

const setNewSecurityAreaProps = async (args: BasicPolygonOptions): Promise<SecurityArea> => {
  const points = await fetchSecurityAreaPoints(args.center, args.radius)
  const securityAreaProps: SecurityArea = {
    points,
    ...args,
  }
  return securityAreaProps
}

// TODO: to remove
export const newSecurityArea = async (args: BasicPolygonOptions): Promise<void> => {
  const securityAreaProps = await setNewSecurityAreaProps(args)
  getMap()
    .addPolygon(securityAreaProps)
    .then((): void => {
      console.log(
        `securityAreas.ts::newSecurityArea():map:center: ${JSON.stringify(
          securityAreaProps.center
        )}`
      )
      addNewSecurityArea(securityAreaProps)
      // const newLocationSettings: Location = {
      //   id: securityAreaProps.id,
      //   lat: securityAreaProps.center.lat,
      //   lng: securityAreaProps.center.lng,
      //   hasSecurityArea: true,
      // }
      addSecurityAreaToLocation(securityAreaProps.id, securityAreaProps)
      getAllSecurityAreas()
    })
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
