import{u as m,a as o,s as M,b as v,c as B,e as j,f as b,g as w,r,h as I,j as e,L as y,i as E,O as L,B as O,k as S,l as C,d as P}from"./index-8dlqaOPT.js";const R=P.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
`;function U(){const l=m(),t=o(M),u=o(v),f=o(B),g=o(j),k=o(b),{data:a=[],refetch:i,isLoading:p,isError:x}=w(void 0,{refetchOnMountOrArgChange:!0}),n=r.useMemo(()=>a.filter(s=>{var d;return s&&s._id&&((d=s.meta)==null?void 0:d.fileUrl)&&typeof s.meta.fileUrl=="string"}),[a]),h=r.useMemo(()=>I(n,t),[n,t]);r.useEffect(()=>{localStorage.setItem("sortMode",t)},[t]),r.useEffect(()=>{i()},[i]);const c=h.find(s=>s._id===k);return p?e.jsx(y,{}):x?e.jsx("div",{children:"Error loading books."}):e.jsxs(R,{children:[e.jsx(E,{}),e.jsx(L,{}),u&&f.length>0&&e.jsx(O,{}),g&&c&&e.jsx(S,{book:c,onClose:()=>l(C())})]})}export{U as default};
