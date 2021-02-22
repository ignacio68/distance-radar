import { createLayer, removeLayer } from './layer'
import { removeSource } from './source'
import { addSecurityAreaToLocation } from '@/api/locations'

import {
  addNewSecurityArea,
  getSecurityArea,
  deleteSecurityArea,
} from '@/store/securityAreasStore'

import {
  SecurityAreaOptions,
  SecurityArea,
  PolygonLayer,
  LayerVisibility,
} from '@/api/types'

export const newSecurityArea = async (
  args: SecurityAreaOptions,
): Promise<void> => {
  createLayer(args).then((layer) => {
    const newSecurityAreaToStore = putNewSecurityAreaToStore(args, layer)
    addNewSecurityArea(newSecurityAreaToStore).then(() => {
      addSecurityAreaToLocation(newSecurityAreaToStore.id)
    })
  })
}

const putNewSecurityAreaToStore = (
  args: SecurityAreaOptions,
  layer: PolygonLayer,
): SecurityArea => {
  const { id, radius, center, isActive, alertMode } = args
  const securityArea = {
    id,
    owner: id, // TODO: assign the real owner
    radius,
    center,
    isActive,
    alertMode,
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

export const showSecurityArea = (id: string, value: LayerVisibility): void => {
  console.log('securityAreas.ts::showSecurityArea()')
  const securityArea = getSecurityArea(id)
  validateSecurityArea(securityArea)
  changeSecurityAreaVisibility(securityArea, value)
}

const validateSecurityArea = (securityArea: SecurityArea): void => {
  if (!isSecurityArea(securityArea)) {
    console.log('The security area not exist')
    return
  }
  // TODO: review this function use
  if (isSecurityAreaVisible(securityArea)) {
    console.log('The security area is already visible!')
    return
  }
}

const isSecurityArea = (securityArea: SecurityArea): boolean =>
  securityArea !== (undefined || null)

const isSecurityAreaVisible = (securityArea: SecurityArea): boolean => {
  return securityArea.layer.paint.visibility === 'visible' ? true : false
}

const changeSecurityAreaVisibility = (
  securityArea: SecurityArea,
  value: LayerVisibility,
): void => {
  console.log('securityAreas.ts::changeSecurityAreaVisibility()')
  securityArea.layer.paint.visibility = value
  console.log(`visibility value: ${value}`)
  console.log(
    `${securityArea.id} is visible?  ${securityArea.layer.paint.visibility}`,
  )

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
  if (typeof isSecurityArea !== 'undefined') {
    removeLayer(id)
      .then(() => removeSource(id))
      .then(() => deleteSecurityArea(id))
  }
  return
}

export { activateAlarms } from './alarms'
