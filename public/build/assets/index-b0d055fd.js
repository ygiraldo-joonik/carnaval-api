import{a as _n,j as _t,d as Wt,r as g,n as W,F as St}from"./app-9aee19dd.js";const ie=({onSearch:n,placeholder:o="Buscar...",rightContent:t})=>_n("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:_n("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:_t("div",{className:"p-4 bg-white border-b border-gray-200 flex justify-between",children:[_n("input",{type:"text",placeholder:o,onChange:r=>n(r.target.value),className:"border border-gray-300 rounded-md p-2"}),t]})})}),Vt=(n=5,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")=>{let t="";for(let r=0;r<n;r++){const e=Math.floor(Math.random()*o.length);t+=o[e]}return t},Un=Math.min,Mn=Math.max,Eo=Math.round,Ao=Math.floor,yn=n=>({x:n,y:n}),Yt={left:"right",right:"left",bottom:"top",top:"bottom"},Kt={start:"end",end:"start"};function Wo(n,o,t){return Mn(n,Un(o,t))}function go(n,o){return typeof n=="function"?n(o):n}function Ln(n){return n.split("-")[0]}function vo(n){return n.split("-")[1]}function At(n){return n==="x"?"y":"x"}function Jo(n){return n==="y"?"height":"width"}function Jn(n){return["top","bottom"].includes(Ln(n))?"y":"x"}function Go(n){return At(Jn(n))}function Zt(n,o,t){t===void 0&&(t=!1);const r=vo(n),e=Go(n),a=Jo(e);let i=e==="x"?r===(t?"end":"start")?"right":"left":r==="start"?"bottom":"top";return o.reference[a]>o.floating[a]&&(i=qo(i)),[i,qo(i)]}function Ut(n){const o=qo(n);return[Vo(n),o,Vo(o)]}function Vo(n){return n.replace(/start|end/g,o=>Kt[o])}function Jt(n,o,t){const r=["left","right"],e=["right","left"],a=["top","bottom"],i=["bottom","top"];switch(n){case"top":case"bottom":return t?o?e:r:o?r:e;case"left":case"right":return o?a:i;default:return[]}}function Gt(n,o,t,r){const e=vo(n);let a=Jt(Ln(n),t==="start",r);return e&&(a=a.map(i=>i+"-"+e),o&&(a=a.concat(a.map(Vo)))),a}function qo(n){return n.replace(/left|right|bottom|top/g,o=>Yt[o])}function Qt(n){return{top:0,right:0,bottom:0,left:0,...n}}function zt(n){return typeof n!="number"?Qt(n):{top:n,right:n,bottom:n,left:n}}function Do(n){const{x:o,y:t,width:r,height:e}=n;return{width:r,height:e,top:t,left:o,right:o+r,bottom:t+e,x:o,y:t}}function lt(n,o,t){let{reference:r,floating:e}=n;const a=Jn(o),i=Go(o),l=Jo(i),s=Ln(o),u=a==="y",f=r.x+r.width/2-e.width/2,p=r.y+r.height/2-e.height/2,v=r[l]/2-e[l]/2;let h;switch(s){case"top":h={x:f,y:r.y-e.height};break;case"bottom":h={x:f,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:p};break;case"left":h={x:r.x-e.width,y:p};break;default:h={x:r.x,y:r.y}}switch(vo(o)){case"start":h[i]-=v*(t&&u?-1:1);break;case"end":h[i]+=v*(t&&u?-1:1);break}return h}const nr=async(n,o,t)=>{const{placement:r="bottom",strategy:e="absolute",middleware:a=[],platform:i}=t,l=a.filter(Boolean),s=await(i.isRTL==null?void 0:i.isRTL(o));let u=await i.getElementRects({reference:n,floating:o,strategy:e}),{x:f,y:p}=lt(u,r,s),v=r,h={},d=0;for(let c=0;c<l.length;c++){const{name:m,fn:x}=l[c],{x:_,y:O,data:A,reset:S}=await x({x:f,y:p,initialPlacement:r,placement:v,strategy:e,middlewareData:h,rects:u,platform:i,elements:{reference:n,floating:o}});f=_??f,p=O??p,h={...h,[m]:{...h[m],...A}},S&&d<=50&&(d++,typeof S=="object"&&(S.placement&&(v=S.placement),S.rects&&(u=S.rects===!0?await i.getElementRects({reference:n,floating:o,strategy:e}):S.rects),{x:f,y:p}=lt(u,v,s)),c=-1)}return{x:f,y:p,placement:v,strategy:e,middlewareData:h}};async function Tt(n,o){var t;o===void 0&&(o={});const{x:r,y:e,platform:a,rects:i,elements:l,strategy:s}=n,{boundary:u="clippingAncestors",rootBoundary:f="viewport",elementContext:p="floating",altBoundary:v=!1,padding:h=0}=go(o,n),d=zt(h),m=l[v?p==="floating"?"reference":"floating":p],x=Do(await a.getClippingRect({element:(t=await(a.isElement==null?void 0:a.isElement(m)))==null||t?m:m.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(l.floating)),boundary:u,rootBoundary:f,strategy:s})),_=p==="floating"?{x:r,y:e,width:i.floating.width,height:i.floating.height}:i.reference,O=await(a.getOffsetParent==null?void 0:a.getOffsetParent(l.floating)),A=await(a.isElement==null?void 0:a.isElement(O))?await(a.getScale==null?void 0:a.getScale(O))||{x:1,y:1}:{x:1,y:1},S=Do(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:_,offsetParent:O,strategy:s}):_);return{top:(x.top-S.top+d.top)/A.y,bottom:(S.bottom-x.bottom+d.bottom)/A.y,left:(x.left-S.left+d.left)/A.x,right:(S.right-x.right+d.right)/A.x}}const or=n=>({name:"arrow",options:n,async fn(o){const{x:t,y:r,placement:e,rects:a,platform:i,elements:l,middlewareData:s}=o,{element:u,padding:f=0}=go(n,o)||{};if(u==null)return{};const p=zt(f),v={x:t,y:r},h=Go(e),d=Jo(h),c=await i.getDimensions(u),m=h==="y",x=m?"top":"left",_=m?"bottom":"right",O=m?"clientHeight":"clientWidth",A=a.reference[d]+a.reference[h]-v[h]-a.floating[d],S=v[h]-a.reference[h],L=await(i.getOffsetParent==null?void 0:i.getOffsetParent(u));let T=L?L[O]:0;(!T||!await(i.isElement==null?void 0:i.isElement(L)))&&(T=l.floating[O]||a.floating[d]);const I=A/2-S/2,D=T/2-c[d]/2-1,tn=Un(p[x],D),bn=Un(p[_],D),rn=tn,fn=T-c[d]-bn,q=T/2-c[d]/2+I,J=Wo(rn,q,fn),Y=!s.arrow&&vo(e)!=null&&q!==J&&a.reference[d]/2-(q<rn?tn:bn)-c[d]/2<0,B=Y?q<rn?q-rn:q-fn:0;return{[h]:v[h]+B,data:{[h]:J,centerOffset:q-J-B,...Y&&{alignmentOffset:B}},reset:Y}}}),tr=function(n){return n===void 0&&(n={}),{name:"flip",options:n,async fn(o){var t,r;const{placement:e,middlewareData:a,rects:i,initialPlacement:l,platform:s,elements:u}=o,{mainAxis:f=!0,crossAxis:p=!0,fallbackPlacements:v,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:d="none",flipAlignment:c=!0,...m}=go(n,o);if((t=a.arrow)!=null&&t.alignmentOffset)return{};const x=Ln(e),_=Jn(l),O=Ln(l)===l,A=await(s.isRTL==null?void 0:s.isRTL(u.floating)),S=v||(O||!c?[qo(l)]:Ut(l)),L=d!=="none";!v&&L&&S.push(...Gt(l,c,d,A));const T=[l,...S],I=await Tt(o,m),D=[];let tn=((r=a.flip)==null?void 0:r.overflows)||[];if(f&&D.push(I[x]),p){const q=Zt(e,i,A);D.push(I[q[0]],I[q[1]])}if(tn=[...tn,{placement:e,overflows:D}],!D.every(q=>q<=0)){var bn,rn;const q=(((bn=a.flip)==null?void 0:bn.index)||0)+1,J=T[q];if(J)return{data:{index:q,overflows:tn},reset:{placement:J}};let Y=(rn=tn.filter(B=>B.overflows[0]<=0).sort((B,N)=>B.overflows[1]-N.overflows[1])[0])==null?void 0:rn.placement;if(!Y)switch(h){case"bestFit":{var fn;const B=(fn=tn.filter(N=>{if(L){const K=Jn(N.placement);return K===_||K==="y"}return!0}).map(N=>[N.placement,N.overflows.filter(K=>K>0).reduce((K,wn)=>K+wn,0)]).sort((N,K)=>N[1]-K[1])[0])==null?void 0:fn[0];B&&(Y=B);break}case"initialPlacement":Y=l;break}if(e!==Y)return{reset:{placement:Y}}}return{}}}};async function rr(n,o){const{placement:t,platform:r,elements:e}=n,a=await(r.isRTL==null?void 0:r.isRTL(e.floating)),i=Ln(t),l=vo(t),s=Jn(t)==="y",u=["left","top"].includes(i)?-1:1,f=a&&s?-1:1,p=go(o,n);let{mainAxis:v,crossAxis:h,alignmentAxis:d}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&typeof d=="number"&&(h=l==="end"?d*-1:d),s?{x:h*f,y:v*u}:{x:v*u,y:h*f}}const er=function(n){return n===void 0&&(n=0),{name:"offset",options:n,async fn(o){var t,r;const{x:e,y:a,placement:i,middlewareData:l}=o,s=await rr(o,n);return i===((t=l.offset)==null?void 0:t.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:e+s.x,y:a+s.y,data:{...s,placement:i}}}}},ar=function(n){return n===void 0&&(n={}),{name:"shift",options:n,async fn(o){const{x:t,y:r,placement:e}=o,{mainAxis:a=!0,crossAxis:i=!1,limiter:l={fn:m=>{let{x,y:_}=m;return{x,y:_}}},...s}=go(n,o),u={x:t,y:r},f=await Tt(o,s),p=Jn(Ln(e)),v=At(p);let h=u[v],d=u[p];if(a){const m=v==="y"?"top":"left",x=v==="y"?"bottom":"right",_=h+f[m],O=h-f[x];h=Wo(_,h,O)}if(i){const m=p==="y"?"top":"left",x=p==="y"?"bottom":"right",_=d+f[m],O=d-f[x];d=Wo(_,d,O)}const c=l.fn({...o,[v]:h,[p]:d});return{...c,data:{x:c.x-t,y:c.y-r,enabled:{[v]:a,[p]:i}}}}}};function Ro(){return typeof window<"u"}function Qn(n){return Et(n)?(n.nodeName||"").toLowerCase():"#document"}function on(n){var o;return(n==null||(o=n.ownerDocument)==null?void 0:o.defaultView)||window}function kn(n){var o;return(o=(Et(n)?n.ownerDocument:n.document)||window.document)==null?void 0:o.documentElement}function Et(n){return Ro()?n instanceof Node||n instanceof on(n).Node:!1}function pn(n){return Ro()?n instanceof Element||n instanceof on(n).Element:!1}function xn(n){return Ro()?n instanceof HTMLElement||n instanceof on(n).HTMLElement:!1}function st(n){return!Ro()||typeof ShadowRoot>"u"?!1:n instanceof ShadowRoot||n instanceof on(n).ShadowRoot}function yo(n){const{overflow:o,overflowX:t,overflowY:r,display:e}=hn(n);return/auto|scroll|overlay|hidden|clip/.test(o+r+t)&&!["inline","contents"].includes(e)}function ir(n){return["table","td","th"].includes(Qn(n))}function Mo(n){return[":popover-open",":modal"].some(o=>{try{return n.matches(o)}catch{return!1}})}function Qo(n){const o=nt(),t=pn(n)?hn(n):n;return["transform","translate","scale","rotate","perspective"].some(r=>t[r]?t[r]!=="none":!1)||(t.containerType?t.containerType!=="normal":!1)||!o&&(t.backdropFilter?t.backdropFilter!=="none":!1)||!o&&(t.filter?t.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(r=>(t.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(t.contain||"").includes(r))}function lr(n){let o=En(n);for(;xn(o)&&!Gn(o);){if(Qo(o))return o;if(Mo(o))return null;o=En(o)}return null}function nt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Gn(n){return["html","body","#document"].includes(Qn(n))}function hn(n){return on(n).getComputedStyle(n)}function Lo(n){return pn(n)?{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}:{scrollLeft:n.scrollX,scrollTop:n.scrollY}}function En(n){if(Qn(n)==="html")return n;const o=n.assignedSlot||n.parentNode||st(n)&&n.host||kn(n);return st(o)?o.host:o}function qt(n){const o=En(n);return Gn(o)?n.ownerDocument?n.ownerDocument.body:n.body:xn(o)&&yo(o)?o:qt(o)}function mo(n,o,t){var r;o===void 0&&(o=[]),t===void 0&&(t=!0);const e=qt(n),a=e===((r=n.ownerDocument)==null?void 0:r.body),i=on(e);if(a){const l=Yo(i);return o.concat(i,i.visualViewport||[],yo(e)?e:[],l&&t?mo(l):[])}return o.concat(e,mo(e,[],t))}function Yo(n){return n.parent&&Object.getPrototypeOf(n.parent)?n.frameElement:null}function Dt(n){const o=hn(n);let t=parseFloat(o.width)||0,r=parseFloat(o.height)||0;const e=xn(n),a=e?n.offsetWidth:t,i=e?n.offsetHeight:r,l=Eo(t)!==a||Eo(r)!==i;return l&&(t=a,r=i),{width:t,height:r,$:l}}function ot(n){return pn(n)?n:n.contextElement}function Zn(n){const o=ot(n);if(!xn(o))return yn(1);const t=o.getBoundingClientRect(),{width:r,height:e,$:a}=Dt(o);let i=(a?Eo(t.width):t.width)/r,l=(a?Eo(t.height):t.height)/e;return(!i||!Number.isFinite(i))&&(i=1),(!l||!Number.isFinite(l))&&(l=1),{x:i,y:l}}const sr=yn(0);function Ct(n){const o=on(n);return!nt()||!o.visualViewport?sr:{x:o.visualViewport.offsetLeft,y:o.visualViewport.offsetTop}}function cr(n,o,t){return o===void 0&&(o=!1),!t||o&&t!==on(n)?!1:o}function Nn(n,o,t,r){o===void 0&&(o=!1),t===void 0&&(t=!1);const e=n.getBoundingClientRect(),a=ot(n);let i=yn(1);o&&(r?pn(r)&&(i=Zn(r)):i=Zn(n));const l=cr(a,t,r)?Ct(a):yn(0);let s=(e.left+l.x)/i.x,u=(e.top+l.y)/i.y,f=e.width/i.x,p=e.height/i.y;if(a){const v=on(a),h=r&&pn(r)?on(r):r;let d=v,c=Yo(d);for(;c&&r&&h!==d;){const m=Zn(c),x=c.getBoundingClientRect(),_=hn(c),O=x.left+(c.clientLeft+parseFloat(_.paddingLeft))*m.x,A=x.top+(c.clientTop+parseFloat(_.paddingTop))*m.y;s*=m.x,u*=m.y,f*=m.x,p*=m.y,s+=O,u+=A,d=on(c),c=Yo(d)}}return Do({width:f,height:p,x:s,y:u})}function tt(n,o){const t=Lo(n).scrollLeft;return o?o.left+t:Nn(kn(n)).left+t}function Rt(n,o,t){t===void 0&&(t=!1);const r=n.getBoundingClientRect(),e=r.left+o.scrollLeft-(t?0:tt(n,r)),a=r.top+o.scrollTop;return{x:e,y:a}}function ur(n){let{elements:o,rect:t,offsetParent:r,strategy:e}=n;const a=e==="fixed",i=kn(r),l=o?Mo(o.floating):!1;if(r===i||l&&a)return t;let s={scrollLeft:0,scrollTop:0},u=yn(1);const f=yn(0),p=xn(r);if((p||!p&&!a)&&((Qn(r)!=="body"||yo(i))&&(s=Lo(r)),xn(r))){const h=Nn(r);u=Zn(r),f.x=h.x+r.clientLeft,f.y=h.y+r.clientTop}const v=i&&!p&&!a?Rt(i,s,!0):yn(0);return{width:t.width*u.x,height:t.height*u.y,x:t.x*u.x-s.scrollLeft*u.x+f.x+v.x,y:t.y*u.y-s.scrollTop*u.y+f.y+v.y}}function dr(n){return Array.from(n.getClientRects())}function pr(n){const o=kn(n),t=Lo(n),r=n.ownerDocument.body,e=Mn(o.scrollWidth,o.clientWidth,r.scrollWidth,r.clientWidth),a=Mn(o.scrollHeight,o.clientHeight,r.scrollHeight,r.clientHeight);let i=-t.scrollLeft+tt(n);const l=-t.scrollTop;return hn(r).direction==="rtl"&&(i+=Mn(o.clientWidth,r.clientWidth)-e),{width:e,height:a,x:i,y:l}}function hr(n,o){const t=on(n),r=kn(n),e=t.visualViewport;let a=r.clientWidth,i=r.clientHeight,l=0,s=0;if(e){a=e.width,i=e.height;const u=nt();(!u||u&&o==="fixed")&&(l=e.offsetLeft,s=e.offsetTop)}return{width:a,height:i,x:l,y:s}}function br(n,o){const t=Nn(n,!0,o==="fixed"),r=t.top+n.clientTop,e=t.left+n.clientLeft,a=xn(n)?Zn(n):yn(1),i=n.clientWidth*a.x,l=n.clientHeight*a.y,s=e*a.x,u=r*a.y;return{width:i,height:l,x:s,y:u}}function ct(n,o,t){let r;if(o==="viewport")r=hr(n,t);else if(o==="document")r=pr(kn(n));else if(pn(o))r=br(o,t);else{const e=Ct(n);r={x:o.x-e.x,y:o.y-e.y,width:o.width,height:o.height}}return Do(r)}function Mt(n,o){const t=En(n);return t===o||!pn(t)||Gn(t)?!1:hn(t).position==="fixed"||Mt(t,o)}function fr(n,o){const t=o.get(n);if(t)return t;let r=mo(n,[],!1).filter(l=>pn(l)&&Qn(l)!=="body"),e=null;const a=hn(n).position==="fixed";let i=a?En(n):n;for(;pn(i)&&!Gn(i);){const l=hn(i),s=Qo(i);!s&&l.position==="fixed"&&(e=null),(a?!s&&!e:!s&&l.position==="static"&&!!e&&["absolute","fixed"].includes(e.position)||yo(i)&&!s&&Mt(n,i))?r=r.filter(f=>f!==i):e=l,i=En(i)}return o.set(n,r),r}function mr(n){let{element:o,boundary:t,rootBoundary:r,strategy:e}=n;const i=[...t==="clippingAncestors"?Mo(o)?[]:fr(o,this._c):[].concat(t),r],l=i[0],s=i.reduce((u,f)=>{const p=ct(o,f,e);return u.top=Mn(p.top,u.top),u.right=Un(p.right,u.right),u.bottom=Un(p.bottom,u.bottom),u.left=Mn(p.left,u.left),u},ct(o,l,e));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}}function gr(n){const{width:o,height:t}=Dt(n);return{width:o,height:t}}function vr(n,o,t){const r=xn(o),e=kn(o),a=t==="fixed",i=Nn(n,!0,a,o);let l={scrollLeft:0,scrollTop:0};const s=yn(0);if(r||!r&&!a)if((Qn(o)!=="body"||yo(e))&&(l=Lo(o)),r){const v=Nn(o,!0,a,o);s.x=v.x+o.clientLeft,s.y=v.y+o.clientTop}else e&&(s.x=tt(e));const u=e&&!r&&!a?Rt(e,l):yn(0),f=i.left+l.scrollLeft-s.x-u.x,p=i.top+l.scrollTop-s.y-u.y;return{x:f,y:p,width:i.width,height:i.height}}function Io(n){return hn(n).position==="static"}function ut(n,o){if(!xn(n)||hn(n).position==="fixed")return null;if(o)return o(n);let t=n.offsetParent;return kn(n)===t&&(t=t.ownerDocument.body),t}function Lt(n,o){const t=on(n);if(Mo(n))return t;if(!xn(n)){let e=En(n);for(;e&&!Gn(e);){if(pn(e)&&!Io(e))return e;e=En(e)}return t}let r=ut(n,o);for(;r&&ir(r)&&Io(r);)r=ut(r,o);return r&&Gn(r)&&Io(r)&&!Qo(r)?t:r||lr(n)||t}const yr=async function(n){const o=this.getOffsetParent||Lt,t=this.getDimensions,r=await t(n.floating);return{reference:vr(n.reference,await o(n.floating),n.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function xr(n){return hn(n).direction==="rtl"}const kr={convertOffsetParentRelativeRectToViewportRelativeRect:ur,getDocumentElement:kn,getClippingRect:mr,getOffsetParent:Lt,getElementRects:yr,getClientRects:dr,getDimensions:gr,getScale:Zn,isElement:pn,isRTL:xr};function Nt(n,o){return n.x===o.x&&n.y===o.y&&n.width===o.width&&n.height===o.height}function wr(n,o){let t=null,r;const e=kn(n);function a(){var l;clearTimeout(r),(l=t)==null||l.disconnect(),t=null}function i(l,s){l===void 0&&(l=!1),s===void 0&&(s=1),a();const u=n.getBoundingClientRect(),{left:f,top:p,width:v,height:h}=u;if(l||o(),!v||!h)return;const d=Ao(p),c=Ao(e.clientWidth-(f+v)),m=Ao(e.clientHeight-(p+h)),x=Ao(f),O={rootMargin:-d+"px "+-c+"px "+-m+"px "+-x+"px",threshold:Mn(0,Un(1,s))||1};let A=!0;function S(L){const T=L[0].intersectionRatio;if(T!==s){if(!A)return i();T?i(!1,T):r=setTimeout(()=>{i(!1,1e-7)},1e3)}T===1&&!Nt(u,n.getBoundingClientRect())&&i(),A=!1}try{t=new IntersectionObserver(S,{...O,root:e.ownerDocument})}catch{t=new IntersectionObserver(S,O)}t.observe(n)}return i(!0),a}function Or(n,o,t,r){r===void 0&&(r={});const{ancestorScroll:e=!0,ancestorResize:a=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:s=!1}=r,u=ot(n),f=e||a?[...u?mo(u):[],...mo(o)]:[];f.forEach(x=>{e&&x.addEventListener("scroll",t,{passive:!0}),a&&x.addEventListener("resize",t)});const p=u&&l?wr(u,t):null;let v=-1,h=null;i&&(h=new ResizeObserver(x=>{let[_]=x;_&&_.target===u&&h&&(h.unobserve(o),cancelAnimationFrame(v),v=requestAnimationFrame(()=>{var O;(O=h)==null||O.observe(o)})),t()}),u&&!s&&h.observe(u),h.observe(o));let d,c=s?Nn(n):null;s&&m();function m(){const x=Nn(n);c&&!Nt(c,x)&&t(),c=x,d=requestAnimationFrame(m)}return t(),()=>{var x;f.forEach(_=>{e&&_.removeEventListener("scroll",t),a&&_.removeEventListener("resize",t)}),p==null||p(),(x=h)==null||x.disconnect(),h=null,s&&cancelAnimationFrame(d)}}const Pr=er,_r=ar,Sr=tr,Ar=or,dt=(n,o,t)=>{const r=new Map,e={platform:kr,...t},a={...e.platform,_c:r};return nr(n,o,{...e,platform:a})};var $t={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var o={}.hasOwnProperty;function t(){for(var a="",i=0;i<arguments.length;i++){var l=arguments[i];l&&(a=e(a,r(l)))}return a}function r(a){if(typeof a=="string"||typeof a=="number")return a;if(typeof a!="object")return"";if(Array.isArray(a))return t.apply(null,a);if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]"))return a.toString();var i="";for(var l in a)o.call(a,l)&&a[l]&&(i=e(i,l));return i}function e(a,i){return i?a?a+" "+i:a+i:a}n.exports?(t.default=t,n.exports=t):window.classNames=t})()})($t);var zr=$t.exports;const Ko=Wt(zr);/*
* React Tooltip
* {@link https://github.com/ReactTooltip/react-tooltip}
* @copyright ReactTooltip Team
* @license MIT
*/const Tr="react-tooltip-core-styles",Er="react-tooltip-base-styles",pt={core:!1,base:!1};function ht({css:n,id:o=Er,type:t="base",ref:r}){var e,a;if(!n||typeof document>"u"||pt[t]||t==="core"&&typeof process<"u"&&(!((e=process==null?void 0:process.env)===null||e===void 0)&&e.REACT_TOOLTIP_DISABLE_CORE_STYLES)||t!=="base"&&typeof process<"u"&&(!((a=process==null?void 0:process.env)===null||a===void 0)&&a.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;t==="core"&&(o=Tr),r||(r={});const{insertAt:i}=r;if(document.getElementById(o))return;const l=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.id=o,s.type="text/css",i==="top"&&l.firstChild?l.insertBefore(s,l.firstChild):l.appendChild(s),s.styleSheet?s.styleSheet.cssText=n:s.appendChild(document.createTextNode(n)),pt[t]=!0}const bt=async({elementReference:n=null,tooltipReference:o=null,tooltipArrowReference:t=null,place:r="top",offset:e=10,strategy:a="absolute",middlewares:i=[Pr(Number(e)),Sr({fallbackAxisSideDirection:"start"}),_r({padding:5})],border:l})=>{if(!n)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};if(o===null)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};const s=i;return t?(s.push(Ar({element:t,padding:5})),dt(n,o,{placement:r,strategy:a,middleware:s}).then(({x:u,y:f,placement:p,middlewareData:v})=>{var h,d;const c={left:`${u}px`,top:`${f}px`,border:l},{x:m,y:x}=(h=v.arrow)!==null&&h!==void 0?h:{x:0,y:0},_=(d={top:"bottom",right:"left",bottom:"top",left:"right"}[p.split("-")[0]])!==null&&d!==void 0?d:"bottom",O=l&&{borderBottom:l,borderRight:l};let A=0;if(l){const S=`${l}`.match(/(\d+)px/);A=S!=null&&S[1]?Number(S[1]):1}return{tooltipStyles:c,tooltipArrowStyles:{left:m!=null?`${m}px`:"",top:x!=null?`${x}px`:"",right:"",bottom:"",...O,[_]:`-${4+A}px`},place:p}})):dt(n,o,{placement:"bottom",strategy:a,middleware:s}).then(({x:u,y:f,placement:p})=>({tooltipStyles:{left:`${u}px`,top:`${f}px`},tooltipArrowStyles:{},place:p}))},ft=(n,o)=>!("CSS"in window&&"supports"in window.CSS)||window.CSS.supports(n,o),mt=(n,o,t)=>{let r=null;const e=function(...a){const i=()=>{r=null,t||n.apply(this,a)};t&&!r&&(n.apply(this,a),r=setTimeout(i,o)),t||(r&&clearTimeout(r),r=setTimeout(i,o))};return e.cancel=()=>{r&&(clearTimeout(r),r=null)},e},gt=n=>n!==null&&!Array.isArray(n)&&typeof n=="object",Zo=(n,o)=>{if(n===o)return!0;if(Array.isArray(n)&&Array.isArray(o))return n.length===o.length&&n.every((e,a)=>Zo(e,o[a]));if(Array.isArray(n)!==Array.isArray(o))return!1;if(!gt(n)||!gt(o))return n===o;const t=Object.keys(n),r=Object.keys(o);return t.length===r.length&&t.every(e=>Zo(n[e],o[e]))},qr=n=>{if(!(n instanceof HTMLElement||n instanceof SVGElement))return!1;const o=getComputedStyle(n);return["overflow","overflow-x","overflow-y"].some(t=>{const r=o.getPropertyValue(t);return r==="auto"||r==="scroll"})},vt=n=>{if(!n)return null;let o=n.parentElement;for(;o;){if(qr(o))return o;o=o.parentElement}return document.scrollingElement||document.documentElement},Dr=typeof window<"u"?g.useLayoutEffect:g.useEffect,ln=n=>{n.current&&(clearTimeout(n.current),n.current=null)},Cr="DEFAULT_TOOLTIP_ID",Rr={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},Mr=g.createContext({getTooltipData:()=>Rr});function jt(n=Cr){return g.useContext(Mr).getTooltipData(n)}var Yn={tooltip:"core-styles-module_tooltip__3vRRp",fixed:"core-styles-module_fixed__pcSol",arrow:"core-styles-module_arrow__cvMwQ",noArrow:"core-styles-module_noArrow__xock6",clickable:"core-styles-module_clickable__ZuTTB",show:"core-styles-module_show__Nt9eE",closing:"core-styles-module_closing__sGnxF"},Bo={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const Lr=({forwardRef:n,id:o,className:t,classNameArrow:r,variant:e="dark",anchorId:a,anchorSelect:i,place:l="top",offset:s=10,events:u=["hover"],openOnClick:f=!1,positionStrategy:p="absolute",middlewares:v,wrapper:h,delayShow:d=0,delayHide:c=0,float:m=!1,hidden:x=!1,noArrow:_=!1,clickable:O=!1,closeOnEsc:A=!1,closeOnScroll:S=!1,closeOnResize:L=!1,openEvents:T,closeEvents:I,globalCloseEvents:D,imperativeModeOnly:tn,style:bn,position:rn,afterShow:fn,afterHide:q,disableTooltip:J,content:Y,contentWrapperRef:B,isOpen:N,defaultIsOpen:K=!1,setIsOpen:wn,activeAnchor:j,setActiveAnchor:$n,border:xo,opacity:ko,arrowColor:wo,role:$o="tooltip"})=>{var no;const Z=g.useRef(null),jn=g.useRef(null),sn=g.useRef(null),Sn=g.useRef(null),oo=g.useRef(null),[An,jo]=g.useState({tooltipStyles:{},tooltipArrowStyles:{},place:l}),[G,Oo]=g.useState(!1),[qn,Dn]=g.useState(!1),[M,to]=g.useState(null),ro=g.useRef(!1),eo=g.useRef(null),{anchorRefs:ao,setActiveAnchor:Po}=jt(o),Fn=g.useRef(!1),[zn,io]=g.useState([]),Cn=g.useRef(!1),Hn=f||u.includes("click"),lo=Hn||(T==null?void 0:T.click)||(T==null?void 0:T.dblclick)||(T==null?void 0:T.mousedown),In=T?{...T}:{mouseover:!0,focus:!0,mouseenter:!1,click:!1,dblclick:!1,mousedown:!1};!T&&Hn&&Object.assign(In,{mouseenter:!1,focus:!1,mouseover:!1,click:!0});const so=I?{...I}:{mouseout:!0,blur:!0,mouseleave:!1,click:!1,dblclick:!1,mouseup:!1};!I&&Hn&&Object.assign(so,{mouseleave:!1,blur:!1,mouseout:!1});const cn=D?{...D}:{escape:A||!1,scroll:S||!1,resize:L||!1,clickOutsideAnchor:lo||!1};tn&&(Object.assign(In,{mouseenter:!1,focus:!1,click:!1,dblclick:!1,mousedown:!1}),Object.assign(so,{mouseleave:!1,blur:!1,click:!1,dblclick:!1,mouseup:!1}),Object.assign(cn,{escape:!1,scroll:!1,resize:!1,clickOutsideAnchor:!1})),Dr(()=>(Cn.current=!0,()=>{Cn.current=!1}),[]);const $=b=>{Cn.current&&(b&&Dn(!0),setTimeout(()=>{Cn.current&&(wn==null||wn(b),N===void 0&&Oo(b))},10))};g.useEffect(()=>{if(N===void 0)return()=>null;N&&Dn(!0);const b=setTimeout(()=>{Oo(N)},10);return()=>{clearTimeout(b)}},[N]),g.useEffect(()=>{if(G!==ro.current)if(ln(oo),ro.current=G,G)fn==null||fn();else{const b=(w=>{const P=w.match(/^([\d.]+)(ms|s)$/);if(!P)return 0;const[,F,V]=P;return Number(F)*(V==="ms"?1:1e3)})(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));oo.current=setTimeout(()=>{Dn(!1),to(null),q==null||q()},b+25)}},[G]);const _o=b=>{jo(w=>Zo(w,b)?w:b)},co=(b=d)=>{ln(sn),qn?$(!0):sn.current=setTimeout(()=>{$(!0)},b)},Bn=(b=c)=>{ln(Sn),Sn.current=setTimeout(()=>{Fn.current||$(!1)},b)},uo=b=>{var w;if(!b)return;const P=(w=b.currentTarget)!==null&&w!==void 0?w:b.target;if(!(P!=null&&P.isConnected))return $n(null),void Po({current:null});d?co():$(!0),$n(P),Po({current:P}),ln(Sn)},Xn=()=>{O?Bn(c||100):c?Bn():$(!1),ln(sn)},Wn=({x:b,y:w})=>{var P;const F={getBoundingClientRect:()=>({x:b,y:w,width:0,height:0,top:w,left:b,right:b,bottom:w})};bt({place:(P=M==null?void 0:M.place)!==null&&P!==void 0?P:l,offset:s,elementReference:F,tooltipReference:Z.current,tooltipArrowReference:jn.current,strategy:p,middlewares:v,border:xo}).then(V=>{_o(V)})},Vn=b=>{if(!b)return;const w=b,P={x:w.clientX,y:w.clientY};Wn(P),eo.current=P},po=b=>{var w;if(!G)return;const P=b.target;P.isConnected&&(!((w=Z.current)===null||w===void 0)&&w.contains(P)||[document.querySelector(`[id='${a}']`),...zn].some(F=>F==null?void 0:F.contains(P))||($(!1),ln(sn)))},So=mt(uo,50,!0),X=mt(Xn,50,!0),en=b=>{X.cancel(),So(b)},k=()=>{So.cancel(),X()},z=g.useCallback(()=>{var b,w;const P=(b=M==null?void 0:M.position)!==null&&b!==void 0?b:rn;P?Wn(P):m?eo.current&&Wn(eo.current):j!=null&&j.isConnected&&bt({place:(w=M==null?void 0:M.place)!==null&&w!==void 0?w:l,offset:s,elementReference:j,tooltipReference:Z.current,tooltipArrowReference:jn.current,strategy:p,middlewares:v,border:xo}).then(F=>{Cn.current&&_o(F)})},[G,j,Y,bn,l,M==null?void 0:M.place,s,p,rn,M==null?void 0:M.position,m]);g.useEffect(()=>{var b,w;const P=new Set(ao);zn.forEach(E=>{J!=null&&J(E)||P.add({current:E})});const F=document.querySelector(`[id='${a}']`);F&&!(J!=null&&J(F))&&P.add({current:F});const V=()=>{$(!1)},mn=vt(j),gn=vt(Z.current);cn.scroll&&(window.addEventListener("scroll",V),mn==null||mn.addEventListener("scroll",V),gn==null||gn.addEventListener("scroll",V));let U=null;cn.resize?window.addEventListener("resize",V):j&&Z.current&&(U=Or(j,Z.current,z,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const an=E=>{E.key==="Escape"&&$(!1)};cn.escape&&window.addEventListener("keydown",an),cn.clickOutsideAnchor&&window.addEventListener("click",po);const C=[],ho=E=>{G&&(E==null?void 0:E.target)===j||uo(E)},Bt=E=>{G&&(E==null?void 0:E.target)===j&&Xn()},rt=["mouseover","mouseout","mouseenter","mouseleave","focus","blur"],et=["click","dblclick","mousedown","mouseup"];Object.entries(In).forEach(([E,On])=>{On&&(rt.includes(E)?C.push({event:E,listener:en}):et.includes(E)&&C.push({event:E,listener:ho}))}),Object.entries(so).forEach(([E,On])=>{On&&(rt.includes(E)?C.push({event:E,listener:k}):et.includes(E)&&C.push({event:E,listener:Bt}))}),m&&C.push({event:"pointermove",listener:Vn});const at=()=>{Fn.current=!0},it=()=>{Fn.current=!1,Xn()};return O&&!lo&&((b=Z.current)===null||b===void 0||b.addEventListener("mouseenter",at),(w=Z.current)===null||w===void 0||w.addEventListener("mouseleave",it)),C.forEach(({event:E,listener:On})=>{P.forEach(Fo=>{var bo;(bo=Fo.current)===null||bo===void 0||bo.addEventListener(E,On)})}),()=>{var E,On;cn.scroll&&(window.removeEventListener("scroll",V),mn==null||mn.removeEventListener("scroll",V),gn==null||gn.removeEventListener("scroll",V)),cn.resize?window.removeEventListener("resize",V):U==null||U(),cn.clickOutsideAnchor&&window.removeEventListener("click",po),cn.escape&&window.removeEventListener("keydown",an),O&&!lo&&((E=Z.current)===null||E===void 0||E.removeEventListener("mouseenter",at),(On=Z.current)===null||On===void 0||On.removeEventListener("mouseleave",it)),C.forEach(({event:Fo,listener:bo})=>{P.forEach(Xt=>{var Ho;(Ho=Xt.current)===null||Ho===void 0||Ho.removeEventListener(Fo,bo)})})}},[j,z,qn,ao,zn,T,I,D,Hn,d,c]),g.useEffect(()=>{var b,w;let P=(w=(b=M==null?void 0:M.anchorSelect)!==null&&b!==void 0?b:i)!==null&&w!==void 0?w:"";!P&&o&&(P=`[data-tooltip-id='${o.replace(/'/g,"\\'")}']`);const F=new MutationObserver(V=>{const mn=[],gn=[];V.forEach(U=>{if(U.type==="attributes"&&U.attributeName==="data-tooltip-id"&&(U.target.getAttribute("data-tooltip-id")===o?mn.push(U.target):U.oldValue===o&&gn.push(U.target)),U.type==="childList"){if(j){const an=[...U.removedNodes].filter(C=>C.nodeType===1);if(P)try{gn.push(...an.filter(C=>C.matches(P))),gn.push(...an.flatMap(C=>[...C.querySelectorAll(P)]))}catch{}an.some(C=>{var ho;return!!(!((ho=C==null?void 0:C.contains)===null||ho===void 0)&&ho.call(C,j))&&(Dn(!1),$(!1),$n(null),ln(sn),ln(Sn),!0)})}if(P)try{const an=[...U.addedNodes].filter(C=>C.nodeType===1);mn.push(...an.filter(C=>C.matches(P))),mn.push(...an.flatMap(C=>[...C.querySelectorAll(P)]))}catch{}}}),(mn.length||gn.length)&&io(U=>[...U.filter(an=>!gn.includes(an)),...mn])});return F.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"],attributeOldValue:!0}),()=>{F.disconnect()}},[o,i,M==null?void 0:M.anchorSelect,j]),g.useEffect(()=>{z()},[z]),g.useEffect(()=>{if(!(B!=null&&B.current))return()=>null;const b=new ResizeObserver(()=>{setTimeout(()=>z())});return b.observe(B.current),()=>{b.disconnect()}},[Y,B==null?void 0:B.current]),g.useEffect(()=>{var b;const w=document.querySelector(`[id='${a}']`),P=[...zn,w];j&&P.includes(j)||$n((b=zn[0])!==null&&b!==void 0?b:w)},[a,zn,j]),g.useEffect(()=>(K&&$(!0),()=>{ln(sn),ln(Sn)}),[]),g.useEffect(()=>{var b;let w=(b=M==null?void 0:M.anchorSelect)!==null&&b!==void 0?b:i;if(!w&&o&&(w=`[data-tooltip-id='${o.replace(/'/g,"\\'")}']`),w)try{const P=Array.from(document.querySelectorAll(w));io(P)}catch{io([])}},[o,i,M==null?void 0:M.anchorSelect]),g.useEffect(()=>{sn.current&&(ln(sn),co(d))},[d]);const Q=(no=M==null?void 0:M.content)!==null&&no!==void 0?no:Y,Rn=G&&Object.keys(An.tooltipStyles).length>0;return g.useImperativeHandle(n,()=>({open:b=>{if(b!=null&&b.anchorSelect)try{document.querySelector(b.anchorSelect)}catch{return void console.warn(`[react-tooltip] "${b.anchorSelect}" is not a valid CSS selector`)}to(b??null),b!=null&&b.delay?co(b.delay):$(!0)},close:b=>{b!=null&&b.delay?Bn(b.delay):$(!1)},activeAnchor:j,place:An.place,isOpen:!!(qn&&!x&&Q&&Rn)})),qn&&!x&&Q?W.createElement(h,{id:o,role:$o,className:Ko("react-tooltip",Yn.tooltip,Bo.tooltip,Bo[e],t,`react-tooltip__place-${An.place}`,Yn[Rn?"show":"closing"],Rn?"react-tooltip__show":"react-tooltip__closing",p==="fixed"&&Yn.fixed,O&&Yn.clickable),onTransitionEnd:b=>{ln(oo),G||b.propertyName!=="opacity"||(Dn(!1),to(null),q==null||q())},style:{...bn,...An.tooltipStyles,opacity:ko!==void 0&&Rn?ko:void 0},ref:Z},Q,W.createElement(h,{className:Ko("react-tooltip-arrow",Yn.arrow,Bo.arrow,r,_&&Yn.noArrow),style:{...An.tooltipArrowStyles,background:wo?`linear-gradient(to right bottom, transparent 50%, ${wo} 50%)`:void 0},ref:jn})):null},Nr=({content:n})=>W.createElement("span",{dangerouslySetInnerHTML:{__html:n}}),$r=W.forwardRef(({id:n,anchorId:o,anchorSelect:t,content:r,html:e,render:a,className:i,classNameArrow:l,variant:s="dark",place:u="top",offset:f=10,wrapper:p="div",children:v=null,events:h=["hover"],openOnClick:d=!1,positionStrategy:c="absolute",middlewares:m,delayShow:x=0,delayHide:_=0,float:O=!1,hidden:A=!1,noArrow:S=!1,clickable:L=!1,closeOnEsc:T=!1,closeOnScroll:I=!1,closeOnResize:D=!1,openEvents:tn,closeEvents:bn,globalCloseEvents:rn,imperativeModeOnly:fn=!1,style:q,position:J,isOpen:Y,defaultIsOpen:B=!1,disableStyleInjection:N=!1,border:K,opacity:wn,arrowColor:j,setIsOpen:$n,afterShow:xo,afterHide:ko,disableTooltip:wo,role:$o="tooltip"},no)=>{const[Z,jn]=g.useState(r),[sn,Sn]=g.useState(e),[oo,An]=g.useState(u),[jo,G]=g.useState(s),[Oo,qn]=g.useState(f),[Dn,M]=g.useState(x),[to,ro]=g.useState(_),[eo,ao]=g.useState(O),[Po,Fn]=g.useState(A),[zn,io]=g.useState(p),[Cn,Hn]=g.useState(h),[lo,In]=g.useState(c),[so,cn]=g.useState(null),[$,_o]=g.useState(null),co=g.useRef(N),{anchorRefs:Bn,activeAnchor:uo}=jt(n),Xn=X=>X==null?void 0:X.getAttributeNames().reduce((en,k)=>{var z;return k.startsWith("data-tooltip-")&&(en[k.replace(/^data-tooltip-/,"")]=(z=X==null?void 0:X.getAttribute(k))!==null&&z!==void 0?z:null),en},{}),Wn=X=>{const en={place:k=>{var z;An((z=k)!==null&&z!==void 0?z:u)},content:k=>{jn(k??r)},html:k=>{Sn(k??e)},variant:k=>{var z;G((z=k)!==null&&z!==void 0?z:s)},offset:k=>{qn(k===null?f:Number(k))},wrapper:k=>{var z;io((z=k)!==null&&z!==void 0?z:p)},events:k=>{const z=k==null?void 0:k.split(" ");Hn(z??h)},"position-strategy":k=>{var z;In((z=k)!==null&&z!==void 0?z:c)},"delay-show":k=>{M(k===null?x:Number(k))},"delay-hide":k=>{ro(k===null?_:Number(k))},float:k=>{ao(k===null?O:k==="true")},hidden:k=>{Fn(k===null?A:k==="true")},"class-name":k=>{cn(k)}};Object.values(en).forEach(k=>k(null)),Object.entries(X).forEach(([k,z])=>{var Q;(Q=en[k])===null||Q===void 0||Q.call(en,z)})};g.useEffect(()=>{jn(r)},[r]),g.useEffect(()=>{Sn(e)},[e]),g.useEffect(()=>{An(u)},[u]),g.useEffect(()=>{G(s)},[s]),g.useEffect(()=>{qn(f)},[f]),g.useEffect(()=>{M(x)},[x]),g.useEffect(()=>{ro(_)},[_]),g.useEffect(()=>{ao(O)},[O]),g.useEffect(()=>{Fn(A)},[A]),g.useEffect(()=>{In(c)},[c]),g.useEffect(()=>{co.current!==N&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")},[N]),g.useEffect(()=>{typeof window<"u"&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:N==="core",disableBase:N}}))},[]),g.useEffect(()=>{var X;const en=new Set(Bn);let k=t;if(!k&&n&&(k=`[data-tooltip-id='${n.replace(/'/g,"\\'")}']`),k)try{document.querySelectorAll(k).forEach(w=>{en.add({current:w})})}catch{console.warn(`[react-tooltip] "${k}" is not a valid CSS selector`)}const z=document.querySelector(`[id='${o}']`);if(z&&en.add({current:z}),!en.size)return()=>null;const Q=(X=$??z)!==null&&X!==void 0?X:uo.current,Rn=new MutationObserver(w=>{w.forEach(P=>{var F;if(!Q||P.type!=="attributes"||!(!((F=P.attributeName)===null||F===void 0)&&F.startsWith("data-tooltip-")))return;const V=Xn(Q);Wn(V)})}),b={attributes:!0,childList:!1,subtree:!1};if(Q){const w=Xn(Q);Wn(w),Rn.observe(Q,b)}return()=>{Rn.disconnect()}},[Bn,uo,$,o,t]),g.useEffect(()=>{q!=null&&q.border&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),K&&!ft("border",`${K}`)&&console.warn(`[react-tooltip] "${K}" is not a valid \`border\`.`),q!=null&&q.opacity&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),wn&&!ft("opacity",`${wn}`)&&console.warn(`[react-tooltip] "${wn}" is not a valid \`opacity\`.`)},[]);let Vn=v;const po=g.useRef(null);if(a){const X=a({content:($==null?void 0:$.getAttribute("data-tooltip-content"))||Z||null,activeAnchor:$});Vn=X?W.createElement("div",{ref:po,className:"react-tooltip-content-wrapper"},X):null}else Z&&(Vn=Z);sn&&(Vn=W.createElement(Nr,{content:sn}));const So={forwardRef:no,id:n,anchorId:o,anchorSelect:t,className:Ko(i,so),classNameArrow:l,content:Vn,contentWrapperRef:po,place:oo,variant:jo,offset:Oo,wrapper:zn,events:Cn,openOnClick:d,positionStrategy:lo,middlewares:m,delayShow:Dn,delayHide:to,float:eo,hidden:Po,noArrow:S,clickable:L,closeOnEsc:T,closeOnScroll:I,closeOnResize:D,openEvents:tn,closeEvents:bn,globalCloseEvents:rn,imperativeModeOnly:fn,style:q,position:J,isOpen:Y,defaultIsOpen:B,border:K,opacity:wn,arrowColor:j,setIsOpen:$n,afterShow:xo,afterHide:ko,disableTooltip:wo,activeAnchor:$,setActiveAnchor:X=>_o(X),role:$o};return W.createElement(Lr,{...So})});typeof window<"u"&&window.addEventListener("react-tooltip-inject-styles",n=>{n.detail.disableCore||ht({css:":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}",type:"core"}),n.detail.disableBase||ht({css:`
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,type:"base"})});const jr=({content:n,children:o})=>{const r=`tooltip-${Vt(5)}`;return _t(St,{children:[_n("a",{"data-tooltip-id":r,children:o}),_n($r,{className:"z-10",id:r,children:n})]})},le=({disabled:n=!1,Icon:o,onClick:t=()=>{},title:r=null,size:e=5,hidden:a=!1})=>{const i=`h-${e} w-${e}`,l=_n("button",{title:"Mover elemento hacia abajo",className:`flex justify-between items-center p-1 rounded-lg ${a&&"opacity-0"}`,disabled:n||a,onClick:t,children:_n(o,{className:`${n?"text-gray-400":"text-gray-700"} ${i}`})});return _n(St,{children:r==null||a?l:_n(jr,{content:r,children:l})})};function H(n,o){o===void 0&&(o={});var t=o.insertAt;if(n&&typeof document<"u"){var r=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",t==="top"&&r.firstChild?r.insertBefore(e,r.firstChild):r.appendChild(e),e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n))}}H(`.react-loading-indicator-normalize,
[class$=rli-bounding-box] {
  font-size: 1rem;
  display: inline-block;
  box-sizing: border-box;
  text-align: unset;
  isolation: isolate;
}

.rli-d-i-b {
  display: inline-block;
}

.rli-text-format {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  width: 90%;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.7em;
  letter-spacing: 0.5px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Avenir Next", "Avenir", "Segoe UI", "Lucida Grande", "Helvetica Neue", "Helvetica", "Fira Sans", "Roboto", "Noto", "Droid Sans", "Cantarell", "Oxygen", "Ubuntu", "Franklin Gothic Medium", "Century Gothic", "Liberation Sans", sans-serif;
}`);var vn=function(){return vn=Object.assign||function(n){for(var o,t=1,r=arguments.length;t<r;t++)for(var e in o=arguments[t])Object.prototype.hasOwnProperty.call(o,e)&&(n[e]=o[e]);return n},vn.apply(this,arguments)};function Co(n){return Co=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(o){return typeof o}:function(o){return o&&typeof Symbol=="function"&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},Co(n)}var Fr=/^\s+/,Hr=/\s+$/;function y(n,o){if(o=o||{},(n=n||"")instanceof y)return n;if(!(this instanceof y))return new y(n,o);var t=function(r){var e={r:0,g:0,b:0},a=1,i=null,l=null,s=null,u=!1,f=!1;typeof r=="string"&&(r=function(d){d=d.replace(Fr,"").replace(Hr,"").toLowerCase();var c,m=!1;if(Uo[d])d=Uo[d],m=!0;else if(d=="transparent")return{r:0,g:0,b:0,a:0,format:"name"};return(c=un.rgb.exec(d))?{r:c[1],g:c[2],b:c[3]}:(c=un.rgba.exec(d))?{r:c[1],g:c[2],b:c[3],a:c[4]}:(c=un.hsl.exec(d))?{h:c[1],s:c[2],l:c[3]}:(c=un.hsla.exec(d))?{h:c[1],s:c[2],l:c[3],a:c[4]}:(c=un.hsv.exec(d))?{h:c[1],s:c[2],v:c[3]}:(c=un.hsva.exec(d))?{h:c[1],s:c[2],v:c[3],a:c[4]}:(c=un.hex8.exec(d))?{r:nn(c[1]),g:nn(c[2]),b:nn(c[3]),a:Pt(c[4]),format:m?"name":"hex8"}:(c=un.hex6.exec(d))?{r:nn(c[1]),g:nn(c[2]),b:nn(c[3]),format:m?"name":"hex"}:(c=un.hex4.exec(d))?{r:nn(c[1]+""+c[1]),g:nn(c[2]+""+c[2]),b:nn(c[3]+""+c[3]),a:Pt(c[4]+""+c[4]),format:m?"name":"hex8"}:(c=un.hex3.exec(d))?{r:nn(c[1]+""+c[1]),g:nn(c[2]+""+c[2]),b:nn(c[3]+""+c[3]),format:m?"name":"hex"}:!1}(r)),Co(r)=="object"&&(Pn(r.r)&&Pn(r.g)&&Pn(r.b)?(p=r.r,v=r.g,h=r.b,e={r:255*R(p,255),g:255*R(v,255),b:255*R(h,255)},u=!0,f=String(r.r).substr(-1)==="%"?"prgb":"rgb"):Pn(r.h)&&Pn(r.s)&&Pn(r.v)?(i=fo(r.s),l=fo(r.v),e=function(d,c,m){d=6*R(d,360),c=R(c,100),m=R(m,100);var x=Math.floor(d),_=d-x,O=m*(1-c),A=m*(1-_*c),S=m*(1-(1-_)*c),L=x%6,T=[m,A,O,O,S,m][L],I=[S,m,m,A,O,O][L],D=[O,O,S,m,m,A][L];return{r:255*T,g:255*I,b:255*D}}(r.h,i,l),u=!0,f="hsv"):Pn(r.h)&&Pn(r.s)&&Pn(r.l)&&(i=fo(r.s),s=fo(r.l),e=function(d,c,m){var x,_,O;function A(T,I,D){return D<0&&(D+=1),D>1&&(D-=1),D<1/6?T+6*(I-T)*D:D<.5?I:D<2/3?T+(I-T)*(2/3-D)*6:T}if(d=R(d,360),c=R(c,100),m=R(m,100),c===0)x=_=O=m;else{var S=m<.5?m*(1+c):m+c-m*c,L=2*m-S;x=A(L,S,d+1/3),_=A(L,S,d),O=A(L,S,d-1/3)}return{r:255*x,g:255*_,b:255*O}}(r.h,i,s),u=!0,f="hsl"),r.hasOwnProperty("a")&&(a=r.a));var p,v,h;return a=Ft(a),{ok:u,format:r.format||f,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a}}(n);this._originalInput=n,this._r=t.r,this._g=t.g,this._b=t.b,this._a=t.a,this._roundA=Math.round(100*this._a)/100,this._format=o.format||t.format,this._gradientType=o.gradientType,this._r<1&&(this._r=Math.round(this._r)),this._g<1&&(this._g=Math.round(this._g)),this._b<1&&(this._b=Math.round(this._b)),this._ok=t.ok}function yt(n,o,t){n=R(n,255),o=R(o,255),t=R(t,255);var r,e,a=Math.max(n,o,t),i=Math.min(n,o,t),l=(a+i)/2;if(a==i)r=e=0;else{var s=a-i;switch(e=l>.5?s/(2-a-i):s/(a+i),a){case n:r=(o-t)/s+(o<t?6:0);break;case o:r=(t-n)/s+2;break;case t:r=(n-o)/s+4}r/=6}return{h:r,s:e,l}}function xt(n,o,t){n=R(n,255),o=R(o,255),t=R(t,255);var r,e,a=Math.max(n,o,t),i=Math.min(n,o,t),l=a,s=a-i;if(e=a===0?0:s/a,a==i)r=0;else{switch(a){case n:r=(o-t)/s+(o<t?6:0);break;case o:r=(t-n)/s+2;break;case t:r=(n-o)/s+4}r/=6}return{h:r,s:e,v:l}}function kt(n,o,t,r){var e=[dn(Math.round(n).toString(16)),dn(Math.round(o).toString(16)),dn(Math.round(t).toString(16))];return r&&e[0].charAt(0)==e[0].charAt(1)&&e[1].charAt(0)==e[1].charAt(1)&&e[2].charAt(0)==e[2].charAt(1)?e[0].charAt(0)+e[1].charAt(0)+e[2].charAt(0):e.join("")}function wt(n,o,t,r){return[dn(Ht(r)),dn(Math.round(n).toString(16)),dn(Math.round(o).toString(16)),dn(Math.round(t).toString(16))].join("")}function Ir(n,o){o=o===0?0:o||10;var t=y(n).toHsl();return t.s-=o/100,t.s=No(t.s),y(t)}function Br(n,o){o=o===0?0:o||10;var t=y(n).toHsl();return t.s+=o/100,t.s=No(t.s),y(t)}function Xr(n){return y(n).desaturate(100)}function Wr(n,o){o=o===0?0:o||10;var t=y(n).toHsl();return t.l+=o/100,t.l=No(t.l),y(t)}function Vr(n,o){o=o===0?0:o||10;var t=y(n).toRgb();return t.r=Math.max(0,Math.min(255,t.r-Math.round(-o/100*255))),t.g=Math.max(0,Math.min(255,t.g-Math.round(-o/100*255))),t.b=Math.max(0,Math.min(255,t.b-Math.round(-o/100*255))),y(t)}function Yr(n,o){o=o===0?0:o||10;var t=y(n).toHsl();return t.l-=o/100,t.l=No(t.l),y(t)}function Kr(n,o){var t=y(n).toHsl(),r=(t.h+o)%360;return t.h=r<0?360+r:r,y(t)}function Zr(n){var o=y(n).toHsl();return o.h=(o.h+180)%360,y(o)}function Ot(n,o){if(isNaN(o)||o<=0)throw new Error("Argument to polyad must be a positive number");for(var t=y(n).toHsl(),r=[y(n)],e=360/o,a=1;a<o;a++)r.push(y({h:(t.h+a*e)%360,s:t.s,l:t.l}));return r}function Ur(n){var o=y(n).toHsl(),t=o.h;return[y(n),y({h:(t+72)%360,s:o.s,l:o.l}),y({h:(t+216)%360,s:o.s,l:o.l})]}function Jr(n,o,t){o=o||6,t=t||30;var r=y(n).toHsl(),e=360/t,a=[y(n)];for(r.h=(r.h-(e*o>>1)+720)%360;--o;)r.h=(r.h+e)%360,a.push(y(r));return a}function Gr(n,o){o=o||6;for(var t=y(n).toHsv(),r=t.h,e=t.s,a=t.v,i=[],l=1/o;o--;)i.push(y({h:r,s:e,v:a})),a=(a+l)%1;return i}y.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var n=this.toRgb();return(299*n.r+587*n.g+114*n.b)/1e3},getLuminance:function(){var n,o,t,r=this.toRgb();return n=r.r/255,o=r.g/255,t=r.b/255,.2126*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))+.7152*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))+.0722*(t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4))},setAlpha:function(n){return this._a=Ft(n),this._roundA=Math.round(100*this._a)/100,this},toHsv:function(){var n=xt(this._r,this._g,this._b);return{h:360*n.h,s:n.s,v:n.v,a:this._a}},toHsvString:function(){var n=xt(this._r,this._g,this._b),o=Math.round(360*n.h),t=Math.round(100*n.s),r=Math.round(100*n.v);return this._a==1?"hsv("+o+", "+t+"%, "+r+"%)":"hsva("+o+", "+t+"%, "+r+"%, "+this._roundA+")"},toHsl:function(){var n=yt(this._r,this._g,this._b);return{h:360*n.h,s:n.s,l:n.l,a:this._a}},toHslString:function(){var n=yt(this._r,this._g,this._b),o=Math.round(360*n.h),t=Math.round(100*n.s),r=Math.round(100*n.l);return this._a==1?"hsl("+o+", "+t+"%, "+r+"%)":"hsla("+o+", "+t+"%, "+r+"%, "+this._roundA+")"},toHex:function(n){return kt(this._r,this._g,this._b,n)},toHexString:function(n){return"#"+this.toHex(n)},toHex8:function(n){return function(o,t,r,e,a){var i=[dn(Math.round(o).toString(16)),dn(Math.round(t).toString(16)),dn(Math.round(r).toString(16)),dn(Ht(e))];return a&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)&&i[3].charAt(0)==i[3].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)+i[3].charAt(0):i.join("")}(this._r,this._g,this._b,this._a,n)},toHex8String:function(n){return"#"+this.toHex8(n)},toRgb:function(){return{r:Math.round(this._r),g:Math.round(this._g),b:Math.round(this._b),a:this._a}},toRgbString:function(){return this._a==1?"rgb("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+")":"rgba("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:Math.round(100*R(this._r,255))+"%",g:Math.round(100*R(this._g,255))+"%",b:Math.round(100*R(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return this._a==1?"rgb("+Math.round(100*R(this._r,255))+"%, "+Math.round(100*R(this._g,255))+"%, "+Math.round(100*R(this._b,255))+"%)":"rgba("+Math.round(100*R(this._r,255))+"%, "+Math.round(100*R(this._g,255))+"%, "+Math.round(100*R(this._b,255))+"%, "+this._roundA+")"},toName:function(){return this._a===0?"transparent":!(this._a<1)&&(Qr[kt(this._r,this._g,this._b,!0)]||!1)},toFilter:function(n){var o="#"+wt(this._r,this._g,this._b,this._a),t=o,r=this._gradientType?"GradientType = 1, ":"";if(n){var e=y(n);t="#"+wt(e._r,e._g,e._b,e._a)}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+o+",endColorstr="+t+")"},toString:function(n){var o=!!n;n=n||this._format;var t=!1,r=this._a<1&&this._a>=0;return o||!r||n!=="hex"&&n!=="hex6"&&n!=="hex3"&&n!=="hex4"&&n!=="hex8"&&n!=="name"?(n==="rgb"&&(t=this.toRgbString()),n==="prgb"&&(t=this.toPercentageRgbString()),n!=="hex"&&n!=="hex6"||(t=this.toHexString()),n==="hex3"&&(t=this.toHexString(!0)),n==="hex4"&&(t=this.toHex8String(!0)),n==="hex8"&&(t=this.toHex8String()),n==="name"&&(t=this.toName()),n==="hsl"&&(t=this.toHslString()),n==="hsv"&&(t=this.toHsvString()),t||this.toHexString()):n==="name"&&this._a===0?this.toName():this.toRgbString()},clone:function(){return y(this.toString())},_applyModification:function(n,o){var t=n.apply(null,[this].concat([].slice.call(o)));return this._r=t._r,this._g=t._g,this._b=t._b,this.setAlpha(t._a),this},lighten:function(){return this._applyModification(Wr,arguments)},brighten:function(){return this._applyModification(Vr,arguments)},darken:function(){return this._applyModification(Yr,arguments)},desaturate:function(){return this._applyModification(Ir,arguments)},saturate:function(){return this._applyModification(Br,arguments)},greyscale:function(){return this._applyModification(Xr,arguments)},spin:function(){return this._applyModification(Kr,arguments)},_applyCombination:function(n,o){return n.apply(null,[this].concat([].slice.call(o)))},analogous:function(){return this._applyCombination(Jr,arguments)},complement:function(){return this._applyCombination(Zr,arguments)},monochromatic:function(){return this._applyCombination(Gr,arguments)},splitcomplement:function(){return this._applyCombination(Ur,arguments)},triad:function(){return this._applyCombination(Ot,[3])},tetrad:function(){return this._applyCombination(Ot,[4])}},y.fromRatio=function(n,o){if(Co(n)=="object"){var t={};for(var r in n)n.hasOwnProperty(r)&&(t[r]=r==="a"?n[r]:fo(n[r]));n=t}return y(n,o)},y.equals=function(n,o){return!(!n||!o)&&y(n).toRgbString()==y(o).toRgbString()},y.random=function(){return y.fromRatio({r:Math.random(),g:Math.random(),b:Math.random()})},y.mix=function(n,o,t){t=t===0?0:t||50;var r=y(n).toRgb(),e=y(o).toRgb(),a=t/100;return y({r:(e.r-r.r)*a+r.r,g:(e.g-r.g)*a+r.g,b:(e.b-r.b)*a+r.b,a:(e.a-r.a)*a+r.a})},y.readability=function(n,o){var t=y(n),r=y(o);return(Math.max(t.getLuminance(),r.getLuminance())+.05)/(Math.min(t.getLuminance(),r.getLuminance())+.05)},y.isReadable=function(n,o,t){var r,e,a=y.readability(n,o);switch(e=!1,(r=function(i){var l,s;return l=((i=i||{level:"AA",size:"small"}).level||"AA").toUpperCase(),s=(i.size||"small").toLowerCase(),l!=="AA"&&l!=="AAA"&&(l="AA"),s!=="small"&&s!=="large"&&(s="small"),{level:l,size:s}}(t)).level+r.size){case"AAsmall":case"AAAlarge":e=a>=4.5;break;case"AAlarge":e=a>=3;break;case"AAAsmall":e=a>=7}return e},y.mostReadable=function(n,o,t){var r,e,a,i,l=null,s=0;e=(t=t||{}).includeFallbackColors,a=t.level,i=t.size;for(var u=0;u<o.length;u++)(r=y.readability(n,o[u]))>s&&(s=r,l=y(o[u]));return y.isReadable(n,l,{level:a,size:i})||!e?l:(t.includeFallbackColors=!1,y.mostReadable(n,["#fff","#000"],t))};var Uo=y.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},Qr=y.hexNames=function(n){var o={};for(var t in n)n.hasOwnProperty(t)&&(o[n[t]]=t);return o}(Uo);function Ft(n){return n=parseFloat(n),(isNaN(n)||n<0||n>1)&&(n=1),n}function R(n,o){(function(r){return typeof r=="string"&&r.indexOf(".")!=-1&&parseFloat(r)===1})(n)&&(n="100%");var t=function(r){return typeof r=="string"&&r.indexOf("%")!=-1}(n);return n=Math.min(o,Math.max(0,parseFloat(n))),t&&(n=parseInt(n*o,10)/100),Math.abs(n-o)<1e-6?1:n%o/parseFloat(o)}function No(n){return Math.min(1,Math.max(0,n))}function nn(n){return parseInt(n,16)}function dn(n){return n.length==1?"0"+n:""+n}function fo(n){return n<=1&&(n=100*n+"%"),n}function Ht(n){return Math.round(255*parseFloat(n)).toString(16)}function Pt(n){return nn(n)/255}var Tn,zo,To,un=(zo="[\\s|\\(]+("+(Tn="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+Tn+")[,|\\s]+("+Tn+")\\s*\\)?",To="[\\s|\\(]+("+Tn+")[,|\\s]+("+Tn+")[,|\\s]+("+Tn+")[,|\\s]+("+Tn+")\\s*\\)?",{CSS_UNIT:new RegExp(Tn),rgb:new RegExp("rgb"+zo),rgba:new RegExp("rgba"+To),hsl:new RegExp("hsl"+zo),hsla:new RegExp("hsla"+To),hsv:new RegExp("hsv"+zo),hsva:new RegExp("hsva"+To),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function Pn(n){return!!un.CSS_UNIT.exec(n)}var ne=function(n,o){var t=(typeof n=="string"?parseInt(n):n)||0;if(t>=-5&&t<=5){var r=t,e=parseFloat(o),a=e+r*(e/5)*-1;return(a==0||a<=Number.EPSILON)&&(a=.1),{animationPeriod:a+"s"}}return{animationPeriod:o}},oe=function(n,o){var t=n||{},r="";switch(o){case"small":r="12px";break;case"medium":r="16px";break;case"large":r="20px";break;default:r=void 0}var e={};if(t.fontSize){var a=t.fontSize;e=function(i,l){var s={};for(var u in i)Object.prototype.hasOwnProperty.call(i,u)&&l.indexOf(u)<0&&(s[u]=i[u]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function"){var f=0;for(u=Object.getOwnPropertySymbols(i);f<u.length;f++)l.indexOf(u[f])<0&&Object.prototype.propertyIsEnumerable.call(i,u[f])&&(s[u[f]]=i[u[f]])}return s}(t,["fontSize"]),r=a}return{fontSize:r,styles:e}},te={color:"currentColor",mixBlendMode:"difference",width:"unset",display:"block",paddingTop:"2px"},re=function(n){var o=n.className,t=n.text,r=n.textColor,e=n.staticText,a=n.style;return t?W.createElement("span",{className:"rli-d-i-b rli-text-format ".concat(o||"").trim(),style:vn(vn(vn({},e&&te),r&&{color:r,mixBlendMode:"unset"}),a&&a)},typeof t=="string"&&t.length?t:"loading"):null},It="rgb(50, 205, 50)";function ee(n,o){o===void 0&&(o=0);var t=[];return function r(e,a){return a===void 0&&(a=0),t.push.apply(t,e),t.length<a&&r(t,a),t.slice(0,a)}(n,o)}H(`.atom-rli-bounding-box {
  --atom-phase1-rgb: 50, 205, 50;
  color: rgba(var(--atom-phase1-rgb), 1);
  font-size: 16px;
  position: relative;
  text-align: unset;
  isolation: isolate;
}
.atom-rli-bounding-box .atom-indicator {
  width: 6em;
  height: 6em;
  position: relative;
  perspective: 6em;
  overflow: hidden;
  color: rgba(var(--atom-phase1-rgb), 1);
  animation: calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite u1qz6fj;
}
.atom-rli-bounding-box .atom-indicator::after, .atom-rli-bounding-box .atom-indicator::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 0.48em;
  height: 0.48em;
  margin: auto;
  border-radius: 50%;
  background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase1-rgb), 0.1), rgba(var(--atom-phase1-rgb), 0.3) 37%, rgba(var(--atom-phase1-rgb), 1) 100%);
  animation: calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite u1qz6de;
}
.atom-rli-bounding-box .atom-indicator::before {
  filter: drop-shadow(0px 0px 0.0625em currentColor);
}
.atom-rli-bounding-box .atom-indicator .electron-orbit {
  color: rgba(var(--atom-phase1-rgb), 0.85);
  border: 0;
  border-left: 0.4em solid currentColor;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 4.8em;
  height: 4.8em;
  background-color: transparent;
  border-radius: 50%;
  transform-style: preserve-3d;
  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, linear) infinite u1qz6ex, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite u1qz6g6;
}
.atom-rli-bounding-box .atom-indicator .electron-orbit::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  color: rgba(var(--atom-phase1-rgb), 0.18);
  animation: calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite u1qz6h4;
  border: 0.125em solid currentColor;
}
.atom-rli-bounding-box .atom-indicator .electron-orbit::before {
  content: "";
  width: 0.192em;
  height: 0.192em;
  position: absolute;
  border-radius: 50%;
  top: -0.096em;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  color: rgba(var(--atom-phase1-rgb), 1);
  box-shadow: 0px 0px 0.0625em 0.0625em currentColor, 0px 0px 0.0625em 0.125em currentColor;
  background-color: currentColor;
  transform: rotateY(-70deg);
  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, linear) infinite u1qz6e7, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite u1qz6fj;
}
.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(1) {
  --orbit-vector-factor: -1;
  transform: rotateY(65deg) rotateX(calc(54deg * var(--orbit-vector-factor)));
}
.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(2) {
  --orbit-vector-factor: 1;
  transform: rotateY(65deg) rotateX(calc(54deg * var(--orbit-vector-factor)));
}
.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(3) {
  --orbit-vector-factor: 0;
  transform: rotateY(65deg) rotateX(calc(54deg * var(--orbit-vector-factor)));
  animation-delay: calc(var(--rli-animation-duration, 1s) * 0.5 * -1), calc(var(--rli-animation-duration, 1s) * 4 * -1);
}
.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(3)::before {
  animation-delay: calc(var(--rli-animation-duration, 1s) * 0.5 * -1), calc(var(--rli-animation-duration, 1s) * 4 * -1);
}
.atom-rli-bounding-box .atom-text {
  color: currentColor;
  mix-blend-mode: difference;
  width: unset;
  display: block;
}

