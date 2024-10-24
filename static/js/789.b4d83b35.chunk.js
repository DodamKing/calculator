"use strict";(self.webpackChunkcalculator=self.webpackChunkcalculator||[]).push([[789],{4789:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});var o=n(5043),i=n(579);const r=()=>{const[e,t]=(0,o.useState)(""),[n,r]=(0,o.useState)(""),[l,s]=(0,o.useState)("male"),[a,d]=(0,o.useState)(null),[p,x]=(0,o.useState)(window.innerWidth<=768);(0,o.useEffect)((()=>{const e=()=>x(window.innerWidth<=768);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]);const c={container:{margin:"0 auto",padding:p?"15px":"30px",backgroundColor:"#E3F2FD",borderRadius:"10px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",fontFamily:"Arial, sans-serif"},title:{textAlign:"center",color:"#1565C0",marginBottom:"20px",fontSize:p?"24px":"28px"},form:{display:"grid",gap:"15px",gridTemplateColumns:p?"1fr":"1fr 1fr"},label:{display:"block",marginBottom:"5px",color:"#1565C0",fontSize:"14px"},input:{width:"100%",padding:"10px",border:"1px solid #64B5F6",borderRadius:"5px",fontSize:"16px",boxSizing:"border-box"},select:{width:"100%",padding:"10px",border:"1px solid #64B5F6",borderRadius:"5px",fontSize:"16px",backgroundColor:"white",boxSizing:"border-box"},button:{gridColumn:"1 / -1",padding:"12px",backgroundColor:"#1565C0",color:"white",border:"none",borderRadius:"5px",fontSize:"18px",cursor:"pointer",transition:"background-color 0.3s"},resultContainer:{marginTop:"20px",padding:"15px",backgroundColor:"#BBDEFB",borderRadius:"5px"},resultText:{fontSize:"16px",marginBottom:"10px",color:"#1565C0"},infoSection:{marginTop:"20px"},infoItem:{backgroundColor:"#FFF",borderRadius:"5px",padding:"15px",marginBottom:"10px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},infoTitle:{fontWeight:"bold",color:"#1565C0",marginBottom:"10px",fontSize:"16px"},infoContent:{color:"#333",fontSize:"14px",whiteSpace:"pre-line"}},u=e=>{let{title:t,content:n}=e;return(0,i.jsxs)("div",{style:c.infoItem,children:[(0,i.jsx)("div",{style:c.infoTitle,children:t}),(0,i.jsx)("div",{style:c.infoContent,children:n})]})};return(0,i.jsxs)("div",{style:c.container,children:[(0,i.jsx)("h2",{style:c.title,children:"\ud5c8\ub9ac \uc5c9\ub369\uc774 \ube44\uc728(WHR) \uacc4\uc0b0\uae30"}),(0,i.jsxs)("div",{style:c.form,children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{style:c.label,children:"\ud5c8\ub9ac \ub458\ub808 (cm)"}),(0,i.jsx)("input",{style:c.input,type:"number",value:e,onChange:e=>t(e.target.value),placeholder:"\uc608: 80"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{style:c.label,children:"\uc5c9\ub369\uc774 \ub458\ub808 (cm)"}),(0,i.jsx)("input",{style:c.input,type:"number",value:n,onChange:e=>r(e.target.value),placeholder:"\uc608: 100"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{style:c.label,children:"\uc131\ubcc4"}),(0,i.jsxs)("select",{style:c.select,value:l,onChange:e=>s(e.target.value),children:[(0,i.jsx)("option",{value:"male",children:"\ub0a8\uc131"}),(0,i.jsx)("option",{value:"female",children:"\uc5ec\uc131"})]})]}),(0,i.jsx)("button",{style:c.button,onClick:()=>{if(!e||!n)return void alert("\ud5c8\ub9ac \ub458\ub808\uc640 \uc5c9\ub369\uc774 \ub458\ub808\ub97c \ubaa8\ub450 \uc785\ub825\ud574\uc8fc\uc138\uc694.");const t=parseFloat(e),o=parseFloat(n);if(t>=o)return void alert("\ud5c8\ub9ac \ub458\ub808\ub294 \uc5c9\ub369\uc774 \ub458\ub808\ubcf4\ub2e4 \uc791\uc544\uc57c \ud569\ub2c8\ub2e4.");const i=t/o;let r="";r="male"===l?i<.9?"\uc815\uc0c1":i<1?"\uacfc\uccb4\uc911 \uc704\ud5d8":"\ube44\ub9cc":i<.8?"\uc815\uc0c1":i<.85?"\uacfc\uccb4\uc911 \uc704\ud5d8":"\ube44\ub9cc",d({whr:i.toFixed(2),interpretation:r})},children:"WHR \uacc4\uc0b0\ud558\uae30"})]}),a&&(0,i.jsxs)("div",{style:c.resultContainer,children:[(0,i.jsxs)("p",{style:c.resultText,children:["WHR: ",a.whr]}),(0,i.jsxs)("p",{style:c.resultText,children:["\ud574\uc11d: ",a.interpretation]})]}),(0,i.jsxs)("div",{style:c.infoSection,children:[(0,i.jsx)(u,{title:"WHR\uc774\ub780?",content:"\ud5c8\ub9ac \uc5c9\ub369\uc774 \ube44\uc728(Waist-to-Hip Ratio, WHR)\uc740 \ubcf5\ubd80 \ube44\ub9cc\uc744 \ud3c9\uac00\ud558\ub294 \uc9c0\ud45c\uc785\ub2c8\ub2e4. \ud5c8\ub9ac \ub458\ub808\ub97c \uc5c9\ub369\uc774 \ub458\ub808\ub85c \ub098\ub208 \uac12\uc73c\ub85c, \uac74\uac15 \uc704\ud5d8\uc744 \uc608\uce21\ud558\ub294 \ub370 \uc0ac\uc6a9\ub429\ub2c8\ub2e4."}),(0,i.jsx)(u,{title:"WHR \ud574\uc11d",content:"\ub0a8\uc131:\n0.9 \ubbf8\ub9cc: \uc815\uc0c1\n0.9-1.0: \uacfc\uccb4\uc911 \uc704\ud5d8\n1.0 \uc774\uc0c1: \ube44\ub9cc\n\n\uc5ec\uc131:\n0.8 \ubbf8\ub9cc: \uc815\uc0c1\n0.8-0.85: \uacfc\uccb4\uc911 \uc704\ud5d8\n0.85 \uc774\uc0c1: \ube44\ub9cc"}),(0,i.jsx)(u,{title:"\uc8fc\uc758\uc0ac\ud56d",content:"WHR\uc740 \uac74\uac15 \uc0c1\ud0dc\ub97c \ud3c9\uac00\ud558\ub294 \uc5ec\ub7ec \uc9c0\ud45c \uc911 \ud558\ub098\uc785\ub2c8\ub2e4. \uc815\ud655\ud55c \uac74\uac15 \ud3c9\uac00\ub97c \uc704\ud574\uc11c\ub294 \uc758\ub8cc \uc804\ubb38\uac00\uc640 \uc0c1\ub2f4\ud558\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4."})]})]})}}}]);
//# sourceMappingURL=789.b4d83b35.chunk.js.map