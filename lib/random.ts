// r(n) -> [0, n]
// r(n, m) -> [n, m]
export const randomInteger = (n: number, m?: number) => {
  const min = Math.ceil(n)
  if (!m) {
    return Math.floor(Math.random() * min) + 1
  }
  const max = Math.floor(m)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
