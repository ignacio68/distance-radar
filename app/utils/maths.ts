const toRadians = 0.017453292519943295 // (PI / 180)
const toDegrees = 57.2958 // (180 / PI)

export const range = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export const degreesToRadians = (degrees: number): number => degrees * toRadians
export const radiansToDegrees = (radians: number): number => radians * toDegrees

// export {
//     range,
//     degreesToRadians,
//     radiansToDegrees
// }