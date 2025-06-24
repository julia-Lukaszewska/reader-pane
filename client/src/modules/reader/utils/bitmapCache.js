/**
 * @file src/utils/BitmapCache.js
 * @module BitmapCache
 * @description
 * In-memory cache for storing ImageBitmap objects used for rendering PDF pages.
 *
 * Features:
 * - Uses a simple LRU-like eviction strategy with a fixed maximum size
 * - Automatically removes the oldest entry when the limit is reached
 * - Frees resources by calling `ImageBitmap.close()` if available
 * - Allows manual garbage collection and introspection
 *
 * Public API:
 * - put(id, bitmap): Adds or updates a bitmap in the cache
 * - get(id): Returns the bitmap for a given ID
 * - has(id): Checks if a bitmap exists
 * - del(id): Deletes and closes a single bitmap
 * - clear(): Empties the entire cache and releases memory
 * - gc(count): Removes oldest entries manually (e.g., on scroll/unload)
 * - stats(): Returns internal state for debugging
 */

//-----------------------------------------------------------------------------
// Internal state
//-----------------------------------------------------------------------------
let _map = new Map()
let _max = 200

//-----------------------------------------------------------------------------
// Cache API
//-----------------------------------------------------------------------------
export const BitmapCache = {
  /**
   * Inserts a bitmap or refreshes its position in the LRU map.
   * Evicts the least recently used entry if cache is full.
   *
   * @param {string} id - Unique identifier for the bitmap
   * @param {ImageBitmap} bmp - The bitmap object to cache
   */
  put(id, bmp) {
    if (_map.has(id)) {
      _map.delete(id) // Move to end
    } else if (_map.size >= _max) {
      const evictedKey = _map.keys().next().value
      const evictedBmp = _map.get(evictedKey)
      if (evictedBmp?.close) evictedBmp.close()
      _map.delete(evictedKey)
    }

    _map.set(id, bmp)
    console.debug('[BitmapCache] put', id)
  },

  /**
   * Retrieves a cached bitmap by its ID.
   *
   * @param {string} id
   * @returns {ImageBitmap | undefined}
   */
  get: id => _map.get(id),

  /**
   * Checks whether the cache contains the given ID.
   *
   * @param {string} id
   * @returns {boolean}
   */
  has: id => _map.has(id),

  /**
   * Deletes a bitmap from the cache and releases its memory if possible.
   *
   * @param {string} id
   * @returns {boolean} Whether the deletion was successful
   */
  del(id) {
    const bmp = _map.get(id)
    if (bmp?.close) bmp.close()
    return _map.delete(id)
  },

  /**
   * Clears the entire cache and closes all stored bitmaps.
   */
  clear() {
    _map.forEach(bmp => bmp?.close?.())
    _map.clear()
  },

  /**
   * Manually evicts a number of oldest entries from the cache.
   * Useful for manual GC on scroll/unmount.
   *
   * @param {number} count
   */
  gc(count = 50) {
    for (let i = 0; i < count && _map.size > 0; i++) {
      const key = _map.keys().next().value
      const bmp = _map.get(key)
      if (bmp?.close) bmp.close()
      _map.delete(key)
    }
  },

  /**
   * Returns internal state for debug purposes.
   *
   * @returns {{ size: number, keys: string[] }}
   */
  stats() {
    return {
      size: _map.size,
      keys: [..._map.keys()],
    }
  },

  /**
   * Updates the cache limit (e.g., based on device memory).
   *
   * @param {number} newLimit
   */
  setMax(newLimit) {
    _max = newLimit
  },
}
