// Typescript with typed correctly from Matt Kane
//  https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i

// export const pipeTS = <T extends unknown[], R>(
//   fn1: (...args: T) => R,
//   ...fns: Array<(a: R) => R>
// ): unknown => {
//   const piped = fns.reduce(
//     (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
//     (value) => value
//   )

//   return (...args: T) => piped(fn1(...args))
// }

export const pipeJS = (...fns) => (x) => fns.reduce((y, f) => f(y), x)

export const composeJS = (...fns) => (x) => fns.reduceRight((y, fn) => fn(y), x)
