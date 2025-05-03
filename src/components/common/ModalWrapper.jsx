

import styled from 'styled-components'
//-----------------------------------------------------------------------------
//------ STYLES 
//-----------------------------------------------------------------------------
const Overlay = styled.div`
  position: fixed; /* cover entire viewport */ 
  top: 0;
  left: 0; 
  width: 100vw;
  height: 100vh; /* full width & height */ 
  background: rgba(
    0,
    0,
    0,
    0.4
  ); /* semi-transparent backdrop */ 
  display: flex; /* center content */ 
  align-items: center; /* vertical center */ 
  justify-content: center; /* horizontal center */ 
  z-index: 999; /* above all */ 
  backdrop-filter: blur(4px); /* blur behind */ 
` // Modal overlay 

const ModalBox = styled.div`
  background: var(--modal-bg, #fff); /* modal background */ 
  border-radius: var(
    --border-radius,
    8px
  ); /* rounded corners */ 
  padding: 1.5rem; /* inner padding */ 
  max-width: 90%; /* responsive width */ 
  max-height: 85vh; /* responsive height */ 
  overflow-y: auto; /* vertical scroll */ 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* outer shadow */ 
` // Modal content container 

export { Overlay, ModalBox } 
