import { createGlobalStyle } from 'styled-components' // Utility for global styles  

// -----------------------------------------------------------------------------
//------ GlobalStyles component  
// -----------------------------------------------------------------------------

const GlobalStyles = createGlobalStyle`

  // ---------------------------------------------------------------------------
  //------ Color variables – light theme  
  // ---------------------------------------------------------------------------
  :root {
    --color-light-0:   #ffffff;    
    --color-light-100: #f7faff;    
    --color-light-200: #eaf3fb;    
    --color-dark-900:  #0b1626;    

    --color-blue-100:  #dceaf8;    
    --color-blue-200:  #b9d3ee;    
    --color-blue-300:  #8ab5dc;    
    --color-blue-400:  #609bd0;    
    --color-blue-500:  #3f83c5;    
    --color-blue-600:  #2c6aad;    
    --color-blue-700:  #1f518a;    

    // -------------------------------------------------------------------------
    //------- Gradient variables  
    // -------------------------------------------------------------------------
    --gradient-blue-light: linear-gradient(to bottom right, #e3f2fd, #bbdefb, #90caf9);  
    --gradient-blue-clear: linear-gradient(to top left, #f5fbff, #e0f0ff, #cde5ff);  
    --gradient-blue-glass: linear-gradient(to bottom right, rgba(240, 248, 255, 0.6), rgba(224, 240, 255, 0.4));  
    --gradient-blue-dark: linear-gradient(to bottom right, #1f518a, #0d1f3a, #1b0039);  

    // -------------------------------------------------------------------------
    //------ Global utility variables  
    // -------------------------------------------------------------------------
    --backdrop-color: rgba(255, 255, 255, 0.1);  
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);  
    --border-radius: 7px;  
  }

  // ---------------------------------------------------------------------------
  //------ Color variables – dark theme  
  // ---------------------------------------------------------------------------
  [data-theme="dark"] {
    --color-light-0:   #0b1626;    
    --color-light-100: #101d33;    
    --color-light-200: #182743;    
    --color-dark-900:  #ffffff;    

    --color-blue-100:  #2e3d56;    
    --color-blue-200:  #3a5272;    
    --color-blue-300:  #4f6990;    
    --color-blue-400:  #6783b0;    
    --color-blue-500:  #7fa1d2;    
    --color-blue-600:  #a1c2f3;    
    --color-blue-700:  #cbe2ff;    

    --backdrop-color: rgba(0, 8, 20, 0.2);  
  }

  // ---------------------------------------------------------------------------
  //------- Reset and base styles  
  // ---------------------------------------------------------------------------
  * {
    box-sizing: border-box;  
    margin: 0;
    padding: 0;
    transition: background-color 0.3s, border 0.3s, color 0.3s;  
  }

  // ---------------------------------------------------------------------------
  //------ HTML and body base setup  
  // ---------------------------------------------------------------------------
  html {
    font-size: 62.5%;  
  }

  body {
    font-family: "Poppins", sans-serif;  
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: var(--color-light-100);  
    color: var(--color-blue-700);  
    min-height: 100vh;
  }

  // ---------------------------------------------------------------------------
  //------ Form elements  
  // ---------------------------------------------------------------------------

  input,
  button,
  textarea,
  select {
    font: inherit;   
    color: inherit;   
    background: none;  
    border: none;   
    outline: none;  
  }

  button {
    cursor: pointer;   
    font-family: 'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', sans-serif;  
  }

  *:disabled {
    cursor: not-allowed;  
  }


  // ---------------------------------------------------------------------------
  //------ Links and lists  
  // ---------------------------------------------------------------------------
  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  // ---------------------------------------------------------------------------
  //--- Typography elements  
  // ---------------------------------------------------------------------------
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  // ---------------------------------------------------------------------------
  //--- Images  
  // ---------------------------------------------------------------------------
  img {
    max-width: 100%;
  }
`
export default GlobalStyles
