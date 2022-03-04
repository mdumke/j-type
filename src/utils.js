export const pairwise = arr => {
  const pairs = []

  for (let i = 0; i < arr.length; i += 2) {
    pairs.push(arr.slice(i, i + 2))
  }

  return pairs
}
