import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@/components'

import { setViewMode, toggleTheme } from '@/store'
import { LuSun, LuMoon } from 'react-icons/lu'
import { RxReader } from 'react-icons/rx'
import { CgEreader } from 'react-icons/cg'

//-----------------------------------------------------------------------------
//------ SwitchContent: layout for icons inside switch 
//-----------------------------------------------------------------------------

const SwitchContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 0.8rem;
  font-size: 1.4rem;
  color: var(--color-brand-100);
  z-index: 2;
`

//-----------------------------------------------------------------------------
//------ Thumb: animated indicator inside switch 
//-----------------------------------------------------------------------------

const Thumb = styled.div`
  position: absolute;
  top: 0.3rem;
  left: ${({ $position }) => $position};
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 0.6rem rgba(255, 255, 255, 0.4);
  transition: all 0.35s ease;
  z-index: 1;
`

//-----------------------------------------------------------------------------
//------ Switch component: theme/view toggle button 
//-----------------------------------------------------------------------------

const Switch = ({ variant = 'theme' }) => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)
  const viewMode = useSelector((state) => state.reader.viewMode)

  const isTheme = variant === 'theme' // Is theme switch? 
  const isReader = variant === 'reader' // Is reader mode switch? 

  const handleClick = () => {
    if (isTheme) {
      dispatch(toggleTheme())
    } else if (isReader) {
      dispatch(setViewMode(viewMode === 'single' ? 'double' : 'single'))
    }
  }

  const icons = isTheme
    ? [<LuSun key="sun" />, <LuMoon key="moon" />]
    : [
        viewMode === 'single' ? (
          <RxReader key="single" />
        ) : (
          <CgEreader key="double" />
        ),
      ]

  const thumbPosition = isTheme
    ? theme === 'light'
      ? '0.3rem'
      : 'calc(100% - 3.3rem)'
    : viewMode === 'single'
      ? '0.3rem'
      : 'calc(100% - 3.3rem)'

  const thumbColor = isTheme
    ? theme === 'light'
      ? '#ffffffcc'
      : '#aad0ff'
    : viewMode === 'single'
      ? '#ffffffcc'
      : '#aad0ff'

  return (
    <Button
      $variant={`${variant}_switch_btn`}
      onClick={handleClick}
      ariaLabel={`Switch ${variant}`}
    >
      <Thumb $position={thumbPosition} $color={thumbColor} />
      <SwitchContent>{icons}</SwitchContent>
    </Button>
  )
}

export default Switch
