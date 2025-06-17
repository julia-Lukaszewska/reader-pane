/**
 * @file ReaderSessionController.jsx
 * @description
 * Manages reader session:
 * - Resolves bookId from route or last opened
 * - Ensures starting page is loaded
 * - Sets up PDF streaming manager
 */
import React from 'react'
import { useParams } from 'react-router-dom'
//-----------------------------------------------------
//------ Reader Hooks
//-----------------------------------------------------
import useLastOpenedBook        from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage          from '@/modules/reader/hooks/useStartingPage'
import useStreamingPdfManager   from '@/modules/reader/hooks/useStreamingPdfManager'
//-----------------------------------------------------
//------ ReaderSessionController Component
//-----------------------------------------------------
/**
 * @component ReaderSessionController
 * @description Wraps reader children with PDF streaming context once ready.
 * @param {object} props
 * @param {React.ReactNode|function} props.children
 * @returns {null|React.ReactNode}
 */
export default function ReaderSessionController({ children }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)
  const ready = useStartingPage(resolvedBookId)
  const { visiblePages, pdfRef } = useStreamingPdfManager({
    bookId: resolvedBookId,
  })

  if (!ready) return null

  return children({ pdfRef, visiblePages })
}
