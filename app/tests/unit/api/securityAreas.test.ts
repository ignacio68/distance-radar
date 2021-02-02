import { createSource } from '@/api/securityAreas/source'
import { assert } from 'chai'

import { Circle } from '@/utils/types'

describe('API - Security Areas - Source', function () {
  describe('#createSource', function () {
    describe('return a valid Mapbox source', function () {
      before(function () {
        this.id = 'user'
        this.args = {
          center: {
            lat: 0,
            lng: 0,
          },
          radius: 10,
          numberOfEdges: 32,
        } as Circle

        this.source = createSource(this.id, this.args)
      })
      it('return an object', function () {
        assert.isObject(this.source, 'source is an object')
      })
      it('')
    })
  })
})
