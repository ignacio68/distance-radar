import { objectToArray, removeEmptyStrings, reduceToString } from '@/utils/text'
import { assert, expect } from 'chai'

describe.skip('Utils - Text', function () {
  describe('#objectToArray', function () {
    describe('convert an object to an array', function () {
      it('return an array', function () {
        const cleanObject = {
          1: 'a',
        }

        const arrayFromObject = objectToArray(cleanObject)

        expect(arrayFromObject).to.be.an.instanceOf(Array, 'it is not an array')
        expect(arrayFromObject).to.be.deep.equal(['a'])
      })
    })
  })

  describe('#removeEmptyKeys', function () {
    describe('remove the empty keys of an object', function () {
      it('return an object without the empty keys', function () {
        const fakeArray = ['a', '']

        const cleanArray = removeEmptyStrings(fakeArray)

        assert.deepEqual(['a'], cleanArray)
      })
    })
  })

  describe('#reduceToString', function () {
    describe('reduce an array to a string', function () {
      it('return a string', function () {
        const arrayFromObject = ['a', 'b']

        const stringFromArray = reduceToString(arrayFromObject)

        expect(stringFromArray).to.be.deep.equal('a, b')
      })
    })
  })
})
