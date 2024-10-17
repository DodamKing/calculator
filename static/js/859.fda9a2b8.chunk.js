"use strict";(self.webpackChunkcalculator=self.webpackChunkcalculator||[]).push([[859],{859:(e,t,i)=>{i.r(t),i.d(t,{default:()=>r});var l=i(43),n=i(579);const r=()=>{const[e,t]=(0,l.useState)(""),[i,r]=(0,l.useState)("sedentary"),[o,a]=(0,l.useState)("maintain"),[s,c]=(0,l.useState)(null),d={container:{maxWidth:"500px",margin:"0 auto",padding:"30px",backgroundColor:"#f0fff0",borderRadius:"10px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",fontFamily:"Arial, sans-serif"},title:{textAlign:"center",color:"#2c3e50",marginBottom:"20px"},inputGroup:{marginBottom:"20px",width:"100%"},label:{display:"block",marginBottom:"5px",color:"#34495e"},input:{width:"calc(100% - 22px)",padding:"10px",border:"1px solid #bdc3c7",borderRadius:"5px",fontSize:"16px"},select:{width:"100%",padding:"10px",border:"1px solid #bdc3c7",borderRadius:"5px",fontSize:"16px",backgroundColor:"white"},button:{width:"100%",padding:"12px",backgroundColor:"#27ae60",color:"white",border:"none",borderRadius:"5px",fontSize:"16px",cursor:"pointer",transition:"background-color 0.3s"},resultContainer:{marginTop:"30px",textAlign:"center",padding:"20px",backgroundColor:"#e8f6e9",borderRadius:"5px"},proteinValue:{fontWeight:"bold",color:"#27ae60",fontSize:"24px"},goalDescription:{fontSize:"14px",color:"#7f8c8d",marginTop:"5px"},infoText:{fontSize:"14px",color:"#7f8c8d",marginTop:"20px",textAlign:"center"}};return(0,n.jsxs)("div",{style:d.container,children:[(0,n.jsx)("h2",{style:d.title,children:"\ub2e8\ubc31\uc9c8 \uc12d\ucde8\ub7c9 \uacc4\uc0b0\uae30"}),(0,n.jsx)("div",{style:d.inputGroup,children:(0,n.jsxs)("label",{style:d.label,children:["\uccb4\uc911 (kg):",(0,n.jsx)("input",{type:"number",value:e,onChange:e=>t(e.target.value),style:d.input,placeholder:"\uc608: 70"})]})}),(0,n.jsx)("div",{style:d.inputGroup,children:(0,n.jsxs)("label",{style:d.label,children:["\ud65c\ub3d9 \uc218\uc900:",(0,n.jsxs)("select",{value:i,onChange:e=>r(e.target.value),style:d.select,children:[(0,n.jsx)("option",{value:"sedentary",children:"\uc88c\uc2dd \uc0dd\ud65c (\uac70\uc758 \uc6b4\ub3d9 \uc548 \ud568)"}),(0,n.jsx)("option",{value:"lightlyActive",children:"\uac00\ubcbc\uc6b4 \ud65c\ub3d9 (\uc8fc 1-3\ud68c \uc6b4\ub3d9)"}),(0,n.jsx)("option",{value:"active",children:"\ud65c\ub3d9\uc801 (\uc8fc 3-5\ud68c \uc6b4\ub3d9)"}),(0,n.jsx)("option",{value:"veryActive",children:"\ub9e4\uc6b0 \ud65c\ub3d9\uc801 (\uc8fc 6-7\ud68c \uaca9\ub82c\ud55c \uc6b4\ub3d9)"})]})]})}),(0,n.jsxs)("div",{style:d.inputGroup,children:[(0,n.jsxs)("label",{style:d.label,children:["\ubaa9\ud45c:",(0,n.jsxs)("select",{value:o,onChange:e=>a(e.target.value),style:d.select,children:[(0,n.jsx)("option",{value:"maintain",children:"\uccb4\uc911 \uc720\uc9c0"}),(0,n.jsx)("option",{value:"loseWeight",children:"\uccb4\uc911 \uac10\ub7c9"}),(0,n.jsx)("option",{value:"gainMuscle",children:"\uadfc\uc721 \uc99d\uac00"})]})]}),(0,n.jsx)("div",{style:d.goalDescription,children:(e=>{switch(e){case"maintain":return"\ud604\uc7ac \uccb4\uc911\uacfc \uadfc\uc721\ub7c9 \uc720\uc9c0";case"loseWeight":return"\uccb4\uc911 \uac10\ub7c9 \uc2dc \uadfc\uc721\ub7c9 \ubcf4\uc874";case"gainMuscle":return"\uadfc\uc721\ub7c9 \uc99d\uac00 \ubc0f \uccb4\ub825 \ud5a5\uc0c1";default:return""}})(o)})]}),(0,n.jsx)("button",{onClick:()=>{const t=parseFloat(e);if(isNaN(t)||t<=0)return void alert("\uc62c\ubc14\ub978 \uccb4\uc911\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.");let l;switch(i){case"sedentary":default:l=.8;break;case"lightlyActive":l=1;break;case"active":l=1.2;break;case"veryActive":l=1.4}"loseWeight"===o?l+=.2:"gainMuscle"===o&&(l+=.4);c((t*l).toFixed(1))},style:d.button,children:"\ub2e8\ubc31\uc9c8 \uc12d\ucde8\ub7c9 \uacc4\uc0b0"}),s&&(0,n.jsxs)("div",{style:d.resultContainer,children:[(0,n.jsx)("p",{children:"\uad8c\uc7a5 \uc77c\uc77c \ub2e8\ubc31\uc9c8 \uc12d\ucde8\ub7c9:"}),(0,n.jsxs)("p",{style:d.proteinValue,children:[s,"g"]})]}),(0,n.jsx)("p",{style:d.infoText,children:"\ucc38\uace0: \uc774 \uacc4\uc0b0\uae30\ub294 \uc77c\ubc18\uc801\uc778 \uc9c0\uce68\uc744 \uc81c\uacf5\ud569\ub2c8\ub2e4. \uac1c\uc778\uc758 \uac74\uac15 \uc0c1\ud0dc\ub098 \ud2b9\ubcc4\ud55c \uc694\uad6c\uc0ac\ud56d\uc5d0 \ub530\ub77c \uc2e4\uc81c \ud544\uc694\ub7c9\uc740 \ub2e4\ub97c \uc218 \uc788\uc2b5\ub2c8\ub2e4."})]})}}}]);
//# sourceMappingURL=859.fda9a2b8.chunk.js.map