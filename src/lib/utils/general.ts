export const modulo = (n: number, m: number) => ((n % m) + m) % m


export function quickArray(length: number): number[]
export function quickArray<T>(length: number, callback: (index: number) => T): T[]
export function quickArray<T>(
  length: number,
  callback: (index: number) => T | number = (index: number) => index,
) {
  return Array(length)
    .fill(0)
    .map((_, index) => callback(index))
}
