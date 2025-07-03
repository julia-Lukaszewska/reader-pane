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
//------------------------------------------------------------------
//--------ListItemLibrary
//------------------------------------------------------------------

  --row-width: 83.333vw;
  --row-height: calc(var(--row-width) / 9);
  --row-font-size: calc(var(--row-width) * 0.015);



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
--toolbar-button-bg-default: rgba(255, 255, 255, 0.08);
--toolbar-button-bg-hover: rgba(255, 255, 255, 0.332);
--toolbar-button-text-color: #f4f4f4;
--toolbar-button-border-color: rgba(255, 255, 255, 0.22);

/* Focus state */
--toolbar-button-focus-border-color: rgba(228, 236, 254, 0.8);


/* Active (selected/clicked) state */
--toolbar-button-bg-active-hover: linear-gradient(145deg, #6e98cc, #305c94);
--toolbar-button-border-active: transparent;

/* Danger (delete/alert) state */
--toolbar-button-bg-danger: linear-gradient(145deg, #8a2e2e, #a33b3b);
--toolbar-button-bg-danger-hover: linear-gradient(145deg, #932e2e, #b64545);
--toolbar-button-border-danger: transparent;


  // -----------------------------------------------------------------
  //------MenuTile styles
  // ------------------------------------------------------------------


  --menu-tile-bg-active: var(--menu-tile-bg-active-gradient-02);
  
  --menu-tile-bg-inactive: var(--gradient-main-v2);

  --menu-tile-z-active: 3000;
  --menu-tile-z-inactive: 2000;
  --menu-tile-overlay-opacity: 0.92;

  //------------------------------------------------------------------------------
  //------MenuSubTile styles
  //------------------------------------------------------------------------------ 
  --menu-subtile-bg-active: rgba(28, 38, 68, 0.12);
  --menu-subtile-border: 1px solid rgba(255, 255, 255, 0.08);

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
      // ---------------------------------------------------------------------------
  //------ Basic colors: light and dark shades
  // ---------------------------------------------------------------------------



       --color-yellow-400: #ffbb00;
       --color-yellow-300: #ffbb00;
 `