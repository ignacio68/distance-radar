import { createLayer, removeLayer } from './layer'
import { createSource, removeSource } from './source'
import { createAlarm, setAlarm } from './alarms'
import { setRadarActivity } from '@/api/radar'
import { getId } from '@/utils/commons'

import {
  addNewSecurityArea,
  getSecurityArea,
  updateSecurityAreaStore,
  deleteSecurityArea,
} from '@/store/securityAreasStore'

import {
  SecurityAreaOptions,
  SecurityArea,
  PolygonLayer,
  LayerVisibility,
  Source,
  Alarm,
} from '@/api/types'

export const newSecurityArea = (args: SecurityAreaOptions): void => {
  getSecurityAreaComponents(args).then((components) => {
    const { layer, source, alarm } = components
    const securityArea = setSecurityAreaOptions(args, layer, source, alarm)
    addNewSecurityArea(securityArea)
      .then(() => setAlarm(alarm))
      .catch((error) => console.log(`securityAreas::newSecurityArea():error ${error}`))
  })
}

export const getSecurityAreaComponents = async (args: SecurityAreaOptions): Promise<any> => {
  const source = createSource(args)
  const layer = createLayer(args, source.id)
  const alarm = createAlarm(args)
  return { source, layer, alarm }
}

const setSecurityAreaOptions = (
  args: SecurityAreaOptions,
  layer: PolygonLayer,
  source: Source,
  alarm: Alarm,
): SecurityArea => {
  const { owner, radius, center } = args
  const securityArea = {
    id: getId(owner, 'area'),
    owner,
    radius,
    center,
    layer,
    source,
    alarm,
  }
  return securityArea
}

// TODO: Revisar todos los métodos
export const updateSecurityArea = (
  id: string,
  args: SecurityAreaOptions | PolygonLayer | Alarm,
): void => {
  if ((args as PolygonLayer).type) updateLayer(id, args as PolygonLayer)
  else if (args as Alarm) updateAlarm(id, args as Alarm)
  console.log('Security area is updated!')
}

const updateLayer = (id: string, layer: PolygonLayer) => {
  const securityArea = getSecurityArea(id)
  const securityAreaUpdated = { ...securityArea, layer }
  updateSecurityAreaStore(securityAreaUpdated)
}

const updateAlarm = (id: string, alarm: Alarm) => {
  const securityArea = getSecurityArea(id)
  const securityAreaUpdated = { ...securityArea, alarm }
  updateSecurityAreaStore(securityAreaUpdated)
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
  const owner = getOwner(id)
  setRadarActivity(securityArea.alarm.searchId)
  if (!!securityArea) {
    removeLayer(owner)
      .then(() => removeSource(owner))
      .then(() => deleteSecurityArea(id))
  }
  return
}

const getOwner = (id: string): string => id.substring(0, id.length - 5)

export { turnOnAlarm, turnOffAlarm, alarmHandler, stopAlarm, setAlarm } from './alarms'
