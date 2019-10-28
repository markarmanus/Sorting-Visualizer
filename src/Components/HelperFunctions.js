export function generateArray(length) {
  return Array.from({ length: length }, () =>
    Math.max(Math.random() * 100, 0.1)
  )
}

export async function waitFor(time) {
  await new Promise(resolve => setTimeout(resolve, time))
}
