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
 *
 * Public API:
 * - put(id, bitmap): Adds or updates a bitmap in the cache
 * - get(id): Returns the bitmap for a given ID
 * - has(id): Checks if a bitmap exists
 * - del(id): Deletes and closes a single bitmap
 * - clear(): Empties the entire cache and releases memory
 */

//-----------------------------------------------------------------------------
// Internal state
//-----------------------------------------------------------------------------
const _map = new Map()
const MAX = 200

//-----------------------------------------------------------------------------
// Cache API
//-----------------------------------------------------------------------------
export const BitmapCache = {
  /**
   * Inserts a bitmap or refreshes its position in the LRU map.
   *
   * @param {string} id - Unique identifier for the bitmap
   * @param {ImageBitmap} bmp - The bitmap object to cache
   */
  put(id, bmp) {
    if (_map.has(id)) _map.delete(id) // Move to end
    else if (_map.size >= MAX)        // Evict least recently used
      _map.delete(_map.keys().next().value)

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
    if (bmp && bmp.close) bmp.close()
    return _map.delete(id)
  },

  /**
   * Clears the entire cache and closes all stored bitmaps.
   */
  clear() {
    _map.forEach(bmp => bmp.close?.())
    _map.clear()
  },
}
