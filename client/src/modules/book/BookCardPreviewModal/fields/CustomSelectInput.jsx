/**
 * @file CustomSelectInput.jsx
 * @description Custom styled wrapper for react-select dropdown.
 */

import Select from 'react-select'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled container
//-----------------------------------------------------------------------------
const SelectContainer = styled.div`
  width: 100%;
  min-width: 0;
  font-size: inherit;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`

//-----------------------------------------------------------------------------
// Component: CustomSelectInput
//-----------------------------------------------------------------------------
/**
 * @component CustomSelectInput
 * @param {string} name - Field name
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 * @param {string[]} options - List of selectable options
 */
const CustomSelectInput = ({ name, value, onChange, options = [] }) => {
  const selectOptions = options.map((opt) => ({
    value: opt,
    label: opt[0].toUpperCase() + opt.slice(1),
  }))

  const selectedOption =
    selectOptions.find((opt) => opt.value === value) || null

  return (
    <SelectContainer>
      <Select
        name={name}
        options={selectOptions}
        value={selectedOption}
        onChange={(selected) =>
          onChange({
            target: {
              name,
              value: selected ? selected.value : '',
            },
          })
        }
        isClearable
        placeholder="Select..."
        styles={{
          control: (base, state) => ({
            ...base,
            fontSize: 'inherit',
            background: 'rgba(255,255,255,0.14)',
            color: 'var(--text-color-01)',
            border: state.isFocused
              ? '1.5px solid var(--color-blue-400)'
              : '1.5px solid var(--color-blue-500)',
            boxShadow: state.isFocused
              ? '0 0 0 2px var(--see-02), 0 2px 12px 0 rgba(60,170,255,0.09)'
              : '0 1px 8px 0 rgba(80,140,230,0.08)',
            minHeight: 0,
            alignItems: 'center',
          }),
          valueContainer: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            overflow: 'hidden',
          }),
          indicatorsContainer: (base) => ({
            ...base,
            alignItems: 'center',
          }),
          clearIndicator: (base) => ({
            ...base,
            fontSize: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#7fb0f8',
            paddingRight: '0.5em',
            '> svg': {
              width: '1.3em',
              height: '1.3em',
              display: 'block',
            },
            ':hover': { color: '#fff' },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            fontSize: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a7ceff',
            paddingRight: '0.3em',
            '> svg': {
              width: '1.3em',
              height: '1.3em',
              display: 'block',
            },
            ':hover': { color: '#fff' },
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          menu: (base) => ({
            ...base,
            background: 'rgba(30,45,80,0.97)',
            color: '#fff',
            borderRadius: '0.7em',
            fontSize: '1em',
            zIndex: 10,
          }),
          option: (base, state) => ({
            ...base,
            background: state.isFocused
              ? 'rgba(68,110,240,0.13)'
              : 'transparent',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1em',
          }),
          placeholder: (base) => ({
            ...base,
            alignItems: 'center',
            color: 'var(--color-blue-200, #8cbaff)',
            opacity: 0.8,
          }),
          input: (base) => ({
            ...base,
            color: '#f5f8ff',
            fontSize: 'inherit',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: '.42',
          colors: {
            ...theme.colors,
            primary25: 'rgba(68,110,240,0.13)',
            primary: '#3a6ef0',
            neutral0: 'rgba(255,255,255,0.14)',
            neutral80: '#f5f8ff',
          },
        })}
      />
    </SelectContainer>
  )
}

export default CustomSelectInput
