import{a as _n,j as Eo,g as Jo,r as g,n as M,F as qo}from"./app-2cdc78d8.js";const xe=({onSearch:n,placeholder:t="Buscar...",rightContent:o})=>_n("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:_n("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:Eo("div",{className:"p-4 bg-white border-b border-gray-200 flex justify-between",children:[_n("input",{type:"text",placeholder:t,onChange:r=>n(r.target.value),className:"border border-gray-300 rounded-md p-2"}),o]})})}),Qo=(n=5,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")=>{let o="";for(let r=0;r<n;r++){const e=Math.floor(Math.random()*t.length);o+=t[e]}return o},Gn=Math.min,Rn=Math.max,Et=Math.round,St=Math.floor,yn=n=>({x:n,y:n}),nr={left:"right",right:"left",bottom:"top",top:"bottom"},tr={start:"end",end:"start"};function Yt(n,t,o){return Rn(n,Gn(t,o))}function gt(n,t){return typeof n=="function"?n(t):n}function Ln(n){return n.split("-")[0]}function vt(n){return n.split("-")[1]}function Do(n){return n==="x"?"y":"x"}function Qt(n){return n==="y"?"height":"width"}function Jn(n){return["top","bottom"].includes(Ln(n))?"y":"x"}function no(n){return Do(Jn(n))}function or(n,t,o){o===void 0&&(o=!1);const r=vt(n),e=no(n),a=Qt(e);let i=e==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[a]>t.floating[a]&&(i=qt(i)),[i,qt(i)]}function rr(n){const t=qt(n);return[Kt(n),t,Kt(t)]}function Kt(n){return n.replace(/start|end/g,t=>tr[t])}function er(n,t,o){const r=["left","right"],e=["right","left"],a=["top","bottom"],i=["bottom","top"];switch(n){case"top":case"bottom":return o?t?e:r:t?r:e;case"left":case"right":return t?a:i;default:return[]}}function ar(n,t,o,r){const e=vt(n);let a=er(Ln(n),o==="start",r);return e&&(a=a.map(i=>i+"-"+e),t&&(a=a.concat(a.map(Kt)))),a}function qt(n){return n.replace(/left|right|bottom|top/g,t=>nr[t])}function ir(n){return{top:0,right:0,bottom:0,left:0,...n}}function Co(n){return typeof n!="number"?ir(n):{top:n,right:n,bottom:n,left:n}}function Dt(n){const{x:t,y:o,width:r,height:e}=n;return{width:r,height:e,top:o,left:t,right:t+r,bottom:o+e,x:t,y:o}}function co(n,t,o){let{reference:r,floating:e}=n;const a=Jn(t),i=no(t),l=Qt(i),s=Ln(t),u=a==="y",f=r.x+r.width/2-e.width/2,p=r.y+r.height/2-e.height/2,v=r[l]/2-e[l]/2;let h;switch(s){case"top":h={x:f,y:r.y-e.height};break;case"bottom":h={x:f,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:p};break;case"left":h={x:r.x-e.width,y:p};break;default:h={x:r.x,y:r.y}}switch(vt(t)){case"start":h[i]-=v*(o&&u?-1:1);break;case"end":h[i]+=v*(o&&u?-1:1);break}return h}const lr=async(n,t,o)=>{const{placement:r="bottom",strategy:e="absolute",middleware:a=[],platform:i}=o,l=a.filter(Boolean),s=await(i.isRTL==null?void 0:i.isRTL(t));let u=await i.getElementRects({reference:n,floating:t,strategy:e}),{x:f,y:p}=co(u,r,s),v=r,h={},d=0;for(let c=0;c<l.length;c++){const{name:m,fn:x}=l[c],{x:_,y:O,data:S,reset:z}=await x({x:f,y:p,initialPlacement:r,placement:v,strategy:e,middlewareData:h,rects:u,platform:i,elements:{reference:n,floating:t}});f=_??f,p=O??p,h={...h,[m]:{...h[m],...S}},z&&d<=50&&(d++,typeof z=="object"&&(z.placement&&(v=z.placement),z.rects&&(u=z.rects===!0?await i.getElementRects({reference:n,floating:t,strategy:e}):z.rects),{x:f,y:p}=co(u,v,s)),c=-1)}return{x:f,y:p,placement:v,strategy:e,middlewareData:h}};async function Mo(n,t){var o;t===void 0&&(t={});const{x:r,y:e,platform:a,rects:i,elements:l,strategy:s}=n,{boundary:u="clippingAncestors",rootBoundary:f="viewport",elementContext:p="floating",altBoundary:v=!1,padding:h=0}=gt(t,n),d=Co(h),m=l[v?p==="floating"?"reference":"floating":p],x=Dt(await a.getClippingRect({element:(o=await(a.isElement==null?void 0:a.isElement(m)))==null||o?m:m.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(l.floating)),boundary:u,rootBoundary:f,strategy:s})),_=p==="floating"?{x:r,y:e,width:i.floating.width,height:i.floating.height}:i.reference,O=await(a.getOffsetParent==null?void 0:a.getOffsetParent(l.floating)),S=await(a.isElement==null?void 0:a.isElement(O))?await(a.getScale==null?void 0:a.getScale(O))||{x:1,y:1}:{x:1,y:1},z=Dt(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:_,offsetParent:O,strategy:s}):_);return{top:(x.top-z.top+d.top)/S.y,bottom:(z.bottom-x.bottom+d.bottom)/S.y,left:(x.left-z.left+d.left)/S.x,right:(z.right-x.right+d.right)/S.x}}const sr=n=>({name:"arrow",options:n,async fn(t){const{x:o,y:r,placement:e,rects:a,platform:i,elements:l,middlewareData:s}=t,{element:u,padding:f=0}=gt(n,t)||{};if(u==null)return{};const p=Co(f),v={x:o,y:r},h=no(e),d=Qt(h),c=await i.getDimensions(u),m=h==="y",x=m?"top":"left",_=m?"bottom":"right",O=m?"clientHeight":"clientWidth",S=a.reference[d]+a.reference[h]-v[h]-a.floating[d],z=v[h]-a.reference[h],N=await(i.getOffsetParent==null?void 0:i.getOffsetParent(u));let T=N?N[O]:0;(!T||!await(i.isElement==null?void 0:i.isElement(N)))&&(T=l.floating[O]||a.floating[d]);const I=S/2-z/2,D=T/2-c[d]/2-1,on=Gn(p[x],D),bn=Gn(p[_],D),rn=on,fn=T-c[d]-bn,q=T/2-c[d]/2+I,G=Yt(rn,q,fn),Y=!s.arrow&&vt(e)!=null&&q!==G&&a.reference[d]/2-(q<rn?on:bn)-c[d]/2<0,V=Y?q<rn?q-rn:q-fn:0;return{[h]:v[h]+V,data:{[h]:G,centerOffset:q-G-V,...Y&&{alignmentOffset:V}},reset:Y}}}),cr=function(n){return n===void 0&&(n={}),{name:"flip",options:n,async fn(t){var o,r;const{placement:e,middlewareData:a,rects:i,initialPlacement:l,platform:s,elements:u}=t,{mainAxis:f=!0,crossAxis:p=!0,fallbackPlacements:v,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:d="none",flipAlignment:c=!0,...m}=gt(n,t);if((o=a.arrow)!=null&&o.alignmentOffset)return{};const x=Ln(e),_=Jn(l),O=Ln(l)===l,S=await(s.isRTL==null?void 0:s.isRTL(u.floating)),z=v||(O||!c?[qt(l)]:rr(l)),N=d!=="none";!v&&N&&z.push(...ar(l,c,d,S));const T=[l,...z],I=await Mo(t,m),D=[];let on=((r=a.flip)==null?void 0:r.overflows)||[];if(f&&D.push(I[x]),p){const q=or(e,i,S);D.push(I[q[0]],I[q[1]])}if(on=[...on,{placement:e,overflows:D}],!D.every(q=>q<=0)){var bn,rn;const q=(((bn=a.flip)==null?void 0:bn.index)||0)+1,G=T[q];if(G)return{data:{index:q,overflows:on},reset:{placement:G}};let Y=(rn=on.filter(V=>V.overflows[0]<=0).sort((V,j)=>V.overflows[1]-j.overflows[1])[0])==null?void 0:rn.placement;if(!Y)switch(h){case"bestFit":{var fn;const V=(fn=on.filter(j=>{if(N){const K=Jn(j.placement);return K===_||K==="y"}return!0}).map(j=>[j.placement,j.overflows.filter(K=>K>0).reduce((K,wn)=>K+wn,0)]).sort((j,K)=>j[1]-K[1])[0])==null?void 0:fn[0];V&&(Y=V);break}case"initialPlacement":Y=l;break}if(e!==Y)return{reset:{placement:Y}}}return{}}}};async function ur(n,t){const{placement:o,platform:r,elements:e}=n,a=await(r.isRTL==null?void 0:r.isRTL(e.floating)),i=Ln(o),l=vt(o),s=Jn(o)==="y",u=["left","top"].includes(i)?-1:1,f=a&&s?-1:1,p=gt(t,n);let{mainAxis:v,crossAxis:h,alignmentAxis:d}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&typeof d=="number"&&(h=l==="end"?d*-1:d),s?{x:h*f,y:v*u}:{x:v*u,y:h*f}}const dr=function(n){return n===void 0&&(n=0),{name:"offset",options:n,async fn(t){var o,r;const{x:e,y:a,placement:i,middlewareData:l}=t,s=await ur(t,n);return i===((o=l.offset)==null?void 0:o.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:e+s.x,y:a+s.y,data:{...s,placement:i}}}}},pr=function(n){return n===void 0&&(n={}),{name:"shift",options:n,async fn(t){const{x:o,y:r,placement:e}=t,{mainAxis:a=!0,crossAxis:i=!1,limiter:l={fn:m=>{let{x,y:_}=m;return{x,y:_}}},...s}=gt(n,t),u={x:o,y:r},f=await Mo(t,s),p=Jn(Ln(e)),v=Do(p);let h=u[v],d=u[p];if(a){const m=v==="y"?"top":"left",x=v==="y"?"bottom":"right",_=h+f[m],O=h-f[x];h=Yt(_,h,O)}if(i){const m=p==="y"?"top":"left",x=p==="y"?"bottom":"right",_=d+f[m],O=d-f[x];d=Yt(_,d,O)}const c=l.fn({...t,[v]:h,[p]:d});return{...c,data:{x:c.x-o,y:c.y-r,enabled:{[v]:a,[p]:i}}}}}};function Lt(){return typeof window<"u"}function nt(n){return Ro(n)?(n.nodeName||"").toLowerCase():"#document"}function tn(n){var t;return(n==null||(t=n.ownerDocument)==null?void 0:t.defaultView)||window}function kn(n){var t;return(t=(Ro(n)?n.ownerDocument:n.document)||window.document)==null?void 0:t.documentElement}function Ro(n){return Lt()?n instanceof Node||n instanceof tn(n).Node:!1}function pn(n){return Lt()?n instanceof Element||n instanceof tn(n).Element:!1}function xn(n){return Lt()?n instanceof HTMLElement||n instanceof tn(n).HTMLElement:!1}function uo(n){return!Lt()||typeof ShadowRoot>"u"?!1:n instanceof ShadowRoot||n instanceof tn(n).ShadowRoot}function yt(n){const{overflow:t,overflowX:o,overflowY:r,display:e}=hn(n);return/auto|scroll|overlay|hidden|clip/.test(t+r+o)&&!["inline","contents"].includes(e)}function hr(n){return["table","td","th"].includes(nt(n))}function Nt(n){return[":popover-open",":modal"].some(t=>{try{return n.matches(t)}catch{return!1}})}function to(n){const t=oo(),o=pn(n)?hn(n):n;return["transform","translate","scale","rotate","perspective"].some(r=>o[r]?o[r]!=="none":!1)||(o.containerType?o.containerType!=="normal":!1)||!t&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!t&&(o.filter?o.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(r=>(o.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(o.contain||"").includes(r))}function br(n){let t=En(n);for(;xn(t)&&!Qn(t);){if(to(t))return t;if(Nt(t))return null;t=En(t)}return null}function oo(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Qn(n){return["html","body","#document"].includes(nt(n))}function hn(n){return tn(n).getComputedStyle(n)}function jt(n){return pn(n)?{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}:{scrollLeft:n.scrollX,scrollTop:n.scrollY}}function En(n){if(nt(n)==="html")return n;const t=n.assignedSlot||n.parentNode||uo(n)&&n.host||kn(n);return uo(t)?t.host:t}function Lo(n){const t=En(n);return Qn(t)?n.ownerDocument?n.ownerDocument.body:n.body:xn(t)&&yt(t)?t:Lo(t)}function mt(n,t,o){var r;t===void 0&&(t=[]),o===void 0&&(o=!0);const e=Lo(n),a=e===((r=n.ownerDocument)==null?void 0:r.body),i=tn(e);if(a){const l=Ut(i);return t.concat(i,i.visualViewport||[],yt(e)?e:[],l&&o?mt(l):[])}return t.concat(e,mt(e,[],o))}function Ut(n){return n.parent&&Object.getPrototypeOf(n.parent)?n.frameElement:null}function No(n){const t=hn(n);let o=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const e=xn(n),a=e?n.offsetWidth:o,i=e?n.offsetHeight:r,l=Et(o)!==a||Et(r)!==i;return l&&(o=a,r=i),{width:o,height:r,$:l}}function ro(n){return pn(n)?n:n.contextElement}function Zn(n){const t=ro(n);if(!xn(t))return yn(1);const o=t.getBoundingClientRect(),{width:r,height:e,$:a}=No(t);let i=(a?Et(o.width):o.width)/r,l=(a?Et(o.height):o.height)/e;return(!i||!Number.isFinite(i))&&(i=1),(!l||!Number.isFinite(l))&&(l=1),{x:i,y:l}}const fr=yn(0);function jo(n){const t=tn(n);return!oo()||!t.visualViewport?fr:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function mr(n,t,o){return t===void 0&&(t=!1),!o||t&&o!==tn(n)?!1:t}function Nn(n,t,o,r){t===void 0&&(t=!1),o===void 0&&(o=!1);const e=n.getBoundingClientRect(),a=ro(n);let i=yn(1);t&&(r?pn(r)&&(i=Zn(r)):i=Zn(n));const l=mr(a,o,r)?jo(a):yn(0);let s=(e.left+l.x)/i.x,u=(e.top+l.y)/i.y,f=e.width/i.x,p=e.height/i.y;if(a){const v=tn(a),h=r&&pn(r)?tn(r):r;let d=v,c=Ut(d);for(;c&&r&&h!==d;){const m=Zn(c),x=c.getBoundingClientRect(),_=hn(c),O=x.left+(c.clientLeft+parseFloat(_.paddingLeft))*m.x,S=x.top+(c.clientTop+parseFloat(_.paddingTop))*m.y;s*=m.x,u*=m.y,f*=m.x,p*=m.y,s+=O,u+=S,d=tn(c),c=Ut(d)}}return Dt({width:f,height:p,x:s,y:u})}function eo(n,t){const o=jt(n).scrollLeft;return t?t.left+o:Nn(kn(n)).left+o}function Ho(n,t,o){o===void 0&&(o=!1);const r=n.getBoundingClientRect(),e=r.left+t.scrollLeft-(o?0:eo(n,r)),a=r.top+t.scrollTop;return{x:e,y:a}}function gr(n){let{elements:t,rect:o,offsetParent:r,strategy:e}=n;const a=e==="fixed",i=kn(r),l=t?Nt(t.floating):!1;if(r===i||l&&a)return o;let s={scrollLeft:0,scrollTop:0},u=yn(1);const f=yn(0),p=xn(r);if((p||!p&&!a)&&((nt(r)!=="body"||yt(i))&&(s=jt(r)),xn(r))){const h=Nn(r);u=Zn(r),f.x=h.x+r.clientLeft,f.y=h.y+r.clientTop}const v=i&&!p&&!a?Ho(i,s,!0):yn(0);return{width:o.width*u.x,height:o.height*u.y,x:o.x*u.x-s.scrollLeft*u.x+f.x+v.x,y:o.y*u.y-s.scrollTop*u.y+f.y+v.y}}function vr(n){return Array.from(n.getClientRects())}function yr(n){const t=kn(n),o=jt(n),r=n.ownerDocument.body,e=Rn(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=Rn(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let i=-o.scrollLeft+eo(n);const l=-o.scrollTop;return hn(r).direction==="rtl"&&(i+=Rn(t.clientWidth,r.clientWidth)-e),{width:e,height:a,x:i,y:l}}function xr(n,t){const o=tn(n),r=kn(n),e=o.visualViewport;let a=r.clientWidth,i=r.clientHeight,l=0,s=0;if(e){a=e.width,i=e.height;const u=oo();(!u||u&&t==="fixed")&&(l=e.offsetLeft,s=e.offsetTop)}return{width:a,height:i,x:l,y:s}}function kr(n,t){const o=Nn(n,!0,t==="fixed"),r=o.top+n.clientTop,e=o.left+n.clientLeft,a=xn(n)?Zn(n):yn(1),i=n.clientWidth*a.x,l=n.clientHeight*a.y,s=e*a.x,u=r*a.y;return{width:i,height:l,x:s,y:u}}function po(n,t,o){let r;if(t==="viewport")r=xr(n,o);else if(t==="document")r=yr(kn(n));else if(pn(t))r=kr(t,o);else{const e=jo(n);r={x:t.x-e.x,y:t.y-e.y,width:t.width,height:t.height}}return Dt(r)}function $o(n,t){const o=En(n);return o===t||!pn(o)||Qn(o)?!1:hn(o).position==="fixed"||$o(o,t)}function wr(n,t){const o=t.get(n);if(o)return o;let r=mt(n,[],!1).filter(l=>pn(l)&&nt(l)!=="body"),e=null;const a=hn(n).position==="fixed";let i=a?En(n):n;for(;pn(i)&&!Qn(i);){const l=hn(i),s=to(i);!s&&l.position==="fixed"&&(e=null),(a?!s&&!e:!s&&l.position==="static"&&!!e&&["absolute","fixed"].includes(e.position)||yt(i)&&!s&&$o(n,i))?r=r.filter(f=>f!==i):e=l,i=En(i)}return t.set(n,r),r}function Or(n){let{element:t,boundary:o,rootBoundary:r,strategy:e}=n;const i=[...o==="clippingAncestors"?Nt(t)?[]:wr(t,this._c):[].concat(o),r],l=i[0],s=i.reduce((u,f)=>{const p=po(t,f,e);return u.top=Rn(p.top,u.top),u.right=Gn(p.right,u.right),u.bottom=Gn(p.bottom,u.bottom),u.left=Rn(p.left,u.left),u},po(t,l,e));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}}function Pr(n){const{width:t,height:o}=No(n);return{width:t,height:o}}function _r(n,t,o){const r=xn(t),e=kn(t),a=o==="fixed",i=Nn(n,!0,a,t);let l={scrollLeft:0,scrollTop:0};const s=yn(0);if(r||!r&&!a)if((nt(t)!=="body"||yt(e))&&(l=jt(t)),r){const v=Nn(t,!0,a,t);s.x=v.x+t.clientLeft,s.y=v.y+t.clientTop}else e&&(s.x=eo(e));const u=e&&!r&&!a?Ho(e,l):yn(0),f=i.left+l.scrollLeft-s.x-u.x,p=i.top+l.scrollTop-s.y-u.y;return{x:f,y:p,width:i.width,height:i.height}}function Vt(n){return hn(n).position==="static"}function ho(n,t){if(!xn(n)||hn(n).position==="fixed")return null;if(t)return t(n);let o=n.offsetParent;return kn(n)===o&&(o=o.ownerDocument.body),o}function Fo(n,t){const o=tn(n);if(Nt(n))return o;if(!xn(n)){let e=En(n);for(;e&&!Qn(e);){if(pn(e)&&!Vt(e))return e;e=En(e)}return o}let r=ho(n,t);for(;r&&hr(r)&&Vt(r);)r=ho(r,t);return r&&Qn(r)&&Vt(r)&&!to(r)?o:r||br(n)||o}const zr=async function(n){const t=this.getOffsetParent||Fo,o=this.getDimensions,r=await o(n.floating);return{reference:_r(n.reference,await t(n.floating),n.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Sr(n){return hn(n).direction==="rtl"}const Ar={convertOffsetParentRelativeRectToViewportRelativeRect:gr,getDocumentElement:kn,getClippingRect:Or,getOffsetParent:Fo,getElementRects:zr,getClientRects:vr,getDimensions:Pr,getScale:Zn,isElement:pn,isRTL:Sr};function Bo(n,t){return n.x===t.x&&n.y===t.y&&n.width===t.width&&n.height===t.height}function Tr(n,t){let o=null,r;const e=kn(n);function a(){var l;clearTimeout(r),(l=o)==null||l.disconnect(),o=null}function i(l,s){l===void 0&&(l=!1),s===void 0&&(s=1),a();const u=n.getBoundingClientRect(),{left:f,top:p,width:v,height:h}=u;if(l||t(),!v||!h)return;const d=St(p),c=St(e.clientWidth-(f+v)),m=St(e.clientHeight-(p+h)),x=St(f),O={rootMargin:-d+"px "+-c+"px "+-m+"px "+-x+"px",threshold:Rn(0,Gn(1,s))||1};let S=!0;function z(N){const T=N[0].intersectionRatio;if(T!==s){if(!S)return i();T?i(!1,T):r=setTimeout(()=>{i(!1,1e-7)},1e3)}T===1&&!Bo(u,n.getBoundingClientRect())&&i(),S=!1}try{o=new IntersectionObserver(z,{...O,root:e.ownerDocument})}catch{o=new IntersectionObserver(z,O)}o.observe(n)}return i(!0),a}function Er(n,t,o,r){r===void 0&&(r={});const{ancestorScroll:e=!0,ancestorResize:a=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:s=!1}=r,u=ro(n),f=e||a?[...u?mt(u):[],...mt(t)]:[];f.forEach(x=>{e&&x.addEventListener("scroll",o,{passive:!0}),a&&x.addEventListener("resize",o)});const p=u&&l?Tr(u,o):null;let v=-1,h=null;i&&(h=new ResizeObserver(x=>{let[_]=x;_&&_.target===u&&h&&(h.unobserve(t),cancelAnimationFrame(v),v=requestAnimationFrame(()=>{var O;(O=h)==null||O.observe(t)})),o()}),u&&!s&&h.observe(u),h.observe(t));let d,c=s?Nn(n):null;s&&m();function m(){const x=Nn(n);c&&!Bo(c,x)&&o(),c=x,d=requestAnimationFrame(m)}return o(),()=>{var x;f.forEach(_=>{e&&_.removeEventListener("scroll",o),a&&_.removeEventListener("resize",o)}),p==null||p(),(x=h)==null||x.disconnect(),h=null,s&&cancelAnimationFrame(d)}}const qr=dr,Dr=pr,Cr=cr,Mr=sr,bo=(n,t,o)=>{const r=new Map,e={platform:Ar,...o},a={...e.platform,_c:r};return lr(n,t,{...e,platform:a})};var Io={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var t={}.hasOwnProperty;function o(){for(var a="",i=0;i<arguments.length;i++){var l=arguments[i];l&&(a=e(a,r(l)))}return a}function r(a){if(typeof a=="string"||typeof a=="number")return a;if(typeof a!="object")return"";if(Array.isArray(a))return o.apply(null,a);if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]"))return a.toString();var i="";for(var l in a)t.call(a,l)&&a[l]&&(i=e(i,l));return i}function e(a,i){return i?a?a+" "+i:a+i:a}n.exports?(o.default=o,n.exports=o):window.classNames=o})()})(Io);var Rr=Io.exports;const Zt=Jo(Rr);/*
* React Tooltip
* {@link https://github.com/ReactTooltip/react-tooltip}
* @copyright ReactTooltip Team
* @license MIT
*/const Lr="react-tooltip-core-styles",Nr="react-tooltip-base-styles",fo={core:!1,base:!1};function mo({css:n,id:t=Nr,type:o="base",ref:r}){var e,a;if(!n||typeof document>"u"||fo[o]||o==="core"&&typeof process<"u"&&(!((e=process==null?void 0:process.env)===null||e===void 0)&&e.REACT_TOOLTIP_DISABLE_CORE_STYLES)||o!=="base"&&typeof process<"u"&&(!((a=process==null?void 0:process.env)===null||a===void 0)&&a.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;o==="core"&&(t=Lr),r||(r={});const{insertAt:i}=r;if(document.getElementById(t))return;const l=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.id=t,s.type="text/css",i==="top"&&l.firstChild?l.insertBefore(s,l.firstChild):l.appendChild(s),s.styleSheet?s.styleSheet.cssText=n:s.appendChild(document.createTextNode(n)),fo[o]=!0}const go=async({elementReference:n=null,tooltipReference:t=null,tooltipArrowReference:o=null,place:r="top",offset:e=10,strategy:a="absolute",middlewares:i=[qr(Number(e)),Cr({fallbackAxisSideDirection:"start"}),Dr({padding:5})],border:l})=>{if(!n)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};if(t===null)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};const s=i;return o?(s.push(Mr({element:o,padding:5})),bo(n,t,{placement:r,strategy:a,middleware:s}).then(({x:u,y:f,placement:p,middlewareData:v})=>{var h,d;const c={left:`${u}px`,top:`${f}px`,border:l},{x:m,y:x}=(h=v.arrow)!==null&&h!==void 0?h:{x:0,y:0},_=(d={top:"bottom",right:"left",bottom:"top",left:"right"}[p.split("-")[0]])!==null&&d!==void 0?d:"bottom",O=l&&{borderBottom:l,borderRight:l};let S=0;if(l){const z=`${l}`.match(/(\d+)px/);S=z!=null&&z[1]?Number(z[1]):1}return{tooltipStyles:c,tooltipArrowStyles:{left:m!=null?`${m}px`:"",top:x!=null?`${x}px`:"",right:"",bottom:"",...O,[_]:`-${4+S}px`},place:p}})):bo(n,t,{placement:"bottom",strategy:a,middleware:s}).then(({x:u,y:f,placement:p})=>({tooltipStyles:{left:`${u}px`,top:`${f}px`},tooltipArrowStyles:{},place:p}))},vo=(n,t)=>!("CSS"in window&&"supports"in window.CSS)||window.CSS.supports(n,t),yo=(n,t,o)=>{let r=null;const e=function(...a){const i=()=>{r=null,o||n.apply(this,a)};o&&!r&&(n.apply(this,a),r=setTimeout(i,t)),o||(r&&clearTimeout(r),r=setTimeout(i,t))};return e.cancel=()=>{r&&(clearTimeout(r),r=null)},e},xo=n=>n!==null&&!Array.isArray(n)&&typeof n=="object",Gt=(n,t)=>{if(n===t)return!0;if(Array.isArray(n)&&Array.isArray(t))return n.length===t.length&&n.every((e,a)=>Gt(e,t[a]));if(Array.isArray(n)!==Array.isArray(t))return!1;if(!xo(n)||!xo(t))return n===t;const o=Object.keys(n),r=Object.keys(t);return o.length===r.length&&o.every(e=>Gt(n[e],t[e]))},jr=n=>{if(!(n instanceof HTMLElement||n instanceof SVGElement))return!1;const t=getComputedStyle(n);return["overflow","overflow-x","overflow-y"].some(o=>{const r=t.getPropertyValue(o);return r==="auto"||r==="scroll"})},ko=n=>{if(!n)return null;let t=n.parentElement;for(;t;){if(jr(t))return t;t=t.parentElement}return document.scrollingElement||document.documentElement},Hr=typeof window<"u"?g.useLayoutEffect:g.useEffect,ln=n=>{n.current&&(clearTimeout(n.current),n.current=null)},$r="DEFAULT_TOOLTIP_ID",Fr={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},Br=g.createContext({getTooltipData:()=>Fr});function Vo(n=$r){return g.useContext(Br).getTooltipData(n)}var Kn={tooltip:"core-styles-module_tooltip__3vRRp",fixed:"core-styles-module_fixed__pcSol",arrow:"core-styles-module_arrow__cvMwQ",noArrow:"core-styles-module_noArrow__xock6",clickable:"core-styles-module_clickable__ZuTTB",show:"core-styles-module_show__Nt9eE",closing:"core-styles-module_closing__sGnxF"},Wt={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const Ir=({forwardRef:n,id:t,className:o,classNameArrow:r,variant:e="dark",anchorId:a,anchorSelect:i,place:l="top",offset:s=10,events:u=["hover"],openOnClick:f=!1,positionStrategy:p="absolute",middlewares:v,wrapper:h,delayShow:d=0,delayHide:c=0,float:m=!1,hidden:x=!1,noArrow:_=!1,clickable:O=!1,closeOnEsc:S=!1,closeOnScroll:z=!1,closeOnResize:N=!1,openEvents:T,closeEvents:I,globalCloseEvents:D,imperativeModeOnly:on,style:bn,position:rn,afterShow:fn,afterHide:q,disableTooltip:G,content:Y,contentWrapperRef:V,isOpen:j,defaultIsOpen:K=!1,setIsOpen:wn,activeAnchor:$,setActiveAnchor:Hn,border:xt,opacity:kt,arrowColor:wt,role:$t="tooltip"})=>{var tt;const U=g.useRef(null),$n=g.useRef(null),sn=g.useRef(null),zn=g.useRef(null),ot=g.useRef(null),[Sn,Ft]=g.useState({tooltipStyles:{},tooltipArrowStyles:{},place:l}),[J,Ot]=g.useState(!1),[qn,Dn]=g.useState(!1),[L,rt]=g.useState(null),et=g.useRef(!1),at=g.useRef(null),{anchorRefs:it,setActiveAnchor:Pt}=Vo(t),Fn=g.useRef(!1),[An,lt]=g.useState([]),Cn=g.useRef(!1),Bn=f||u.includes("click"),st=Bn||(T==null?void 0:T.click)||(T==null?void 0:T.dblclick)||(T==null?void 0:T.mousedown),In=T?{...T}:{mouseover:!0,focus:!0,mouseenter:!1,click:!1,dblclick:!1,mousedown:!1};!T&&Bn&&Object.assign(In,{mouseenter:!1,focus:!1,mouseover:!1,click:!0});const ct=I?{...I}:{mouseout:!0,blur:!0,mouseleave:!1,click:!1,dblclick:!1,mouseup:!1};!I&&Bn&&Object.assign(ct,{mouseleave:!1,blur:!1,mouseout:!1});const cn=D?{...D}:{escape:S||!1,scroll:z||!1,resize:N||!1,clickOutsideAnchor:st||!1};on&&(Object.assign(In,{mouseenter:!1,focus:!1,click:!1,dblclick:!1,mousedown:!1}),Object.assign(ct,{mouseleave:!1,blur:!1,click:!1,dblclick:!1,mouseup:!1}),Object.assign(cn,{escape:!1,scroll:!1,resize:!1,clickOutsideAnchor:!1})),Hr(()=>(Cn.current=!0,()=>{Cn.current=!1}),[]);const H=b=>{Cn.current&&(b&&Dn(!0),setTimeout(()=>{Cn.current&&(wn==null||wn(b),j===void 0&&Ot(b))},10))};g.useEffect(()=>{if(j===void 0)return()=>null;j&&Dn(!0);const b=setTimeout(()=>{Ot(j)},10);return()=>{clearTimeout(b)}},[j]),g.useEffect(()=>{if(J!==et.current)if(ln(ot),et.current=J,J)fn==null||fn();else{const b=(w=>{const P=w.match(/^([\d.]+)(ms|s)$/);if(!P)return 0;const[,F,X]=P;return Number(F)*(X==="ms"?1:1e3)})(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));ot.current=setTimeout(()=>{Dn(!1),rt(null),q==null||q()},b+25)}},[J]);const _t=b=>{Ft(w=>Gt(w,b)?w:b)},ut=(b=d)=>{ln(sn),qn?H(!0):sn.current=setTimeout(()=>{H(!0)},b)},Vn=(b=c)=>{ln(zn),zn.current=setTimeout(()=>{Fn.current||H(!1)},b)},dt=b=>{var w;if(!b)return;const P=(w=b.currentTarget)!==null&&w!==void 0?w:b.target;if(!(P!=null&&P.isConnected))return Hn(null),void Pt({current:null});d?ut():H(!0),Hn(P),Pt({current:P}),ln(zn)},Wn=()=>{O?Vn(c||100):c?Vn():H(!1),ln(sn)},Xn=({x:b,y:w})=>{var P;const F={getBoundingClientRect:()=>({x:b,y:w,width:0,height:0,top:w,left:b,right:b,bottom:w})};go({place:(P=L==null?void 0:L.place)!==null&&P!==void 0?P:l,offset:s,elementReference:F,tooltipReference:U.current,tooltipArrowReference:$n.current,strategy:p,middlewares:v,border:xt}).then(X=>{_t(X)})},Yn=b=>{if(!b)return;const w=b,P={x:w.clientX,y:w.clientY};Xn(P),at.current=P},pt=b=>{var w;if(!J)return;const P=b.target;P.isConnected&&(!((w=U.current)===null||w===void 0)&&w.contains(P)||[document.querySelector(`[id='${a}']`),...An].some(F=>F==null?void 0:F.contains(P))||(H(!1),ln(sn)))},zt=yo(dt,50,!0),W=yo(Wn,50,!0),en=b=>{W.cancel(),zt(b)},k=()=>{zt.cancel(),W()},A=g.useCallback(()=>{var b,w;const P=(b=L==null?void 0:L.position)!==null&&b!==void 0?b:rn;P?Xn(P):m?at.current&&Xn(at.current):$!=null&&$.isConnected&&go({place:(w=L==null?void 0:L.place)!==null&&w!==void 0?w:l,offset:s,elementReference:$,tooltipReference:U.current,tooltipArrowReference:$n.current,strategy:p,middlewares:v,border:xt}).then(F=>{Cn.current&&_t(F)})},[J,$,Y,bn,l,L==null?void 0:L.place,s,p,rn,L==null?void 0:L.position,m]);g.useEffect(()=>{var b,w;const P=new Set(it);An.forEach(E=>{G!=null&&G(E)||P.add({current:E})});const F=document.querySelector(`[id='${a}']`);F&&!(G!=null&&G(F))&&P.add({current:F});const X=()=>{H(!1)},mn=ko($),gn=ko(U.current);cn.scroll&&(window.addEventListener("scroll",X),mn==null||mn.addEventListener("scroll",X),gn==null||gn.addEventListener("scroll",X));let Z=null;cn.resize?window.addEventListener("resize",X):$&&U.current&&(Z=Er($,U.current,A,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const an=E=>{E.key==="Escape"&&H(!1)};cn.escape&&window.addEventListener("keydown",an),cn.clickOutsideAnchor&&window.addEventListener("click",pt);const C=[],ht=E=>{J&&(E==null?void 0:E.target)===$||dt(E)},Zo=E=>{J&&(E==null?void 0:E.target)===$&&Wn()},ao=["mouseover","mouseout","mouseenter","mouseleave","focus","blur"],io=["click","dblclick","mousedown","mouseup"];Object.entries(In).forEach(([E,On])=>{On&&(ao.includes(E)?C.push({event:E,listener:en}):io.includes(E)&&C.push({event:E,listener:ht}))}),Object.entries(ct).forEach(([E,On])=>{On&&(ao.includes(E)?C.push({event:E,listener:k}):io.includes(E)&&C.push({event:E,listener:Zo}))}),m&&C.push({event:"pointermove",listener:Yn});const lo=()=>{Fn.current=!0},so=()=>{Fn.current=!1,Wn()};return O&&!st&&((b=U.current)===null||b===void 0||b.addEventListener("mouseenter",lo),(w=U.current)===null||w===void 0||w.addEventListener("mouseleave",so)),C.forEach(({event:E,listener:On})=>{P.forEach(Bt=>{var bt;(bt=Bt.current)===null||bt===void 0||bt.addEventListener(E,On)})}),()=>{var E,On;cn.scroll&&(window.removeEventListener("scroll",X),mn==null||mn.removeEventListener("scroll",X),gn==null||gn.removeEventListener("scroll",X)),cn.resize?window.removeEventListener("resize",X):Z==null||Z(),cn.clickOutsideAnchor&&window.removeEventListener("click",pt),cn.escape&&window.removeEventListener("keydown",an),O&&!st&&((E=U.current)===null||E===void 0||E.removeEventListener("mouseenter",lo),(On=U.current)===null||On===void 0||On.removeEventListener("mouseleave",so)),C.forEach(({event:Bt,listener:bt})=>{P.forEach(Go=>{var It;(It=Go.current)===null||It===void 0||It.removeEventListener(Bt,bt)})})}},[$,A,qn,it,An,T,I,D,Bn,d,c]),g.useEffect(()=>{var b,w;let P=(w=(b=L==null?void 0:L.anchorSelect)!==null&&b!==void 0?b:i)!==null&&w!==void 0?w:"";!P&&t&&(P=`[data-tooltip-id='${t.replace(/'/g,"\\'")}']`);const F=new MutationObserver(X=>{const mn=[],gn=[];X.forEach(Z=>{if(Z.type==="attributes"&&Z.attributeName==="data-tooltip-id"&&(Z.target.getAttribute("data-tooltip-id")===t?mn.push(Z.target):Z.oldValue===t&&gn.push(Z.target)),Z.type==="childList"){if($){const an=[...Z.removedNodes].filter(C=>C.nodeType===1);if(P)try{gn.push(...an.filter(C=>C.matches(P))),gn.push(...an.flatMap(C=>[...C.querySelectorAll(P)]))}catch{}an.some(C=>{var ht;return!!(!((ht=C==null?void 0:C.contains)===null||ht===void 0)&&ht.call(C,$))&&(Dn(!1),H(!1),Hn(null),ln(sn),ln(zn),!0)})}if(P)try{const an=[...Z.addedNodes].filter(C=>C.nodeType===1);mn.push(...an.filter(C=>C.matches(P))),mn.push(...an.flatMap(C=>[...C.querySelectorAll(P)]))}catch{}}}),(mn.length||gn.length)&&lt(Z=>[...Z.filter(an=>!gn.includes(an)),...mn])});return F.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"],attributeOldValue:!0}),()=>{F.disconnect()}},[t,i,L==null?void 0:L.anchorSelect,$]),g.useEffect(()=>{A()},[A]),g.useEffect(()=>{if(!(V!=null&&V.current))return()=>null;const b=new ResizeObserver(()=>{setTimeout(()=>A())});return b.observe(V.current),()=>{b.disconnect()}},[Y,V==null?void 0:V.current]),g.useEffect(()=>{var b;const w=document.querySelector(`[id='${a}']`),P=[...An,w];$&&P.includes($)||Hn((b=An[0])!==null&&b!==void 0?b:w)},[a,An,$]),g.useEffect(()=>(K&&H(!0),()=>{ln(sn),ln(zn)}),[]),g.useEffect(()=>{var b;let w=(b=L==null?void 0:L.anchorSelect)!==null&&b!==void 0?b:i;if(!w&&t&&(w=`[data-tooltip-id='${t.replace(/'/g,"\\'")}']`),w)try{const P=Array.from(document.querySelectorAll(w));lt(P)}catch{lt([])}},[t,i,L==null?void 0:L.anchorSelect]),g.useEffect(()=>{sn.current&&(ln(sn),ut(d))},[d]);const Q=(tt=L==null?void 0:L.content)!==null&&tt!==void 0?tt:Y,Mn=J&&Object.keys(Sn.tooltipStyles).length>0;return g.useImperativeHandle(n,()=>({open:b=>{if(b!=null&&b.anchorSelect)try{document.querySelector(b.anchorSelect)}catch{return void console.warn(`[react-tooltip] "${b.anchorSelect}" is not a valid CSS selector`)}rt(b??null),b!=null&&b.delay?ut(b.delay):H(!0)},close:b=>{b!=null&&b.delay?Vn(b.delay):H(!1)},activeAnchor:$,place:Sn.place,isOpen:!!(qn&&!x&&Q&&Mn)})),qn&&!x&&Q?M.createElement(h,{id:t,role:$t,className:Zt("react-tooltip",Kn.tooltip,Wt.tooltip,Wt[e],o,`react-tooltip__place-${Sn.place}`,Kn[Mn?"show":"closing"],Mn?"react-tooltip__show":"react-tooltip__closing",p==="fixed"&&Kn.fixed,O&&Kn.clickable),onTransitionEnd:b=>{ln(ot),J||b.propertyName!=="opacity"||(Dn(!1),rt(null),q==null||q())},style:{...bn,...Sn.tooltipStyles,opacity:kt!==void 0&&Mn?kt:void 0},ref:U},Q,M.createElement(h,{className:Zt("react-tooltip-arrow",Kn.arrow,Wt.arrow,r,_&&Kn.noArrow),style:{...Sn.tooltipArrowStyles,background:wt?`linear-gradient(to right bottom, transparent 50%, ${wt} 50%)`:void 0},ref:$n})):null},Vr=({content:n})=>M.createElement("span",{dangerouslySetInnerHTML:{__html:n}}),Wr=M.forwardRef(({id:n,anchorId:t,anchorSelect:o,content:r,html:e,render:a,className:i,classNameArrow:l,variant:s="dark",place:u="top",offset:f=10,wrapper:p="div",children:v=null,events:h=["hover"],openOnClick:d=!1,positionStrategy:c="absolute",middlewares:m,delayShow:x=0,delayHide:_=0,float:O=!1,hidden:S=!1,noArrow:z=!1,clickable:N=!1,closeOnEsc:T=!1,closeOnScroll:I=!1,closeOnResize:D=!1,openEvents:on,closeEvents:bn,globalCloseEvents:rn,imperativeModeOnly:fn=!1,style:q,position:G,isOpen:Y,defaultIsOpen:V=!1,disableStyleInjection:j=!1,border:K,opacity:wn,arrowColor:$,setIsOpen:Hn,afterShow:xt,afterHide:kt,disableTooltip:wt,role:$t="tooltip"},tt)=>{const[U,$n]=g.useState(r),[sn,zn]=g.useState(e),[ot,Sn]=g.useState(u),[Ft,J]=g.useState(s),[Ot,qn]=g.useState(f),[Dn,L]=g.useState(x),[rt,et]=g.useState(_),[at,it]=g.useState(O),[Pt,Fn]=g.useState(S),[An,lt]=g.useState(p),[Cn,Bn]=g.useState(h),[st,In]=g.useState(c),[ct,cn]=g.useState(null),[H,_t]=g.useState(null),ut=g.useRef(j),{anchorRefs:Vn,activeAnchor:dt}=Vo(n),Wn=W=>W==null?void 0:W.getAttributeNames().reduce((en,k)=>{var A;return k.startsWith("data-tooltip-")&&(en[k.replace(/^data-tooltip-/,"")]=(A=W==null?void 0:W.getAttribute(k))!==null&&A!==void 0?A:null),en},{}),Xn=W=>{const en={place:k=>{var A;Sn((A=k)!==null&&A!==void 0?A:u)},content:k=>{$n(k??r)},html:k=>{zn(k??e)},variant:k=>{var A;J((A=k)!==null&&A!==void 0?A:s)},offset:k=>{qn(k===null?f:Number(k))},wrapper:k=>{var A;lt((A=k)!==null&&A!==void 0?A:p)},events:k=>{const A=k==null?void 0:k.split(" ");Bn(A??h)},"position-strategy":k=>{var A;In((A=k)!==null&&A!==void 0?A:c)},"delay-show":k=>{L(k===null?x:Number(k))},"delay-hide":k=>{et(k===null?_:Number(k))},float:k=>{it(k===null?O:k==="true")},hidden:k=>{Fn(k===null?S:k==="true")},"class-name":k=>{cn(k)}};Object.values(en).forEach(k=>k(null)),Object.entries(W).forEach(([k,A])=>{var Q;(Q=en[k])===null||Q===void 0||Q.call(en,A)})};g.useEffect(()=>{$n(r)},[r]),g.useEffect(()=>{zn(e)},[e]),g.useEffect(()=>{Sn(u)},[u]),g.useEffect(()=>{J(s)},[s]),g.useEffect(()=>{qn(f)},[f]),g.useEffect(()=>{L(x)},[x]),g.useEffect(()=>{et(_)},[_]),g.useEffect(()=>{it(O)},[O]),g.useEffect(()=>{Fn(S)},[S]),g.useEffect(()=>{In(c)},[c]),g.useEffect(()=>{ut.current!==j&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")},[j]),g.useEffect(()=>{typeof window<"u"&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:j==="core",disableBase:j}}))},[]),g.useEffect(()=>{var W;const en=new Set(Vn);let k=o;if(!k&&n&&(k=`[data-tooltip-id='${n.replace(/'/g,"\\'")}']`),k)try{document.querySelectorAll(k).forEach(w=>{en.add({current:w})})}catch{console.warn(`[react-tooltip] "${k}" is not a valid CSS selector`)}const A=document.querySelector(`[id='${t}']`);if(A&&en.add({current:A}),!en.size)return()=>null;const Q=(W=H??A)!==null&&W!==void 0?W:dt.current,Mn=new MutationObserver(w=>{w.forEach(P=>{var F;if(!Q||P.type!=="attributes"||!(!((F=P.attributeName)===null||F===void 0)&&F.startsWith("data-tooltip-")))return;const X=Wn(Q);Xn(X)})}),b={attributes:!0,childList:!1,subtree:!1};if(Q){const w=Wn(Q);Xn(w),Mn.observe(Q,b)}return()=>{Mn.disconnect()}},[Vn,dt,H,t,o]),g.useEffect(()=>{q!=null&&q.border&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),K&&!vo("border",`${K}`)&&console.warn(`[react-tooltip] "${K}" is not a valid \`border\`.`),q!=null&&q.opacity&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),wn&&!vo("opacity",`${wn}`)&&console.warn(`[react-tooltip] "${wn}" is not a valid \`opacity\`.`)},[]);let Yn=v;const pt=g.useRef(null);if(a){const W=a({content:(H==null?void 0:H.getAttribute("data-tooltip-content"))||U||null,activeAnchor:H});Yn=W?M.createElement("div",{ref:pt,className:"react-tooltip-content-wrapper"},W):null}else U&&(Yn=U);sn&&(Yn=M.createElement(Vr,{content:sn}));const zt={forwardRef:tt,id:n,anchorId:t,anchorSelect:o,className:Zt(i,ct),classNameArrow:l,content:Yn,contentWrapperRef:pt,place:ot,variant:Ft,offset:Ot,wrapper:An,events:Cn,openOnClick:d,positionStrategy:st,middlewares:m,delayShow:Dn,delayHide:rt,float:at,hidden:Pt,noArrow:z,clickable:N,closeOnEsc:T,closeOnScroll:I,closeOnResize:D,openEvents:on,closeEvents:bn,globalCloseEvents:rn,imperativeModeOnly:fn,style:q,position:G,isOpen:Y,defaultIsOpen:V,border:K,opacity:wn,arrowColor:$,setIsOpen:Hn,afterShow:xt,afterHide:kt,disableTooltip:wt,activeAnchor:H,setActiveAnchor:W=>_t(W),role:$t};return M.createElement(Ir,{...zt})});typeof window<"u"&&window.addEventListener("react-tooltip-inject-styles",n=>{n.detail.disableCore||mo({css:":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}",type:"core"}),n.detail.disableBase||mo({css:`
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,type:"base"})});const Xr=({content:n,children:t})=>{const r=`tooltip-${Qo(5)}`;return Eo(qo,{children:[_n("a",{"data-tooltip-id":r,children:t}),_n(Wr,{className:"z-10",id:r,children:n})]})},ke=({disabled:n=!1,Icon:t,onClick:o=()=>{},title:r=null,size:e=5,hidden:a=!1})=>{const i=`h-${e} w-${e}`,l=_n("button",{title:"Mover elemento hacia abajo",className:`flex justify-between items-center p-1 rounded-lg ${a&&"opacity-0"}`,disabled:n||a,onClick:o,children:_n(t,{className:`${n?"text-gray-400":"text-gray-700"} ${i}`})});return _n(qo,{children:r==null||a?l:_n(Xr,{content:r,children:l})})};function we(n,t=30){return n.length>t?n.substring(0,t)+"...":n}var Wo={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},wo=M.createContext&&M.createContext(Wo),Yr=["attr","size","title"];function Kr(n,t){if(n==null)return{};var o=Ur(n,t),r,e;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(e=0;e<a.length;e++)r=a[e],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(n,r)&&(o[r]=n[r])}return o}function Ur(n,t){if(n==null)return{};var o={};for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){if(t.indexOf(r)>=0)continue;o[r]=n[r]}return o}function Ct(){return Ct=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n[r]=o[r])}return n},Ct.apply(this,arguments)}function Oo(n,t){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),o.push.apply(o,r)}return o}function Mt(n){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?Oo(Object(o),!0).forEach(function(r){Zr(n,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):Oo(Object(o)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(o,r))})}return n}function Zr(n,t,o){return t=Gr(t),t in n?Object.defineProperty(n,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[t]=o,n}function Gr(n){var t=Jr(n,"string");return typeof t=="symbol"?t:t+""}function Jr(n,t){if(typeof n!="object"||!n)return n;var o=n[Symbol.toPrimitive];if(o!==void 0){var r=o.call(n,t||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(n)}function Xo(n){return n&&n.map((t,o)=>M.createElement(t.tag,Mt({key:o},t.attr),Xo(t.child)))}function jn(n){return t=>M.createElement(Qr,Ct({attr:Mt({},n.attr)},t),Xo(n.child))}function Qr(n){var t=o=>{var{attr:r,size:e,title:a}=n,i=Kr(n,Yr),l=e||o.size||"1em",s;return o.className&&(s=o.className),n.className&&(s=(s?s+" ":"")+n.className),M.createElement("svg",Ct({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},o.attr,r,i,{className:s,style:Mt(Mt({color:n.color||o.color},o.style),n.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),a&&M.createElement("title",null,a),n.children)};return wo!==void 0?M.createElement(wo.Consumer,null,o=>t(o)):t(Wo)}function Oe(n){return jn({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z"},child:[]}]})(n)}function Pe(n){return jn({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"},child:[]}]})(n)}function _e(n){return jn({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zm-8.01-9-1.41 1.41L12.16 12H8v2h4.16l-1.59 1.59L11.99 17 16 13.01 11.99 9z"},child:[]}]})(n)}function ze(n){return jn({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"},child:[]}]})(n)}function Se(n){return jn({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"},child:[]}]})(n)}function Ae(n){return jn({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"},child:[]}]})(n)}function Te(n){return jn({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"},child:[]}]})(n)}function B(n,t){t===void 0&&(t={});var o=t.insertAt;if(n&&typeof document<"u"){var r=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",o==="top"&&r.firstChild?r.insertBefore(e,r.firstChild):r.appendChild(e),e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n))}}B(`.react-loading-indicator-normalize,
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
}`);var vn=function(){return vn=Object.assign||function(n){for(var t,o=1,r=arguments.length;o<r;o++)for(var e in t=arguments[o])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n},vn.apply(this,arguments)};function Rt(n){return Rt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Rt(n)}var ne=/^\s+/,te=/\s+$/;function y(n,t){if(t=t||{},(n=n||"")instanceof y)return n;if(!(this instanceof y))return new y(n,t);var o=function(r){var e={r:0,g:0,b:0},a=1,i=null,l=null,s=null,u=!1,f=!1;typeof r=="string"&&(r=function(d){d=d.replace(ne,"").replace(te,"").toLowerCase();var c,m=!1;if(Jt[d])d=Jt[d],m=!0;else if(d=="transparent")return{r:0,g:0,b:0,a:0,format:"name"};return(c=un.rgb.exec(d))?{r:c[1],g:c[2],b:c[3]}:(c=un.rgba.exec(d))?{r:c[1],g:c[2],b:c[3],a:c[4]}:(c=un.hsl.exec(d))?{h:c[1],s:c[2],l:c[3]}:(c=un.hsla.exec(d))?{h:c[1],s:c[2],l:c[3],a:c[4]}:(c=un.hsv.exec(d))?{h:c[1],s:c[2],v:c[3]}:(c=un.hsva.exec(d))?{h:c[1],s:c[2],v:c[3],a:c[4]}:(c=un.hex8.exec(d))?{r:nn(c[1]),g:nn(c[2]),b:nn(c[3]),a:To(c[4]),format:m?"name":"hex8"}:(c=un.hex6.exec(d))?{r:nn(c[1]),g:nn(c[2]),b:nn(c[3]),format:m?"name":"hex"}:(c=un.hex4.exec(d))?{r:nn(c[1]+""+c[1]),g:nn(c[2]+""+c[2]),b:nn(c[3]+""+c[3]),a:To(c[4]+""+c[4]),format:m?"name":"hex8"}:(c=un.hex3.exec(d))?{r:nn(c[1]+""+c[1]),g:nn(c[2]+""+c[2]),b:nn(c[3]+""+c[3]),format:m?"name":"hex"}:!1}(r)),Rt(r)=="object"&&(Pn(r.r)&&Pn(r.g)&&Pn(r.b)?(p=r.r,v=r.g,h=r.b,e={r:255*R(p,255),g:255*R(v,255),b:255*R(h,255)},u=!0,f=String(r.r).substr(-1)==="%"?"prgb":"rgb"):Pn(r.h)&&Pn(r.s)&&Pn(r.v)?(i=ft(r.s),l=ft(r.v),e=function(d,c,m){d=6*R(d,360),c=R(c,100),m=R(m,100);var x=Math.floor(d),_=d-x,O=m*(1-c),S=m*(1-_*c),z=m*(1-(1-_)*c),N=x%6,T=[m,S,O,O,z,m][N],I=[z,m,m,S,O,O][N],D=[O,O,z,m,m,S][N];return{r:255*T,g:255*I,b:255*D}}(r.h,i,l),u=!0,f="hsv"):Pn(r.h)&&Pn(r.s)&&Pn(r.l)&&(i=ft(r.s),s=ft(r.l),e=function(d,c,m){var x,_,O;function S(T,I,D){return D<0&&(D+=1),D>1&&(D-=1),D<1/6?T+6*(I-T)*D:D<.5?I:D<2/3?T+(I-T)*(2/3-D)*6:T}if(d=R(d,360),c=R(c,100),m=R(m,100),c===0)x=_=O=m;else{var z=m<.5?m*(1+c):m+c-m*c,N=2*m-z;x=S(N,z,d+1/3),_=S(N,z,d),O=S(N,z,d-1/3)}return{r:255*x,g:255*_,b:255*O}}(r.h,i,s),u=!0,f="hsl"),r.hasOwnProperty("a")&&(a=r.a));var p,v,h;return a=Yo(a),{ok:u,format:r.format||f,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a}}(n);this._originalInput=n,this._r=o.r,this._g=o.g,this._b=o.b,this._a=o.a,this._roundA=Math.round(100*this._a)/100,this._format=t.format||o.format,this._gradientType=t.gradientType,this._r<1&&(this._r=Math.round(this._r)),this._g<1&&(this._g=Math.round(this._g)),this._b<1&&(this._b=Math.round(this._b)),this._ok=o.ok}function Po(n,t,o){n=R(n,255),t=R(t,255),o=R(o,255);var r,e,a=Math.max(n,t,o),i=Math.min(n,t,o),l=(a+i)/2;if(a==i)r=e=0;else{var s=a-i;switch(e=l>.5?s/(2-a-i):s/(a+i),a){case n:r=(t-o)/s+(t<o?6:0);break;case t:r=(o-n)/s+2;break;case o:r=(n-t)/s+4}r/=6}return{h:r,s:e,l}}function _o(n,t,o){n=R(n,255),t=R(t,255),o=R(o,255);var r,e,a=Math.max(n,t,o),i=Math.min(n,t,o),l=a,s=a-i;if(e=a===0?0:s/a,a==i)r=0;else{switch(a){case n:r=(t-o)/s+(t<o?6:0);break;case t:r=(o-n)/s+2;break;case o:r=(n-t)/s+4}r/=6}return{h:r,s:e,v:l}}function zo(n,t,o,r){var e=[dn(Math.round(n).toString(16)),dn(Math.round(t).toString(16)),dn(Math.round(o).toString(16))];return r&&e[0].charAt(0)==e[0].charAt(1)&&e[1].charAt(0)==e[1].charAt(1)&&e[2].charAt(0)==e[2].charAt(1)?e[0].charAt(0)+e[1].charAt(0)+e[2].charAt(0):e.join("")}function So(n,t,o,r){return[dn(Ko(r)),dn(Math.round(n).toString(16)),dn(Math.round(t).toString(16)),dn(Math.round(o).toString(16))].join("")}function oe(n,t){t=t===0?0:t||10;var o=y(n).toHsl();return o.s-=t/100,o.s=Ht(o.s),y(o)}function re(n,t){t=t===0?0:t||10;var o=y(n).toHsl();return o.s+=t/100,o.s=Ht(o.s),y(o)}function ee(n){return y(n).desaturate(100)}function ae(n,t){t=t===0?0:t||10;var o=y(n).toHsl();return o.l+=t/100,o.l=Ht(o.l),y(o)}function ie(n,t){t=t===0?0:t||10;var o=y(n).toRgb();return o.r=Math.max(0,Math.min(255,o.r-Math.round(-t/100*255))),o.g=Math.max(0,Math.min(255,o.g-Math.round(-t/100*255))),o.b=Math.max(0,Math.min(255,o.b-Math.round(-t/100*255))),y(o)}function le(n,t){t=t===0?0:t||10;var o=y(n).toHsl();return o.l-=t/100,o.l=Ht(o.l),y(o)}function se(n,t){var o=y(n).toHsl(),r=(o.h+t)%360;return o.h=r<0?360+r:r,y(o)}function ce(n){var t=y(n).toHsl();return t.h=(t.h+180)%360,y(t)}function Ao(n,t){if(isNaN(t)||t<=0)throw new Error("Argument to polyad must be a positive number");for(var o=y(n).toHsl(),r=[y(n)],e=360/t,a=1;a<t;a++)r.push(y({h:(o.h+a*e)%360,s:o.s,l:o.l}));return r}function ue(n){var t=y(n).toHsl(),o=t.h;return[y(n),y({h:(o+72)%360,s:t.s,l:t.l}),y({h:(o+216)%360,s:t.s,l:t.l})]}function de(n,t,o){t=t||6,o=o||30;var r=y(n).toHsl(),e=360/o,a=[y(n)];for(r.h=(r.h-(e*t>>1)+720)%360;--t;)r.h=(r.h+e)%360,a.push(y(r));return a}function pe(n,t){t=t||6;for(var o=y(n).toHsv(),r=o.h,e=o.s,a=o.v,i=[],l=1/t;t--;)i.push(y({h:r,s:e,v:a})),a=(a+l)%1;return i}y.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var n=this.toRgb();return(299*n.r+587*n.g+114*n.b)/1e3},getLuminance:function(){var n,t,o,r=this.toRgb();return n=r.r/255,t=r.g/255,o=r.b/255,.2126*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))+.7152*(t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4))+.0722*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))},setAlpha:function(n){return this._a=Yo(n),this._roundA=Math.round(100*this._a)/100,this},toHsv:function(){var n=_o(this._r,this._g,this._b);return{h:360*n.h,s:n.s,v:n.v,a:this._a}},toHsvString:function(){var n=_o(this._r,this._g,this._b),t=Math.round(360*n.h),o=Math.round(100*n.s),r=Math.round(100*n.v);return this._a==1?"hsv("+t+", "+o+"%, "+r+"%)":"hsva("+t+", "+o+"%, "+r+"%, "+this._roundA+")"},toHsl:function(){var n=Po(this._r,this._g,this._b);return{h:360*n.h,s:n.s,l:n.l,a:this._a}},toHslString:function(){var n=Po(this._r,this._g,this._b),t=Math.round(360*n.h),o=Math.round(100*n.s),r=Math.round(100*n.l);return this._a==1?"hsl("+t+", "+o+"%, "+r+"%)":"hsla("+t+", "+o+"%, "+r+"%, "+this._roundA+")"},toHex:function(n){return zo(this._r,this._g,this._b,n)},toHexString:function(n){return"#"+this.toHex(n)},toHex8:function(n){return function(t,o,r,e,a){var i=[dn(Math.round(t).toString(16)),dn(Math.round(o).toString(16)),dn(Math.round(r).toString(16)),dn(Ko(e))];return a&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)&&i[3].charAt(0)==i[3].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)+i[3].charAt(0):i.join("")}(this._r,this._g,this._b,this._a,n)},toHex8String:function(n){return"#"+this.toHex8(n)},toRgb:function(){return{r:Math.round(this._r),g:Math.round(this._g),b:Math.round(this._b),a:this._a}},toRgbString:function(){return this._a==1?"rgb("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+")":"rgba("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:Math.round(100*R(this._r,255))+"%",g:Math.round(100*R(this._g,255))+"%",b:Math.round(100*R(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return this._a==1?"rgb("+Math.round(100*R(this._r,255))+"%, "+Math.round(100*R(this._g,255))+"%, "+Math.round(100*R(this._b,255))+"%)":"rgba("+Math.round(100*R(this._r,255))+"%, "+Math.round(100*R(this._g,255))+"%, "+Math.round(100*R(this._b,255))+"%, "+this._roundA+")"},toName:function(){return this._a===0?"transparent":!(this._a<1)&&(he[zo(this._r,this._g,this._b,!0)]||!1)},toFilter:function(n){var t="#"+So(this._r,this._g,this._b,this._a),o=t,r=this._gradientType?"GradientType = 1, ":"";if(n){var e=y(n);o="#"+So(e._r,e._g,e._b,e._a)}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+t+",endColorstr="+o+")"},toString:function(n){var t=!!n;n=n||this._format;var o=!1,r=this._a<1&&this._a>=0;return t||!r||n!=="hex"&&n!=="hex6"&&n!=="hex3"&&n!=="hex4"&&n!=="hex8"&&n!=="name"?(n==="rgb"&&(o=this.toRgbString()),n==="prgb"&&(o=this.toPercentageRgbString()),n!=="hex"&&n!=="hex6"||(o=this.toHexString()),n==="hex3"&&(o=this.toHexString(!0)),n==="hex4"&&(o=this.toHex8String(!0)),n==="hex8"&&(o=this.toHex8String()),n==="name"&&(o=this.toName()),n==="hsl"&&(o=this.toHslString()),n==="hsv"&&(o=this.toHsvString()),o||this.toHexString()):n==="name"&&this._a===0?this.toName():this.toRgbString()},clone:function(){return y(this.toString())},_applyModification:function(n,t){var o=n.apply(null,[this].concat([].slice.call(t)));return this._r=o._r,this._g=o._g,this._b=o._b,this.setAlpha(o._a),this},lighten:function(){return this._applyModification(ae,arguments)},brighten:function(){return this._applyModification(ie,arguments)},darken:function(){return this._applyModification(le,arguments)},desaturate:function(){return this._applyModification(oe,arguments)},saturate:function(){return this._applyModification(re,arguments)},greyscale:function(){return this._applyModification(ee,arguments)},spin:function(){return this._applyModification(se,arguments)},_applyCombination:function(n,t){return n.apply(null,[this].concat([].slice.call(t)))},analogous:function(){return this._applyCombination(de,arguments)},complement:function(){return this._applyCombination(ce,arguments)},monochromatic:function(){return this._applyCombination(pe,arguments)},splitcomplement:function(){return this._applyCombination(ue,arguments)},triad:function(){return this._applyCombination(Ao,[3])},tetrad:function(){return this._applyCombination(Ao,[4])}},y.fromRatio=function(n,t){if(Rt(n)=="object"){var o={};for(var r in n)n.hasOwnProperty(r)&&(o[r]=r==="a"?n[r]:ft(n[r]));n=o}return y(n,t)},y.equals=function(n,t){return!(!n||!t)&&y(n).toRgbString()==y(t).toRgbString()},y.random=function(){return y.fromRatio({r:Math.random(),g:Math.random(),b:Math.random()})},y.mix=function(n,t,o){o=o===0?0:o||50;var r=y(n).toRgb(),e=y(t).toRgb(),a=o/100;return y({r:(e.r-r.r)*a+r.r,g:(e.g-r.g)*a+r.g,b:(e.b-r.b)*a+r.b,a:(e.a-r.a)*a+r.a})},y.readability=function(n,t){var o=y(n),r=y(t);return(Math.max(o.getLuminance(),r.getLuminance())+.05)/(Math.min(o.getLuminance(),r.getLuminance())+.05)},y.isReadable=function(n,t,o){var r,e,a=y.readability(n,t);switch(e=!1,(r=function(i){var l,s;return l=((i=i||{level:"AA",size:"small"}).level||"AA").toUpperCase(),s=(i.size||"small").toLowerCase(),l!=="AA"&&l!=="AAA"&&(l="AA"),s!=="small"&&s!=="large"&&(s="small"),{level:l,size:s}}(o)).level+r.size){case"AAsmall":case"AAAlarge":e=a>=4.5;break;case"AAlarge":e=a>=3;break;case"AAAsmall":e=a>=7}return e},y.mostReadable=function(n,t,o){var r,e,a,i,l=null,s=0;e=(o=o||{}).includeFallbackColors,a=o.level,i=o.size;for(var u=0;u<t.length;u++)(r=y.readability(n,t[u]))>s&&(s=r,l=y(t[u]));return y.isReadable(n,l,{level:a,size:i})||!e?l:(o.includeFallbackColors=!1,y.mostReadable(n,["#fff","#000"],o))};var Jt=y.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},he=y.hexNames=function(n){var t={};for(var o in n)n.hasOwnProperty(o)&&(t[n[o]]=o);return t}(Jt);function Yo(n){return n=parseFloat(n),(isNaN(n)||n<0||n>1)&&(n=1),n}function R(n,t){(function(r){return typeof r=="string"&&r.indexOf(".")!=-1&&parseFloat(r)===1})(n)&&(n="100%");var o=function(r){return typeof r=="string"&&r.indexOf("%")!=-1}(n);return n=Math.min(t,Math.max(0,parseFloat(n))),o&&(n=parseInt(n*t,10)/100),Math.abs(n-t)<1e-6?1:n%t/parseFloat(t)}function Ht(n){return Math.min(1,Math.max(0,n))}function nn(n){return parseInt(n,16)}function dn(n){return n.length==1?"0"+n:""+n}function ft(n){return n<=1&&(n=100*n+"%"),n}function Ko(n){return Math.round(255*parseFloat(n)).toString(16)}function To(n){return nn(n)/255}var Tn,At,Tt,un=(At="[\\s|\\(]+("+(Tn="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+Tn+")[,|\\s]+("+Tn+")\\s*\\)?",Tt="[\\s|\\(]+("+Tn+")[,|\\s]+("+Tn+")[,|\\s]+("+Tn+")[,|\\s]+("+Tn+")\\s*\\)?",{CSS_UNIT:new RegExp(Tn),rgb:new RegExp("rgb"+At),rgba:new RegExp("rgba"+Tt),hsl:new RegExp("hsl"+At),hsla:new RegExp("hsla"+Tt),hsv:new RegExp("hsv"+At),hsva:new RegExp("hsva"+Tt),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function Pn(n){return!!un.CSS_UNIT.exec(n)}var be=function(n,t){var o=(typeof n=="string"?parseInt(n):n)||0;if(o>=-5&&o<=5){var r=o,e=parseFloat(t),a=e+r*(e/5)*-1;return(a==0||a<=Number.EPSILON)&&(a=.1),{animationPeriod:a+"s"}}return{animationPeriod:t}},fe=function(n,t){var o=n||{},r="";switch(t){case"small":r="12px";break;case"medium":r="16px";break;case"large":r="20px";break;default:r=void 0}var e={};if(o.fontSize){var a=o.fontSize;e=function(i,l){var s={};for(var u in i)Object.prototype.hasOwnProperty.call(i,u)&&l.indexOf(u)<0&&(s[u]=i[u]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function"){var f=0;for(u=Object.getOwnPropertySymbols(i);f<u.length;f++)l.indexOf(u[f])<0&&Object.prototype.propertyIsEnumerable.call(i,u[f])&&(s[u[f]]=i[u[f]])}return s}(o,["fontSize"]),r=a}return{fontSize:r,styles:e}},me={color:"currentColor",mixBlendMode:"difference",width:"unset",display:"block",paddingTop:"2px"},ge=function(n){var t=n.className,o=n.text,r=n.textColor,e=n.staticText,a=n.style;return o?M.createElement("span",{className:"rli-d-i-b rli-text-format ".concat(t||"").trim(),style:vn(vn(vn({},e&&me),r&&{color:r,mixBlendMode:"unset"}),a&&a)},typeof o=="string"&&o.length?o:"loading"):null},Uo="rgb(50, 205, 50)";function ve(n,t){t===void 0&&(t=0);var o=[];return function r(e,a){return a===void 0&&(a=0),o.push.apply(o,e),o.length<a&&r(o,a),o.slice(0,a)}(n,t)}B(`.atom-rli-bounding-box {
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
}`);y(Uo).toRgb();Array.from({length:4},function(n,t){return"--atom-phase".concat(t+1,"-rgb")});B(`.commet-rli-bounding-box {
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
}`);var Un=Array.from({length:4},function(n,t){return"--commet-phase".concat(t+1,"-color")}),Ee=function(n){var t,o=fe(n==null?void 0:n.style,n==null?void 0:n.size),r=o.styles,e=o.fontSize,a=n==null?void 0:n.easing,i=be(n==null?void 0:n.speedPlus,"1.2s").animationPeriod,l=function(s){var u={};if(s instanceof Array){for(var f=ve(s,Un.length),p=0;p<f.length&&!(p>=4);p++)u[Un[p]]=f[p];return u}try{if(typeof s!="string")throw new Error("Color String expected");for(var v=0;v<Un.length;v++)u[Un[v]]=s}catch(h){for(h instanceof Error?console.warn("[".concat(h.message,']: Received "').concat(typeof s,'" instead with value, ').concat(JSON.stringify(s))):console.warn("".concat(JSON.stringify(s)," received in <Commet /> indicator cannot be processed. Using default instead!")),v=0;v<Un.length;v++)u[Un[v]]=Uo}return u}((t=n==null?void 0:n.color)!==null&&t!==void 0?t:"");return M.createElement("span",{className:"rli-d-i-b commet-rli-bounding-box",style:vn(vn(vn(vn(vn({},e&&{fontSize:e}),i&&{"--rli-animation-duration":i}),a&&{"--rli-animation-function":a}),l),r),role:"status","aria-live":"polite","aria-label":"Loading"},M.createElement("span",{className:"rli-d-i-b commet-indicator"},M.createElement("span",{className:"rli-d-i-b commet-box"},M.createElement("span",{className:"rli-d-i-b commet-trail trail1"}),M.createElement("span",{className:"rli-d-i-b  commetball-box"})),M.createElement("span",{className:"rli-d-i-b commet-box"},M.createElement("span",{className:"rli-d-i-b commet-trail trail2"}),M.createElement("span",{className:"rli-d-i-b commetball-box"})),M.createElement(ge,{className:"commet-text",text:n==null?void 0:n.text,textColor:n==null?void 0:n.textColor})))};B(`.OP-annulus-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--OP-annulus-phase".concat(t+1,"-color")});function Xt(n){return n&&n.Math===Math&&n}B(`.OP-dotted-rli-bounding-box {
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
}`);Xt(typeof window=="object"&&window)||Xt(typeof self=="object"&&self)||Xt(typeof global=="object"&&global)||function(){return this}()||Function("return this")();Array.from({length:4},function(n,t){return"--OP-dotted-phase".concat(t+1,"-color")});B(`.OP-spokes-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--OP-spokes-phase".concat(t+1,"-color")});B(`.OP-annulus-dual-sectors-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--OP-annulus-dual-sectors-phase".concat(t+1,"-color")});B(`.OP-annulus-sector-track-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return["--OP-annulus-track-phase".concat(t+1,"-color"),"--OP-annulus-sector-phase".concat(t+1,"-color")]});B(`.foursquare-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--four-square-phase".concat(t+1,"-color")});B(`.mosaic-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--mosaic-phase".concat(t+1,"-color")});B(`.riple-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--riple-phase".concat(t+1,"-color")});B(`.pulsate-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--TD-pulsate-phase".concat(t+1,"-color")});B(`.brick-stack-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--TD-brick-stack-phase".concat(t+1,"-color")});B(`.bob-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--TD-bob-phase".concat(t+1,"-color")});B(`.bounce-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--TD-bounce-phase".concat(t+1,"-color")});B(`.blink-blur-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--shape-phase".concat(t+1,"-color")});B(`.trophy-spin-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--trophySpin-phase".concat(t+1,"-color")});B(`.slab-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--slab-phase".concat(t+1,"-color")});B(`.lifeline-rli-bounding-box {
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
}`);Array.from({length:4},function(n,t){return"--life-line-phase".concat(t+1,"-color")});export{jn as G,Ae as M,xe as S,ke as T,Ee as V,Oe as a,ze as b,Se as c,_e as d,Te as e,Pe as f,we as t};
