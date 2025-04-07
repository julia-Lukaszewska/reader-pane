// -----------------------------------------------------------------------------
//------ MenuTileBtn: Button used inside an active MenuTile  
// -----------------------------------------------------------------------------

import React from 'react'
import { useNavigate } from 'react-router-dom'
import Btn from './Btn' // Import your custom Btn component  

const MenuTileBtn = ({ label, route }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.stopPropagation()
    if (route) navigate(route)
  }

  return (
    <Btn
      $variant="menu_tile_btn" // Stylizacja przycisku za pomocą wariantu "menu_tile_btn"  
      onClick={handleClick} // Funkcja obsługi kliknięcia  
    >
      {label} {/* Wyświetlenie etykiety przycisku   */}
    </Btn>
  )
}

export default MenuTileBtn
