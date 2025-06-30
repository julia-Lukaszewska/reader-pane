// import { css } from 'styled-components'
// import baseVars from './baseVariables'

// export default css`
//   ${baseVars}

//   --toolbar-button-bg-active: linear-gradient(145deg, #f7fafffb, #092c5ed2)
//   --toolbar-button-text-active: #f7faff
//   --toolbar-button-text-danger: #f7faff
//   --color-light-0: #10213e
//   --color-light-100: #111827
//   --color-light-200: #1f2937
//   --color-dark-900: #000001
//   --reader-toolbar-shadow: 0 0 1rem rgb(255, 255, 255);

// //------------------------------------------------------------------
// //--------ListItemLibrary
// //------------------------------------------------------------------

//   --row-width: 83.333vw;
//   --row-height: calc(var(--row-width) / 9);
//   --row-font-size: calc(var(--row-width) * 0.015);



// //------------------------------------------------------------------
// //--------Toolbar styles (glass-metal modern look)
// //------------------------------------------------------------------

// /* Sizing & spacing */
// --toolbar-button-padding: 0.3em 0.9em;
// --toolbar-button-gap: 0.5em;
// --toolbar-button-font-size: 0.85em;
// --toolbar-button-font-weight: 500;
// --toolbar-button-border-width: 0.12em;
// --toolbar-button-border-radius: 0.4em;
// --toolbar-button-blur: blur(0.4em);
// --toolbar-select-padding-right: 1.5em;

// /* Default state */
// --toolbar-button-bg-default: rgba(255, 255, 255, 0.08);
// --toolbar-button-bg-hover: rgba(255, 255, 255, 0.332);
// --toolbar-button-text-color: #f4f4f4;
// --toolbar-button-border-color: rgb(255, 255, 255);

// /* Focus state */
// --toolbar-button-focus-border-color: rgba(228, 236, 254, 0.8);
// --toolbar-button-focus-shadow: 0 0 0 0.12em rgba(90, 145, 255, 0.25);

// /* Active (selected/clicked) state */
// --toolbar-button-bg-active-hover: linear-gradient(145deg, #6e98cc, #305c94);
// --toolbar-button-border-active: transparent;

// /* Danger (delete/alert) state */
// --toolbar-button-bg-danger: linear-gradient(145deg, #8a2e2e, #a33b3b);
// --toolbar-button-bg-danger-hover: linear-gradient(145deg, #932e2e, #b64545);
// --toolbar-button-border-danger: transparent;


//   // -----------------------------------------------------------------
//   //------MenuTile styles
//   // ------------------------------------------------------------------
//  --menu-tile-shadow:
//   inset 0 0 1.2rem rgba(255, 255, 255, 0.707),
//   inset 0.4em 0 1.2em rgba(100, 170, 255, 0.9),
//   0 0 2.4rem rgba(255, 255, 255, 0.072);

//   --menu-tile-overlay-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);

//   --menu-tile-bg-active: var(--gradient-main-v4);
//   --menu-tile-bg-inactive: var(--gradient-main-v2);

//   --menu-tile-z-active: 2000;
//   --menu-tile-z-inactive: 1000;
//   --menu-tile-overlay-opacity: 0.92;

//   //------------------------------------------------------------------------------
//   //------MenuSubTile styles
//   //------------------------------------------------------------------------------ 
//   --menu-subtile-bg-active: rgba(28, 38, 68, 0.12);
//   --menu-subtile-border: 1px solid rgba(255, 255, 255, 0.08);
//   --menu-subtile-shadow: 0 0 1.2rem rgba(17, 82, 195, 0.482), 0 0 0.2rem rgba(255, 255, 255, 0.06);
//   --menu-subtile-hover-blur: blur(4px);

