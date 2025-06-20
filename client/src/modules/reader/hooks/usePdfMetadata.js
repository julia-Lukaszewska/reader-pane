import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '@/store/selectors'

/**
 * Fetches PDF page metadata from the backend.
 * Returns null until loaded.
 *
 * @param {string} bookId - ID of the book (unused but keeps API parity)
 * @param {string} filename - PDF filename stored in GridFS
 */
export default function usePdfMetadata(bookId, filename) {
  const [data, setData] = useState(null)
  const token = useSelector(selectAccessToken)

  useEffect(() => {
    if (!filename) return

    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/books/storage/${filename}/meta`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            signal: controller.signal,
          }
        )
        if (!res.ok) throw new Error('Failed to fetch PDF metadata')
        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err)
      }
    }

    load()
    return () => controller.abort()
  }, [filename, token])

  return data
}

