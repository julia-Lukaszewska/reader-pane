// BitmapCache.js – LRU = maks 200 bitmap
const _cache = new Map()
const MAX = 200

export const BitmapCache = {
  put(id, bmp) {
    if (_cache.size >= MAX) _cache.delete(_cache.keys().next().value) // FIFO
    _cache.set(id, bmp)
  },
  get:  id => _cache.get(id),
  has:  id => _cache.has(id),
  del:  id => _cache.delete(id),
}
