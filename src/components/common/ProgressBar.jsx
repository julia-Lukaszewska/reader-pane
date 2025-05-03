// src/components/common/ProgressBar.jsx

import styled from 'styled-components' // styled-components 

// -----------------------------------------------------------------------------
//------ STYLES 
// -----------------------------------------------------------------------------
const ProgressBar = styled.div`
  width: 100%; 
  max-width: 120px; 
  height: 6px;  
  background: var(
    --progress-bg,
    rgba(0, 0, 0, 0.1)
  );  
  border-radius: 3px; 
  overflow: hidden; 
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);  
`

const ProgressFill = styled.div`
  width: ${({ percent }) =>
    percent}%;
  height: 100%;  
  background: var(
    --progress-fill,
    #4caf50
  ); 
  transition: width 0.3s ease; 
`

export { ProgressBar, ProgressFill }
