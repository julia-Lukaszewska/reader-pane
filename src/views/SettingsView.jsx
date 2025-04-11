import styled from 'styled-components'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: var(--gradient-blue-clear);

  box-shadow: var(--shadow-lg);
`

const Title = styled.h2`
  color: var(--color-dark-900);
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: var(--glass-text-shadow);
`

const SettingItem = styled.div`
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);

  padding: 1rem 2rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 500px;
  color: var(--color-dark-900);
  box-shadow: var(--glass-shadow);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`

// -----------------------------------------------------------------------------
//------ SettingsView Component   
// -----------------------------------------------------------------------------

const SettingsView = () => {
  return (
    <SettingsContainer>
      <Title>Settings</Title>
      <SettingItem> Light / Dark Mode</SettingItem>
      <SettingItem> Application Language</SettingItem>
      <SettingItem> Privacy & Security</SettingItem>
      <SettingItem> Data Management</SettingItem>
    </SettingsContainer>
  )
}

export default SettingsView
