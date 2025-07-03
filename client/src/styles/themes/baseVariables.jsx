import { css } from 'styled-components'
import gradients from './gradients'
import colorPaletteDark from './colorPaletteDark'
import colorPaletteLight from './colorPaletteLight'
import shadows from './shadows'



export default (mode = 'light') => css`


 ${mode === 'dark' ? colorPaletteDark : colorPaletteLight}
${gradients(mode)};
${shadows(mode)};

--manage-toolbar-bg: var(--library-toolbar-gradient-01);
--sidebar-bg: var(--sidebar-bg-gradient);
--home-bg: var(--home-bg-gradient-01);
--library-bg: var(--home-bg-gradient-01);
--library-bg-01: var(--library-bg-gradient-01);
--library-toolbar-bg-01: var(--library-toolbar-gradient-01);
--modal-bg-01: var(--modal-gradient-01);

--button-bg-01: var(--sidebar-bg-gradient);
--button-bg-02: rgb(var(--color-400-05) / 0.8);
//------------------------------------------------------------------
//--------ListItemLibrary
//------------------------------------------------------------------

  --row-width: 83.333vw;
  --row-height: calc(var(--row-width) / 9);
  --row-font-size: calc(var(--row-width) * 0.015);
--text-color-01: rgb(var(--color-500-01) / 1);
--text-color-02: rgb(var(--color-500-02) / 1);
--text-color-03: rgb(var(--color-500-10) / 1);
--text-color-04: rgb(var(--color-500-03) / 1);
--text-primary: rgb(var(--color-500-02) / 1);

//------------------------------------------------------------------
//--------Toolbar styles (glass-metal modern look)
//------------------------------------------------------------------

/* Sizing & spacing */
--toolbar-button-padding: 0.3em 0.9em;
--toolbar-button-gap: 0.5em;

--toolbar-button-font-size: 0.85em;
--toolbar-button-font-weight: 500;
--toolbar-button-border-width: 0.12em;
--toolbar-button-border-radius: 0.4em;
--toolbar-button-blur: blur(0.4em);
--toolbar-select-padding-right: 1.5em;

/* Default state */
--toolbar-button-bg-default: rgb(var(--color-400-05) / 0.7);
--toolbar-button-bg-hover:  rgb(var(--color-400-06) / 0.9);
--toolbar-button-text-color: var(--text-primary);
--toolbar-button-border-color: rgb(var(--color-400-01) / 1);

/* Focus state */
--toolbar-button-focus-border-color: var(--text-primary);


/* Active (selected/clicked) state */
--toolbar-button-bg-active-hover: rgb(var(--color-400-01) / 1);
--toolbar-button-border-active: transparent;

/* Danger (delete/alert) state */
--toolbar-button-bg-danger: linear-gradient(145deg, #8a2e2e, #a33b3b);
--toolbar-button-bg-danger-hover: linear-gradient(145deg, #932e2e, #b64545);
--toolbar-button-border-danger: transparent;

  // ---------------------------------------------------------------------------
  //------ Icon colors and shadows 
  // ---------------------------------------------------------------------------
        --color-icon-default: rgb(var(--color-400-01) / 1);
        --bg-icon-default:rgb(var(--color-400-05) / 0.4);
        --bg-icon-hover: rgb(var(--color-400-06) / 0.7);
  // -----------------------------------------------------------------
  //------MenuTile styles
  // ------------------------------------------------------------------


  --menu-tile-bg-active: var(--menu-tile-bg-active-gradient-02);
  


  --menu-tile-z-active: 3000;
  --menu-tile-z-inactive: 2000;
  --menu-tile-overlay-opacity: 0.92;

  //------------------------------------------------------------------------------
  //------MenuSubTile styles
  //------------------------------------------------------------------------------ 



  --menu-subtile-hover-blur: blur(4px);

  // ---------------------------------------------------------------------------
  //------BookCard styles
  // ---------------------------------------------------------------------------
      --tile-size: 14rem;  
      --tile-aspect-ratio: 4 / 3;
      --tile-active-transform: scale(1.05) rotate(-90deg);
      --tile-width: 10vw;
      --tile-height: calc(var(--tile-width) / (var(--tile-aspect-ratio)));
      --tile-font-size: calc(var(--tile-width) * 0.013);
  //----------------------------------------------------------------------------
  //------ BookPreviewModal styles
  // ---------------------------------------------------------------------------
      --modal-width: 60vw;
      --modal-aspect-ratio: 3/2; 
      --modal-height: calc(var(--modal-width) / (var(--modal-aspect-ratio)));
      --modal-font-size: calc(var(--modal-width) * 0.013); 
        /* Universal 5-level scale (em) */
      --modal-xs: 0.4em;   /* very small (spacing / tiny font) */
      --modal-sm: 0.6em;   /* small */
      --modal-md: 0.8em;   /* standard */
      --modal-lg: 1.0em;   /* moderately large */
      --modal-xl: 1.2em;   /* largest */
      --modal-xxl: 1.4em;
      [data-editable="true"] {
      /* highlight for editable elements */
       box-shadow: 0 0 0 2px var(--color-blue-400) inset;
       }

 `