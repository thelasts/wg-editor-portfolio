const pendingImages = new Map<string, Promise<void>>()

export function preloadImage(src: string, priority: 'high' | 'low' = 'low') {
  const existing = pendingImages.get(src)
  if (existing) return existing

  const pending = new Promise<void>((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.fetchPriority = priority
    image.onload = () => {
      void image
        .decode()
        .catch(() => undefined)
        .then(() => resolve())
    }
    image.onerror = () => reject(new Error(`Unable to preload image: ${src}`))
    image.src = src
  })

  pendingImages.set(src, pending)
  void pending.catch(() => pendingImages.delete(src))
  return pending
}
