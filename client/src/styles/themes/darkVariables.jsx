import { css } from 'styled-components'
import baseVars from './baseVariables'

export default css`
  ${baseVars('dark')};

  --toolbar-button-bg-active: linear-gradient(145deg, #f7fafffb, #092c5ed2);
  --toolbar-button-text-active: #f7faff;
  --toolbar-button-text-danger: #f7faff;
  --color-light-0: #10213e;
  --color-light-100: #111827;
  --color-light-200: #1f2937;
  --color-dark-900: #000001;
  --reader-toolbar-shadow: 0 0 1rem rgb(255, 255, 255);
`