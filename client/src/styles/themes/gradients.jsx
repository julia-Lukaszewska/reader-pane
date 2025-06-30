import { css } from 'styled-components'
import collorPalete from './collorPalete'
export default css`

 ${collorPalete}
 // ---------------------------------------------------------------------------
 //------ Book Card Inactive 
 // ---------------------------------------------------------------------------
  --bookCard-bg-inactive:
         /* 1st layer ------------------------------------------ */
         linear-gradient(
           37deg,
           rgb(var(--color-100-10) / .36) 20%,
           rgb(var(--color-100-02) / .26) 45%,
           rgb(var(--color-100-04) / .11) 70%,
           rgb(var(--color-100-08) / .18) 100%
         ),
     
         /* 2nd layer ------------------------------------------ */
         linear-gradient(
           125deg,
           rgb(var(--color-100-05) / .55) 0%,
           rgb(var(--color-100-10) / .47) 50%,
           rgb(var(--color-100-02) / .08) 100%
         ),
     
         /* 3rd layer – stripes -------------------------------- */
         repeating-linear-gradient(
           70deg,
           rgb(var(--color-gray-01) / .04) 0px,
           rgb(var(--color-100-07) / .578) 2px,
           rgb(var(--color-gray-09) / .03) 2px,
           rgb(var(--color-gray-08) / .03) 4px
         ),
     
         /* 4th layer – cross-hatch ---------------------------- */
         repeating-linear-gradient(
           -45deg,
           rgb(var(--color-gray-01) / .02) 0px,
           rgb(var(--color-100-02) / .441) 20%,
           rgb(var(--color-gray-09) / .02) 1px,
           rgb(var(--color-gray-09) / .02) 2px
         );

  // ---------------------------------------------------------------------------
  //------ HomeView background 
  // ---------------------------------------------------------------------------
  
  --home-bg-gradient-01:
  /* 1st layer ------------------------------------------------ */
        linear-gradient(
            327deg,
          rgb(var(--color-200-04) / .188) 20%,  
          rgb(var(--color-200-06) / .215) 45%,  
          rgb(var(--color-200-02) / .345) 70%,  
          rgb(var(--color-200-04) / .435) 100%  
          ),
          
          /* 2nd layer ------------------------------------------------ */
          linear-gradient(
              37deg,
          rgb(var(--color-200-09) / .608) 20%,  
          rgb(var(--color-200-10) / .075) 45%,  
          rgb(var(--color-200-03) / .588) 70%,  
          rgb(var(--color-200-04) / .188) 100%  
        ),
        
        /* 3rd layer ------------------------------------------------ */
        linear-gradient(
            125deg,
            rgb(var(--color-200-08) / .185) 1%,   
            rgb(var(--color-gray-06) / .11) 50%,  
            rgb(var(--color-200-04) / .486) 100%   
            ),
            
            /* 4th layer – stripes ------------------------------------- */
            repeating-linear-gradient(
                190deg,
                rgb(var(--color-gray-01) / .055) 0px,
                rgb(var(--color-200-01) / .459) 0px, 
                rgb(var(--color-200-04) / .171) 2px, 
                rgb(var(--color-gray-05) / .651) 3px  
                ),
                
         /* 5th layer – cross-hatch -------------------------------- */
         repeating-linear-gradient(
             -45deg,
             rgb(var(--color-gray-01) / .253) 9px,
             rgb(var(--color-200-04) / .63)  20%, 
             rgb(var(--color-200-02) / .425) 1px,
             rgb(var(--color-gray-01) / .966) 0px
             );
             
                    
                    
   // ---------------------------------------------------------------------------
   //------ Header background 
   // ---------------------------------------------------------------------------
   --header-gradient-01:
   /* 1st layer -------------------------------------------------------- */
   linear-gradient(
            37deg,
            rgb(var(--color-100-08) / .23) 20%,  
            rgb(var(--color-100-05) / .26) 45%,  
            rgb(var(--color-100-08) / .11) 70%,   
            rgb(var(--color-100-09) / .18) 100%  
          ),
      
          /* 2nd layer -------------------------------------------------------- */
          linear-gradient(
            125deg,
            rgb(var(--color-100-09) / .55) 0%,    
            rgb(var(--color-100-10) / .47) 50%,   
            rgb(var(--color-100-08) / .58) 100%   
          ),
      
          /* 3rd layer – stripes --------------------------------------------- */
          repeating-linear-gradient(
            70deg,
            rgb(var(--color-gray-03)  / .04) 0px,    
            rgb(var(--color-100-04) / .578) 2px,  
            rgb(var(--color-200-03) / .03)  2px,   
            rgb(var(--color-100-02) / .03) 4px     
            ),
            
            /* 4th layer – cross-hatch ----------------------------------------- */
            repeating-linear-gradient(
            -45deg,
           rgb(var(--color-gray-01)/ .02)  0px,  
           rgb(var(--color-100-07) / .441) 20%,  
            rgb(var(--color-gray-04) / .02)   1px,  
            rgb(var(--color-gray-09)  / .02)   2px   
            );

            
            // ---------------------------------------------------------------------------
            //------ Library toolbat background 
            // ---------------------------------------------------------------------------
             --library-toolbar-gradient-01:
               linear-gradient(
                 37deg,
                 rgb(var(--color-100-09) / .80) 20%,
                 rgb(var(--color-100-05) / .78) 45%,
                 rgb(var(--color-100-04) / .53) 70%,
                 rgb(var(--color-100-08) / .73) 100%
               ),
               linear-gradient(
                 125deg,
                 rgb(var(--color-100-10) / .60) 0%,
                 rgb(var(--color-100-10) / .50) 50%,
                 rgb(var(--color-100-07) / .10) 100%
               ),
               repeating-linear-gradient(
                 70deg,
                 rgb(255 255 255 / .035) 0px,
                 rgb(var(--color-100-09) / .40) 2px,
                 rgb(var(--color-100-05) / .25) 2px,
                 rgb(var(--color-100-07) / .03) 4px
               ),
               repeating-linear-gradient(
                 -45deg,
                 rgb(var(--color-gray-09) / .02) 0px,
                 rgb(var(--color-100-05) / .28) 20%,
                 rgb(var(--color-gray-09)/ .025) 1px
                
               );
  // ---------------------------------------------------------------------------
  //------ Library background 01 
  // ---------------------------------------------------------------------------
  --library-bg-gradient-01:
  linear-gradient(
      to top left,
      rgb(var(--color-100-01)),
      rgb(var(--color-100-08)),
      rgb(var(--color-100-02))
      );
// ---------------------------------------------------------------------------
//------ Modal gradient
// ---------------------------------------------------------------------------
           --modal-gradient-01:
          linear-gradient(
            37deg,
            rgb(var(--color-100-08) / .23) 20%,
            rgb(var(--color-100-05) / .26) 45%,
            rgb(var(--color-100-03) / .11) 70%,
            rgb(var(--color-100-08) / .18) 100%
          ),
          linear-gradient(
            125deg,
            rgb(var(--color-100-05) / .549) 0%,
            rgb(var(--color-100-10) / .47) 50%,
            rgb(var(--color-100-08) / .08) 100%
          ),
          repeating-linear-gradient(
            70deg,
            rgb(var(--color-gray-02) / .04) 0px,
            rgb(var(--color-100-07) / .578) 2px,
            rgb(var(--color-100-09) / .03) 2px,
            rgb(var(--color-gray-02) / .03) 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgb(var(--color-gray-03) / .02) 0px,
            rgb(var(--color-100-08) / .441) 20%,
            rgb(var(--color-gray-09) / .02) 1px,
            rgb(var(--color-gray-02) / .02) 2px
          );
       // ---------------------------------------------------------------------------
       //------ Sidebar gradient
      // --------------------------------------------------------------------------- 
      --sidebar-bg-gradient:
      linear-gradient(
      37deg,
      rgb(var(--color-200-09) / .8) 20%,
      rgb(var(--color-200-04) / .78) 45%,
      rgb(var(--color-200-03) / .533) 70%,
      rgb(var(--color-200-08) / .733) 100%
    ),
    linear-gradient(
      125deg,
      rgb(var(--color-200-10) / .6) 0%,
      rgb(var(--color-200-10) / .5) 50%,
      rgb(var(--color-200-05) / .1) 100%
    ),
    repeating-linear-gradient(
      70deg,
      rgb(255 255 255 / .035) 0px,
      rgb(var(--color-200-09) / .4) 2px,
      rgb(var(--color-200-04) / .25) 2px,
      rgb(var(--color-200-10) / .03) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      rgb(var(--color-200-04)/ .02) 0px,
      rgb(var(--color-200-04) / .28) 20%,
      rgb(var(--color-200-09) / .025) 1px,
      rgb(var(--color-200-09) / .3) 2px
    );
    //--------------------------------------------------     
   //------ menu tile background active
   //--------------------------------------------------   

      --menu-tile-bg-active-gradient:
      linear-gradient(
        138deg,
        rgb(var(--color-200-03) / .81) 20%,
        rgb(var(--color-200-04) / .973) 45%,
        rgb(var(--color-200-06) / .573) 70%,
        rgb(var(--color-200-08) / .874) 100%
      ),
      linear-gradient(
        15deg,
        rgb(var(--color-200-10)) 0%,
        rgb(var(--color-200-10) / .589) 50%,
        rgb(var(--color-200-05) / .384) 100%
      ),
      repeating-linear-gradient(
        310deg,
        rgb(255 255 255 / .04) 0rem,
        rgb(var(--color-200-09) / .578) 0.2rem,
        rgb(var(--color-200-08) / .33) 0.22rem,
        rgb(var(--color-200-09) / .03) 0.3rem
      ),
      repeating-linear-gradient(
        -45deg,
        rgb(255 255 255 / .02) 0rem,
        rgb(var(--color-200-04) / .441) 0.1rem,
        rgb(0 0 0 / .02) 0.1rem,
        rgb(0 0 0 / .062) 0.1rem
      );
      --menu-tile-bg-active-gradient-02:
      linear-gradient(
       140deg,
      rgb(var(--color-200-05) / .726) 0%,
      rgb(var(--color-200-02) / .247) 50%,
     rgb(var(--color-200-09) / .08) 100%
);
  `