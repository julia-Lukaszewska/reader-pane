/**
 * @file useBackendReady.js
 * @description React hook that checks if the backend is ready to serve requests.
 * Skips the check entirely on development branch. In other environments,
 * it polls the `/health` endpoint every 2 seconds until the backend responds with `{ status: 'ok' }`.
 */

import { useState, useEffect } from 'react'

/**
 * Custom hook that monitors backend readiness by polling the `/health` endpoint.
 * - If on `dev` branch, backend is assumed to be always ready (no polling).
 * - Otherwise, polling continues every 2s until backend reports `{ status: 'ok' }`.
 *
 * @returns {boolean} `true` if backend is ready, `false` otherwise
 */
export default function useBackendReady() {
  const branch = import.meta.env.BRANCH

  // In dev branch, we assume backend is already available
  const [ready, setReady] = useState(branch === 'dev')

  useEffect(() => {
    // Skip polling entirely in development
    if (branch === 'dev') return

    let id

    // Async polling function
    const check = async () => {
      try {
        // Normalize base URL (remove trailing /api if present)
        const base = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '')
        const res = await fetch(`${base}/health`)

        // Try to parse JSON (fallback to empty object)
        const json = await res.json().catch(() => ({}))

        // If backend responds with ok status, mark as ready
        if (res.ok && json.status === 'ok') {
          setReady(true)
          return
        }
      } catch {
        // Ignore errors and continue polling
      }

      // Retry after 2 seconds
      id = setTimeout(check, 2000)
    }

    check()

    // Cleanup timeout on unmount or branch change
    return () => clearTimeout(id)
  }, [branch])

  return ready
}
