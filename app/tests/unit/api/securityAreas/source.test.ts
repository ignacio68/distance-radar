import { createSource } from '@/api/securityAreas/source'
import { assert } from 'chai'

import { Circle } from '@/utils/types'

describe.skip('API - Security Areas - Source', function () {
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

        this.source = createSource(this.args)
      })
      it('return an object', function () {
        assert.isObject(this.source, 'source is an object')
      })
      it('the type of the source is "geojson', function () {
        const type: string = this.source.type
        assert.strictEqual(type, 'geojson', 'The type is not geojson')
      })
      it('the type of the source data is "Feature"', function () {
        const type: string = this.source.data.type
        assert.strictEqual(type, 'Feature', 'The type is not Feature')
      })
    })
  })
})
