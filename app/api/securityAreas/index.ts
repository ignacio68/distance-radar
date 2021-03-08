import { createLayer, removeLayer } from './layer'
import { createSource, removeSource } from './source'

import { removeAlarms } from '@/store/alarmsStore'
import { addNewSecurityArea, getSecurityArea, deleteSecurityArea } from '@/store/securityAreasStore'

import {
  SecurityAreaOptions,
  SecurityArea,
  PolygonLayer,
  LayerVisibility,
  Source,
} from '@/api/types'

export const newSecurityArea = async (args: SecurityAreaOptions): Promise<void> => {
  const options = args
  const source = await createSource(args.id, args)
  const layer = await createLayer(args, source.id)
  const securityArea = setSecurityAreaOptions(options, layer, source)
  addNewSecurityArea(securityArea).catch((error) =>
    console.log(`securityAreas::newSecurityArea():error ${error}`),
  )
}

const setSecurityAreaOptions = (
  args: SecurityAreaOptions,
  layer: PolygonLayer,
  source: Source,
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
    source,
  }
  console.log(
    `securityAreas::setSecurityAreaOptions()::securityArea: ${JSON.stringify(securityArea)}`,
  )
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

export const removeAllSecurityAreas = async (securityAreas: string[]): Promise<void> => {
  securityAreas.forEach((securityArea) => removeSecurityArea(securityArea))
}

export const removeSecurityArea = async (id: string): Promise<void> => {
  const securityArea = getSecurityArea(id)
  if (!!securityArea) {
    removeLayer(id)
      .then(() => removeSource(id))
      .then(() => deleteSecurityArea(id))
      .then(() => removeAlarms([id]))
  }
  return
}

export { startAlarmsWork, stopAlarmsWork, turnOnAlarm, fetchActiveAlarms } from './alarms'
