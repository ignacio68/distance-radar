import { Circle } from '../../types'
const normalizeArg = (arg: number): number => Math.abs(Math.round(arg))

export const normalizeArgs = async (args: Circle): Promise<Circle> => {
  const normalizedRadius = normalizeArg(args.radius)
  const normalizedNumberOfEdges = normalizeArg(args.numberOfEdges)
  const normalizedArgs = { ...args, normalizedRadius, normalizedNumberOfEdges }
  return normalizedArgs
}