//   // ---------------------------------------------------------------------------
//   //------BookCard styles
//   // ---------------------------------------------------------------------------
//       --tile-size: 14rem;  
//       --tile-aspect-ratio: 4 / 3;
//       --tile-active-transform: scale(1.05) rotate(-90deg);
//       --tile-width: 10vw;
//       --tile-height: calc(var(--tile-width) / (var(--tile-aspect-ratio)));
//       --tile-font-size: calc(var(--tile-width) * 0.013);
//   //----------------------------------------------------------------------------
//   //------ BookPreviewModal styles
//   // ---------------------------------------------------------------------------
//       --modal-width: 60vw;
//       --modal-aspect-ratio: 3/2; 
//       --modal-height: calc(var(--modal-width) / (var(--modal-aspect-ratio)));
//       --modal-font-size: calc(var(--modal-width) * 0.013); 
//         /* Universal 5-level scale (em) */
//       --modal-xs: 0.4em;   /* very small (spacing / tiny font) */
//       --modal-sm: 0.6em;   /* small */
//       --modal-md: 0.8em;   /* standard */
//       --modal-lg: 1.0em;   /* moderately large */
//       --modal-xl: 1.2em;   /* largest */
//       --modal-xxl: 1.4em;
//       [data-editable="true"] {
//       /* highlight for editable elements */
//        box-shadow: 0 0 0 2px var(--color-blue-400) inset;
//        }
//       // ---------------------------------------------------------------------------
//   //------ Basic colors: light and dark shades
//   // ---------------------------------------------------------------------------



//        --color-yellow-400: #ffbb00;
//        --color-yellow-300: #ffbb00;
//   // ---------------------------------------------------------------------------
//   //------ Accent blue shades 
//   // ---------------------------------------------------------------------------
//         --color-blue-100: #dceaf8;
//         --color-blue-200: #27486c;
//         --color-blue-300: #8ab5dc;
//         --color-blue-400: #0a1a28;
//         --color-blue-500: #3f83c5;
//         --color-blue-600: #2c6aad;
//         --color-blue-700: #ccd7e4;

//   // ---------------------------------------------------------------------------
//   //------ Icon colors and shadows 
//   // ---------------------------------------------------------------------------
//         --color-icon-default: var(--color-blue-700);
//         --bg-icon-default: rgba(53, 38, 218, 0.194);
//         --bg-icon-hover: rgba(255, 255, 255, 0.1);
//         --shadow-icon: 0 0 0.8rem rgba(60, 100, 180, 0.25);
//         --shadow-icon-hover: 0 0 1.5rem rgba(60, 100, 180, 0.35);

//   // ---------------------------------------------------------------------------
//   //------ SEE colors – semantic effects 
//   // ---------------------------------------------------------------------------
//         --see-01: rgba(0, 116, 210, 0.71);
//         --see-02: rgba(40, 106, 157, 0.98);
//         --see-03: rgba(73, 83, 131, 0.85);
//         --see-04: rgba(72, 254, 248, 0.07);
//         --see-05: rgb(0, 108, 197);
//         --see-06: rgba(20, 70, 130, 0.705);
//         --see-07: rgb(0, 3, 12);
//         --see-08: rgba(22, 140, 209, 0.151);
//         --see-akcent: rgb(103, 64, 244);
//         --see-akcent-02: hsl(210 70% 69% / 0.6);
//         --see-akcent-03: hsl(206 50% 61%);
//   // ---------------------------------------------------------------------------
//   //------ Tile background inactive (MenuTile)
//   // ---------------------------------------------------------------------------
//         --tile-bg-inactive:
//         linear-gradient(
//           37deg,
//           #2f6eb23a 20%,
//           #6fafe642 45%,
//           #9bd4ff1c 70%,
//           #417cbf2f 100%
//           ),
//         linear-gradient(
//           125deg,
//           rgba(64, 172, 255, 0.549) 0%,
//           rgba(30, 32, 106, 0.47) 50%,
//           rgba(61, 105, 171, 0.08) 100%
//         ),
//         repeating-linear-gradient(
//           70deg,
//           rgba(255, 255, 255, 0.04) 0px,
//           rgba(8, 75, 88, 0.578) 2px,
//           rgba(0, 0, 0, 0.03) 2px,
//           rgba(222, 222, 222, 0.03) 4px
//         ),
//         repeating-linear-gradient(
//           -45deg,
//           rgba(255, 255, 255, 0.02) 0px,
//           rgba(127, 196, 198, 0.441) 20%,
//           rgba(0, 0, 0, 0.02) 1px,
//           rgba(0, 0, 0, 0.02) 2px
//           );


