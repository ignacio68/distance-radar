const TO_RADIANS = 0.017453292519943295 // (PI / 180)
const TO_DEGREES = 57.2958 // (180 / PI)

export const range = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export const toRadians = (degrees: number): number => degrees * TO_RADIANS
export const toDegrees = (radians: number): number => radians * TO_DEGREES
