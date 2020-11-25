/**
 * It's based in an idea from Gabriel Zimmermann
 *
 * https://github.com/gabzim/circle-to-polygon/tree/master/input-validation
 */
import { Circle } from '@/types/types'

import { validateCenter } from './validateCenter'
import { validateRadius } from './validateRadius'
import { validateNumberOfEdges } from './validateNumberOfEdges'

export const validateArgs = async (args: Circle): Promise<void> => {
  validateCenter(args.center)
  validateRadius(args.radius)
  validateNumberOfEdges(args.numberOfEdges)
}
