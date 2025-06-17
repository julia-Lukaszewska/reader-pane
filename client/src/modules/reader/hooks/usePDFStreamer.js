import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectAccessToken, selectFileUrl } from '@/store/selectors'
import * as pdfjsLib from 'pdfjs-dist'

//-----------------------------------------------------
//------ usePDFStreamer Hook
//-----------------------------------------------------

/**
 * @function usePDFStreamer
 * @description
 * Loads a PDF document from a secure URL using pdf.js.
 * - Requires access token from Redux
 * - Uses `pdfRef` to store the loaded PDF document
 * - Calls `onLoaded` once the document is ready
 *
 * @param {Object} params
 * @param {Function} params.onLoaded - Callback after successful load
 * @param {React.MutableRefObject} params.pdfRef - Ref to hold the PDF document
 * @returns {{
 *   loading: boolean,
 *   error: any
 * }}
 */
export default function usePDFStreamer({ onLoaded, pdfRef }) {
  const fileUrl = useSelector(selectFileUrl)
  const token = useSelector(selectAccessToken)
  const tokenRef = useRef(token)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  //-----------------------------------------------------
  //------ Effect: Load PDF Document
  //-----------------------------------------------------
  useEffect(() => {
    console.log('effect for', fileUrl)

    if (!fileUrl || pdfRef.current) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const loadingTask = pdfjsLib.getDocument({
      url: fileUrl,
      withCredentials: false,
      httpHeaders: { Authorization: `Bearer ${tokenRef.current}` },
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
