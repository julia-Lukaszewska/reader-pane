import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '@/store/slices/mainUiSlice'
import { LuSun, LuMoon } from 'react-icons/lu'

const Grid = styled.div`
 

  display: grid;
  grid-template-columns: var(--switch-size) var(--switch-size);
  justify-content: center;
  align-items: center;
  background: var(--bg-icon-default);
  border-radius: var(--border-radius-full);
  border: var(--border-02);
  padding: var(--switch-padding);
  cursor: pointer;
  backdrop-filter: blur(6px);
  gap: var(--switch-gap);
  position: relative;
`

const Slot = styled.div`
  width: var(--switch-size);
  height: var(--switch-size);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Thumb = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: var(--border-04);
  background: var(--text-color-03);
  border-radius: var(--border-radius-full);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  z-index: 1;
`

const Icon = styled.div`
  font-size: var(--switch-text);
   color: ${({ $active }) => $active ? 'var(--switch-icon-color-active)' : 'var(--switch-icon-color-unactive)'};
  z-index: 2;
`

const Switch = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  const handleClick = () => {
    dispatch(toggleTheme())
  }

  const isLight = theme === 'light'


  return (
    <Grid onClick={handleClick}>
      <Slot>
        <Thumb $active={isLight} />
        <Icon $active={isLight}><LuSun /></Icon>
      </Slot>
      <Slot>
        <Thumb $active={!isLight} />
        <Icon $active={!isLight}><LuMoon /></Icon>
      </Slot>
    </Grid>
  )
}

export default Switch
