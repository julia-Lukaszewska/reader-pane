// -----------------------------------------------------------------------------
//------ GlobalStyles.js: Global styles with CSS variables and theming
 
// -----------------------------------------------------------------------------

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
    --color-light-0:   #ffffff;   // Pure white background  
    --color-light-100: #f7faff;   // App main background  
    --color-light-200: #eaf3fb;   // Card or section background  
    --color-dark-900:  #0b1626;   // Main text color  

    // Accent blue shades
    --color-blue-100:  #dceaf8;   // Very light accent  
    --color-blue-200:  #b9d3ee;   // Light blue  
    --color-blue-300:  #8ab5dc;   // Medium light blue  
    --color-blue-400:  #609bd0;   // Medium blue  
    --color-blue-500:  #3f83c5;   // Primary button blue  
    --color-blue-600:  #2c6aad;   // Darker blue  
    --color-blue-700:  #1f518a;   // Icons and headers  

    // Glassmorphism effect
    --glass-bg: var(--gradient-blue-glass);                // Transparent glass background  
    --glass-blur: blur(8px);                               // Glass blur effect  
    --glass-shadow: 0 0.8rem 2rem rgba(60, 100, 180, 0.2);      // Glass shadow  
    --glass-text-shadow: -1px 1px 2px rgba(60, 100, 180, 0.3);   // Text shadow  
    --shadow-lg: 0 2.4rem 3.2rem rgba(100, 150, 200, 0.15);

    // Icon and button styles
    --color-icon-default: var(--color-blue-700);            // Default icon color  
    --bg-icon-default: rgba(255, 255, 255, 0.05);           // Default button bg  
    --bg-icon-hover: rgba(255, 255, 255, 0.1);              // Hover bg  
    --shadow-icon: 0 0 0.8rem rgba(60, 100, 180, 0.25);     // Button shadow  
    --shadow-icon-hover: 0 0 1.5rem rgba(60, 100, 180, 0.35);  

    // Gradients
    --gradient-blue-light: linear-gradient(to bottom right, #e3f2fd, #bbdefb, #90caf9);  
    --gradient-blue-clear: linear-gradient(to top left, #f5fbff, #e0f0ff, #cde5ff);  
    --gradient-blue-glass: linear-gradient(to bottom right, rgba(240,248,255,0.6), rgba(224,240,255,0.4));  
    --gradient-blue-dark: linear-gradient(to bottom right, #1f518a, #0d1f3a, #1b0039);  

    // Utility variables
    --backdrop-color: rgba(255,255,255,0.1);  // Backdrop blur color  
    --shadow-lg: 0 2.4rem 3.2rem rgba(0,0,0,0.12);  
    --border-radius: 7px;  
  }

  // ---------------------------------------------------------------------------
//------ Color variables – dark theme  
// ---------------------------------------------------------------------------

[data-theme="dark"] {
  // Base background and text colors
  --color-light-0:   #0b1626;   // Darkest background  
  --color-light-100: #101d33;   // App main background  
  --color-light-200: #182743;   // Card or section background  
  --color-dark-900:  #ffffff;   // Main text color  

  // Accent blue shades
  --color-blue-100:  #2e3d56;   // Very light accent  
  --color-blue-200:  #3a5272;   // Light blue  
  --color-blue-300:  #4f6990;   // Medium light blue  
  --color-blue-400:  #6783b0;   // Medium blue  
  --color-blue-500:  #7fa1d2;   // Primary button blue  
  --color-blue-600:  #a1c2f3;   // Darker blue  
  --color-blue-700:  #cbe2ff;   // Icons and headers  

  // Glassmorphism effect
  --glass-bg: linear-gradient(to bottom right, rgba(30,40,60,0.5), rgba(20,30,50,0.4));                // Transparent glass background  
  --glass-blur: blur(10px);                               // Glass blur effect  
  --glass-shadow: 0 1rem 2rem rgba(70, 130, 180, 0.25);       // Glass shadow  
  --glass-text-shadow: -1px 1px 2px rgba(70, 130, 180, 0.4);     // Text shadow  
  --shadow-lg: 0 2.4rem 3.2rem rgba(50, 100, 160, 0.2);

  // Icon and button styles
  --color-icon-default: var(--color-blue-300);            // Default icon color  
  --bg-icon-default: rgba(255, 255, 255, 0.1);           // Default button bg  
  --bg-icon-hover: rgba(255, 255, 255, 0.15);             // Hover bg  
  --shadow-icon: 0 0 0.8rem rgba(190,220,255,0.15);       // Button shadow  
  --shadow-icon-hover: 0 0 1.5rem rgba(190,220,255,0.25); // Cień przy hoverze  

  // Gradients
  --gradient-blue-light: linear-gradient(to bottom right, #2c3e50, #34495e, #5d6d7e); // Darker shades of light blue  
  --gradient-blue-clear: linear-gradient(to top left, #1c2632, #2a3b4c, #344c64); // Transparent gradient for dark mode  
  --gradient-blue-glass: linear-gradient(to bottom right, rgba(30, 60, 100, 0.9), rgba(0, 60, 120, 0.8));  // Glass effect in dark mode  
  --gradient-blue-dark: linear-gradient(to bottom right, #1f518a, #0d1f3a, #1b0039); // Keep the same dark gradient  

  // Utility variables
  --backdrop-color: rgba(0,8,20,0.2);  // Backdrop blur color  
  --shadow-lg: 0 2.4rem 3.2rem rgba(0,0,0,0.12);  
  --border-radius: 7px;  
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
