/**
 * @file usePDFStreamer.js
 * @description
 * Hook for loading a remote PDF document using PDF.js with token-based authentication.
 * Stores the loaded PDF in a ref, handles aborting and error state.
 */

import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectAccessToken, selectFileUrl } from '@/store/selectors'
import * as pdfjsLib from 'pdfjs-dist'

//-----------------------------------------------------------------------------
// Hook: usePDFStreamer
//-----------------------------------------------------------------------------

/**
 * Loads a PDF via PDF.js and stores it in the provided ref.
 * Automatically handles aborting and loading state.
 *
 * @param {Object} params
 * @param {React.MutableRefObject} params.pdfRef – Ref that will receive the loaded PDF object
 * @param {Function} [params.onLoaded] – Optional callback triggered once the PDF is loaded
 * @returns {{ loading: boolean, error: Error|null }}
 */
export default function usePDFStreamer({ onLoaded, pdfRef }) {
  const fileUrl = useSelector(selectFileUrl)
  const token = useSelector(selectAccessToken)
  const tokenRef = useRef(token)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect for', fileUrl)

    if (!fileUrl || pdfRef.current) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const loadingTask = pdfjsLib.getDocument({
      url: fileUrl,
      withCredentials: false,
      httpHeaders: {
        Authorization: `Bearer ${tokenRef.current}`,
      },
      signal: controller.signal,
    })

    loadingTask.promise
      .then((pdf) => {
        pdfRef.current = pdf
        onLoaded?.(pdf)
        setLoading(false)
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return
        setError(err)
        setLoading(false)
      })

    return () => {
      controller.abort()
      loadingTask.destroy?.()
      pdfRef.current = null
    }
  }, [fileUrl])

  return { loading, error }
}