@property --atom-phase1-rgb {
  syntax: "<number>#";
  inherits: true;
  initial-value: 50, 205, 50;
}
@property --atom-phase2-rgb {
  syntax: "<number>#";
  inherits: true;
  initial-value: 50, 205, 50;
}
@property --atom-phase3-rgb {
  syntax: "<number>#";
  inherits: true;
  initial-value: 50, 205, 50;
}
@property --atom-phase4-rgb {
  syntax: "<number>#";
  inherits: true;
  initial-value: 50, 205, 50;
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1s;
}
@keyframes u1qz6ex {
  from {
    transform: rotateY(70deg) rotateX(calc(54deg * var(--orbit-vector-factor))) rotateZ(0deg);
  }
  to {
    transform: rotateY(70deg) rotateX(calc(54deg * var(--orbit-vector-factor))) rotateZ(360deg);
  }
}
@keyframes u1qz6e7 {
  from {
    transform: rotateY(-70deg) rotateX(0deg);
  }
  to {
    transform: rotateY(-70deg) rotateX(-360deg);
  }
}
@keyframes u1qz6de {
  100%, 0% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase1-rgb), 0.1), rgba(var(--atom-phase1-rgb), 0.3) 37%, rgba(var(--atom-phase1-rgb), 1) 100%);
  }
  20% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase1-rgb), 0.1), rgba(var(--atom-phase1-rgb), 0.3) 37%, rgba(var(--atom-phase1-rgb), 1) 100%);
  }
  25% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1) 100%);
  }
  45% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1) 100%);
  }
  50% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1) 100%);
  }
  70% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1) 100%);
  }
  75% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1) 100%);
  }
  95% {
    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1) 100%);
  }
}
@keyframes u1qz6fj {
  100%, 0% {
    color: rgba(var(--atom-phase1-rgb), 1);
  }
  20% {
    color: rgba(var(--atom-phase1-rgb), 1);
  }
  25% {
    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1);
  }
  45% {
    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1);
  }
  50% {
    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1);
  }
  70% {
    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1);
  }
  75% {
    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1);
  }
  95% {
    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1);
  }
}
@keyframes u1qz6g6 {
  100%, 0% {
    color: rgba(var(--atom-phase1-rgb), 0.85);
  }
  20% {
    color: rgba(var(--atom-phase1-rgb), 0.85);
  }
  25% {
    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.85);
  }
  45% {
    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.85);
  }
  50% {
    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.85);
  }
  70% {
    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.85);
  }
  75% {
    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.85);
  }
  95% {
    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.85);
  }
}
@keyframes u1qz6h4 {
  100%, 0% {
    color: rgba(var(--atom-phase1-rgb), 0.18);
  }
  20% {
    color: rgba(var(--atom-phase1-rgb), 0.18);
  }
  25% {
    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.18);
  }
  45% {
    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.18);
  }
  50% {
    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.18);
  }
  70% {
    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.18);
  }
  75% {
    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.18);
  }
  95% {
    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.18);
  }
}`);y(It).toRgb();Array.from({length:4},function(n,o){return"--atom-phase".concat(o+1,"-rgb")});H(`.commet-rli-bounding-box {
  --commet-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  width: 6.85em;
  height: 6.85em;
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  isolation: isolate;
}
.commet-rli-bounding-box .commet-indicator {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  box-sizing: border-box;
  width: 6em;
  height: 6em;
  color: var(--commet-phase1-color);
  display: inline-block;
  isolation: isolate;
  position: absolute;
  z-index: 0;
  animation: calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, cubic-bezier(0.08, 0.03, 0.91, 0.93)) infinite u1qz6k3;
}
.commet-rli-bounding-box .commet-indicator .commet-box {
  position: absolute;
  display: inline-block;
  top: 0;
  right: 0;
  bottom: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  animation: u1qz6j2 var(--rli-animation-duration, 1.2s) var(--rli-animation-function, cubic-bezier(0.08, 0.03, 0.91, 0.93)) infinite;
}
.commet-rli-bounding-box .commet-indicator .commet-box:nth-of-type(1) {
  width: 100%;
  height: 100%;
  animation-direction: normal;
}
.commet-rli-bounding-box .commet-indicator .commet-box:nth-of-type(2) {
  width: 70%;
  height: 70%;
  animation-direction: reverse;
}
.commet-rli-bounding-box .commet-indicator .commet-box .commetball-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  bottom: 0;
  left: 0;
  display: inline-block;
}
.commet-rli-bounding-box .commet-indicator .commet-box .commetball-box::before {
  content: "";
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: currentColor;
  position: absolute;
  top: -0.125em;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0.2em 0em currentColor, 0 0 0.6em 0em currentColor;
}
.commet-rli-bounding-box .commet-indicator .commet-box .commet-trail {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  box-sizing: border-box;
  border-style: solid;
}
.commet-rli-bounding-box .commet-indicator .commet-box .commet-trail.trail1 {
  border-color: currentColor transparent transparent currentColor;
  border-width: 0.25em 0.25em 0 0;
  transform: rotateZ(-45deg);
}
.commet-rli-bounding-box .commet-indicator .commet-box .commet-trail.trail2 {
  border-color: currentColor currentColor transparent transparent;
  border-width: 0.25em 0 0 0.25em;
  transform: rotateZ(45deg);
}
.commet-rli-bounding-box .commet-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--commet-phase1-color);
}