//   // ---------------------------------------------------------------------------
//   //------ Tile background active (MenuTile) 
//   // ---------------------------------------------------------------------------
//        --tile-bg-active:
//          linear-gradient(
//            22deg,
//            #d2ecff73 0%,
//            #9fcff310 27%,
//            #68a6dca2 49%,
//            #b2d8ff4e 76%,
//            #5c9de695 100%
//          ),
//          linear-gradient(
//            115deg,
//            rgba(255, 255, 255, 0.2) 0%,
//            rgba(136, 168, 208, 0.177) 40%,
//            rgba(255, 255, 255, 0.06) 100%
//          ),
//          repeating-linear-gradient(
//            25deg,
//            rgba(255, 255, 255, 0.05) 0px,
//            rgba(255, 255, 255, 0.05) 1.5px,
//            rgba(0, 0, 0, 0.03) 1.5px,
//            rgba(0, 0, 0, 0.03) 3px
//          );

//   // ---------------------------------------------------------------------------
//   //------ Tile shadow active (MenuTile) 
//   // ---------------------------------------------------------------------------
//         --tile-shadow-active:
//           0 2rem 5rem rgba(11, 40, 73, 0.55),
//           inset 0 0 1.5rem rgba(88, 83, 150, 0.4),
//           0 0 1.5rem rgba(255, 255, 255, 0.3);

//   // ---------------------------------------------------------------------------
//   //------ Gradients: blue clear 
//   // ---------------------------------------------------------------------------
//        --gradient-blue-clear:
//          linear-gradient(
//            to top left,
//            #000000,
//            rgb(22, 43, 86),
//            #030d18
//          );

//   // ---------------------------------------------------------------------------
//   //------ Gradients: metal deep blue v7 
//   // ---------------------------------------------------------------------------
//         --gradient-metal-deepblue-v7:
//           linear-gradient(
//             22deg,
//             #05141f 0%,
//             #000000 27%,
//             #0d0849 49%,
//             #01080e 76%,
//             #000204 100%
//           ),
//           linear-gradient(
//             115deg,
//             rgba(10, 59, 111, 0.2) 0%,
//             rgba(0, 0, 0, 0.03) 40%,
//             rgba(31, 3, 3, 0.06) 100%
//           ),
//           repeating-linear-gradient(
//             25deg,
//             rgba(255, 255, 255, 0.05) 0px,
//             rgba(255, 255, 255, 0.05) 1.5px,
//             rgba(0, 0, 0, 0.03) 1.5px,
//             rgba(0, 0, 0, 0.03) 3px
//           );

// //--------------------------------------------------
// //------ gradient-main
// //--------------------------------------------------- 

//         --gradient-main:
//           linear-gradient(
//             37deg,
//             #2f6eb23a 20%,
//             #1f224a 45%,
//             #070e3d1c 70%,
//             #0d2a4a2e 100%
//           ),
//           linear-gradient(
//             125deg,
//             rgba(28, 83, 126, 0.549) 0%,
//             rgba(33, 33, 50, 0.47) 50%,
//             rgba(17, 40, 73, 0.08) 100%
//           ),
//           repeating-linear-gradient(
//             70deg,
//             rgba(255, 255, 255, 0.04) 0px,
//             rgba(5, 52, 61, 0.578) 2px,
//             rgba(0, 0, 0, 0.03) 2px,
//             rgba(56, 7, 7, 0.03) 4px
//           ),
//           repeating-linear-gradient(
//             -45deg,
//             rgba(255, 255, 255, 0.02) 0px,
//             rgba(27, 55, 56, 0.441) 20%,
//             rgba(42, 17, 17, 0.02) 1px,
//             rgba(0, 0, 0, 0.02) 2px
//           );

