/**
 * @file useBackendReady.js
 * @description React hook that polls the backend health check endpoint
 *              and returns a boolean indicating whether the backend is ready.
 */

import { useState, useEffect } from 'react'

/**
 * Custom hook that continuously checks the backend `/health` endpoint
 * until it responds with `{ status: 'ok' }`.
 * Polling occurs every 2 seconds until the backend is available.
 *
 * @returns {boolean} `true` if backend is ready, `false` otherwise
 */
export default function useBackendReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let id

    // Async function to poll the backend
    const check = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/health`)
        // Attempt to parse JSON response (fallback to empty object on failure)
        const json = await res.json().catch(() => ({}))

        // Check if backend responded OK and status is explicitly "ok"
        if (res.ok && json.status === 'ok') {
          setReady(true)
          return
        }
      } catch {
        // ignore fetch errors and continue polling
      }

      // Retry after 2 seconds if backend is not ready
      id = setTimeout(check, 2000)
    }

    check()

    // Cleanup on unmount to avoid memory leaks
    return () => clearTimeout(id)
  }, [])

  return ready
}
