import{a8 as A}from"./index-76c13b81.js";import{u as B}from"./vuex-44de225f.js";import{u as E}from"./vue-router-e5a2430e.js";import{j as z}from"./vooks-6d99783e.js";import{a3 as C,a4 as N,a5 as P,a6 as D}from"./@vicons-f0266f88.js";import{u as R,a3 as x,a4 as H,j as I,e as V,a5 as $,h as j}from"./naive-ui-eecf2ec3.js";import{d as q,H as h,b as F,e as n,f,bf as a,k as e,w as t,Y as c,j as L,q as _,A as U,x as Y,F as G}from"./@vue-a481fc63.js";const J={key:0},K={class:"navbar"},ae=q({__name:"main-nav",props:{title:{default:""},back:{type:Boolean,default:!1},theme:{type:Boolean,default:!0}},setup(w){const i=w,o=B(),m=E(),l=h(!1),g=h("left"),u=s=>{s?(localStorage.setItem("PAOPAO_THEME","dark"),o.commit("triggerTheme","dark")):(localStorage.setItem("PAOPAO_THEME","light"),o.commit("triggerTheme","light"))},k=()=>{window.history.length<=1?m.push({path:"/"}):m.go(-1)},v=()=>{l.value=!0};return F(()=>{localStorage.getItem("PAOPAO_THEME")||u(z()==="dark"),o.state.desktopModelShow||(window.$store=o,window.$message=R())}),(s,d)=>{const b=A,y=x,M=H,r=I,p=V,O=$,S=j;return n(),f(G,null,[a(o).state.drawerModelShow?(n(),f("div",J,[e(M,{show:l.value,"onUpdate:show":d[0]||(d[0]=T=>l.value=T),width:212,placement:g.value,resizable:""},{default:t(()=>[e(y,null,{default:t(()=>[e(b)]),_:1})]),_:1},8,["show","placement"])])):c("",!0),e(S,{size:"small",bordered:!0,class:"nav-title-card"},{header:t(()=>[L("div",K,[a(o).state.drawerModelShow&&!s.back?(n(),_(p,{key:0,class:"drawer-btn",onClick:v,quaternary:"",circle:"",size:"medium"},{icon:t(()=>[e(r,null,{default:t(()=>[e(a(C))]),_:1})]),_:1})):c("",!0),s.back?(n(),_(p,{key:1,class:"back-btn",onClick:k,quaternary:"",circle:"",size:"small"},{icon:t(()=>[e(r,null,{default:t(()=>[e(a(N))]),_:1})]),_:1})):c("",!0),U(" "+Y(i.title)+" ",1),i.theme?(n(),_(O,{key:2,value:a(o).state.theme==="dark","onUpdate:value":u,size:"small",class:"theme-switch-wrap"},{"checked-icon":t(()=>[e(r,{component:a(P)},null,8,["component"])]),"unchecked-icon":t(()=>[e(r,{component:a(D)},null,8,["component"])]),_:1},8,["value"])):c("",!0)])]),_:1})],64)}}});export{ae as _};
