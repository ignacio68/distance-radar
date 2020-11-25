export const validateRadius = (radius: number): void => {
  if (radius <= 0) {
    throw new Error('VALIDATION ERROR: Radius can only have positive values')
  }
}
