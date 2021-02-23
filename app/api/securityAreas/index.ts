import { createLayer, removeLayer } from './layer'
import { removeSource } from './source'

import { addNewSecurityArea, getSecurityArea, deleteSecurityArea } from '@/store/securityAreasStore'

import { SecurityAreaOptions, SecurityArea, PolygonLayer, LayerVisibility } from '@/api/types'

export const newSecurityArea = async (args: SecurityAreaOptions): Promise<void> => {
  try {
    console.log('securityAreas::newSecurityArea()')
    createLayer(args).then((layer) => {
      const newSecurityAreaToStore = setSecurityAreaOptions(args, layer)
      addNewSecurityArea(newSecurityAreaToStore)
    })
  } catch (error) {
    console.log(`securityAreas::newSecurityArea():error ${error}`)
  }
}

const setSecurityAreaOptions = (args: SecurityAreaOptions, layer: PolygonLayer): SecurityArea => {
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
  if (isSecurityArea(securityArea)) changeSecurityAreaVisibility(securityArea, value)
  return
}

const isSecurityArea = (securityArea: SecurityArea): boolean => typeof securityArea === 'object'

const isSecurityAreaVisible = (securityArea: SecurityArea): boolean =>
  securityArea.layer.paint.visibility === 'visible'

const changeSecurityAreaVisibility = (securityArea: SecurityArea, value: LayerVisibility): void => {
  console.log('securityAreas.ts::changeSecurityAreaVisibility()')
  securityArea.layer.paint.visibility = value
  console.log(`${securityArea.id} is visible?  ${securityArea.layer.paint.visibility}`)
}

//  TODO: to remove
export const removeSecurityArea = async (id: string): Promise<void> => {
  const securityArea = getSecurityArea(id)
  console.log(`securityAreas.ts::removeSecurityArea()::typeof: ${typeof securityArea}`)
  if (typeof securityArea === 'object') {
    removeLayer(id)
      .then(() => removeSource(id))
      .then(() => deleteSecurityArea(id))
  }
  return
}

export { activateAlarms, fetchAlarmsActive } from './alarms'
