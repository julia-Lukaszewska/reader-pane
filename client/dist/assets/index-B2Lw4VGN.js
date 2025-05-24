import{y as g,u as d,z as c,a as o,r as h,A as y,j as a,O as x,d as r,G as u,n as m,C as l,S as v,D as N,E as j}from"./index-CbYdQxyi.js";function L(){const{isLoading:e,isError:i}=g();return{isLoading:e,isError:i}}const M=r.div`
  display: grid;
  grid-template-rows: 10vh 1fr;
  grid-template-columns: ${({$open:e})=>e?"20rem 1fr":"0rem 1fr"};
  width: 100vw;
  height: 100vh;  
  transition: grid-template-columns 0.4s ease;
  background: var(--gradient-metal-deepblue-v7);
  color: var(--color-light-0);
`,C=r.main`
  grid-row: 2;
  grid-column: 2;
  padding: 1rem;
  overflow-y: auto;
  background-color: var(--see-07);
  z-index: 200;
`,$=()=>{const e=d(),i=c(),n=o(t=>t.ui.sidebarOpen);return L(),h.useEffect(()=>{e(y(!1))},[i.pathname,e]),a.jsxDEV(M,{$open:n,children:[a.jsxDEV(D,{},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/MainLayout.jsx",lineNumber:63,columnNumber:7},void 0),a.jsxDEV(A,{},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/MainLayout.jsx",lineNumber:64,columnNumber:7},void 0),a.jsxDEV(C,{children:a.jsxDEV(x,{},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/MainLayout.jsx",lineNumber:66,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/MainLayout.jsx",lineNumber:65,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Reader-App/client/src/layout/MainLayout/MainLayout.jsx",lineNumber:62,columnNumber:5},void 0)};function E(e){return u({attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M1016.7 513.36L536.331 10.192a31.924 31.924 0 0 0-23.088-9.84 32.038 32.038 0 0 0-23.088 9.84L7.307 513.344c-12.24 12.752-11.808 32.992.944 45.248 12.752 12.224 32.992 11.872 45.248-.944l43.007-44.832v478.832c0 17.68 14.336 32 32 32h223.552c17.632 0 31.936-14.256 32-31.905l1.008-319.664h254.992v319.568c0 17.68 14.32 32 32 32H895.53c17.68 0 32-14.32 32-32V512.655l42.992 45.04a31.997 31.997 0 0 0 23.09 9.84c7.967 0 15.967-2.944 22.16-8.944 12.736-12.224 13.152-32.48.928-45.232zm-153.165-58.544v504.831H704.063V640.095c0-17.68-14.32-32-32-32h-318.88c-17.632 0-31.936 14.256-32 31.904l-1.008 319.664H160.511V454.815c0-2.64-.416-5.168-1.008-7.632L513.263 78.56l351.424 368.208c-.688 2.592-1.152 5.264-1.152 8.048z"},child:[]}]})(e)}function S(e){return u({attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M27 193.6c-8.2-8.2-12.2-18.6-12.2-31.2s4-23 12.2-31.2S45.6 119 58.2 119h912.4c12.6 0 23 4 31.2 12.2s12.2 18.6 12.2 31.2-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2zm974.8 285.2c8.2 8.2 12.2 18.6 12.2 31.2s-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2S14.8 522.6 14.8 510s4-23 12.2-31.2 18.6-12.2 31.2-12.2h912.4c12.6 0 23 4 31.2 12.2zm0 347.4c8.2 8.2 12.2 18.6 12.2 31.2s-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2S14.8 870 14.8 857.4s4-23 12.2-31.2S45.6 814 58.2 814h912.4c12.6 0 23 4.2 31.2 12.2z"},child:[]}]})(e)}const w=r.header`  
  background:
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
  grid-row: 1;
  grid-column: 1 / 3;
  height: 10vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  border-bottom: 0.2rem solid rgba(150, 232, 255, 0.315);
  z-index: 1;
`,V=r.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  flex-grow: 1;
  text-align: center;
  margin-left: -4rem;
  font-family: 'Poppins', sans-serif;
  color: white;
  text-shadow: var(--color-);
  transition: color 0.3s ease;
`,s=r.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`,D=()=>{const e=d(),i=m(),t=c().pathname==="/",p=()=>i("/"),b=()=>e(N()),f=()=>e(j());return a.jsxDEV(w,{children:[a.jsxDEV(s,{children:[!t&&a.jsxDEV(l,{$variant:"circle_icon_btn",onClick:b,ariaLabel:"Open menu",children:a.jsxDEV(S,{},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:109,columnNumber:13},void 0)},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:104,columnNumber:11},void 0),!t&&a.jsxDEV(l,{$variant:"circle_icon_btn",onClick:p,ariaLabel:"Go to home",children:a.jsxDEV(E,{},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:118,columnNumber:13},void 0)},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:113,columnNumber:11},void 0)]},void 0,!0,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:102,columnNumber:7},void 0),a.jsxDEV(V,{children:"Pane"},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:123,columnNumber:7},void 0),a.jsxDEV(s,{children:a.jsxDEV(v,{variant:"theme",onClick:f},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:126,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:125,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Header.jsx",lineNumber:101,columnNumber:5},void 0)},H=r.div`
  grid-column: 1;
  grid-row: 2 / 3;
  background: var(--gradient-main-v2);
  color: var(--color-dark-900);
  border-right: 3px solid var(--see-akcent-02);
  display: ${({$isOpen:e})=>e?"grid":"none"};
  grid-template-rows: 5vh auto 2fr;
  overflow: hidden;
  justify-items: center;
  z-index: 1000;
  transition: all 0.4s ease;
`,A=()=>{const e=o(i=>i.ui.sidebarOpen);return a.jsxDEV(H,{$isOpen:e,children:a.jsxDEV(z,{},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Sidebar.jsx",lineNumber:42,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/Sidebar.jsx",lineNumber:41,columnNumber:5},void 0)},R=r.nav`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;  
  margin: 2rem 0;
  align-items: center;
  grid-row: 2;  

  & > * {
    transform: ${({$isOpen:e})=>e?"translateX(0)":"translateX(10vw)"};
    opacity: ${({$isOpen:e})=>e?1:0};
    filter: ${({$isOpen:e})=>e?"brightness(1)":"brightness(1.4)"};
    transition:
      opacity 0.6s ease-out,
      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 0.4s ease;
  }
`,k=[{label:"Home",path:"/"},{label:"Reader",path:"/read"},{label:"Library",path:"/library"},{label:"Import",path:"/library/import"},{label:"Archive",path:"/library/archive"},{label:"Favorites",path:"/library/favorites"},{label:"Settings",path:"/settings"}],z=()=>{const e=m(),i=o(n=>n.ui.sidebarOpen);return a.jsxDEV(R,{$isOpen:i,children:k.map(n=>a.jsxDEV(l,{$variant:"sidebar_btn",onClick:()=>e(n.path),children:n.label},n.path,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/SidebarMenu.jsx",lineNumber:67,columnNumber:9},void 0))},void 0,!1,{fileName:"C:/Reader-App/client/src/layout/MainLayout/SidebarMenu.jsx",lineNumber:65,columnNumber:5},void 0)};export{D as Header,A as Sidebar,z as SidebarMenu,$ as default};
