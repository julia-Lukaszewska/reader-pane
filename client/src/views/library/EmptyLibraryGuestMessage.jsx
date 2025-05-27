/**
 * @file EmptyLibraryGuestMessage.jsx
 * @description Component that displays a message when the user's library is empty
 * and they are not logged in. Encourages the user to log in to access features.
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'

//-----------------------------------------------------------------------------
// Component: EmptyLibraryGuestMessage
//-----------------------------------------------------------------------------

const EmptyLibraryGuestMessage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Your library is empty.</p>
      <p>Please log in to add and read books.</p>
      <button onClick={() => navigate('/login')}>Log in</button>
    </div>
  )
}

export default EmptyLibraryGuestMessage