// //------------------------------------------------
// //------ gradient-main-v2
// //--------------------------------------------------

//         --gradient-main-v2:
//           linear-gradient(
//             37deg,
//             #3655a994 20%,
//             #25060692 45%,
//             #0109136f 70%,
//             #0f314d 100%
//           ),
//           linear-gradient(
//             125deg,
//             rgba(7, 26, 41, 0.549) 0%,
//             rgba(24, 24, 40, 0.47) 50%,
//             rgba(61, 105, 171, 0.08) 100%
//           ),
//           repeating-linear-gradient(
//             70deg,
//             rgba(255, 255, 255, 0.04) 0px,
//             rgba(8, 33, 88, 0.578) 2px,
//             rgba(17, 45, 97, 0.466) 2px,
//             rgba(55, 94, 102, 0.03) 4px
//           ),
//           repeating-linear-gradient(
//             -45deg,
//             rgba(255, 255, 255, 0.02) 0px,
//             rgba(12, 33, 61, 0.441) 20%,
//             rgba(0, 0, 0, 0.02) 1px,
//             rgba(0, 0, 0, 0.348) 2px
//           );

// //--------------------------------------------------     
// //------ gradient-main-v3
// //--------------------------------------------------   

//         --gradient-main-v3:
//           linear-gradient(
//             138deg,
//             #0d0f48b8 20%,
//             #265c8cd2 45%,
//             #12367a92 70%,
//             #12364eb6 100%
//           ),
//           linear-gradient(
//             15deg,
//             rgba(7, 26, 41, 0.549) 0%,
//             rgba(24, 24, 40, 0.47) 50%,
//             rgba(61, 105, 171, 0.08) 100%
//           ),
//           repeating-linear-gradient(
//             310deg,
//             rgba(255, 255, 255, 0.04) 0px,
//             rgba(8, 75, 88, 0.578) 2px,
//             rgba(255, 255, 255, 0.33) 2px,
//             rgba(55, 94, 102, 0.03) 4px
//           ),
//           repeating-linear-gradient(
//             -45deg,
//             rgba(255, 255, 255, 0.02) 0px,
//             rgba(127, 196, 198, 0.441) 20%,
//             rgba(0, 0, 0, 0.02) 1px,
//             rgba(0, 0, 0, 0.348) 2px
//           );

// //--------------------------------------------------     
// //------ gradient-main-v4
// //--------------------------------------------------   

//          --gradient-main-v4:
//            linear-gradient(
//              138deg,
//              #051220cf 20%,
//              #195589f8 45%,
//              #3a93ff92 70%,
//              #021c2edf 100%
//            ),
//            linear-gradient(
//              15deg,
//              rgb(7, 26, 41) 0%,
//              rgba(19, 61, 80, 0.589) 50%,
//              rgba(11, 54, 119, 0.384) 100%
//            ),
//            repeating-linear-gradient(
//              310deg,
//              rgba(255, 255, 255, 0.04) 0rem,
//              rgba(8, 75, 88, 0.578) 0.2rem,
//              rgba(106, 118, 145, 0.33) 0.22rem,
//              rgba(55, 94, 102, 0.03) 0.3rem
//            ),
//            repeating-linear-gradient(
//              -45deg,
//              rgba(255, 255, 255, 0.02) 0rem,
//              rgba(127, 196, 198, 0.441) 0.1rem,
//              rgba(0, 0, 0, 0.02) 0.1rem,
//              rgba(0, 0, 0, 0.062) 0.1rem
//            );
// //--------------------------------------------------     
// //------ gradient-main-v5
// //--------------------------------------------------   

