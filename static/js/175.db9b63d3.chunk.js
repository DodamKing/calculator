"use strict";(self.webpackChunkcalculator=self.webpackChunkcalculator||[]).push([[175],{8175:(t,e,n)=>{n.r(e),n.d(e,{default:()=>i});var r=n(5043),o=n(579);const i=()=>{const[t,e]=(0,r.useState)([]),[n,i]=(0,r.useState)(0),[s,l]=(0,r.useState)(!1),[c,a]=(0,r.useState)(5),[d,u]=(0,r.useState)(window.innerWidth<=768),x=(0,r.useRef)(null),p=(0,r.useRef)(null);(0,r.useEffect)((()=>{const t=()=>{u(window.innerWidth<=768)};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)}),[]);const h=(0,r.useCallback)((()=>{if(t.length<2)return 0;const e=[];for(let r=1;r<t.length;r++)e.push(t[r]-t[r-1]);const n=e.reduce(((t,e)=>t+e),0)/e.length;return Math.round(6e4/n)}),[t]);(0,r.useEffect)((()=>(s&&(x.current=setInterval((()=>{const t=(Date.now()-p.current)/1e3,e=Math.max(5-Math.floor(t),0);if(a(e),0===e){l(!1),clearInterval(x.current);const t=h();i(t)}}),100)),()=>{x.current&&clearInterval(x.current)})),[s,h]);const f={container:{margin:"0 auto",padding:d?"15px":"30px",backgroundColor:"#f0f8ff",borderRadius:"10px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",fontFamily:"Arial, sans-serif"},title:{textAlign:"center",color:"#333333",marginBottom:"20px",fontSize:d?"24px":"28px"},button:{width:"100%",padding:"15px",fontSize:d?"16px":"18px",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",transition:"background-color 0.3s",marginBottom:"10px"},startButton:{backgroundColor:"#2196F3"},tapButton:{backgroundColor:s?"#4CAF50":"#cccccc"},resultContainer:{marginTop:"20px",textAlign:"center"},bpmDisplay:{fontSize:d?"36px":"48px",fontWeight:"bold",color:"#2c5282"},timeRemaining:{fontSize:d?"16px":"18px",color:"#666666",marginTop:"10px"},instructions:{marginTop:"20px",padding:"15px",backgroundColor:"#e8f0fe",borderRadius:"5px",fontSize:d?"14px":"16px"}};return(0,o.jsxs)("div",{style:f.container,children:[(0,o.jsx)("h2",{style:f.title,children:"\uc74c\uc545 BPM \uacc4\uc0b0\uae30"}),(0,o.jsx)("button",{style:{...f.button,...f.startButton},onClick:()=>{l(!0),a(5),p.current=Date.now(),e([]),i(0)},disabled:s,children:"BPM \uce21\uc815 \uc2dc\uc791"}),(0,o.jsx)("button",{style:{...f.button,...f.tapButton},onClick:()=>{s&&e((t=>[...t,Date.now()]))},disabled:!s,children:"\ube44\ud2b8\uc5d0 \ub9de\ucdb0 \ud0ed\ud558\uc138\uc694!"}),(0,o.jsxs)("div",{style:f.resultContainer,children:[(0,o.jsxs)("div",{style:f.bpmDisplay,children:[n," BPM"]}),s&&(0,o.jsxs)("div",{style:f.timeRemaining,children:["\ub0a8\uc740 \uc2dc\uac04: ",c,"\ucd08"]})]}),(0,o.jsxs)("div",{style:f.instructions,children:[(0,o.jsx)("h4",{children:"\uc0ac\uc6a9 \ubc29\ubc95:"}),(0,o.jsxs)("ol",{children:[(0,o.jsx)("li",{children:"'BPM \uce21\uc815 \uc2dc\uc791' \ubc84\ud2bc\uc744 \ud074\ub9ad\ud558\uc5ec \uce21\uc815\uc744 \uc2dc\uc791\ud569\ub2c8\ub2e4."}),(0,o.jsx)("li",{children:"\uc74c\uc545\uc774 \uc7ac\uc0dd\ub418\uba74 '\ube44\ud2b8\uc5d0 \ub9de\ucdb0 \ud0ed\ud558\uc138\uc694!' \ubc84\ud2bc\uc744 5\ucd08 \ub3d9\uc548 \ud0ed\ud569\ub2c8\ub2e4."}),(0,o.jsx)("li",{children:"5\ucd08 \ud6c4 \uc790\ub3d9\uc73c\ub85c BPM\uc774 \uacc4\uc0b0\ub418\uace0 \ud45c\uc2dc\ub429\ub2c8\ub2e4."}),(0,o.jsx)("li",{children:"\ub2e4\uc2dc \uce21\uc815\ud558\ub824\uba74 'BPM \uce21\uc815 \uc2dc\uc791' \ubc84\ud2bc\uc744 \ud074\ub9ad\ud558\uc138\uc694."})]})]})]})}}}]);
//# sourceMappingURL=175.db9b63d3.chunk.js.map