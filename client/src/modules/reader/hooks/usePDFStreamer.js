import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectAccessToken, selectFileUrl } from '@/store/selectors'

import * as pdfjsLib from 'pdfjs-dist'
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
