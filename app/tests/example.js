// A sample Jasmine test
// describe('A suite', function () {
//     it('contains spec with an expectation', function () {
//         expect(true).toBe(true)
//     })
// })

describe('Una prueba', () => {
  it('Debe hacer una suma', () => {
    // Arrange
    const sum = (a, b) => a + b

    // Act
    const miSuma = sum(1, 1)

    // Assert
    expect(miSuma).toBe(2)
  })
})
// import { removeEmptyKeys, objectToArray, reduceToString } from '../utils/text'

// describe('removeEmptyKeys', () => {
//     it('remove the empty keys of an object'),
//         () => {
//             const myObject = {
//                 1: 'a',
//                 2: null,
//             }
//             const cleanObject = removeEmptyKeys(myObject)
//             // expect(cleanObject.length).toBe(1)
//             expect(cleanObject).toBeSize(1)
//         }
// })

// describe('objectToArray', () => {
//     it('conver objet to array'),
//         () => {
//             const myObject = {
//                 1: 'a',
//             }
//             const cleanObject = objectToArray(myObject)
//             expect(cleanObject).toBeEqual(['a'])
//         }
// })

// describe('reduceToString', () => {
//     it('reduce an array to string'),
//         () => {
//             const myArray = ['a', 'b']
//             const myString = reduceToString(myArray)
//             expect(myString).toBeEqual('a, b')
//         }
// })