@property --commet-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --commet-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --commet-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --commet-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.2s;
}
@keyframes u1qz6j2 {
  to {
    transform: rotate(1turn);
  }
}
@keyframes u1qz6k3 {
  100%, 0% {
    color: var(--commet-phase1-color);
  }
  20% {
    color: var(--commet-phase1-color);
  }
  25% {
    color: var(--commet-phase2-color, var(--commet-phase1-color));
  }
  45% {
    color: var(--commet-phase2-color, var(--commet-phase1-color));
  }
  50% {
    color: var(--commet-phase3-color, var(--commet-phase1-color));
  }
  70% {
    color: var(--commet-phase3-color, var(--commet-phase1-color));
  }
  75% {
    color: var(--commet-phase4-color, var(--commet-phase1-color));
  }
  95% {
    color: var(--commet-phase4-color, var(--commet-phase1-color));
  }
}`);var Kn=Array.from({length:4},function(n,o){return"--commet-phase".concat(o+1,"-color")}),se=function(n){var o,t=oe(n==null?void 0:n.style,n==null?void 0:n.size),r=t.styles,e=t.fontSize,a=n==null?void 0:n.easing,i=ne(n==null?void 0:n.speedPlus,"1.2s").animationPeriod,l=function(s){var u={};if(s instanceof Array){for(var f=ee(s,Kn.length),p=0;p<f.length&&!(p>=4);p++)u[Kn[p]]=f[p];return u}try{if(typeof s!="string")throw new Error("Color String expected");for(var v=0;v<Kn.length;v++)u[Kn[v]]=s}catch(h){for(h instanceof Error?console.warn("[".concat(h.message,']: Received "').concat(typeof s,'" instead with value, ').concat(JSON.stringify(s))):console.warn("".concat(JSON.stringify(s)," received in <Commet /> indicator cannot be processed. Using default instead!")),v=0;v<Kn.length;v++)u[Kn[v]]=It}return u}((o=n==null?void 0:n.color)!==null&&o!==void 0?o:"");return W.createElement("span",{className:"rli-d-i-b commet-rli-bounding-box",style:vn(vn(vn(vn(vn({},e&&{fontSize:e}),i&&{"--rli-animation-duration":i}),a&&{"--rli-animation-function":a}),l),r),role:"status","aria-live":"polite","aria-label":"Loading"},W.createElement("span",{className:"rli-d-i-b commet-indicator"},W.createElement("span",{className:"rli-d-i-b commet-box"},W.createElement("span",{className:"rli-d-i-b commet-trail trail1"}),W.createElement("span",{className:"rli-d-i-b  commetball-box"})),W.createElement("span",{className:"rli-d-i-b commet-box"},W.createElement("span",{className:"rli-d-i-b commet-trail trail2"}),W.createElement("span",{className:"rli-d-i-b commetball-box"})),W.createElement(re,{className:"commet-text",text:n==null?void 0:n.text,textColor:n==null?void 0:n.textColor})))};H(`.OP-annulus-rli-bounding-box {
  --OP-annulus-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  display: inline-block;
}
.OP-annulus-rli-bounding-box .OP-annulus-indicator {
  width: 5em;
  height: 5em;
  color: var(--OP-annulus-phase1-color);
  display: inline-block;
  position: relative;
  z-index: 0;
}
.OP-annulus-rli-bounding-box .OP-annulus-indicator .whirl {
  animation: u1qz6pz calc(var(--rli-animation-duration, 1.5s) * 1.33) linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.OP-annulus-rli-bounding-box .OP-annulus-indicator .path {
  stroke-dasharray: 1, 125;
  stroke-dashoffset: 0;
  animation: var(--rli-animation-duration, 1.5s) var(--rli-animation-function, ease-in-out) infinite u1qz6r6, calc(var(--rli-animation-duration, 1.5s) * 4) var(--rli-animation-function, ease-in-out) infinite u1qz6sy;
  stroke-linecap: round;
}
.OP-annulus-rli-bounding-box .OP-annulus-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
}