//          --gradient-main-v5:
//            linear-gradient(
//              138deg,
//              #092d57cf 20%,
//              #082f51f8 45%,
//              #173d6cd2 70%,
//              #0d3550df 100%
//            ),
//            linear-gradient(
//              15deg,
//              rgb(7, 26, 41) 0%,
//              rgba(19, 61, 80, 0.589) 50%,
//              rgba(118, 158, 218, 0.384) 100%
//            ),
//            repeating-linear-gradient(
//              310deg,
//              rgba(255, 255, 255, 0.04) 0rem,
//              rgba(8, 75, 88, 0.578) 0.2rem,
//              rgba(106, 118, 145, 0.33) 0.22rem,
//              rgba(55, 94, 102, 0.03) 0.3rem
//            ),
//            repeating-linear-gradient(
//              -45deg,
//              rgba(255, 255, 255, 0.02) 0rem,
//              rgba(127, 196, 198, 0.441) 0.1rem,
//              rgba(0, 0, 0, 0.02) 0.1rem,
//              rgba(0, 0, 0, 0.062) 0.1rem
//            );
// //--------------------------------------------------     
// //------ gradient-main-v6
// //--------------------------------------------------   
              
//          --gradient-main-v6:
//            linear-gradient(
//              138deg,
//              #9bcaff1a 20%,
//              #73b2e92f 45%,
//              #97c3fa24 70%,
//              #66bdf742 100%
//            ),
//            linear-gradient(
//              15deg,
//              rgba(23, 94, 148, 0.479) 0%,
//              rgba(79, 174, 218, 0.24) 50%,
//              rgba(118, 158, 218, 0.116) 100%
//            ),
//            repeating-linear-gradient(
//              310deg,
//              rgba(255, 255, 255, 0.253) 0rem,
//              rgba(212, 234, 238, 0.027) 0.2rem,
//              rgba(106, 118, 145, 0.33) 0.52rem,
//              rgba(55, 94, 102, 0.03) 0.3rem
//            ),
//            repeating-linear-gradient(
//              -45deg,
//              rgba(255, 255, 255, 0.02) 0rem,
//              rgba(214, 254, 255, 0.185) 0.1rem,
//              rgba(170, 255, 248, 0.02) 0.1rem,
//              rgba(247, 247, 247, 0.062) 0.1rem
//            );
//            --gradient-main-v8:
//   linear-gradient(
//     37deg,
//     #0b1640cc 20%,
//     #003657cc 45%,
//     #c1e2ff99 70%,
//     #0f253bd3 100%
//   ),
//   linear-gradient(
//     125deg,
//     rgba(10, 40, 70, 0.65) 0%,
//     rgba(30, 30, 60, 0.5) 50%,
//     rgba(80, 140, 220, 0.15) 100%
//   ),
//   repeating-linear-gradient(
//     70deg,
//     rgba(255, 255, 255, 0.06) 0px,
//     rgba(30, 80, 160, 0.65) 2px,
//     rgba(117, 165, 255, 0.5) 2px,
//     rgba(55, 94, 102, 0.04) 4px
//   ),
//   repeating-linear-gradient(
//     -45deg,
//     rgba(255, 255, 255, 0.04) 0px,
//     rgba(127, 178, 255, 0.5) 20%,
//     rgba(0, 0, 0, 0.04) 1px,
//     rgba(0, 0, 0, 0.35) 2px
//   );
// --gradient-main-v2:
//   linear-gradient(
//     37deg,
//     #2c4979cc 20%,
//     #0c2e4cc6 45%,
//     #073b5e93 70%,
//     #375e81bb 100%
//   ),
//   linear-gradient(
//     125deg,
//     rgba(10, 30, 50, 0.6) 0%,
//     rgba(25, 35, 60, 0.5) 50%,
//     rgba(70, 120, 180, 0.08) 100%
//   ),
//   repeating-linear-gradient(
//     70deg,
//     rgba(255, 255, 255, 0.03) 0px,
//     rgba(20, 50, 90, 0.4) 2px,
//     rgba(100, 150, 200, 0.2) 2px,
//     rgba(30, 60, 80, 0.03) 4px
//   ),
//   repeating-linear-gradient(
//     -45deg,
//     rgba(255, 255, 255, 0.015) 0px,
//     rgba(90, 130, 170, 0.25) 20%,
//     rgba(0, 0, 0, 0.02) 1px,
//     rgba(0, 0, 0, 0.3) 2px
//   );

