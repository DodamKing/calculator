"use strict";(self.webpackChunkcalculator=self.webpackChunkcalculator||[]).push([[534],{5534:(e,t,l)=>{l.r(t),l.d(t,{default:()=>p});var n=l(5043),i=l(108),r=l(9282),s=l(3439),a=l(7869),o=l(1327),d=l(579);const p=()=>{const[e,t]=(0,n.useState)(""),[l,p]=(0,n.useState)(""),[u,x]=(0,n.useState)(""),[c,h]=(0,n.useState)(""),[b,g]=(0,n.useState)("0"),[y,j]=(0,n.useState)("equalPrincipalAndInterest"),[m,v]=(0,n.useState)(null),[f,C]=(0,n.useState)(window.innerWidth<=768);(0,n.useEffect)((()=>{const e=()=>C(window.innerWidth<=768);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]);const S=e=>e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),F={container:{maxWidth:f?"100%":"600px",margin:"0 auto",padding:f?"15px":"30px",backgroundColor:"#E8F5E9",borderRadius:"10px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",fontFamily:"Arial, sans-serif"},title:{textAlign:"center",color:"#2E7D32",marginBottom:"20px",fontSize:f?"24px":"28px"},form:{display:"grid",gap:"15px",gridTemplateColumns:f?"1fr":"1fr 1fr"},fullWidth:{gridColumn:"1 / -1"},label:{display:"block",marginBottom:"5px",color:"#2E7D32",fontSize:"14px"},input:{width:"100%",padding:"10px",border:"1px solid #81C784",borderRadius:"5px",fontSize:"16px",boxSizing:"border-box"},select:{width:"100%",padding:"10px",border:"1px solid #81C784",borderRadius:"5px",fontSize:"16px",backgroundColor:"white",boxSizing:"border-box"},button:{gridColumn:"1 / -1",padding:"12px",backgroundColor:"#2E7D32",color:"white",border:"none",borderRadius:"5px",fontSize:"18px",cursor:"pointer",transition:"background-color 0.3s"},resultContainer:{marginTop:"20px",padding:"15px",backgroundColor:"#C8E6C9",borderRadius:"5px"},resultItem:{margin:"10px 0",fontSize:"16px",color:"#2E7D32"},resultValue:{fontWeight:"bold",color:"#2E7D32",fontSize:"18px"},chartContainer:{height:"300px",marginTop:"20px"},infoSection:{marginTop:"20px"},infoItem:{backgroundColor:"#FFF",borderRadius:"5px",padding:"15px",marginBottom:"10px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},infoTitle:{fontWeight:"bold",color:"#2E7D32",marginBottom:"10px",fontSize:"16px"},infoContent:{color:"#333",fontSize:"14px",whiteSpace:"pre-line",lineHeight:"1.5"}},w=["#0088FE","#00C49F","#FFBB28"];return(0,d.jsxs)("div",{style:F.container,children:[(0,d.jsx)("h2",{style:F.title,children:"\uc0c1\uc138 \uc8fc\ud0dd\ub2f4\ubcf4\ub300\ucd9c \uacc4\uc0b0\uae30"}),(0,d.jsxs)("div",{style:F.form,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:F.label,children:"\uc8fc\ud0dd \uac00\uce58 (\uc6d0)"}),(0,d.jsx)("input",{type:"number",value:e,onChange:e=>t(e.target.value),style:F.input,placeholder:"\uc608: 300000000"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:F.label,children:"\ub300\ucd9c \uae08\uc561 (\uc6d0)"}),(0,d.jsx)("input",{type:"number",value:l,onChange:e=>p(e.target.value),style:F.input,placeholder:"\uc608: 200000000"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:F.label,children:"\uc5f0 \uc774\uc790\uc728 (%)"}),(0,d.jsx)("input",{type:"number",value:u,onChange:e=>x(e.target.value),style:F.input,placeholder:"\uc608: 3.5"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:F.label,children:"\ub300\ucd9c \uae30\uac04 (\ub144)"}),(0,d.jsx)("input",{type:"number",value:c,onChange:e=>h(e.target.value),style:F.input,placeholder:"\uc608: 30"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:F.label,children:"\uac70\uce58 \uae30\uac04 (\ub144)"}),(0,d.jsx)("input",{type:"number",value:b,onChange:e=>g(e.target.value),style:F.input,placeholder:"\uc608: 1"})]}),(0,d.jsxs)("div",{style:F.fullWidth,children:[(0,d.jsx)("label",{style:F.label,children:"\uc0c1\ud658 \ubc29\uc2dd"}),(0,d.jsxs)("select",{value:y,onChange:e=>j(e.target.value),style:F.select,children:[(0,d.jsx)("option",{value:"equalPrincipalAndInterest",children:"\uc6d0\ub9ac\uae08\uade0\ub4f1\uc0c1\ud658"}),(0,d.jsx)("option",{value:"equalPrincipal",children:"\uc6d0\uae08\uade0\ub4f1\uc0c1\ud658"}),(0,d.jsx)("option",{value:"bulletPayment",children:"\ub9cc\uae30\uc77c\uc2dc\uc0c1\ud658"}),(0,d.jsx)("option",{value:"interestOnlyThenAmortizing",children:"\uac70\uce58\uc2dd (\uc774\uc790\ub9cc \ub0a9\ubd80 \ud6c4 \uc6d0\ub9ac\uae08 \uade0\ub4f1)"})]})]}),(0,d.jsx)("button",{onClick:()=>{const t=parseFloat(l),n=parseFloat(u)/100,i=n/12,r=12*parseFloat(c),s=12*parseFloat(b),a=parseFloat(e);if(t>0&&n>0&&r>0&&a>0){let e,l,n;if("equalPrincipalAndInterest"===y)e=t*(i*Math.pow(1+i,r-s))/(Math.pow(1+i,r-s)-1),l=e*(r-s)+t*i*s;else if("equalPrincipal"===y){const n=t/(r-s);l=0;for(let e=1;e<=r;e++)l+=e<=s?t*i:n+(t-n*(e-s-1))*i;e=l/r}else if("bulletPayment"===y)e=t*i,l=e*r+t;else if("interestOnlyThenAmortizing"===y){const n=r-s;l=t*i*s+t*(i*Math.pow(1+i,n))/(Math.pow(1+i,n)-1)*n,e=l/r}n=l-t;const o=t/a*100;v({monthlyPayment:e.toFixed(0),totalPayment:l.toFixed(0),totalInterest:n.toFixed(0),ltvRatio:o.toFixed(2),principal:t.toFixed(0)})}else v(null)},style:F.button,children:"\ub300\ucd9c \uacc4\uc0b0\ud558\uae30"})]}),m&&(0,d.jsxs)("div",{style:F.resultContainer,children:[(0,d.jsx)("div",{style:F.resultItem,children:(0,d.jsxs)("p",{children:["\uc6d4 \uc0c1\ud658\uae08 (\ud3c9\uade0): ",(0,d.jsxs)("span",{style:F.resultValue,children:[S(m.monthlyPayment),"\uc6d0"]})]})}),(0,d.jsx)("div",{style:F.resultItem,children:(0,d.jsxs)("p",{children:["\ucd1d \uc0c1\ud658\uae08\uc561: ",(0,d.jsxs)("span",{style:F.resultValue,children:[S(m.totalPayment),"\uc6d0"]})]})}),(0,d.jsx)("div",{style:F.resultItem,children:(0,d.jsxs)("p",{children:["\ucd1d \uc774\uc790: ",(0,d.jsxs)("span",{style:F.resultValue,children:[S(m.totalInterest),"\uc6d0"]})]})}),(0,d.jsx)("div",{style:F.resultItem,children:(0,d.jsxs)("p",{children:["LTV (\ub2f4\ubcf4\uc778\uc815\ube44\uc728): ",(0,d.jsxs)("span",{style:F.resultValue,children:[m.ltvRatio,"%"]})]})}),(0,d.jsx)("div",{style:F.chartContainer,children:(0,d.jsx)(i.u,{width:"100%",height:"100%",children:(0,d.jsxs)(r.r,{children:[(0,d.jsx)(s.F,{data:[{name:"\uc6d0\uae08",value:parseFloat(m.principal)},{name:"\uc774\uc790",value:parseFloat(m.totalInterest)}],cx:"50%",cy:"50%",labelLine:!1,outerRadius:80,fill:"#8884d8",dataKey:"value",label:e=>{let{name:t,percent:l}=e;return`${t} ${(100*l).toFixed(0)}%`},children:[0,1].map(((e,t)=>(0,d.jsx)(a.f,{fill:w[t%w.length]},`cell-${t}`)))}),(0,d.jsx)(o.s,{})]})})})]}),(0,d.jsx)("div",{style:F.infoSection,children:(0,d.jsxs)("div",{style:F.infoItem,children:[(0,d.jsx)("div",{style:F.infoTitle,children:"\uc8fc\ud0dd\ub2f4\ubcf4\ub300\ucd9c \uacc4\uc0b0\uae30 \uc0ac\uc6a9 \ud301"}),(0,d.jsx)("div",{style:F.infoContent,children:"\u2022 LTV(\ub2f4\ubcf4\uc778\uc815\ube44\uc728)\ub294 \ub300\ucd9c \uae08\uc561\uc744 \uc8fc\ud0dd \uac00\uce58\ub85c \ub098\ub208 \ube44\uc728\uc785\ub2c8\ub2e4. \uc77c\ubc18\uc801\uc73c\ub85c LTV\uac00 \ub0ae\uc744\uc218\ub85d \ub300\ucd9c \uc870\uac74\uc774 \uc720\ub9ac\ud569\ub2c8\ub2e4.\n\n\u2022 \uac70\uce58 \uae30\uac04 \ub3d9\uc548\uc740 \uc774\uc790\ub9cc \ub0a9\ubd80\ud558\uace0 \uc6d0\uae08 \uc0c1\ud658\uc740 \ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.\n\n\u2022 \uc6d0\ub9ac\uae08\uade0\ub4f1\uc0c1\ud658: \ub9e4\uc6d4 \ub3d9\uc77c\ud55c \uae08\uc561\uc744 \uc0c1\ud658\ud569\ub2c8\ub2e4. \ucd08\uae30\uc5d0\ub294 \uc774\uc790 \ube44\uc911\uc774 \ub192\uace0, \ub098\uc911\uc5d0\ub294 \uc6d0\uae08 \ube44\uc911\uc774 \ub192\uc544\uc9d1\ub2c8\ub2e4.\n\n\u2022 \uc6d0\uae08\uade0\ub4f1\uc0c1\ud658: \ub9e4\uc6d4 \ub3d9\uc77c\ud55c \uc6d0\uae08\uacfc \uc794\uc561\uc5d0 \ub300\ud55c \uc774\uc790\ub97c \uc0c1\ud658\ud569\ub2c8\ub2e4. \ucd08\uae30 \uc0c1\ud658 \ubd80\ub2f4\uc774 \ud06c\uc9c0\ub9cc, \ucd1d \uc774\uc790 \ubd80\ub2f4\uc774 \uc801\uc2b5\ub2c8\ub2e4.\n\n\u2022 \ub9cc\uae30\uc77c\uc2dc\uc0c1\ud658: \ub300\ucd9c \uae30\uac04 \ub3d9\uc548 \uc774\uc790\ub9cc \ub0a9\ubd80\ud558\uace0, \ub9cc\uae30\uc5d0 \uc6d0\uae08\uc744 \uc77c\uc2dc \uc0c1\ud658\ud569\ub2c8\ub2e4.\n\n\u2022 \uac70\uce58\uc2dd (\uc774\uc790\ub9cc \ub0a9\ubd80): \uc77c\uc815 \uae30\uac04 \ub3d9\uc548 \uc774\uc790\ub9cc \ub0a9\ubd80\ud558\uace0, \uc774\ud6c4 \uc6d0\ub9ac\uae08\uc744 \uc0c1\ud658\ud569\ub2c8\ub2e4.\n\n\u2022 \uc2e4\uc81c \ub300\ucd9c \uc870\uac74\uc740 \uac1c\uc778\uc758 \uc2e0\uc6a9\ub3c4, \uc18c\ub4dd, \uae30\ud0c0 \uc694\uc778\uc5d0 \ub530\ub77c \ub2ec\ub77c\uc9c8 \uc218 \uc788\uc73c\ubbc0\ub85c, \uc815\ud655\ud55c \uc870\uac74\uc740 \uc740\ud589 \uc0c1\ub2f4\uc744 \ud1b5\ud574 \ud655\uc778\ud558\uc138\uc694."})]})})]})}}}]);
//# sourceMappingURL=534.d82d34a1.chunk.js.map