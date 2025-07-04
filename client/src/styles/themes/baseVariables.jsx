import { css } from 'styled-components'
import gradients from './gradients'
import colorPaletteDark from './colorPaletteDark'
import colorPaletteLight from './colorPaletteLight'
import shadows from './shadows'



export default (mode = 'light') => css`


 ${mode === 'dark' ? colorPaletteDark : colorPaletteLight}
${gradients(mode)};
${shadows(mode)};
--color-accent: rgb(var(--color-500-04));
--manage-toolbar-bg: var(--library-toolbar-gradient-01);
--sidebar-bg: var(--sidebar-bg-gradient);
--home-bg: var(--home-bg-gradient-01);
--library-bg: var(--home-bg-gradient-01);
--library-bg-01: var(--library-bg-gradient-01);
--library-toolbar-bg-01: var(--library-toolbar-gradient-01);
--modal-bg-01: var(--modal-gradient-01);
--modal-bg-02:rgb(var(--color-400-10) / .2);
--modal-bg-03: rgb(var(--color-400-09) / .7);
--button-bg-01: var(--sidebar-bg-gradient);
--button-bg-01-hover: var(--sidebar-bg-gradient);
--button-bg-02: rgb(var(--color-400-05) / 0.7);
--button-bg-02-hover:  rgb(var(--color-400-06) / 0.9);
//------------------------------------------------------------------
//--------ListItemLibrary
//------------------------------------------------------------------
  --header-text-xs: 1.0em;   /* very small header text */
  --header-text-sm: 1.2em;   /* small header text */
  --header-text-md: 1.4em;   /* standard header text */
  --header-text-lg: 1.6em;   /* moderately large header text */
  --header-text-xl: 1.8em;   /* large header text */
  --header-text-xxl: 2.0em;  /* largest header text */

  --space-xxxs: 0.05em; /* ultra small spacing */
  --space-xxs: 0.1em;   /* extra extra small spacing */
  --space-xs: 0.2em;    /* very small spacing */
  --space-sm: 0.4em;    /* small spacing */
  --space-m: 0.6em;    /* standard spacing */
  --space-md: 0.8em;    /* standard spacing */
  --space-l: 1.0em;     /* between md and lg */
  --space-lg: 1.2em;    /* moderately large spacing */
  --space-xl: 1.6em;    /* large spacing */
  --space-xxl: 2.0em;   /* largest spacing */
  --space-3xl: 2.4em;   /* extra large */


--font-family-01: 'Poppins', sans-serif;
  --margin-01: var(--space-sm);
  --padding-01: var(--space-sm) var(--space-lg);
  --padding-02: var(--space-m) var(--space-md);
 --padding-03: var(--space-m) var(--space-3xl);
 --padding-04: var(--space-sm) var(--space-l);
 --padding-05: var(--space-xxs) var(--space-md);
  --border-01: var(--space-xxs) solid rgb(var(--color-500-02) / .7);
  --border-02: var(--space-xxxs) solid rgb(var(--color-500-03) / .8);
  --border-03: var(--space-xxs) solid rgb(var(--color-500-01) / .6);
--gap-toolbar: var(--space-xxs);


  --text-01: var(--space-md);
  

  --row-width: 83.333vw;
  --row-height: calc(var(--row-width) / 9);
  --row-font-size: calc(var(--row-width) * 0.015);

--weight-01: 400;
--weight-02: 500;
--text-color-01: rgb(var(--color-500-01) / 1);
--text-color-02: rgb(var(--color-500-02) / 1);
--text-color-03: rgb(var(--color-500-10) / 1);
--text-color-04: rgb(var(--color-500-03) / 1);
--text-primary: rgb(var(--color-500-02) / 1);

--scale-active-01: 0.95;
--scale-hover-01: 1.1;

--shadow-01: 0 var(--space-xxs) var(--space-md) rgb(var(--color-400-08) / .7);
--shadow-01-hover: 0 var(--space-xs) var(--space-lg) rgb(var(--color-400-09) / .9);
--shadow-02: 0 var(--space-xxxs) var(--space-xs) rgb(var(--color-400-09) / .5);
--shadow-02-hover: 0 var(--space-xxxs) var(--space-xs) rgb(var(--color-400-10) / .9);

  --index-base: 0;
  --index-default: 1;
  --index-dropdown: 10;
  --index-sticky: 50;
  --index-header: 100;
  --index-overlay: 200;
  --index-modal: 500;
  --index-popover: 1000;
  --index-toast: 2000;
  --index-loader: 5000;
  --index-ultimate: 10000;


  --letter-spacing-md: var(--space-xxs);

  --border-radius-xs: var(--space-xxs);   /* very small */
  --border-radius-sm: var(--space-xs);    /* small */
  --border-radius-md: var(--space-sm);    /* medium */
  --border-radius-lg: var(--space-md);    /* large */
  --border-radius-xl: var(--space-l);     /* extra large */
  --border-radius-xxl: var(--space-xl);   /* huge */
  --border-radius-full: 50em;             /* fully rounded (pill/circle) */

  --blur-xs: blur(0.1em);
  --blur-sm: blur(0.2em);
  --blur-md: blur(0.4em);
  --blur-lg: blur(0.6em);
  --blur-xl: blur(0.8em);
  --blur-xxl: blur(1em);

   --transition-fast: all 0.15s ease;    /* fast */
  --transition-medium: all 0.3s ease;   /* default */
  --transition-slow: all 0.5s ease;     /* slow */

  --transition-fade: opacity 0.3s ease; /* fade */
  --transition-transform: transform 0.3s ease; /* transform only */
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