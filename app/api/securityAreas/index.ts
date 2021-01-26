import { mbAddLayer, mbRemoveLayer } from '@/services/mapboxService'
import { createLayer } from './layer'
import { addSecurityAreaToLocation } from '@/api/locations'
import { getMap } from '@/store/mapStore'
import { addNewSecurityArea, getSecurityArea, deleteSecurityArea } from '@/store/securityAreasStore'

import { SecurityAreaOptions, SecurityArea, PolygonLayer } from '@/api/types'

export const newSecurityArea = async (args: SecurityAreaOptions): Promise<void> => {
  const securityAreaLayer = createLayer(args)
  mbAddLayer(getMap(), securityAreaLayer).then((): void => {
    console.log(`securityAreas.ts::newSecurityArea():map:center: ${JSON.stringify(args.center)}`)
    const newSecurityArea = getNewSecurityArea(args, securityAreaLayer)
    addNewSecurityArea(newSecurityArea).then(() => {
      addSecurityAreaToLocation(newSecurityArea.id)
    })
  })
}

const getNewSecurityArea = (args: SecurityAreaOptions, layer: PolygonLayer): SecurityArea => {
  const { id, radius, center, isActive } = args
  const securityArea = {
    id,
    owner: id,
    radius,
    center,
    isActive,
    layer,
  }
  return securityArea
}

// TODO: Revisar todos los métodos
export const updateSecurityArea = (securityArea: SecurityAreaOptions): void => {
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
  securityArea.layer.visibility === value

const changeSecurityAreaVisibility = (securityArea: SecurityArea, value: boolean): void => {
  console.log('securityAreas.ts::changeSecurityAreaVisibility()')
  securityArea.layer.visibility = value
  console.log(`visibility value: ${value}`)
  console.log(`${securityArea.id} is visible?  ${securityArea.layer.visibility}`)

  // FIXME: refactoring
  // if (value) {
  //   securityArea.fillOpacity = securityArea.oldFillOpacity
  //   console.log(`Opacity ${securityArea.id}? ${securityArea.fillOpacity}`)
  // } else {
  //   securityArea.oldFillOpacity = securityArea.fillOpacity
  //   securityArea.fillOpacity = 0

  //   console.log(`Opacity ${securityArea.id}? ${securityArea.fillOpacity}`)
  // }
  // updateSecurityArea(securityArea)
}

//  TODO: to remove
export const removeSecurityArea = async (id: string): Promise<void> => {
  console.log('securityAreas.ts::removeSecurityArea()')
  const isSecurityArea = getSecurityArea(id)
  if (!isSecurityArea) {
    console.log('SecurityArea not exist')
    return
  }
  mbRemoveLayer(getMap(), id).then(() => deleteSecurityArea(id))
}
