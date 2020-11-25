export const validateNumberOfEdges = (numberOfEdges: number): void => {
  if (numberOfEdges < 3)
    throw new Error('VALIDATION ERROR: The minimal number of vertices in a polygon is 3')
}
