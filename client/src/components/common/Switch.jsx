import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '@/store/slices/mainUiSlice'
import { LuSun, LuMoon } from 'react-icons/lu'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
justify-content: space-between;
  width: 6em;
  
  background: var(--bg-icon-default);
  border-radius: var(--border-radius-full);
  border: var(--border-02);
  padding: var(--padding-04);
  cursor: pointer;
 
  backdrop-filter: blur(6px);
`

const Icon = styled.div`
  z-index: 2;
  font-size: var(--text-02);
  color: ${({ $color }) => $color};
  z-index: var(--index-modal)
`

const Thumb = styled.div`
  position: absolute;

  left: ${({ $position }) => $position};
  width: 3.4rem;
  height: 3.4rem;
  border: var(--border-02);
  background:var(--text-color-03);
  border-radius: var(--border-radius-full);
  transition: left 0.3s ease, background 0.3s ease;

  z-index: var(--index-header);
`

const Switch = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  const handleClick = () => {
    dispatch(toggleTheme())
  }

  const position = theme === 'light' ? ' .3em ' : 'calc(100% - 3.7rem)'
const sunColor = theme === 'light' ? 'rgb(var(--color-500-02) / 1)' : 'rgb(var(--color-500-02) / .3)'
const moonColor = theme === 'light' ? 'rgb(var(--color-500-02) / .3)' : 'rgb(var(--color-500-02) / 1)'


  return (
    <Wrapper onClick={handleClick}>
     <Icon $color={sunColor}><LuSun /></Icon>
      <Thumb $position={position}  />
      <Icon $color={moonColor}><LuMoon /></Icon>
    </Wrapper>
  )
}

export default Switch
