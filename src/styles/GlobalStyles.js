// -----------------------------------------------------------------------------
//------ GlobalStyles: Global CSS variables and base styles 
// -----------------------------------------------------------------------------

import { createGlobalStyle } from 'styled-components'
import resetBaseStyles from './resetBaseStyles'

const GlobalStyles = createGlobalStyle`

:root {

  // ---------------------------------------------------------------------------
  //------ Basic colors: light and dark shades 
  // ---------------------------------------------------------------------------
       --color-light-0:   #ffffff;
       --color-light-100: #f7faff;
       --color-light-200: #eaf3fb;
       --color-dark-900:  #0b1626;

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
            #b2d8ff 70%,
            #438bbcb6 100%
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
            rgba(8, 75, 88, 0.578) 2px,
            rgba(255, 255, 255, 0.92) 2px,
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
         }
       
 ${resetBaseStyles}
 
   `
export default GlobalStyles
