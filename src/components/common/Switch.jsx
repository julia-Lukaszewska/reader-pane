/**
 * @file Switch.jsx
 * @description Toggle switch component used for switching app theme or reader view mode.
 * Supports 'theme' and 'reader' variants. Uses visual thumb indicator and icons.
 */

import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@/components'
import { toggleTheme } from '@/store/slices/mainUiSlice'
import { setPageViewMode } from '@/store/slices/readerSlice'
import { LuSun, LuMoon } from 'react-icons/lu'
import { RxReader } from 'react-icons/rx'
import { CgEreader } from 'react-icons/cg'

// -----------------------------------------------------------------------------
// Styled components
// -----------------------------------------------------------------------------

const SwitchContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.8rem;
  font-size: 1.4rem;
  color: var(--color-brand-100);
  position: relative;
  z-index: 2;
`

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

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Switch component for toggling app theme or reader view mode.
 *
 * @param {Object} props
 * @param {'theme'|'reader'} props.variant - Switch mode variant
 * @returns {JSX.Element}
 */
const Switch = ({ variant = 'theme' }) => {
  const dispatch = useDispatch()

  const theme = useSelector((state) => state.ui.theme)
  const pageViewMode = useSelector((state) => state.reader.pageViewMode)

  const isTheme = variant === 'theme'
  const isReader = variant === 'reader'

  const handleClick = () => {
    if (isTheme) {
      dispatch(toggleTheme())
    } else if (isReader) {
      const newMode = pageViewMode === 'single' ? 'double' : 'single'
      dispatch(setPageViewMode(newMode))
    }
  }

  const icons = isTheme
    ? [<LuSun key="sun" />, <LuMoon key="moon" />]
    : [
        pageViewMode === 'single'
          ? <RxReader key="single" />
          : <CgEreader key="double" />,
      ]

  const position = isTheme
    ? theme === 'light'
      ? '0.3rem'
      : 'calc(100% - 3.3rem)'
    : pageViewMode === 'single'
    ? '0.3rem'
    : 'calc(100% - 3.3rem)'

  const color = isTheme
    ? theme === 'light'
      ? '#ffffffcc'
      : '#aad0ff'
    : pageViewMode === 'single'
    ? '#ffffffcc'
    : '#aad0ff'

  return (
    <Button
      $variant={`${variant}_switch_btn`}
      onClick={handleClick}
      aria-label={`Switch ${isTheme ? 'theme' : 'view mode'}`}
    >
      <Thumb $position={position} $color={color} />
      <SwitchContent>{icons}</SwitchContent>
    </Button>
  )
}

export default Switch
