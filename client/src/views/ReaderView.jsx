/**
 * @file src/views/reader/ReaderView.jsx
 * @description
 * Main reader container. Selects layout based on current view mode.
 *
 * Responsibilities:
 * - Chooses the correct layout: SinglePageLayout, DoublePageLayout, or ScrollLayout
 * - Wraps content in <ReaderSessionController> to handle streaming and synchronization
 * - Forwards containerRef to layout and controller for scroll tracking
 *
 * View modes:
 * - 'single'  → SinglePageLayout
 * - 'double'  → DoublePageLayout
 * - 'scroll'  → ScrollLayout (continuous vertical)
 */

import React, { useRef }   from 'react'
import styled              from 'styled-components'
import { useSelector }     from 'react-redux'

import ReaderSessionController from '@/controllers/ReaderSessionController'
import {
  SinglePageLayout,
  DoublePageLayout,
  ScrollLayout,
} from '@reader/layouts'

import { selectPageViewMode } from '@/store/selectors/readerSelectors'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  width: 100%;
  background: var(--bg-default);
`

//-----------------------------------------------------------------------------
// Component: ReaderView
//-----------------------------------------------------------------------------

export default function ReaderView() {
  const containerRef = useRef(null)

  const viewMode = useSelector(selectPageViewMode)

  const Layout = (() => {
    switch (viewMode) {
      case 'double':
        return DoublePageLayout
      case 'scroll':
        return ScrollLayout
      default:
        return SinglePageLayout
    }
  })()

  return (
    <Wrapper >
      <ReaderSessionController containerRef={containerRef}>
        {() => <Layout containerRef={containerRef} />}
      </ReaderSessionController>
    </Wrapper>
  )
}