@property --OP-annulus-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.5s;
}
@keyframes u1qz6pz {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes u1qz6r6 {
  0% {
    stroke-dasharray: 1, 125;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 98, 125;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 98, 125;
    stroke-dashoffset: -124px;
  }
}
@keyframes u1qz6sy {
  100%, 0% {
    stroke: var(--OP-annulus-phase1-color);
  }
  22% {
    stroke: var(--OP-annulus-phase1-color);
  }
  25% {
    stroke: var(--OP-annulus-phase2-color, var(--OP-annulus-phase1-color));
  }
  42% {
    stroke: var(--OP-annulus-phase2-color, var(--OP-annulus-phase1-color));
  }
  50% {
    stroke: var(--OP-annulus-phase3-color, var(--OP-annulus-phase1-color));
  }
  72% {
    stroke: var(--OP-annulus-phase3-color, var(--OP-annulus-phase1-color));
  }
  75% {
    stroke: var(--OP-annulus-phase4-color, var(--OP-annulus-phase1-color));
  }
  97% {
    stroke: var(--OP-annulus-phase4-color, var(--OP-annulus-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--OP-annulus-phase".concat(o+1,"-color")});function Xo(n){return n&&n.Math===Math&&n}H(`.OP-dotted-rli-bounding-box {
  --OP-dotted-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  box-sizing: border-box;
  display: inline-block;
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator {
  width: 5em;
  height: 5em;
  color: var(--OP-dotted-phase1-color);
  display: inline-block;
  position: relative;
  z-index: 0;
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .OP-dotted-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder .dot {
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: currentColor;
  border-radius: 50%;
  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, ease-in-out) infinite u1qz6qy, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, ease-in-out) infinite u1qz6s0;
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(1) {
  transform: rotate(0deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(1) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 12 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(2) {
  transform: rotate(30deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(2) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 11 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(3) {
  transform: rotate(60deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(3) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 10 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(4) {
  transform: rotate(90deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(4) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 9 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(5) {
  transform: rotate(120deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(5) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 8 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(6) {
  transform: rotate(150deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(6) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 7 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(7) {
  transform: rotate(180deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(7) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 6 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(8) {
  transform: rotate(210deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(8) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 5 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(9) {
  transform: rotate(240deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(9) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 4 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(10) {
  transform: rotate(270deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(10) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 3 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(11) {
  transform: rotate(300deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(11) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 2 * -1);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(12) {
  transform: rotate(330deg);
}
.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(12) .dot {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 1 * -1);
}

@property --OP-dotted-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-dotted-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-dotted-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-dotted-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.2s;
}
@keyframes u1qz6qy {
  0%, 39%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
@keyframes u1qz6s0 {
  100%, 0% {
    background-color: var(--OP-dotted-phase1-color);
  }
  22% {
    background-color: var(--OP-dotted-phase1-color);
  }
  25% {
    background-color: var(--OP-dotted-phase2-color, var(--OP-dotted-phase1-color));
  }
  47% {
    background-color: var(--OP-dotted-phase2-color, var(--OP-dotted-phase1-color));
  }
  50% {
    background-color: var(--OP-dotted-phase3-color, var(--OP-dotted-phase1-color));
  }
  72% {
    background-color: var(--OP-dotted-phase3-color, var(--OP-dotted-phase1-color));
  }
  75% {
    background-color: var(--OP-dotted-phase4-color, var(--OP-dotted-phase1-color));
  }
  97% {
    background-color: var(--OP-dotted-phase4-color, var(--OP-dotted-phase1-color));
  }
}`);Xo(typeof window=="object"&&window)||Xo(typeof self=="object"&&self)||Xo(typeof global=="object"&&global)||function(){return this}()||Function("return this")();Array.from({length:4},function(n,o){return"--OP-dotted-phase".concat(o+1,"-color")});H(`.OP-spokes-rli-bounding-box {
  --OP-spokes-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  position: relative;
  color: var(--OP-spokes-phase1-color);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator {
  width: 4.8em;
  height: 4.8em;
  display: block;
  position: relative;
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke {
  position: absolute;
  height: 1.2em;
  width: 0.4em;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto auto 50%;
  background-color: var(--OP-spokes-phase1-color);
  border-radius: 0.24em;
  opacity: 0;
  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, ease-in-out) backwards infinite u1qz6sz, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, ease-in-out) infinite u1qz6t3;
  transform-origin: left center;
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(1) {
  transform: rotate(calc(0 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(11 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(2) {
  transform: rotate(calc(1 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(10 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(3) {
  transform: rotate(calc(2 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(9 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(4) {
  transform: rotate(calc(3 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(8 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(5) {
  transform: rotate(calc(4 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(7 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(6) {
  transform: rotate(calc(5 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(6 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(7) {
  transform: rotate(calc(6 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(5 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(8) {
  transform: rotate(calc(7 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(4 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(9) {
  transform: rotate(calc(8 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(3 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(10) {
  transform: rotate(calc(9 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(2 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(11) {
  transform: rotate(calc(10 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(1 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(12) {
  transform: rotate(calc(11 * 360deg / 12)) translate(-50%, -1.56em);
  animation-delay: calc(0 * var(--rli-animation-duration, 1.2s) / 12 * -1);
}
.OP-spokes-rli-bounding-box .OP-spokes-indicator-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--OP-spokes-phase1-color);
  z-index: -2;
}

@property --OP-spokes-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-spokes-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-spokes-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-spokes-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.2s;
}
@keyframes u1qz6sz {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes u1qz6t3 {
  100%, 0% {
    background-color: var(--OP-spokes-phase1-color);
  }
  22% {
    background-color: var(--OP-spokes-phase1-color);
  }
  25% {
    background-color: var(--OP-spokes-phase2-color, var(--OP-spokes-phase1-color));
  }
  42% {
    background-color: var(--OP-spokes-phase2-color, var(--OP-spokes-phase1-color));
  }
  50% {
    background-color: var(--OP-spokes-phase3-color, var(--OP-spokes-phase1-color));
  }
  72% {
    background-color: var(--OP-spokes-phase3-color, var(--OP-spokes-phase1-color));
  }
  75% {
    background-color: var(--OP-spokes-phase4-color, var(--OP-spokes-phase1-color));
  }
  97% {
    background-color: var(--OP-spokes-phase4-color, var(--OP-spokes-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--OP-spokes-phase".concat(o+1,"-color")});H(`.OP-annulus-dual-sectors-rli-bounding-box {
  --OP-annulus-dual-sectors-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  box-sizing: border-box;
  display: inline-block;
}
.OP-annulus-dual-sectors-rli-bounding-box .OP-annulus-dual-sectors-indicator {
  width: 5em;
  height: 5em;
  display: inline-block;
  position: relative;
  z-index: 0;
  color: var(--OP-annulus-dual-sectors-phase1-color);
}
.OP-annulus-dual-sectors-rli-bounding-box .OP-annulus-dual-sectors-indicator .annulus-sectors {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-width: 0.34em;
  border-style: solid;
  border-color: var(--OP-annulus-dual-sectors-phase1-color) transparent var(--OP-annulus-dual-sectors-phase1-color) transparent;
  background-color: transparent;
  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, linear) infinite u1qz6t5, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, linear) infinite u1qz6uw;
}
.OP-annulus-dual-sectors-rli-bounding-box .OP-annulus-dual-sectors-indicator .OP-annulus-dual-sectors-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
}

@property --OP-annulus-dual-sectors-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-dual-sectors-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-dual-sectors-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-dual-sectors-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.2s;
}
@keyframes u1qz6t5 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes u1qz6uw {
  100%, 0% {
    border-color: var(--OP-annulus-dual-sectors-phase1-color) transparent;
  }
  20% {
    border-color: var(--OP-annulus-dual-sectors-phase1-color) transparent;
  }
  25% {
    border-color: var(--OP-annulus-dual-sectors-phase2-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;
  }
  45% {
    border-color: var(--OP-annulus-dual-sectors-phase2-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;
  }
  50% {
    border-color: var(--OP-annulus-dual-sectors-phase3-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;
  }
  70% {
    border-color: var(--OP-annulus-dual-sectors-phase3-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;
  }
  75% {
    border-color: var(--OP-annulus-dual-sectors-phase4-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;
  }
  95% {
    border-color: var(--OP-annulus-dual-sectors-phase4-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;
  }
}`);Array.from({length:4},function(n,o){return"--OP-annulus-dual-sectors-phase".concat(o+1,"-color")});H(`.OP-annulus-sector-track-rli-bounding-box {
  --OP-annulus-track-phase1-color: rgba(50, 205, 50, 0.22);
  --OP-annulus-sector-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  display: inline-block;
}
.OP-annulus-sector-track-rli-bounding-box .OP-annulus-sector-track-indicator {
  width: 5em;
  height: 5em;
  color: var(--OP-annulus-sector-phase1-color);
  display: inline-block;
  position: relative;
  z-index: 0;
}
.OP-annulus-sector-track-rli-bounding-box .OP-annulus-sector-track-indicator .annulus-track-ring {
  width: 100%;
  height: 100%;
  border-width: 0.34em;
  border-style: solid;
  border-radius: 50%;
  box-sizing: border-box;
  border-color: var(--OP-annulus-track-phase1-color);
  border-top-color: var(--OP-annulus-sector-phase1-color);
  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, linear) infinite u1qz6tq, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite u1qz6v8;
}
.OP-annulus-sector-track-rli-bounding-box .OP-annulus-sector-track-indicator .OP-annulus-sector-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
}

@property --OP-annulus-track-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgba(50, 205, 50, 0.22);
}
@property --OP-annulus-track-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgba(50, 205, 50, 0.22);
}
@property --OP-annulus-track-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgba(50, 205, 50, 0.22);
}
@property --OP-annulus-track-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgba(50, 205, 50, 0.22);
}
@property --OP-annulus-sector-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-sector-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-sector-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --OP-annulus-sector-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1s;
}
@keyframes u1qz6tq {
  to {
    transform: rotate(1turn);
  }
}
@keyframes u1qz6v8 {
  100%, 0% {
    border-color: var(--OP-annulus-track-phase1-color);
    border-top-color: var(--OP-annulus-sector-phase1-color);
  }
  18% {
    border-color: var(--OP-annulus-track-phase1-color);
    border-top-color: var(--OP-annulus-sector-phase1-color);
  }
  25% {
    border-color: var(--OP-annulus-track-phase2-color, var(--OP-annulus-track-phase1-color));
    border-top-color: var(--OP-annulus-sector-phase2-color, var(--OP-annulus-sector-phase1-color));
  }
  43% {
    border-color: var(--OP-annulus-track-phase2-color, var(--OP-annulus-track-phase1-color));
    border-top-color: var(--OP-annulus-sector-phase2-color, var(--OP-annulus-sector-phase1-color));
  }
  50% {
    border-color: var(--OP-annulus-track-phase3-color, var(--OP-annulus-track-phase1-color));
    border-top-color: var(--OP-annulus-sector-phase3-color, var(--OP-annulus-sector-phase1-color));
  }
  68% {
    border-color: var(--OP-annulus-track-phase3-color, var(--OP-annulus-track-phase1-color));
    border-top-color: var(--OP-annulus-sector-phase3-color, var(--OP-annulus-sector-phase1-color));
  }
  75% {
    border-color: var(--OP-annulus-track-phase4-color, var(--OP-annulus-track-phase1-color));
    border-top-color: var(--OP-annulus-sector-phase4-color, var(--OP-annulus-sector-phase1-color));
  }
  93% {
    border-color: var(--OP-annulus-track-phase4-color, var(--OP-annulus-track-phase1-color));
    border-top-color: var(--OP-annulus-sector-phase4-color, var(--OP-annulus-sector-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return["--OP-annulus-track-phase".concat(o+1,"-color"),"--OP-annulus-sector-phase".concat(o+1,"-color")]});H(`.foursquare-rli-bounding-box {
  --four-square-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  box-sizing: border-box;
  color: var(--four-square-phase1-color);
  display: inline-block;
  overflow: hidden;
}
.foursquare-rli-bounding-box .foursquare-indicator {
  height: 5.3033008589em;
  width: 5.3033008589em;
  position: relative;
  display: block;
}
.foursquare-rli-bounding-box .foursquare-indicator .squares-container {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 2.5em;
  width: 2.5em;
  color: inherit;
  will-change: color, width, height;
  transform: rotate(45deg);
  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, cubic-bezier(0.05, 0.28, 0.79, 0.98)) infinite u1qz6cv, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, cubic-bezier(0.05, 0.28, 0.79, 0.98)) infinite u1qz6e3;
}
.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square {
  position: absolute;
  width: 1.25em;
  height: 1.25em;
  border-radius: 0.1875em;
  background-color: currentColor;
  animation: u1qz6cr var(--rli-animation-duration, 1s) var(--rli-animation-function, cubic-bezier(0.05, 0.28, 0.79, 0.98)) both infinite;
}
.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square1 {
  top: 0;
  left: 0;
}
.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square2 {
  top: 0;
  right: 0;
}
.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square3 {
  bottom: 0;
  left: 0;
}
.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square4 {
  bottom: 0;
  right: 0;
}

@property --four-square-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --four-square-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --four-square-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --four-square-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1s;
}
@keyframes u1qz6cv {
  0% {
    width: 2.5em;
    height: 2.5em;
  }
  10% {
    width: 2.5em;
    height: 2.5em;
  }
  50% {
    width: 3.75em;
    height: 3.75em;
  }
  90% {
    width: 2.5em;
    height: 2.5em;
  }
  100% {
    width: 2.5em;
    height: 2.5em;
  }
}
@keyframes u1qz6cr {
  0% {
    transform: rotateZ(0deg);
  }
  10% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(90deg);
  }
  90% {
    transform: rotateZ(90deg);
  }
  100% {
    transform: rotateZ(90deg);
  }
}
@keyframes u1qz6e3 {
  100%, 0% {
    color: var(--four-square-phase1-color);
  }
  20% {
    color: var(--four-square-phase1-color);
  }
  25% {
    color: var(--four-square-phase2-color, var(--four-square-phase1-color));
  }
  45% {
    color: var(--four-square-phase2-color, var(--four-square-phase1-color));
  }
  50% {
    color: var(--four-square-phase3-color, var(--four-square-phase1-color));
  }
  70% {
    color: var(--four-square-phase3-color, var(--four-square-phase1-color));
  }
  75% {
    color: var(--four-square-phase4-color, var(--four-square-phase1-color));
  }
  95% {
    color: var(--four-square-phase4-color, var(--four-square-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--four-square-phase".concat(o+1,"-color")});H(`.mosaic-rli-bounding-box {
  --mosaic-phase1-color: rgb(50, 205, 50);
  box-sizing: border-box;
  font-size: 16px;
  color: var(--mosaic-phase1-color);
}
.mosaic-rli-bounding-box .mosaic-indicator {
  width: 5em;
  height: 5em;
  color: currentColor;
  display: grid;
  gap: 0.125em;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "a b c" "d e f" "g h i";
  position: relative;
  z-index: 0;
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 105%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -2;
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube {
  background-color: var(--mosaic-phase1-color);
  animation-name: u1qz6bl, u1qz6c9;
  animation-duration: var(--rli-animation-duration, 1.5s), calc(var(--rli-animation-duration, 1.5s) * 4);
  animation-timing-function: var(--rli-animation-function, ease-in-out);
  animation-iteration-count: infinite;
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube1 {
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 2);
  grid-area: a;
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube2 {
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 3);
  grid-area: b;
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube3 {
  grid-area: c;
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 4);
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube4 {
  grid-area: d;
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 1);
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube5 {
  grid-area: e;
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 2);
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube6 {
  grid-area: f;
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 3);
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube7 {
  grid-area: g;
  animation-delay: 0s;
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube8 {
  grid-area: h;
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 1);
}
.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube9 {
  grid-area: i;
  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 2);
}

@property --mosaic-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --mosaic-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --mosaic-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --mosaic-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.5s;
}
@keyframes u1qz6bl {
  0%, 60%, 100% {
    transform: scale3D(1, 1, 1);
  }
  30% {
    transform: scale3D(0, 0, 1);
  }
}
@keyframes u1qz6c9 {
  100%, 0% {
    background-color: var(--mosaic-phase1-color);
  }
  25% {
    background-color: var(--mosaic-phase2-color, var(--mosaic-phase1-color));
  }
  50% {
    background-color: var(--mosaic-phase3-color, var(--mosaic-phase1-color));
  }
  75% {
    background-color: var(--mosaic-phase4-color, var(--mosaic-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--mosaic-phase".concat(o+1,"-color")});H(`.riple-rli-bounding-box {
  --riple-phase1-color: rgb(50, 205, 50);
  box-sizing: border-box;
  font-size: 16px;
  display: inline-block;
  color: var(--riple-phase1-color);
}
.riple-rli-bounding-box .riple-indicator {
  display: inline-block;
  width: 5em;
  height: 5em;
  position: relative;
  z-index: 0;
}
.riple-rli-bounding-box .riple-indicator .riple-text {
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
}
.riple-rli-bounding-box .riple-indicator .riple {
  --border-width: 0.25em;
  position: absolute;
  border: var(--border-width) solid var(--riple-phase1-color);
  opacity: 1;
  border-radius: 50%;
  will-change: top, right, left, bottom, border-color;
  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, cubic-bezier(0, 0.2, 0.8, 1)) infinite u1qz6mm, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, cubic-bezier(0, 0.2, 0.8, 1)) infinite u1qz6og;
}
.riple-rli-bounding-box .riple-indicator .riple:nth-of-type(2) {
  animation-delay: calc(var(--rli-animation-duration, 1s) / 2 * -1);
}

@property --riple-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --riple-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --riple-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --riple-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1s;
}
@keyframes u1qz6mm {
  0% {
    top: calc(50% - var(--border-width));
    left: calc(50% - var(--border-width));
    right: calc(50% - var(--border-width));
    bottom: calc(50% - var(--border-width));
    opacity: 0;
  }
  4.9% {
    top: calc(50% - var(--border-width));
    left: calc(50% - var(--border-width));
    right: calc(50% - var(--border-width));
    bottom: calc(50% - var(--border-width));
    opacity: 0;
  }
  5% {
    top: calc(50% - var(--border-width));
    left: calc(50% - var(--border-width));
    right: calc(50% - var(--border-width));
    bottom: calc(50% - var(--border-width));
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
}
@keyframes u1qz6og {
  100%, 0% {
    border-color: var(--riple-phase1-color);
  }
  24.9% {
    border-color: var(--riple-phase1-color);
  }
  25% {
    border-color: var(--riple-phase2-color, var(--riple-phase1-color));
  }
  49.9% {
    border-color: var(--riple-phase2-color, var(--riple-phase1-color));
  }
  50% {
    border-color: var(--riple-phase3-color, var(--riple-phase1-color));
  }
  74.9% {
    border-color: var(--riple-phase3-color, var(--riple-phase1-color));
  }
  75% {
    border-color: var(--riple-phase4-color, var(--riple-phase1-color));
  }
  99.9% {
    border-color: var(--riple-phase4-color, var(--riple-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--riple-phase".concat(o+1,"-color")});H(`.pulsate-rli-bounding-box {
  --TD-pulsate-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  display: inline-block;
  box-sizing: border-box;
  color: var(--TD-pulsate-phase1-color);
}
.pulsate-rli-bounding-box .pulsate-indicator {
  width: 4.4em;
  height: 1.1em;
  text-align: center;
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}
.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot {
  width: 1.1em;
  height: 1.1em;
  border-radius: 50%;
  background-color: var(--TD-pulsate-phase1-color);
  transform: scale(0);
  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, ease-in-out) var(--delay) infinite u1qz6uj, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, ease-in-out) var(--delay) infinite u1qz6vi;
}
.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot:nth-of-type(1) {
  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.15 * -1);
}
.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot:nth-of-type(2) {
  --delay: calc(var(--rli-animation-duration, 1.2s) * 0);
}
.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot:nth-of-type(3) {
  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.15);
}
.pulsate-rli-bounding-box .pulsate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.6em;
  letter-spacing: 0.5px;
  font-family: sans-serif;
  mix-blend-mode: difference;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
}

@property --TD-pulsate-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-pulsate-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-pulsate-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-pulsate-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.2s;
}
@keyframes u1qz6uj {
  0%, 90%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
@keyframes u1qz6vi {
  0%, 100% {
    background-color: var(--TD-pulsate-phase1-color);
  }
  24.9% {
    background-color: var(--TD-pulsate-phase1-color);
  }
  25% {
    background-color: var(--TD-pulsate-phase2-color, var(--TD-pulsate-phase1-color));
  }
  49.9% {
    background-color: var(--TD-pulsate-phase2-color, var(--TD-pulsate-phase1-color));
  }
  50% {
    background-color: var(--TD-pulsate-phase3-color, var(--TD-pulsate-phase1-color));
  }
  74.9% {
    background-color: var(--TD-pulsate-phase3-color, var(--TD-pulsate-phase1-color));
  }
  75% {
    background-color: var(--TD-pulsate-phase4-color, var(--TD-pulsate-phase1-color));
  }
  99.9% {
    background-color: var(--TD-pulsate-phase4-color, var(--TD-pulsate-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--TD-pulsate-phase".concat(o+1,"-color")});H(`.brick-stack-rli-bounding-box {
  --TD-brick-stack-phase1-color: rgb(50, 205, 50);
  box-sizing: border-box;
  font-size: 16px;
  display: inline-block;
  color: var(--TD-brick-stack-phase1-color);
}
.brick-stack-rli-bounding-box .brick-stack-indicator {
  width: 2.8em;
  height: 2.8em;
  position: relative;
  display: block;
  margin: 0 auto;
}
.brick-stack-rli-bounding-box .brick-stack {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle closest-side, currentColor 0% 95%, rgba(0, 0, 0, 0) calc(95% + 1px)) 0 0/40% 40% no-repeat, radial-gradient(circle closest-side, currentColor 0% 95%, rgba(0, 0, 0, 0) calc(95% + 1px)) 0 100%/40% 40% no-repeat, radial-gradient(circle closest-side, currentColor 0% 95%, rgba(0, 0, 0, 0) calc(95% + 1px)) 100% 100%/40% 40% no-repeat;
  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, ease-out) infinite u1qz6w1, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, ease-out) infinite u1qz6x5;
}

@property --TD-brick-stack-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-brick-stack-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-brick-stack-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-brick-stack-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1s;
}
@keyframes u1qz6w1 {
  0% {
    background-position: 0 0, 0 100%, 100% 100%;
  }
  25% {
    background-position: 100% 0, 0 100%, 100% 100%;
  }
  50% {
    background-position: 100% 0, 0 0, 100% 100%;
  }
  75% {
    background-position: 100% 0, 0 0, 0 100%;
  }
  100% {
    background-position: 100% 100%, 0 0, 0 100%;
  }
}
@keyframes u1qz6x5 {
  100%, 0% {
    color: var(--TD-brick-stack-phase1-color);
  }
  20% {
    color: var(--TD-brick-stack-phase1-color);
  }
  25% {
    color: var(--TD-brick-stack-phase2-color, var(--TD-brick-stack-phase1-color));
  }
  45% {
    color: var(--TD-brick-stack-phase2-color, var(--TD-brick-stack-phase1-color));
  }
  50% {
    color: var(--TD-brick-stack-phase3-color, var(--TD-brick-stack-phase1-color));
  }
  70% {
    color: var(--TD-brick-stack-phase3-color, var(--TD-brick-stack-phase1-color));
  }
  75% {
    color: var(--TD-brick-stack-phase4-color, var(--TD-brick-stack-phase1-color));
  }
  95% {
    color: var(--TD-brick-stack-phase4-color, var(--TD-brick-stack-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--TD-brick-stack-phase".concat(o+1,"-color")});H(`.bob-rli-bounding-box {
  --TD-bob-phase1-color: rgb(50, 205, 50);
  box-sizing: border-box;
  font-size: 16px;
  display: inline-block;
  color: var(--TD-bob-phase1-color);
}
.bob-rli-bounding-box .bob-indicator {
  width: 4.4em;
  height: 2.2em;
  position: relative;
  display: block;
  margin: 0 auto;
}
.bob-rli-bounding-box .bob-indicator .bobbing,
.bob-rli-bounding-box .bob-indicator .bobbing::before,
.bob-rli-bounding-box .bob-indicator .bobbing::after {
  width: 1.1em;
  height: 100%;
  display: grid;
  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, linear) var(--delay) infinite u1qz6wd, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, linear) var(--delay) infinite u1qz6xx;
}
.bob-rli-bounding-box .bob-indicator .bobbing::before,
.bob-rli-bounding-box .bob-indicator .bobbing::after {
  content: "";
  grid-area: 1/1;
}
.bob-rli-bounding-box .bob-indicator .bobbing {
  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.12 * -1);
  background: radial-gradient(circle closest-side at center, currentColor 0% 92%, rgba(0, 0, 0, 0) calc(92% + 1px)) 50% 50%/100% 50% no-repeat;
}
.bob-rli-bounding-box .bob-indicator .bobbing::before {
  --delay: calc(var(--rli-animation-duration, 1.2s) * 0);
  transform: translateX(150%);
  background: radial-gradient(circle closest-side at center, currentColor 0% 92%, rgba(0, 0, 0, 0) calc(92% + 1px)) 50% 50%/100% 50% no-repeat;
}
.bob-rli-bounding-box .bob-indicator .bobbing::after {
  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.12);
  transform: translateX(300%);
  background: radial-gradient(circle closest-side at center, currentColor 0% 92%, rgba(0, 0, 0, 0) calc(92% + 1px)) 50% 50%/100% 50% no-repeat;
}

@property --TD-bob-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-bob-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-bob-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-bob-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.2s;
}
@keyframes u1qz6wd {
  100%, 0% {
    background-position: 50% 50%;
  }
  15% {
    background-position: 50% 10%;
  }
  30% {
    background-position: 50% 100%;
  }
  40% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 90%;
  }
  70% {
    background-position: 50% 10%;
  }
  98% {
    background-position: 50% 50%;
  }
}
@keyframes u1qz6xx {
  100%, 0% {
    color: var(--TD-bob-phase1-color);
  }
  22% {
    color: var(--TD-bob-phase1-color);
  }
  25% {
    color: var(--TD-bob-phase2-color, var(--TD-bob-phase1-color));
  }
  47% {
    color: var(--TD-bob-phase2-color, var(--TD-bob-phase1-color));
  }
  50% {
    color: var(--TD-bob-phase3-color, var(--TD-bob-phase1-color));
  }
  72% {
    color: var(--TD-bob-phase3-color, var(--TD-bob-phase1-color));
  }
  75% {
    color: var(--TD-bob-phase4-color, var(--TD-bob-phase1-color));
  }
  97% {
    color: var(--TD-bob-phase4-color, var(--TD-bob-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--TD-bob-phase".concat(o+1,"-color")});H(`.bounce-rli-bounding-box {
  --TD-bounce-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  color: var(--TD-bounce-phase1-color);
  display: inline-block;
  padding-bottom: 0.25125em;
}
.bounce-rli-bounding-box .wrapper {
  --dot1-delay: 0s;
  --dot1-x-offset: 0.55em;
  --dot2-delay: calc((var(--rli-animation-duration, 0.5s) + var(--rli-animation-duration, 0.5s) * 0.75) * -1);
  --dot2-x-offset: 2.2em;
  --dot3-delay: calc((var(--rli-animation-duration, 0.5s) + var(--rli-animation-duration, 0.5s) * 0.5) * -1);
  --dot3-x-offset: 3.85em;
  width: 5.5em;
  height: 3.125em;
  position: relative;
  display: block;
  margin: 0 auto;
}
.bounce-rli-bounding-box .wrapper .group {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bounce-rli-bounding-box .wrapper .group .dot {
  width: 1.1em;
  height: 1.1em;
  position: absolute;
  border-radius: 50%;
  background-color: var(--TD-bounce-phase1-color);
  transform-origin: 50%;
  animation: var(--rli-animation-duration, 0.5s) var(--rli-animation-function, cubic-bezier(0.74, 0.1, 0.74, 1)) alternate infinite u1qz6yl, calc(var(--rli-animation-duration, 0.5s) * 4) var(--rli-animation-function, cubic-bezier(0.74, 0.1, 0.74, 1)) infinite u1qz6zs;
}
.bounce-rli-bounding-box .wrapper .group .dot:nth-of-type(1) {
  left: var(--dot1-x-offset);
  animation-delay: var(--dot1-delay), 0s;
}
.bounce-rli-bounding-box .wrapper .group .dot:nth-of-type(2) {
  left: var(--dot2-x-offset);
  animation-delay: var(--dot2-delay), 0s;
}
.bounce-rli-bounding-box .wrapper .group .dot:nth-of-type(3) {
  left: var(--dot3-x-offset);
  animation-delay: var(--dot3-delay), 0s;
}
.bounce-rli-bounding-box .wrapper .group .shadow {
  width: 1.1em;
  height: 0.22em;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 101%;
  transform-origin: 50%;
  z-index: -1;
  filter: blur(1px);
  animation: var(--rli-animation-duration, 0.5s) var(--rli-animation-function, cubic-bezier(0.74, 0.1, 0.74, 1)) alternate infinite u1qz6z4;
}
.bounce-rli-bounding-box .wrapper .group .shadow:nth-of-type(1) {
  left: var(--dot1-x-offset);
  animation-delay: var(--dot1-delay);
}
.bounce-rli-bounding-box .wrapper .group .shadow:nth-of-type(2) {
  left: var(--dot2-x-offset);
  animation-delay: var(--dot2-delay);
}
.bounce-rli-bounding-box .wrapper .group .shadow:nth-of-type(3) {
  left: var(--dot3-x-offset);
  animation-delay: var(--dot3-delay);
}

@property --TD-bounce-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-bounce-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-bounce-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --TD-bounce-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 0.5s;
}
@keyframes u1qz6yl {
  0% {
    top: 0%;
  }
  60% {
    height: 1.25em;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 100%;
    height: 0.22em;
    transform: scaleX(1.5);
    filter: blur(0.4px);
  }
}
@keyframes u1qz6z4 {
  0% {
    transform: scaleX(0.2);
    opacity: 0.2;
  }
  60% {
    opacity: 0.4;
  }
  100% {
    transform: scaleX(1.5);
    opacity: 0.6;
  }
}
@keyframes u1qz6zs {
  0%, 100% {
    background-color: var(--TD-bounce-phase1-color);
  }
  20% {
    background-color: var(--TD-bounce-phase1-color);
  }
  25% {
    background-color: var(--TD-bounce-phase2-color, var(--TD-bounce-phase1-color));
  }
  45% {
    background-color: var(--TD-bounce-phase2-color, var(--TD-bounce-phase1-color));
  }
  50% {
    background-color: var(--TD-bounce-phase3-color, var(--TD-bounce-phase1-color));
  }
  70% {
    background-color: var(--TD-bounce-phase3-color, var(--TD-bounce-phase1-color));
  }
  75% {
    background-color: var(--TD-bounce-phase4-color, var(--TD-bounce-phase1-color));
  }
  95% {
    background-color: var(--TD-bounce-phase4-color, var(--TD-bounce-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--TD-bounce-phase".concat(o+1,"-color")});H(`.blink-blur-rli-bounding-box {
  --shape-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  color: var(--shape-phase1-color);
}
.blink-blur-rli-bounding-box .blink-blur-indicator {
  isolation: isolate;
  display: flex;
  flex-direction: row;
  -moz-column-gap: 0.4em;
       column-gap: 0.4em;
}
.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape {
  --x-deg: -20deg;
  width: 1.8em;
  height: 2.25em;
  border-radius: 0.25em;
  color: inherit;
  transform: skewX(var(--x-deg));
  background-color: var(--shape-phase1-color);
  animation-name: u1qz6i2, u1qz6js;
  animation-duration: var(--rli-animation-duration, 1.2s), calc(var(--rli-animation-duration, 1.2s) * 4);
  animation-timing-function: var(--rli-animation-function, ease-in);
  animation-iteration-count: infinite;
}
.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape1 {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.5 * -1);
}
.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape2 {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.4 * -1);
}
.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape3 {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.3 * -1);
}
.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape4 {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.2 * -1);
}
.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape5 {
  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.1 * -1);
}

@property --shape-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --shape-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --shape-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --shape-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 1.2s;
}
@keyframes u1qz6i2 {
  100%, 0% {
    opacity: 0.3;
    filter: blur(0.0675em) drop-shadow(0 0 0.0625em);
    transform: skewX(var(--x-deg)) scale(1.2, 1.45);
  }
  39% {
    opacity: 0.8;
  }
  40%, 41%, 42% {
    opacity: 0;
  }
  43% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
    filter: blur(0em) drop-shadow(0 0 0em);
    transform: skewX(var(--x-deg)) scale(1, 1);
  }
}
@keyframes u1qz6js {
  100%, 0% {
    color: var(--shape-phase1-color);
    background-color: var(--shape-phase1-color);
  }
  25% {
    color: var(--shape-phase2-color, var(--shape-phase1-color));
    background-color: var(--shape-phase2-color, var(--shape-phase1-color));
  }
  50% {
    color: var(--shape-phase3-color, var(--shape-phase1-color));
    background-color: var(--shape-phase3-color, var(--shape-phase1-color));
  }
  75% {
    color: var(--shape-phase4-color, var(--shape-phase1-color));
    background-color: var(--shape-phase4-color, var(--shape-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--shape-phase".concat(o+1,"-color")});H(`.trophy-spin-rli-bounding-box {
  --trophySpin-phase1-color: rgb(50, 205, 50);
  box-sizing: border-box;
  font-size: 16px;
  position: relative;
  isolation: isolate;
  color: var(--trophySpin-phase1-color);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator {
  width: 4em;
  perspective: 1000px;
  transform-style: preserve-3d;
  display: block;
  margin: 0 auto;
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade {
  display: block;
  width: 4em;
  height: 0.5em;
  background: var(--trophySpin-phase1-color);
  animation: u1qz6nk var(--rli-animation-duration, 2.5s) var(--rli-animation-function, linear) infinite, u1qz6op calc(var(--rli-animation-duration, 2.5s) * 0.5) var(--rli-animation-function, linear) infinite, u1qz6pg calc(var(--rli-animation-duration, 2.5s) * 4) var(--rli-animation-function, linear) infinite;
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(8) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 0 * -1);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(7) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 1 * -1);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(6) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 2 * -1);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(5) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 3 * -1);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(4) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 4 * -1);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(3) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 5 * -1);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(2) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 6 * -1);
}
.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(1) {
  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 7 * -1);
}

@property --trophySpin-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --trophySpin-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --trophySpin-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --trophySpin-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 2.5s;
}
@keyframes u1qz6nk {
  to {
    transform: rotateY(1turn) rotateX(-25deg);
  }
}
@keyframes u1qz6op {
  100%, 0% {
    filter: brightness(1);
    opacity: 1;
  }
  15% {
    filter: brightness(1);
  }
  25% {
    opacity: 0.96;
  }
  30% {
    filter: brightness(0.92);
  }
  50% {
    filter: brightness(0.7);
    opacity: 1;
  }
  75% {
    filter: brightness(0.92);
    opacity: 0.96;
  }
  90% {
    filter: brightness(1);
  }
}
@keyframes u1qz6pg {
  100%, 0% {
    background-color: var(--trophySpin-phase1-color);
  }
  18% {
    background-color: var(--trophySpin-phase1-color);
  }
  25% {
    background-color: var(--trophySpin-phase2-color, var(--trophySpin-phase1-color));
  }
  43% {
    background-color: var(--trophySpin-phase2-color, var(--trophySpin-phase1-color));
  }
  50% {
    background-color: var(--trophySpin-phase3-color, var(--trophySpin-phase1-color));
  }
  68% {
    background-color: var(--trophySpin-phase3-color, var(--trophySpin-phase1-color));
  }
  75% {
    background-color: var(--trophySpin-phase4-color, var(--trophySpin-phase1-color));
  }
  93% {
    background-color: var(--trophySpin-phase4-color, var(--trophySpin-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--trophySpin-phase".concat(o+1,"-color")});H(`.slab-rli-bounding-box {
  --slab-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  color: var(--slab-phase1-color);
  position: relative;
}
.slab-rli-bounding-box .slab-indicator {
  position: relative;
  display: block;
  width: 7em;
  height: 4em;
  margin: 0 auto;
  overflow: hidden;
}
.slab-rli-bounding-box .slab-indicator .slabs-wrapper {
  width: 4em;
  height: 4em;
  transform: perspective(15em) rotateX(66deg) rotateZ(-25deg);
  transform-style: preserve-3d;
  transform-origin: 50% 100%;
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
}
.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--slab-phase1-color);
  opacity: 0;
  box-shadow: -0.08em 0.15em 0 rgba(0, 0, 0, 0.45);
  transform-origin: 0% 0%;
  animation: calc(var(--rli-animation-duration-unitless, 3) * 1s) var(--rli-animation-function, linear) infinite u1qz6km, calc(var(--rli-animation-duration-unitless, 3) * 4s) var(--rli-animation-function, linear) infinite u1qz6lk;
}
.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(1) {
  animation-delay: calc(4 / (16 / var(--rli-animation-duration-unitless, 3)) * 3 * -1 * 1s);
}
.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(2) {
  animation-delay: calc(4 / (16 / var(--rli-animation-duration-unitless, 3)) * 2 * -1 * 1s);
}
.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(3) {
  animation-delay: calc(4 / (16 / var(--rli-animation-duration-unitless, 3)) * -1 * 1s);
}
.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(4) {
  animation-delay: 0s;
}

@property --slab-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --slab-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --slab-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --slab-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration-unitless {
  syntax: "<number>";
  inherits: true;
  initial-value: 3;
}
@keyframes u1qz6km {
  0% {
    transform: translateY(0) rotateX(30deg);
    opacity: 0;
  }
  10% {
    transform: translateY(-40%) rotateX(0deg);
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translateY(-400%) rotateX(0deg);
    opacity: 0;
  }
}
@keyframes u1qz6lk {
  100%, 0% {
    background-color: var(--slab-phase1-color);
  }
  24.9% {
    background-color: var(--slab-phase1-color);
  }
  25% {
    background-color: var(--slab-phase2-color, var(--slab-phase1-color));
  }
  49.9% {
    background-color: var(--slab-phase2-color, var(--slab-phase1-color));
  }
  50% {
    background-color: var(--slab-phase3-color, var(--slab-phase1-color));
  }
  74.9% {
    background-color: var(--slab-phase3-color, var(--slab-phase1-color));
  }
  75% {
    background-color: var(--slab-phase4-color, var(--slab-phase1-color));
  }
  99.9% {
    background-color: var(--slab-phase4-color, var(--slab-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--slab-phase".concat(o+1,"-color")});H(`.lifeline-rli-bounding-box {
  --life-line-phase1-color: rgb(50, 205, 50);
  font-size: 16px;
  isolation: isolate;
  color: var(--life-line-phase1-color);
}
.lifeline-rli-bounding-box .lifeline-indicator {
  position: relative;
  text-align: center;
}
.lifeline-rli-bounding-box .lifeline-indicator path.rli-lifeline {
  stroke-dasharray: 474.7616760254 30.3039367676;
  animation: var(--rli-animation-duration, 2s) var(--rli-animation-function, linear) infinite u1qz6lr, calc(var(--rli-animation-duration, 2s) * 4) var(--rli-animation-function, linear) infinite u1qz6m8;
}
.lifeline-rli-bounding-box .lifeline-text {
  color: currentColor;
  mix-blend-mode: difference;
  width: unset;
  display: block;
}

@property --life-line-phase1-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --life-line-phase2-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --life-line-phase3-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --life-line-phase4-color {
  syntax: "<color>";
  inherits: true;
  initial-value: rgb(50, 205, 50);
}
@property --rli-animation-duration {
  syntax: "<time>";
  inherits: true;
  initial-value: 2s;
}
@keyframes u1qz6lr {
  to {
    stroke-dashoffset: -1010.1312255859;
  }
}
@keyframes u1qz6m8 {
  100%, 0% {
    color: var(--life-line-phase1-color);
  }
  20% {
    color: var(--life-line-phase1-color);
  }
  25% {
    color: var(--life-line-phase2-color, var(--life-line-phase1-color));
  }
  45% {
    color: var(--life-line-phase2-color, var(--life-line-phase1-color));
  }
  50% {
    color: var(--life-line-phase3-color, var(--life-line-phase1-color));
  }
  70% {
    color: var(--life-line-phase3-color, var(--life-line-phase1-color));
  }
  75% {
    color: var(--life-line-phase4-color, var(--life-line-phase1-color));
  }
  95% {
    color: var(--life-line-phase4-color, var(--life-line-phase1-color));
  }
}`);Array.from({length:4},function(n,o){return"--life-line-phase".concat(o+1,"-color")});export{ie as S,le as T,se as V};
