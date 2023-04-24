// r(n) -> [0, n]
// r(n, m) -> [n, m]
// r(x, x) -> x
export const randomInteger = (n: number, m?: number) => {
  if (n === m) {
    return n
  }

  const min = Math.ceil(n)
  if (!m) {
    return Math.floor(Math.random() * min) + 1
  }
  const max = Math.floor(m)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
