import { createGlobalStyle } from 'styled-components' // Utility for global styles  

// -----------------------------------------------------------------------------
//------ GlobalStyles component  
// -----------------------------------------------------------------------------

const GlobalStyles = createGlobalStyle`

  // ---------------------------------------------------------------------------
  //------ Color variables – light theme  
  // ---------------------------------------------------------------------------
  :root {
    // Base background and text colors
    --color-light-0:   #ffffff;      // Pure white background  
    --color-light-100: #f7faff;      // App background  
    --color-light-200: #eaf3fb;      // Card or section background  
    --color-dark-900:  #0b1626;      // Main text color  

    // Accent blue shades
    --color-blue-100:  #dceaf8;      // Very light accent  
    --color-blue-200:  #b9d3ee;      // Light blue  
    --color-blue-300:  #8ab5dc;      // Medium light blue  
    --color-blue-400:  #609bd0;      // Medium blue  
    --color-blue-500:  #3f83c5;      // Primary blue for buttons  
    --color-blue-600:  #2c6aad;      // Darker blue  
    --color-blue-700:  #1f518a;      // For icons and headers  

    // Glassmorphism effect
    --glass-bg: var(--gradient-blue-glass);              // Transparent gradient  
    --glass-blur: blur(8px);                             // Blur level  
    --glass-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.15);    // Soft shadow  
    --glass-text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.3); // Subtle text shadow  

    // Icon and button styles
    --color-icon-default: var(--color-blue-700);  
    --bg-icon-default: rgba(255, 255, 255, 0.05);  
    --bg-icon-hover: rgba(255, 255, 255, 0.1);     
    --shadow-icon: 0 0 0.8rem rgba(60, 100, 180, 0.25);  
    --shadow-icon-hover: 0 0 1.5rem rgba(60, 100, 180, 0.35);  

    // Gradients
    --gradient-blue-light: linear-gradient(to bottom right, #e3f2fd, #bbdefb, #90caf9);  
    --gradient-blue-clear: linear-gradient(to top left, #f5fbff, #e0f0ff, #cde5ff);  
    --gradient-blue-glass: linear-gradient(to bottom right, rgba(240, 248, 255, 0.6), rgba(224, 240, 255, 0.4));  
    --gradient-blue-dark: linear-gradient(to bottom right, #1f518a, #0d1f3a, #1b0039);  

    // Utility
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

    --glass-bg: linear-gradient(to bottom right, rgba(30, 40, 60, 0.5), rgba(20, 30, 50, 0.4));  
    --glass-blur: blur(10px);  
    --glass-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);  
    --glass-text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.6);  

    --color-icon-default: var(--color-blue-300);  
    --bg-icon-default: rgba(255, 255, 255, 0.1);  
    --bg-icon-hover: rgba(255, 255, 255, 0.15);  
    --shadow-icon: 0 0 0.8rem rgba(190, 220, 255, 0.15);  
    --shadow-icon-hover: 0 0 1.5rem rgba(190, 220, 255, 0.25);  

    --backdrop-color: rgba(0, 8, 20, 0.2);  
  }

  // ---------------------------------------------------------------------------
  //------ Reset and base styles  
  // ---------------------------------------------------------------------------
  * {
    box-sizing: border-box;  
    margin: 0;
    padding: 0;
    transition: background-color 0.3s, border 0.3s, color 0.3s;  
  }

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
  //------ Typography elements  
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
  //------ Images  
  // ---------------------------------------------------------------------------
  img {
    max-width: 100%;
    display: block;
  }
`

// ---------------------------------------------------------------------------
//------ Export GlobalStyles  
// ---------------------------------------------------------------------------
export default GlobalStyles
