import { css } from 'styled-components'
import colorPaletteDark from './colorPaletteDark'
import colorPaletteLight from './colorPaletteLight'

export default (mode = 'light') => css`

 ${mode === 'dark' ? colorPaletteDark : colorPaletteLight}
 // ---------------------------------------------------------------------------
 //------ Book Card Inactive 
 // ---------------------------------------------------------------------------
  --bookCard-bg-inactive:
         /* 1st layer ------------------------------------------ */
         linear-gradient(
           37deg,
           rgb(var(--color-400-08) / .36) 20%,
           rgb(var(--color-400-02) / .26) 45%,
           rgb(var(--color-400-04) / .11) 70%,
           rgb(var(--color-400-07) / .18) 100%
         ),
     
         /* 2nd layer ------------------------------------------ */
         linear-gradient(
           125deg,
           rgb(var(--color-400-04) / .55) 0%,
           rgb(var(--color-400-08) / .47) 50%,
           rgb(var(--color-400-02) / .08) 100%
         ),
     
         /* 3rd layer – stripes -------------------------------- */
         repeating-linear-gradient(
           70deg,
           rgb(var(--color-400-01) / .04) 0px,
           rgb(var(--color-400-07) / .578) 2px,
           rgb(var(--color-400-09) / .03) 2px,
           rgb(var(--color-400-08) / .03) 4px
         ),
     
         /* 4th layer – cross-hatch ---------------------------- */
         repeating-linear-gradient(
           -45deg,
           rgb(var(--color-400-01) / .02) 0px,
           rgb(var(--color-400-02) / .441) 20%,
           rgb(var(--color-400-09) / .02) 1px,
           rgb(var(--color-400-09) / .02) 2px
         );
 // ---------------------------------------------------------------------------
 //------ Book Card Inactive 
 // ---------------------------------------------------------------------------
  --bookCard-bg-inactive-02:
         /* 1st layer ------------------------------------------ */
         linear-gradient(
           37deg,
           rgb(var(--color-400-05) / .36) 20%,
           rgb(var(--color-400-02) / .26) 45%,
           rgb(var(--color-400-08) / .11) 70%,
           rgb(var(--color-400-07) / .18) 100%
         ),
     
         /* 2nd layer ------------------------------------------ */
         linear-gradient(
           125deg,
           rgb(var(--color-400-03) / .15) 0%,
           rgb(var(--color-400-08) / .27) 50%,
           rgb(var(--color-400-02) / .08) 100%
         ),
    
     
         /* 4th layer – cross-hatch ---------------------------- */
         repeating-linear-gradient(
           -45deg,
           rgb(var(--color-400-01) / .02) 0px,
           rgb(var(--color-400-01) / .11) 20%,
           rgb(var(--color-400-01) / .02) 1px,
           rgb(var(--color-400-05) / .02) 2px
         );

  // ---------------------------------------------------------------------------
  //------ HomeView background 
  // ---------------------------------------------------------------------------
  
  --home-bg-gradient-01:
  /* 1st layer ------------------------------------------------ */
        linear-gradient(
            327deg,
          rgb(var(--color-400-04) / .188) 20%,  
          rgb(var(--color-400-06) / .215) 45%,  
          rgb(var(--color-400-02) / .345) 70%,  
          rgb(var(--color-400-04) / .435) 100%  
          ),
          
          /* 2nd layer ------------------------------------------------ */
          linear-gradient(
              37deg,
          rgb(var(--color-400-09) / .608) 20%,  
          rgb(var(--color-400-08) / .075) 45%,  
          rgb(var(--color-400-03) / .588) 70%,  
          rgb(var(--color-400-04) / .188) 100%  
        ),
        
        /* 3rd layer ------------------------------------------------ */
        linear-gradient(
            125deg,
            rgb(var(--color-400-02) / .185) 1%,   
            rgb(var(--color-400-06) / .11) 50%,  
            rgb(var(--color-400-04) / .486) 100%   
            ),
            
            /* 4th layer – stripes ------------------------------------- */
            repeating-linear-gradient(
                190deg,
                rgb(var(--color-400-01) / .055) 0px,
                rgb(var(--color-400-01) / .159) 0px, 
                rgb(var(--color-400-04) / .171) 2px, 
                rgb(var(--color-400-02) / .251) 3px  
                ),
                
         /* 5th layer – cross-hatch -------------------------------- */
         repeating-linear-gradient(
             -45deg,
             rgb(var(--color-400-01) / .253) 3px,
             rgb(var(--color-400-04) / .43)  20%, 
             rgb(var(--color-400-02) / .425) 1px,
             rgb(var(--color-400-01) / .266) 0px
             );
             
                    
                    
   // ---------------------------------------------------------------------------
   //------ Header background 
   // ---------------------------------------------------------------------------
   --header-gradient-01:
   /* 1st layer -------------------------------------------------------- */
   linear-gradient(
            37deg,
            rgb(var(--color-400-08) / .23) 20%,  
            rgb(var(--color-400-05) / .26) 45%,  
            rgb(var(--color-400-08) / .11) 70%,   
            rgb(var(--color-400-09) / .18) 100%  
          ),
      
          /* 2nd layer -------------------------------------------------------- */
          linear-gradient(
            125deg,
            rgb(var(--color-400-09) / .55) 0%,    
            rgb(var(--color-400-10) / .47) 50%,   
            rgb(var(--color-400-08) / .58) 100%   
          ),
      
          /* 3rd layer – stripes --------------------------------------------- */
          repeating-linear-gradient(
            70deg,
            rgb(var(--color-400-03)  / .04) 0px,    
            rgb(var(--color-400-04) / .578) 2px,  
            rgb(var(--color-400-03) / .03)  2px,   
            rgb(var(--color-400-02) / .03) 4px     
            ),
            
            /* 4th layer – cross-hatch ----------------------------------------- */
            repeating-linear-gradient(
            -45deg,
           rgb(var(--color-400-01)/ .02)  0px,  
           rgb(var(--color-400-07) / .441) 20%,  
            rgb(var(--color-400-04) / .02)   1px,  
            rgb(var(--color-400-10)  / .02)   2px   
            );

            
            // ---------------------------------------------------------------------------
            //------ Library toolbat background 
            // ---------------------------------------------------------------------------
             --library-toolbar-gradient-01:
               linear-gradient(
                 37deg,
                 rgb(var(--color-400-09) / .80) 20%,
                 rgb(var(--color-400-05) / .78) 45%,
                 rgb(var(--color-400-04) / .53) 70%,
                 rgb(var(--color-400-08) / .73) 100%
               ),
               linear-gradient(
                 125deg,
                 rgb(var(--color-400-10) / .60) 0%,
                 rgb(var(--color-400-10) / .50) 50%,
                 rgb(var(--color-400-07) / .10) 100%
               ),
               repeating-linear-gradient(
                 70deg,
                  rgb(var(--color-400-09)/ .035) 0px,
                 rgb(var(--color-400-09) / .40) 2px,
                 rgb(var(--color-400-05) / .25) 2px,
                 rgb(var(--color-400-07) / .03) 4px
               ),
               repeating-linear-gradient(
                 -45deg,
                 rgb(var(--color-400-09) / .02) 0px,
                 rgb(var(--color-400-05) / .28) 20%,
                 rgb(var(--color-400-09)/ .025) 1px
                
               );
  // ---------------------------------------------------------------------------
  //------ Library background 01 
  // ---------------------------------------------------------------------------
  --library-bg-gradient-01:
  linear-gradient(
      to top left,
      rgb(var(--color-400-02)),
      rgb(var(--color-400-06)),
      rgb(var(--color-400-02))
      );
// ---------------------------------------------------------------------------
//------ Modal gradient
// ---------------------------------------------------------------------------
           --modal-gradient-01:
          linear-gradient(
            37deg,
            rgb(var(--color-400-08) / .23) 20%,
            rgb(var(--color-400-05) / .26) 45%,
            rgb(var(--color-400-03) / .11) 70%,
            rgb(var(--color-400-08) / .18) 100%
          ),
          linear-gradient(
            125deg,
            rgb(var(--color-400-05) / .549) 0%,
            rgb(var(--color-400-10) / .47) 50%,
            rgb(var(--color-400-08) / .08) 100%
          ),
          repeating-linear-gradient(
            70deg,
            rgb(var(--color-400-02) / .04) 0px,
            rgb(var(--color-400-07) / .578) 2px,
            rgb(var(--color-400-09) / .03) 2px,
            rgb(var(--color-400-02) / .03) 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgb(var(--color-400-03) / .02) 0px,
            rgb(var(--color-400-08) / .441) 20%,
            rgb(var(--color-400-09) / .02) 1px,
            rgb(var(--color-400-02) / .02) 2px
          );
       // ---------------------------------------------------------------------------
       //------ Sidebar gradient
      // --------------------------------------------------------------------------- 
      --sidebar-bg-gradient:
      linear-gradient(
      37deg,
      rgb(var(--color-400-09) / .8) 20%,
      rgb(var(--color-400-04) / .78) 45%,
      rgb(var(--color-400-03) / .533) 70%,
      rgb(var(--color-400-08) / .733) 100%
    ),
    linear-gradient(
      125deg,
      rgb(var(--color-400-10) / .6) 0%,
      rgb(var(--color-400-10) / .5) 50%,
      rgb(var(--color-400-05) / .1) 100%
    ),
    repeating-linear-gradient(
      70deg,
      rgb(255 255 255 / .035) 0px,
      rgb(var(--color-400-09) / .4) 2px,
      rgb(var(--color-400-04) / .25) 2px,
      rgb(var(--color-400-10) / .03) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      rgb(var(--color-400-04)/ .02) 0px,
      rgb(var(--color-400-04) / .28) 20%,
      rgb(var(--color-400-09) / .025) 1px,
      rgb(var(--color-400-09) / .3) 2px
    );
    //--------------------------------------------------     
   //------ menu tile background active
   //--------------------------------------------------   

      --menu-tile-bg-active-gradient:
      linear-gradient(
        138deg,
        rgb(var(--color-400-03) / .81) 20%,
        rgb(var(--color-400-04) / .973) 45%,
        rgb(var(--color-400-06) / .573) 70%,
        rgb(var(--color-400-08) / .874) 100%
      ),
      linear-gradient(
        15deg,
        rgb(var(--color-400-10)) 0%,
        rgb(var(--color-400-10) / .589) 50%,
        rgb(var(--color-400-05) / .384) 100%
      ),
      repeating-linear-gradient(
        310deg,
      
        rgb(var(--color-400-06) / .578) 0.2rem,
        rgb(var(--color-400-08) / .33) 0.22rem,
        rgb(var(--color-400-09) / .03) 0.3rem
      ),
      repeating-linear-gradient(
        -45deg,
        
        rgb(var(--color-400-04) / .441) 0.1rem,
        rgb(var(--color-400-08) / .02) 0.1rem,
        rgb(var(--color-400-09)/ .62) 0.1rem
      );
      --menu-tile-bg-active-gradient-02:
      linear-gradient(
       140deg,
      rgb(var(--color-400-05) / .726) 0%,
      rgb(var(--color-400-02) / .247) 50%,
     rgb(var(--color-400-09) / .08) 100%
);


   //--------------------------------------------------     
   //------ sidebar button
   //--------------------------------------------------   

   --sidebar-button-gradient:
     linear-gradient(
    138deg,
    rgb(var(--color-400-02) / .72) 20%,
    rgb(var(--color-400-04) / .12) 45%,
    rgb(var(--color-400-07) / .37) 70%,
    rgb(var(--color-400-07) / .91) 100%
  ),
  linear-gradient(
    15deg,
    rgb(var(--color-400-10) / .249) 0%,
    rgb(var(--color-400-04) / .17) 50%,
    rgb(var(--color-400-09) / .6) 100%
  ),
  repeating-linear-gradient(
    310deg,
    rgb(var(--color-400-09) / .04) 0px,
    rgb(var(--color-400-05) / .18) 2px,
    rgb(var(--color-400-08) / .33) 2px,
    rgb(var(--color-400-10) / .63) 0px
    
  ),
  repeating-linear-gradient(
    -45deg,
    rgb(var(--color-400-09) / .02) 0px,
    rgb(var(--color-400-04) / .041) 20%,
     rgb(var(--color-400-10)/ .02) 1px,
    rgb(var(--color-400-10)/ .048) 2px
  );
   --sidebar-button-gradient-hoover:
     linear-gradient(
    138deg,
    rgb(var(--color-400-02) / .12) 20%,
    rgb(var(--color-400-09) / .12) 45%,
    rgb(var(--color-400-07) / .37) 70%,
    rgb(var(--color-400-09) / .91) 100%
  ),
  linear-gradient(
    15deg,
    rgb(var(--color-400-10) / .149) 0%,
    rgb(var(--color-400-04) / .17) 50%,
    rgb(var(--color-400-08) / .08) 100%
  ),
  repeating-linear-gradient(
    310deg,
    rgb(var(--color-400-09) / .04) 0px,
    rgb(var(--color-400-06) / .078) 2px,
    rgb(var(--color-400-07) / .33) 2px,
    rgb(var(--color-400-10) / .63) 0px
    
  ),
  repeating-linear-gradient(
    -45deg,
    rgb(var(--color-400-09) / .02) 0px,
    rgb(var(--color-400-04) / .041) 20%,
     rgb(var(--color-400-10)/ .02) 1px,
    rgb(var(--color-400-10)/ .048) 2px
  );
  `