/**
 * @file PageNotFoundView.jsx
 * @description Simple 404 view showing a "Page Not Found" message.
 */

//-----------------------------------------------------
//------ PageNotFoundView Component
//-----------------------------------------------------

import React from 'react'

/**
 * @function PageNotFoundView
 * @description Fallback view displayed for unknown routes (404).
 *
 * @returns {JSX.Element}
 */
const PageNotFoundView = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  )
}

export default PageNotFoundView
