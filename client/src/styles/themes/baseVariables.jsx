import { css } from 'styled-components'
import gradients from './gradients'
import collorPalete from './collorPalete'
export default css`

${collorPalete}
${gradients}

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
--toolbar-button-focus-shadow: 0 0 0 0.12em rgba(90, 145, 255, 0.25);

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
 --menu-tile-shadow:
  inset 0 0 1.2rem rgba(255, 255, 255, 0.707),
  inset 0.4em 0 1.2em rgba(0, 115, 255, 0.9),
  0 0 2.4rem rgba(255, 255, 255, 0.072);

  --menu-tile-overlay-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);

  --menu-tile-bg-active: var(--menu-tile-bg-active-gradient-02);
  
  --menu-tile-bg-inactive: var(--gradient-main-v2);

  --menu-tile-z-active: 2000;
  --menu-tile-z-inactive: 1000;
  --menu-tile-overlay-opacity: 0.92;

  //------------------------------------------------------------------------------
  //------MenuSubTile styles
  //------------------------------------------------------------------------------ 
  --menu-subtile-bg-active: rgba(28, 38, 68, 0.12);
  --menu-subtile-border: 1px solid rgba(255, 255, 255, 0.08);
  --menu-subtile-shadow: 0 0 1.2rem rgba(17, 82, 195, 0.482), 0 0 0.2rem rgba(255, 255, 255, 0.06);
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
  // ---------------------------------------------------------------------------
  //------ Accent blue shades 
  // ---------------------------------------------------------------------------
        --color-blue-100: #dceaf8;
        --color-blue-200: #b9d3ee;
        --color-blue-300: #8ab5dc;
        --color-blue-400: #609bd0;
        --color-blue-500: #3f83c5;
        --color-blue-600: #2c6aad;
        --color-blue-700: #1f518a;

  // ---------------------------------------------------------------------------
  //------ Icon colors and shadows 
  // ---------------------------------------------------------------------------
        --color-icon-default: var(--color-blue-700);
        --bg-icon-default: rgba(53, 38, 218, 0.194);
        --bg-icon-hover: rgba(255, 255, 255, 0.1);
        --shadow-icon: 0 0 0.8rem rgba(60, 100, 180, 0.25);
        --shadow-icon-hover: 0 0 1.5rem rgba(60, 100, 180, 0.35);

  // ---------------------------------------------------------------------------
  //------ SEE colors – semantic effects 
  // ---------------------------------------------------------------------------
        --see-01: rgba(0, 116, 210, 0.71);
        --see-02: rgba(71, 175, 255, 0.98);
        --see-03: rgba(31, 32, 109, 0.85);
        --see-04: rgba(72, 254, 248, 0.07);
        --see-05: rgb(0, 108, 197);
        --see-06: rgba(207, 229, 255, 0.705);
        --see-07: rgb(133, 175, 209);
        --see-08: rgba(22, 140, 209, 0.151);
        --see-akcent: rgb(194, 249, 255);
        --see-akcent-02: hsl(210 70% 69% / 0.6);
        --see-akcent-03: hsl(206 50% 61%);
  



  // ---------------------------------------------------------------------------
  //------ Tile background active (MenuTile) 
  // ---------------------------------------------------------------------------
       --tile-bg-active:
         linear-gradient(
           22deg,
           #d2ecff73 0%,
           #9fcff310 27%,
           #68a6dca2 49%,
           #b2d8ff4e 76%,
           #5c9de695 100%
         ),
         linear-gradient(
           115deg,
           rgba(255, 255, 255, 0.2) 0%,
           rgba(136, 168, 208, 0.177) 40%,
           rgba(255, 255, 255, 0.06) 100%
         ),
         repeating-linear-gradient(
           25deg,
           rgba(255, 255, 255, 0.05) 0px,
           rgba(255, 255, 255, 0.05) 1.5px,
           rgba(0, 0, 0, 0.03) 1.5px,
           rgba(0, 0, 0, 0.03) 3px
         );

  // ---------------------------------------------------------------------------
  //------ Tile shadow active (MenuTile) 
  // ---------------------------------------------------------------------------
        --tile-shadow-active:
          0 2rem 5rem rgba(11, 40, 73, 0.55),
          inset 0 0 1.5rem rgba(88, 83, 150, 0.4),
          0 0 1.5rem rgba(255, 255, 255, 0.3);

  // ---------------------------------------------------------------------------
  //------ Gradients: blue clear 
  // ---------------------------------------------------------------------------
       --gradient-blue-clear:
         linear-gradient(
           to top left,
           #f5fbff,
           rgb(80, 138, 192),
           #cde5ff
         );

  // ---------------------------------------------------------------------------
  //------ Gradients: metal deep blue v7 
  // ---------------------------------------------------------------------------
        --gradient-metal-deepblue-v7:
          linear-gradient(
            22deg,
            #d2ecff 0%,
            #9fcff3 27%,
            #68a5dc 49%,
            #b2d8ff 76%,
            #4178b8 100%
          ),
          linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(0, 0, 0, 0.03) 40%,
            rgba(255, 255, 255, 0.06) 100%
          ),
          repeating-linear-gradient(
            25deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1.5px,
            rgba(0, 0, 0, 0.03) 1.5px,
            rgba(0, 0, 0, 0.03) 3px
          );

//--------------------------------------------------
//------ gradient-main
//--------------------------------------------------- 

        --gradient-main:
          linear-gradient(
            37deg,
            #2f6eb23a 20%,
            #6fafe642 45%,
            #9bd4ff1c 70%,
            #417cbf2f 100%
          ),
          linear-gradient(
            125deg,
            rgba(64, 172, 255, 0.549) 0%,
            rgba(30, 32, 106, 0.47) 50%,
            rgba(61, 105, 171, 0.08) 100%
          ),
          repeating-linear-gradient(
            70deg,
            rgba(255, 255, 255, 0.04) 0px,
            rgba(8, 75, 88, 0.578) 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(222, 222, 222, 0.03) 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.02) 0px,
            rgba(127, 196, 198, 0.441) 20%,
            rgba(0, 0, 0, 0.02) 1px,
            rgba(0, 0, 0, 0.02) 2px
          );

//------------------------------------------------
//------ gradient-main-v2
//--------------------------------------------------

        --gradient-main-v2:
          linear-gradient(
            37deg,
            #3655a994 20%,
            #b1daff95 45%,
            #b2d6ff71 70%,
            #4385bcb6 100%
          ),
          linear-gradient(
            125deg,
            rgba(7, 26, 41, 0.549) 0%,
            rgba(24, 24, 40, 0.47) 50%,
            rgba(61, 105, 171, 0.08) 100%
          ),
          repeating-linear-gradient(
            70deg,
            rgba(255, 255, 255, 0.04) 0px,
            rgba(8, 33, 88, 0.578) 2px,
            rgba(117, 165, 255, 0.466) 2px,
            rgba(55, 94, 102, 0.03) 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.02) 0px,
            rgba(127, 158, 198, 0.441) 20%,
            rgba(0, 0, 0, 0.02) 1px,
            rgba(0, 0, 0, 0.348) 2px
          );

//--------------------------------------------------     
//------ gradient-main-v3
//--------------------------------------------------   

        --gradient-main-v3:
          linear-gradient(
            138deg,
            #a3d3f1b8 20%,
            #73b2e9d2 45%,
            #3a93ff92 70%,
            #a2daffb6 100%
          ),
          linear-gradient(
            15deg,
            rgba(7, 26, 41, 0.549) 0%,
            rgba(24, 24, 40, 0.47) 50%,
            rgba(61, 105, 171, 0.08) 100%
          ),
          repeating-linear-gradient(
            310deg,
            rgba(255, 255, 255, 0.04) 0px,
            rgba(8, 75, 88, 0.578) 2px,
            rgba(255, 255, 255, 0.33) 2px,
            rgba(55, 94, 102, 0.03) 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.02) 0px,
            rgba(127, 196, 198, 0.441) 20%,
            rgba(0, 0, 0, 0.02) 1px,
            rgba(0, 0, 0, 0.348) 2px
          );

//--------------------------------------------------     
//------ gradient-main-v4
//--------------------------------------------------   

         --gradient-main-v4:
           linear-gradient(
             138deg,
             #a3c7f1cf 20%,
             #73b2e9f8 45%,
             #3a93ff92 70%,
             #1d83c7df 100%
           ),
           linear-gradient(
             15deg,
             rgb(7, 26, 41) 0%,
             rgba(19, 61, 80, 0.589) 50%,
             rgba(118, 158, 218, 0.384) 100%
           ),
           repeating-linear-gradient(
             310deg,
             rgba(255, 255, 255, 0.04) 0rem,
             rgba(8, 75, 88, 0.578) 0.2rem,
             rgba(106, 118, 145, 0.33) 0.22rem,
             rgba(55, 94, 102, 0.03) 0.3rem
           ),
           repeating-linear-gradient(
             -45deg,
             rgba(255, 255, 255, 0.02) 0rem,
             rgba(127, 196, 198, 0.441) 0.1rem,
             rgba(0, 0, 0, 0.02) 0.1rem,
             rgba(0, 0, 0, 0.062) 0.1rem
           );
//--------------------------------------------------     
//------ gradient-main-v5
//--------------------------------------------------   

         --gradient-main-v5:
           linear-gradient(
             138deg,
             #a3c7f1cf 20%,
             #73b2e9f8 45%,
             #97c3fad3 70%,
             #66bdf7df 100%
           ),
           linear-gradient(
             15deg,
             rgb(7, 26, 41) 0%,
             rgba(19, 61, 80, 0.589) 50%,
             rgba(118, 158, 218, 0.384) 100%
           ),
           repeating-linear-gradient(
             310deg,
             rgba(255, 255, 255, 0.04) 0rem,
             rgba(8, 75, 88, 0.578) 0.2rem,
             rgba(106, 118, 145, 0.33) 0.22rem,
             rgba(55, 94, 102, 0.03) 0.3rem
           ),
           repeating-linear-gradient(
             -45deg,
             rgba(255, 255, 255, 0.02) 0rem,
             rgba(127, 196, 198, 0.441) 0.1rem,
             rgba(0, 0, 0, 0.02) 0.1rem,
             rgba(0, 0, 0, 0.062) 0.1rem
           );
//--------------------------------------------------     
//------ gradient-main-v6
//--------------------------------------------------   
              
         --gradient-main-v6:
           linear-gradient(
             138deg,
             #9bcaff1a 20%,
             #73b2e92f 45%,
             #97c3fa24 70%,
             #66bdf742 100%
           ),
           linear-gradient(
             15deg,
             rgba(23, 94, 148, 0.479) 0%,
             rgba(79, 174, 218, 0.24) 50%,
             rgba(118, 158, 218, 0.116) 100%
           ),
           repeating-linear-gradient(
             310deg,
             rgba(255, 255, 255, 0.253) 0rem,
             rgba(212, 234, 238, 0.027) 0.2rem,
             rgba(106, 118, 145, 0.33) 0.52rem,
             rgba(55, 94, 102, 0.03) 0.3rem
           ),
           repeating-linear-gradient(
             -45deg,
             rgba(255, 255, 255, 0.02) 0rem,
             rgba(214, 254, 255, 0.185) 0.1rem,
             rgba(170, 255, 248, 0.02) 0.1rem,
             rgba(247, 247, 247, 0.062) 0.1rem
           );
           --gradient-main-v8:
  linear-gradient(
    37deg,
    #4a6fffcc 20%,
    #b5e3ffcc 45%,
    #c1e2ff99 70%,
    #56aaffd4 100%
  ),
  linear-gradient(
    125deg,
    rgba(10, 40, 70, 0.65) 0%,
    rgba(30, 30, 60, 0.5) 50%,
    rgba(80, 140, 220, 0.15) 100%
  ),
  repeating-linear-gradient(
    70deg,
    rgba(255, 255, 255, 0.06) 0px,
    rgba(30, 80, 160, 0.65) 2px,
    rgba(117, 165, 255, 0.5) 2px,
    rgba(55, 94, 102, 0.04) 4px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.04) 0px,
    rgba(127, 178, 255, 0.5) 20%,
    rgba(0, 0, 0, 0.04) 1px,
    rgba(0, 0, 0, 0.35) 2px
  );
--gradient-main-v2:
  linear-gradient(
    37deg,
    #2c4979cc 20%,
    #5a8ebbc7 45%,
    #507f9e94 70%,
    #375e81bb 100%
  ),
  linear-gradient(
    125deg,
    rgba(10, 30, 50, 0.6) 0%,
    rgba(25, 35, 60, 0.5) 50%,
    rgba(70, 120, 180, 0.08) 100%
  ),
  repeating-linear-gradient(
    70deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(20, 50, 90, 0.4) 2px,
    rgba(100, 150, 200, 0.2) 2px,
    rgba(30, 60, 80, 0.03) 4px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.015) 0px,
    rgba(90, 130, 170, 0.25) 20%,
    rgba(0, 0, 0, 0.02) 1px,
    rgba(0, 0, 0, 0.3) 2px
  );
--gradient-main-v2:
  linear-gradient(
    37deg,
    #3a5e8fcc 20%,
    #6ca4d8c7 45%,
    #85b7e888 70%,
    #4a7fb5bb 100%
  ),
  linear-gradient(
    125deg,
    rgba(20, 50, 80, 0.6) 0%,
    rgba(35, 45, 70, 0.5) 50%,
    rgba(100, 150, 210, 0.1) 100%
  ),
  repeating-linear-gradient(
    70deg,
    rgba(255, 255, 255, 0.035) 0px,
    rgba(30, 70, 120, 0.4) 2px,
    rgba(120, 180, 240, 0.25) 2px,
    rgba(40, 80, 100, 0.03) 4px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.02) 0px,
    rgba(110, 160, 210, 0.28) 20%,
    rgba(0, 0, 0, 0.025) 1px,
    rgba(0, 0, 0, 0.3) 2px
  );
--gradient-main-v22:
  linear-gradient(
    327deg,
    #76b9f030 20%,
    #14477737 45%,
    #b4d9ff58 70%,
    #64a8eb6f 100%
  ),
  linear-gradient(
    37deg,
    #3a5d8f9b 20%,
    #04335e13 45%,
    #85b7e896 70%,
    #64a8eb30 100%
  ),
  linear-gradient(
    125deg,
    rgba(15, 79, 131, 0.185) 1%,
    rgba(35, 45, 70, 0.11) 50%,
    rgba(52, 117, 197, 0.486) 100%
  ),
  repeating-linear-gradient(
    190deg,
    rgba(255, 255, 255, 0.055) 0px,
    rgba(8, 63, 94, 0.459) 0px,
    rgba(120, 180, 240, 0.171) 2px,
    rgba(11, 38, 51, 0.651) 3px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.253) 9px,
    rgba(110, 160, 210, 0.63) 20%,
    rgba(232, 237, 255, 0.425) 1px,
    rgba(0, 0, 0, 0.966) 0px
  );
--gradient-main-v12:
  linear-gradient(
    37deg,
    #3655a9cc 20%,
    #90cfeeb3 45%,
    #8ed6c775 70%,
    #f6fcffc 100%
  ),
  linear-gradient(
    125deg,
    rgba(15, 35, 65, 0.55) 0%,
    rgba(83, 187, 221, 0.13) 50%,
    rgba(70, 160, 140, 0.08) 100%
  ),
  repeating-linear-gradient(
    70deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(40, 110, 90, 0.103) 2px,
    rgba(80, 200, 180, 0.15) 2px,
    rgba(50, 100, 110, 0.03) 4px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.015) 0px,
    rgba(90, 160, 150, 0.25) 20%,
    rgba(0, 0, 0, 0.02) 1px,
    rgba(0, 0, 0, 0.26) 2px
  );
--gradient-main-v11:
  linear-gradient(
    37deg,
    #2e4f99cc 20%,
    #86baf7aa 45%,
    #a4cfff66 70%,
    #3c7cb3b3 100%
  ),
  linear-gradient(
    125deg,
    rgba(10, 25, 45, 0.6) 0%,
    rgba(25, 30, 50, 0.5) 50%,
    rgba(40, 90, 150, 0.1) 100%
  ),
  repeating-linear-gradient(
    70deg,
    rgba(255, 255, 255, 0.025) 0px,
    rgba(30, 70, 130, 0.5) 2px,
    rgba(120, 170, 255, 0.2) 2px,
    rgba(30, 50, 80, 0.03) 4px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.01) 0px,
    rgba(100, 140, 190, 0.3) 20%,
    rgba(0, 0, 0, 0.015) 1px,
    rgba(0, 0, 0, 0.25) 2px
  );

 

`