// --gradient-main-v22:
//   linear-gradient(
//     327deg,
//     #0000002f 20%,
//     #14477737 45%,
//     #0f207657 70%,
//     #071548d8 100%
//   ),
//   linear-gradient(
//     37deg,
//     #0800289b 20%,
//     #04335e13 45%,
//     #061b6795 70%,
//     #64a8eb30 100%
//   ),
//   linear-gradient(
//     125deg,
//     rgba(7, 34, 55, 0.185) 1%,
//     rgba(10, 33, 89, 0.11) 50%,
//     rgba(6, 35, 71, 0.486) 100%
//   ),
//   repeating-linear-gradient(
//     190deg,
//     rgba(255, 255, 255, 0.055) 0px,
//     rgba(8, 63, 94, 0.459) 0px,
//     rgba(6, 25, 44, 0.611) 2px,
//     rgba(11, 38, 51, 0.651) 3px
//   ),
//   repeating-linear-gradient(
//     -45deg,
//     rgba(255, 255, 255, 0.253) 9px,
//     rgba(42, 72, 103, 0.63) 20%,
//     rgba(7, 17, 51, 0.425) 1px,
//     rgba(0, 0, 0, 0.966) 0px
//   );
// --gradient-main-v12:
//   linear-gradient(
//     37deg,
//     #142d73cc 20%,
//     #567f93b3 45%,
//     #0e3b3275 70%,
//     #f6fcffc 100%
//   ),
//   linear-gradient(
//     125deg,
//     rgba(15, 35, 65, 0.55) 0%,
//     rgba(83, 187, 221, 0.13) 50%,
//     rgba(70, 160, 140, 0.08) 100%
//   ),
//   repeating-linear-gradient(
//     70deg,
//     rgba(255, 255, 255, 0.03) 0px,
//     rgba(40, 110, 90, 0.103) 2px,
//     rgba(80, 200, 180, 0.15) 2px,
//     rgba(50, 100, 110, 0.03) 4px
//   ),
//   repeating-linear-gradient(
//     -45deg,
//     rgba(255, 255, 255, 0.015) 0px,
//     rgba(90, 160, 150, 0.25) 20%,
//     rgba(0, 0, 0, 0.02) 1px,
//     rgba(0, 0, 0, 0.26) 2px
//   );
// --gradient-main-v11:
//   linear-gradient(
//     37deg,
//     #2e4f99cc 20%,
//     #042041aa 45%,
//     #021b3866 70%,
//     #3c7cb3b3 100%
//   ),
//   linear-gradient(
//     125deg,
//     rgba(10, 25, 45, 0.6) 0%,
//     rgba(25, 30, 50, 0.5) 50%,
//     rgba(40, 90, 150, 0.1) 100%
//   ),
//   repeating-linear-gradient(
//     70deg,
//     rgba(255, 255, 255, 0.025) 0px,
//     rgba(30, 70, 130, 0.5) 2px,
//     rgba(120, 170, 255, 0.2) 2px,
//     rgba(30, 50, 80, 0.03) 4px
//   ),
//   repeating-linear-gradient(
//     -45deg,
//     rgba(255, 255, 255, 0.01) 0px,
//     rgba(100, 140, 190, 0.3) 20%,
//     rgba(0, 0, 0, 0.015) 1px,
//     rgba(0, 0, 0, 0.25) 2px
//   );

 
// `
