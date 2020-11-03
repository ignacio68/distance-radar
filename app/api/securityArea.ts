import { getSecurityAreaPoints } from '@/services/mapService'

import { LngLat, BasicPolygonOptions, PolygonOptions, CircleLayer } from '@/types/types'

import { getMap as map } from '@/store/mapStore'
import securityArea from '@/store/securityAreaStore'

// TODO: using layers
export const addSource = (id: string) => {
  console.log('addSource()')
  // TODO: Add AddSourceOptions{url: string, type: string, data?: any }
  // map().addSource(id)
}

export const addCircleLayer = (options: CircleLayer) => {
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

export const setSecurityArea = (initialPolygonOptions: BasicPolygonOptions) => {
  console.log('setSecurityArea()')
  getSecurityAreaPoints(initialPolygonOptions.radius).then((points) => {
    const polygonOptions: PolygonOptions = {
      points,
      ...initialPolygonOptions,
    }
    map()
      .addPolygon(polygonOptions)
      .then(() => {
        securityArea.setNewSecurityArea(polygonOptions)
      })
  })
}

export const showSecurityArea = (id: string, value: boolean) => {
  console.log('showSecurityArea()')
  const currentSecurityArea = securityArea.getSecurityArea(id)
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
  console.log('changeSecurityAreaVisibility()')
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

export const updateSecurityArea = (securityArea: PolygonOptions) => {
  console.log('updateSecurityArea()')
  removeSecurityArea(securityArea.id).then(() => {
    setSecurityArea(securityArea)
    console.log('Security area is updated!')
  })
}

export const removeSecurityArea = async (id: string) => {
  console.log('removeSecurityArea()')
  const isSecurityArea = securityArea.getSecurityArea(id)
  if (!isSecurityArea) {
    console.log('SecurityArea not exist')
    return
  }
  const ids = [id]
  map()
    .removePolygons(ids)
    .then(() => securityArea.removeSecurityArea(id))
}
