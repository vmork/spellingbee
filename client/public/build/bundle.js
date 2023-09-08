var app=function(){"use strict";function e(){}const t=e=>e;function n(e){return e()}function o(){return Object.create(null)}function s(e){e.forEach(n)}function r(e){return"function"==typeof e}function l(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(e,t,n,o){return e[1]&&o?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](o(t))):n.ctx}function c(e){return null==e?"":e}function a(e){const t="string"==typeof e&&e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return t?[parseFloat(t[1]),t[2]||"px"]:[e,"px"]}const u="undefined"!=typeof window;let d=u?()=>window.performance.now():()=>Date.now(),f=u?e=>requestAnimationFrame(e):e;const p=new Set;function m(e){p.forEach((t=>{t.c(e)||(p.delete(t),t.f())})),0!==p.size&&f(m)}function h(e){let t;return 0===p.size&&f(m),{promise:new Promise((n=>{p.add(t={c:e,f:n})})),abort(){p.delete(t)}}}const g="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function v(e,t){e.appendChild(t)}function $(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function x(e){const t=b("style");return function(e,t){v(e.head||e,t),t.sheet}($(e),t),t.sheet}function w(e,t,n){e.insertBefore(t,n||null)}function y(e){e.parentNode&&e.parentNode.removeChild(e)}function b(e){return document.createElement(e)}function k(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function M(e){return document.createTextNode(e)}function _(){return M(" ")}function S(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function C(e){return function(t){t.target===this&&e.call(this,t)}}function E(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function W(e,t){t=""+t,e.data!==t&&(e.data=t)}function N(e,t,n,o){null==n?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function O(e,t,n){e.classList[n?"add":"remove"](t)}function z(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(e,n,o,t),s}const L=new Map;let P,T=0;function A(e,t,n,o,s,r,l,i=0){const c=16.666/o;let a="{\n";for(let e=0;e<=1;e+=c){const o=t+(n-t)*r(e);a+=100*e+`%{${l(o,1-o)}}\n`}const u=a+`100% {${l(n,1-n)}}\n}`,d=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(u)}_${i}`,f=$(e),{stylesheet:p,rules:m}=L.get(f)||function(e,t){const n={stylesheet:x(t),rules:{}};return L.set(e,n),n}(f,e);m[d]||(m[d]=!0,p.insertRule(`@keyframes ${d} ${u}`,p.cssRules.length));const h=e.style.animation||"";return e.style.animation=`${h?`${h}, `:""}${d} ${o}ms linear ${s}ms 1 both`,T+=1,d}function H(e,t){const n=(e.style.animation||"").split(", "),o=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),s=n.length-o.length;s&&(e.style.animation=o.join(", "),T-=s,T||f((()=>{T||(L.forEach((e=>{const{ownerNode:t}=e.stylesheet;t&&y(t)})),L.clear())})))}function R(e){P=e}function U(){if(!P)throw new Error("Function called outside component initialization");return P}function j(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach((e=>e.call(this,t)))}const F=[],q=[];let I=[];const J=[],B=Promise.resolve();let D=!1;function G(e){I.push(e)}function K(e){J.push(e)}const Q=new Set;let V,X=0;function Y(){if(0!==X)return;const e=P;do{try{for(;X<F.length;){const e=F[X];X++,R(e),Z(e.$$)}}catch(e){throw F.length=0,X=0,e}for(R(null),F.length=0,X=0;q.length;)q.pop()();for(let e=0;e<I.length;e+=1){const t=I[e];Q.has(t)||(Q.add(t),t())}I.length=0}while(F.length);for(;J.length;)J.pop()();D=!1,Q.clear(),R(e)}function Z(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(G)}}function ee(){return V||(V=Promise.resolve(),V.then((()=>{V=null}))),V}function te(e,t,n){e.dispatchEvent(z(`${t?"intro":"outro"}${n}`))}const ne=new Set;let oe;function se(){oe={r:0,c:[],p:oe}}function re(){oe.r||s(oe.c),oe=oe.p}function le(e,t){e&&e.i&&(ne.delete(e),e.i(t))}function ie(e,t,n,o){if(e&&e.o){if(ne.has(e))return;ne.add(e),oe.c.push((()=>{ne.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}else o&&o()}const ce={duration:0};function ae(n,o,s){const l={direction:"in"};let i,c,a=o(n,s,l),u=!1,f=0;function p(){i&&H(n,i)}function m(){const{delay:o=0,duration:s=300,easing:r=t,tick:l=e,css:m}=a||ce;m&&(i=A(n,0,1,s,o,r,m,f++)),l(0,1);const g=d()+o,v=g+s;c&&c.abort(),u=!0,G((()=>te(n,!0,"start"))),c=h((e=>{if(u){if(e>=v)return l(1,0),te(n,!0,"end"),p(),u=!1;if(e>=g){const t=r((e-g)/s);l(t,1-t)}}return u}))}let g=!1;return{start(){g||(g=!0,H(n),r(a)?(a=a(l),ee().then(m)):m())},invalidate(){g=!1},end(){u&&(p(),u=!1)}}}function ue(n,o,l,i){const c={direction:"both"};let a=o(n,l,c),u=i?0:1,f=null,p=null,m=null;function g(){m&&H(n,m)}function v(e,t){const n=e.b-u;return t*=Math.abs(n),{a:u,b:e.b,d:n,duration:t,start:e.start,end:e.start+t,group:e.group}}function $(o){const{delay:r=0,duration:l=300,easing:i=t,tick:c=e,css:$}=a||ce,x={start:d()+r,b:o};o||(x.group=oe,oe.r+=1),f||p?p=x:($&&(g(),m=A(n,u,o,l,r,i,$)),o&&c(0,1),f=v(x,l),G((()=>te(n,o,"start"))),h((e=>{if(p&&e>p.start&&(f=v(p,l),p=null,te(n,f.b,"start"),$&&(g(),m=A(n,u,f.b,f.duration,0,i,a.css))),f)if(e>=f.end)c(u=f.b,1-u),te(n,f.b,"end"),p||(f.b?g():--f.group.r||s(f.group.c)),f=null;else if(e>=f.start){const t=e-f.start;u=f.a+f.d*i(t/f.duration),c(u,1-u)}return!(!f&&!p)})))}return{run(e){r(a)?ee().then((()=>{a=a(c),$(e)})):$(e)},end(){g(),f=p=null}}}function de(e,t){e.d(1),t.delete(e.key)}function fe(e,t){ie(e,1,1,(()=>{t.delete(e.key)}))}function pe(e,t,n,o,r,l,i,c,a,u,d,f){let p=e.length,m=l.length,h=p;const g={};for(;h--;)g[e[h].key]=h;const v=[],$=new Map,x=new Map,w=[];for(h=m;h--;){const e=f(r,l,h),s=n(e);let c=i.get(s);c?o&&w.push((()=>c.p(e,t))):(c=u(s,e),c.c()),$.set(s,v[h]=c),s in g&&x.set(s,Math.abs(h-g[s]))}const y=new Set,b=new Set;function k(e){le(e,1),e.m(c,d),i.set(e.key,e),d=e.first,m--}for(;p&&m;){const t=v[m-1],n=e[p-1],o=t.key,s=n.key;t===n?(d=t.first,p--,m--):$.has(s)?!i.has(o)||y.has(o)?k(t):b.has(s)?p--:x.get(o)>x.get(s)?(b.add(o),k(t)):(y.add(s),p--):(a(n,i),p--)}for(;p--;){const t=e[p];$.has(t.key)||a(t,i)}for(;m;)k(v[m-1]);return s(w),v}function me(e,t,n){const o=e.$$.props[t];void 0!==o&&(e.$$.bound[o]=n,n(e.$$.ctx[o]))}function he(e){e&&e.c()}function ge(e,t,o,l){const{fragment:i,after_update:c}=e.$$;i&&i.m(t,o),l||G((()=>{const t=e.$$.on_mount.map(n).filter(r);e.$$.on_destroy?e.$$.on_destroy.push(...t):s(t),e.$$.on_mount=[]})),c.forEach(G)}function ve(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];I.forEach((o=>-1===e.indexOf(o)?t.push(o):n.push(o))),n.forEach((e=>e())),I=t}(n.after_update),s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function $e(e,t){-1===e.$$.dirty[0]&&(F.push(e),D||(D=!0,B.then(Y)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function xe(t,n,r,l,i,c,a,u=[-1]){const d=P;R(t);const f=t.$$={fragment:null,ctx:[],props:c,update:e,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||d.$$.root};a&&a(f.root);let p=!1;if(f.ctx=r?r(t,n.props||{},((e,n,...o)=>{const s=o.length?o[0]:n;return f.ctx&&i(f.ctx[e],f.ctx[e]=s)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](s),p&&$e(t,e)),n})):[],f.update(),p=!0,s(f.before_update),f.fragment=!!l&&l(f.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);f.fragment&&f.fragment.l(e),e.forEach(y)}else f.fragment&&f.fragment.c();n.intro&&le(t.$$.fragment),ge(t,n.target,n.anchor,n.customElement),Y()}R(d)}class we{$destroy(){ve(this,1),this.$destroy=e}$on(t,n){if(!r(n))return e;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const e=o.indexOf(n);-1!==e&&o.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function ye(e){const t=e-1;return t*t*t+1}function be(e,{delay:n=0,duration:o=400,easing:s=t}={}){const r=+getComputedStyle(e).opacity;return{delay:n,duration:o,easing:s,css:e=>"opacity: "+e*r}}function ke(e,{delay:t=0,duration:n=400,easing:o=ye,x:s=0,y:r=0,opacity:l=0}={}){const i=getComputedStyle(e),c=+i.opacity,u="none"===i.transform?"":i.transform,d=c*(1-l),[f,p]=a(s),[m,h]=a(r);return{delay:t,duration:n,easing:o,css:(e,t)=>`\n\t\t\ttransform: ${u} translate(${(1-e)*f}${p}, ${(1-e)*m}${h});\n\t\t\topacity: ${c-d*t}`}}function Me(e,{delay:t=0,duration:n=400,easing:o=ye,start:s=0,opacity:r=0}={}){const l=getComputedStyle(e),i=+l.opacity,c="none"===l.transform?"":l.transform,a=1-s,u=i*(1-r);return{delay:t,duration:n,easing:o,css:(e,t)=>`\n\t\t\ttransform: ${c} scale(${1-a*t});\n\t\t\topacity: ${i-u*t}\n\t\t`}}function _e(e){let t,n,o,r,l,c,a,u;const d=e[3].default,f=function(e,t,n,o){if(e){const s=i(e,t,n,o);return e[0](s)}}(d,e,e[2],null);return{c(){t=b("dialog"),n=b("div"),o=b("button"),o.innerHTML='<i class="bi bi-x"></i>',r=_(),f&&f.c(),o.autofocus=!0,E(o,"class","svelte-15q6hff"),E(n,"class","svelte-15q6hff"),E(t,"class","svelte-15q6hff")},m(s,l){var i;w(s,t,l),v(t,n),v(n,o),v(n,r),f&&f.m(n,null),e[6](t),c=!0,o.focus(),a||(u=[S(o,"click",e[5]),S(n,"click",(i=e[4],function(e){return e.stopPropagation(),i.call(this,e)})),S(t,"close",e[7]),S(t,"click",C(e[8]))],a=!0)},p(e,[t]){f&&f.p&&(!c||4&t)&&function(e,t,n,o,s,r){if(s){const l=i(t,n,o,r);e.p(l,s)}}(f,d,e,e[2],c?function(e,t,n,o){if(e[2]&&o){const s=e[2](o(n));if(void 0===t.dirty)return s;if("object"==typeof s){const e=[],n=Math.max(t.dirty.length,s.length);for(let o=0;o<n;o+=1)e[o]=t.dirty[o]|s[o];return e}return t.dirty|s}return t.dirty}(d,e[2],t,null):function(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}(e[2]),null)},i(e){c||(le(f,e),G((()=>{c&&(l||(l=ue(n,be,{},!0)),l.run(1))})),c=!0)},o(e){ie(f,e),l||(l=ue(n,be,{},!1)),l.run(0),c=!1},d(n){n&&y(t),f&&f.d(n),n&&l&&l.end(),e[6](null),a=!1,s(u)}}}function Se(e,t,n){let o,{$$slots:s={},$$scope:r}=t,{showModal:l}=t;const i=function(){const e=U();return(t,n,{cancelable:o=!1}={})=>{const s=e.$$.callbacks[t];if(s){const r=z(t,n,{cancelable:o});return s.slice().forEach((t=>{t.call(e,r)})),!r.defaultPrevented}return!0}}();return e.$$set=e=>{"showModal"in e&&n(0,l=e.showModal),"$$scope"in e&&n(2,r=e.$$scope)},e.$$.update=()=>{1&e.$$.dirty&&(l||i("closeModal")),3&e.$$.dirty&&o&&l&&o.showModal()},[l,o,r,s,function(t){j.call(this,e,t)},()=>{o.close()},function(e){q[e?"unshift":"push"]((()=>{o=e,n(1,o)}))},()=>n(0,l=!1),()=>o.close()]}class Ce extends we{constructor(e){super(),xe(this,e,Se,_e,l,{showModal:0})}}let Ee={.1:"🥚Egg",.25:"🐸Frog",.4:"🐼Panda",.6:"😸Cat",.8:"🦧Orangutang",1:"🧑🏿‍🌾Human"};function We(e,t){return 4==e.length?1:t.pangrams.includes(e)?e.length+7:e.length}function Ne(e,t){if(e===t.maxScore)return["🤖Robot",0];for(let n of Object.keys(Ee).sort()){let o=Ee[n];if(e<Math.floor(parseFloat(n)*t.maxScore))return[o,Math.floor(parseFloat(n)*t.maxScore)-e]}return[Ee[1]||Ee[1],0]}function Oe(e){let t,n,o,s;return{c(){t=b("span"),n=M("("),o=M(e[3]),s=M(" to next)"),N(t,"font-size","0.75em"),N(t,"color","grey")},m(e,r){w(e,t,r),v(t,n),v(t,o),v(t,s)},p(e,t){8&t&&W(o,e[3])},d(e){e&&y(t)}}}function ze(t){let n;return{c(){n=b("span"),n.textContent="🎉",E(n,"class","green svelte-13ygdni")},m(e,t){w(e,n,t)},p:e,d(e){e&&y(n)}}}function Le(t){let n,o,s,r,l,i,c,a,u,d,f,p,m,h,g,$,x,k,S,C,N,O,z,L,P,T,A,H,R,U,j=t[1].maxScore+"",F=(t[0].length||0)+"",q=t[1].validWords.length+"",I=t[5].length+"",J=t[1].pangrams.length+"";function B(e,t){return e[2]==e[1].maxScore?ze:Oe}let D=B(t),G=D(t);return{c(){n=b("div"),o=b("div"),s=M(t[4]),r=_(),G.c(),l=_(),i=b("div"),c=b("div"),a=b("span"),u=M(t[2]),d=M("/"),f=M(j),p=M(" points"),m=_(),h=b("div"),g=_(),$=b("div"),x=b("span"),k=M(F),S=M("/"),C=M(q),N=M(" words"),O=_(),z=b("div"),L=_(),P=b("div"),T=b("span"),A=M(I),H=M("/"),R=M(J),U=M(" pangrams"),E(o,"class","top svelte-13ygdni"),E(a,"class","green svelte-13ygdni"),E(h,"class","bar svelte-13ygdni"),E(x,"class","green svelte-13ygdni"),E(z,"class","bar svelte-13ygdni"),E(T,"class","green svelte-13ygdni"),E(i,"class","bottom svelte-13ygdni"),E(n,"class","container svelte-13ygdni")},m(e,t){w(e,n,t),v(n,o),v(o,s),v(o,r),G.m(o,null),v(n,l),v(n,i),v(i,c),v(c,a),v(a,u),v(c,d),v(c,f),v(c,p),v(i,m),v(i,h),v(i,g),v(i,$),v($,x),v(x,k),v($,S),v($,C),v($,N),v(i,O),v(i,z),v(i,L),v(i,P),v(P,T),v(T,A),v(P,H),v(P,R),v(P,U)},p(e,[t]){16&t&&W(s,e[4]),D===(D=B(e))&&G?G.p(e,t):(G.d(1),G=D(e),G&&(G.c(),G.m(o,null))),4&t&&W(u,e[2]),2&t&&j!==(j=e[1].maxScore+"")&&W(f,j),1&t&&F!==(F=(e[0].length||0)+"")&&W(k,F),2&t&&q!==(q=e[1].validWords.length+"")&&W(C,q),32&t&&I!==(I=e[5].length+"")&&W(A,I),2&t&&J!==(J=e[1].pangrams.length+"")&&W(R,J)},i:e,o:e,d(e){e&&y(n),G.d()}}}function Pe(e,t,n){let o,s,r,{foundWords:l=[]}=t,{game:i}=t,{score:c}=t;return e.$$set=e=>{"foundWords"in e&&n(0,l=e.foundWords),"game"in e&&n(1,i=e.game),"score"in e&&n(2,c=e.score)},e.$$.update=()=>{3&e.$$.dirty&&n(5,o=l.filter((e=>i.pangrams.includes(e)))),6&e.$$.dirty&&n(4,[s,r]=Ne(c,i),s,(n(3,r),n(2,c),n(1,i)))},[l,i,c,r,s,o]}class Te extends we{constructor(e){super(),xe(this,e,Pe,Le,l,{foundWords:0,game:1,score:2})}}const{document:Ae}=g;function He(e,t,n){const o=e.slice();return o[26]=t[n],o[28]=n,o}function Re(e,t,n){const o=e.slice();return o[26]=t[n],o[28]=n,o}function Ue(e,t,n){const o=e.slice();return o[30]=t[n],o[28]=n,o}function je(e){const t=e[0].validWords.filter((t=>!e[3].includes(t))).sort();e[32]=t;const n=["🧑🏿‍🌾Human","🤖Robot"].includes(Ne(e[8],e[0])[0]);e[33]=n}function Fe(e,t,n){const o=e.slice();return o[30]=t[n],o}function qe(e,t,n){const o=e.slice();return o[36]=t[n],o[38]=n,o}function Ie(e){const t=e[3].reduce(((t,n)=>t+We(n,e[0])),0);e[8]=t}function Je(e,t,n){const o=e.slice();return o[30]=t[n],o}function Be(e,t,n){const o=e.slice();return o[30]=t[n],o}function De(e){let t,n,o,r,l,i,c,a,u,d,f,p,m,h,g,$,x,C,N,O,z,L,P,T,A,H,R,U,j,F,I,J,B,D,Q,V,X,Y=[],Z=new Map,ee=e[0].center.toUpperCase()+"",te=[],ne=new Map;function oe(t){e[15](t)}let ce={$$slots:{default:[Ke]},$$scope:{ctx:e}};void 0!==e[4]&&(ce.showModal=e[4]),t=new Ce({props:ce}),q.push((()=>me(t,"showModal",oe)));let ae=e[5]&&Qe(e),$e=e[6]&&Ye(e);c=new Te({props:{foundWords:e[3],game:e[0],score:e[8]}});let xe=e[3];const we=e=>e[30];for(let t=0;t<xe.length;t+=1){let n=Ue(e,xe,t),o=we(n);Z.set(o,Y[t]=ot(o,n))}let ye=e[3].length>0&&st(e);function be(e,t){return e[7].message?lt:rt}let ke=be(e),_e=ke(e),Se=e[0].outer;const Ee=e=>e[26];for(let t=0;t<Se.length;t+=1){let n=He(e,Se,t),o=Ee(n);ne.set(o,te[t]=dt(o,n))}return{c(){he(t.$$.fragment),o=_(),ae&&ae.c(),r=_(),$e&&$e.c(),l=_(),i=b("div"),he(c.$$.fragment),a=_(),u=b("button"),d=b("i"),p=M(" Hints"),m=_(),h=b("div"),g=b("div"),$=b("div");for(let e=0;e<Y.length;e+=1)Y[e].c();x=_(),ye&&ye.c(),C=_(),N=b("div"),_e.c(),O=_(),z=b("div"),L=k("svg"),P=k("path"),T=k("text"),A=M(ee),R=_();for(let e=0;e<te.length;e+=1)te[e].c();U=_(),j=b("div"),F=b("button"),F.textContent="Delete",I=_(),J=b("button"),J.innerHTML='<i class="bi bi-arrow-repeat"></i>',B=_(),D=b("button"),D.textContent="Enter",E(d,"class",f="bi "+(e[14]()?"bi-lightbulb-fill":"bi-lock-fill")+" svelte-1eem9xn"),E(u,"class","hints-btn svelte-1eem9xn"),E(i,"class","top-bar svelte-1eem9xn"),E($,"class","found-preview-words svelte-1eem9xn"),E(g,"class","found-preview svelte-1eem9xn"),E(N,"class","hive-input svelte-1eem9xn"),E(P,"d","M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"),E(T,"x","50%"),E(T,"y","50%"),E(T,"dominant-baseline","central"),E(T,"font-size","80"),E(T,"class","svelte-1eem9xn"),E(L,"class","hex hex-center svelte-1eem9xn"),E(L,"fill","currentColor"),E(L,"height","100px"),E(L,"width","100px"),E(L,"version","1.1"),E(L,"id","Capa_1"),E(L,"xmlns","http://www.w3.org/2000/svg"),E(L,"xmlns:xlink","http://www.w3.org/1999/xlink"),E(L,"viewBox","0 0 184.75 184.75"),E(L,"xml:space","preserve"),E(L,"stroke","#e6e6e6"),E(L,"stroke-width","0.0018475100000000001"),E(L,"transform","rotate(0)"),E(z,"class","hive-inner svelte-1eem9xn"),E(F,"class","hive-button svelte-1eem9xn"),E(J,"class","hive-button shuffle-btn svelte-1eem9xn"),E(D,"class","hive-button svelte-1eem9xn"),E(j,"class","hive-buttons svelte-1eem9xn"),E(h,"class","hive-outer svelte-1eem9xn")},m(n,s){ge(t,n,s),w(n,o,s),ae&&ae.m(n,s),w(n,r,s),$e&&$e.m(n,s),w(n,l,s),w(n,i,s),ge(c,i,null),v(i,a),v(i,u),v(u,d),v(u,p),w(n,m,s),w(n,h,s),v(h,g),v(g,$);for(let e=0;e<Y.length;e+=1)Y[e]&&Y[e].m($,null);v(g,x),ye&&ye.m(g,null),v(h,C),v(h,N),_e.m(N,null),v(h,O),v(h,z),v(z,L),v(L,P),v(L,T),v(T,A),v(z,R);for(let e=0;e<te.length;e+=1)te[e]&&te[e].m(z,null);v(h,U),v(h,j),v(j,F),v(j,I),v(j,J),v(j,B),v(j,D),Q=!0,V||(X=[S(u,"pointerdown",e[19]),S(P,"pointerdown",e[21]),S(T,"pointerdown",e[22]),S(F,"pointerdown",e[11]),S(J,"pointerdown",e[12]),S(D,"pointerdown",e[13])],V=!0)},p(e,o){const s={};9&o[0]|4096&o[1]&&(s.$$scope={dirty:o,ctx:e}),!n&&16&o[0]&&(n=!0,s.showModal=e[4],K((()=>n=!1))),t.$set(s),e[5]?ae?(ae.p(e,o),32&o[0]&&le(ae,1)):(ae=Qe(e),ae.c(),le(ae,1),ae.m(r.parentNode,r)):ae&&(se(),ie(ae,1,1,(()=>{ae=null})),re()),e[6]?$e?($e.p(e,o),64&o[0]&&le($e,1)):($e=Ye(e),$e.c(),le($e,1),$e.m(l.parentNode,l)):$e&&(se(),ie($e,1,1,(()=>{$e=null})),re());const i={};8&o[0]&&(i.foundWords=e[3]),1&o[0]&&(i.game=e[0]),256&o[0]&&(i.score=e[8]),c.$set(i),8&o[0]&&(xe=e[3],Y=pe(Y,o,we,1,e,xe,Z,$,de,ot,null,Ue)),e[3].length>0?ye?(ye.p(e,o),8&o[0]&&le(ye,1)):(ye=st(e),ye.c(),le(ye,1),ye.m(g,null)):ye&&(se(),ie(ye,1,1,(()=>{ye=null})),re()),ke===(ke=be(e))&&_e?_e.p(e,o):(_e.d(1),_e=ke(e),_e&&(_e.c(),le(_e,1),_e.m(N,null))),(!Q||1&o[0])&&ee!==(ee=e[0].center.toUpperCase()+"")&&W(A,ee),1025&o[0]&&(Se=e[0].outer,se(),te=pe(te,o,Ee,1,e,Se,ne,z,fe,dt,null,He),re())},i(e){if(!Q){le(t.$$.fragment,e),le(ae),le($e),le(c.$$.fragment,e);for(let e=0;e<xe.length;e+=1)le(Y[e]);le(ye),le(_e),G((()=>{Q&&(H||(H=ue(L,Me,{duration:500},!0)),H.run(1))}));for(let e=0;e<Se.length;e+=1)le(te[e]);Q=!0}},o(e){ie(t.$$.fragment,e),ie(ae),ie($e),ie(c.$$.fragment,e),ie(ye),H||(H=ue(L,Me,{duration:500},!1)),H.run(0);for(let e=0;e<te.length;e+=1)ie(te[e]);Q=!1},d(e){ve(t,e),e&&y(o),ae&&ae.d(e),e&&y(r),$e&&$e.d(e),e&&y(l),e&&y(i),ve(c),e&&y(m),e&&y(h);for(let e=0;e<Y.length;e+=1)Y[e].d();ye&&ye.d(),_e.d(),e&&H&&H.end();for(let e=0;e<te.length;e+=1)te[e].d();V=!1,s(X)}}}function Ge(e,t){let n,o,s,r,l,i=t[30]+"";return{key:e,first:null,c(){n=b("span"),o=b("a"),s=M(i),l=_(),E(o,"target","_blank"),E(o,"href",r="https://svenska.se/tre/?sok="+t[30]+"&pz=1"),E(o,"class","svelte-1eem9xn"),E(n,"class","found-word-item svelte-1eem9xn"),O(n,"pangram",t[0].pangrams.includes(t[30])),this.first=n},m(e,t){w(e,n,t),v(n,o),v(o,s),v(n,l)},p(e,l){t=e,8&l[0]&&i!==(i=t[30]+"")&&W(s,i),8&l[0]&&r!==(r="https://svenska.se/tre/?sok="+t[30]+"&pz=1")&&E(o,"href",r),9&l[0]&&O(n,"pangram",t[0].pangrams.includes(t[30]))},d(e){e&&y(n)}}}function Ke(e){let t,n,o,s,r,l,i=e[3].length+"",c=[],a=new Map,u=e[3].sort();const d=e=>e[30];for(let t=0;t<u.length;t+=1){let n=Be(e,u,t),o=d(n);a.set(o,c[t]=Ge(o,n))}return{c(){t=b("div"),n=b("h1"),o=M(i),s=M(" words found"),r=_(),l=b("div");for(let e=0;e<c.length;e+=1)c[e].c();E(n,"class","svelte-1eem9xn"),E(l,"class","found-words-list svelte-1eem9xn"),E(t,"class","found-words-container svelte-1eem9xn")},m(e,i){w(e,t,i),v(t,n),v(n,o),v(n,s),v(t,r),v(t,l);for(let e=0;e<c.length;e+=1)c[e]&&c[e].m(l,null)},p(e,t){8&t[0]&&i!==(i=e[3].length+"")&&W(o,i),9&t[0]&&(u=e[3].sort(),c=pe(c,t,d,1,e,u,a,l,de,Ge,null,Be))},d(e){e&&y(t);for(let e=0;e<c.length;e+=1)c[e].d()}}}function Qe(e){let t,n,o;function s(t){e[16](t)}let r={$$slots:{default:[Xe]},$$scope:{ctx:e}};return void 0!==e[5]&&(r.showModal=e[5]),t=new Ce({props:r}),q.push((()=>me(t,"showModal",s))),t.$on("closeModal",e[17]),{c(){he(t.$$.fragment)},m(e,n){ge(t,e,n),o=!0},p(e,o){const s={};9&o[0]|4096&o[1]&&(s.$$scope={dirty:o,ctx:e}),!n&&32&o[0]&&(n=!0,s.showModal=e[5],K((()=>n=!1))),t.$set(s)},i(e){o||(le(t.$$.fragment,e),o=!0)},o(e){ie(t.$$.fragment,e),o=!1},d(e){ve(t,e)}}}function Ve(e,t){let n,o,s,r,l,i,c,a=t[30]+"";return{key:e,first:null,c(){n=b("span"),o=b("i"),s=_(),r=b("a"),l=M(a),c=_(),E(o,"class","bi bi-check green svelte-1eem9xn"),O(o,"invisible",!t[3].includes(t[30])),E(r,"target","_blank"),E(r,"href",i="https://svenska.se/tre/?sok="+t[30]+"&pz=1"),E(r,"class","svelte-1eem9xn"),E(n,"class","found-word-item svelte-1eem9xn"),O(n,"pangram",t[0].pangrams.includes(t[30])),this.first=n},m(e,t){w(e,n,t),v(n,o),v(n,s),v(n,r),v(r,l),v(n,c)},p(e,s){t=e,9&s[0]&&O(o,"invisible",!t[3].includes(t[30])),1&s[0]&&a!==(a=t[30]+"")&&W(l,a),1&s[0]&&i!==(i="https://svenska.se/tre/?sok="+t[30]+"&pz=1")&&E(r,"href",i),1&s[0]&&O(n,"pangram",t[0].pangrams.includes(t[30]))},d(e){e&&y(n)}}}function Xe(e){let t,n,o,s,r,l;Ie(e);let i,c,a,u,d,f,p,m,h,g,$,x,k=e[3].length+"",S=e[0].validWords.length+"",C=Math.round((e[3].length||0)/e[0].validWords.length*100)+"",N=Ne(e[8],e[0])[0]+"",O=[],z=new Map,L=e[0].validWords.sort();const P=e=>e[30];for(let t=0;t<L.length;t+=1){let n=Je(e,L,t),o=P(n);z.set(o,O[t]=Ve(o,n))}return{c(){t=b("div"),n=b("div"),o=b("h1"),o.textContent="Time's up!",s=_(),r=b("h2"),l=b("span"),i=M(k),c=M("/"),a=M(S),u=M(" words found\n\t\t\t\t\t("),d=M(C),f=M("%)"),p=_(),m=b("h2"),h=M("Final rank: "),g=M(N),$=_(),x=b("div");for(let e=0;e<O.length;e+=1)O[e].c();E(o,"class","svelte-1eem9xn"),E(l,"class","green svelte-1eem9xn"),E(r,"class","svelte-1eem9xn"),E(m,"class","svelte-1eem9xn"),E(n,"class","endgame-msg svelte-1eem9xn"),E(x,"class","found-words-list svelte-1eem9xn"),E(t,"class","found-words-container svelte-1eem9xn")},m(e,y){w(e,t,y),v(t,n),v(n,o),v(n,s),v(n,r),v(r,l),v(l,i),v(r,c),v(r,a),v(r,u),v(r,d),v(r,f),v(n,p),v(n,m),v(m,h),v(m,g),v(t,$),v(t,x);for(let e=0;e<O.length;e+=1)O[e]&&O[e].m(x,null)},p(e,t){Ie(e),8&t[0]&&k!==(k=e[3].length+"")&&W(i,k),1&t[0]&&S!==(S=e[0].validWords.length+"")&&W(a,S),9&t[0]&&C!==(C=Math.round((e[3].length||0)/e[0].validWords.length*100)+"")&&W(d,C),9&t[0]&&N!==(N=Ne(e[8],e[0])[0]+"")&&W(g,N),9&t[0]&&(L=e[0].validWords.sort(),O=pe(O,t,P,1,e,L,z,x,de,Ve,null,Je))},d(e){e&&y(t);for(let e=0;e<O.length;e+=1)O[e].d()}}}function Ye(e){let t,n,o;function s(t){e[18](t)}let r={$$slots:{default:[nt]},$$scope:{ctx:e}};return void 0!==e[6]&&(r.showModal=e[6]),t=new Ce({props:r}),q.push((()=>me(t,"showModal",s))),{c(){he(t.$$.fragment)},m(e,n){ge(t,e,n),o=!0},p(e,o){const s={};265&o[0]|4096&o[1]&&(s.$$scope={dirty:o,ctx:e}),!n&&64&o[0]&&(n=!0,s.showModal=e[6],K((()=>n=!1))),t.$set(s)},i(e){o||(le(t.$$.fragment,e),o=!0)},o(e){ie(t.$$.fragment,e),o=!1},d(e){ve(t,e)}}}function Ze(e){let t,n=e[36].toUpperCase()+"";return{c(){t=M(n)},m(e,n){w(e,t,n)},p(e,o){9&o[0]&&n!==(n=e[36].toUpperCase()+"")&&W(t,n)},d(e){e&&y(t)}}}function et(e,t){let n,o=(0===t[38]||1===t[38]&&t[33])&&Ze(t);return{key:e,first:null,c(){n=b("div"),o&&o.c(),E(n,"class","word-hint-letter svelte-1eem9xn"),this.first=n},m(e,t){w(e,n,t),o&&o.m(n,null)},p(e,s){0===(t=e)[38]||1===t[38]&&t[33]?o?o.p(t,s):(o=Ze(t),o.c(),o.m(n,null)):o&&(o.d(1),o=null)},d(e){e&&y(n),o&&o.d()}}}function tt(e,t){let n,o,s=[],r=new Map,l=t[30];const i=e=>e[38];for(let e=0;e<l.length;e+=1){let n=qe(t,l,e),o=i(n);r.set(o,s[e]=et(o,n))}return{key:e,first:null,c(){n=b("div");for(let e=0;e<s.length;e+=1)s[e].c();o=_(),E(n,"class","word-hint svelte-1eem9xn"),this.first=n},m(e,t){w(e,n,t);for(let e=0;e<s.length;e+=1)s[e]&&s[e].m(n,null);v(n,o)},p(e,c){t=e,265&c[0]&&(l=t[30],s=pe(s,c,i,1,t,l,r,n,de,et,o,qe))},d(e){e&&y(n);for(let e=0;e<s.length;e+=1)s[e].d()}}}function nt(e){let t;je(e);let n,o,s,r,l=e[32].length+"",i=[],c=new Map,a=e[32];const u=e=>e[30];for(let t=0;t<a.length;t+=1){let n=Fe(e,a,t),o=u(n);c.set(o,i[t]=tt(o,n))}return{c(){t=b("h1"),n=M(l),o=M(" remaining words:"),s=_(),r=b("div");for(let e=0;e<i.length;e+=1)i[e].c();E(t,"class","svelte-1eem9xn"),E(r,"class","hints-container svelte-1eem9xn")},m(e,l){w(e,t,l),v(t,n),v(t,o),w(e,s,l),w(e,r,l);for(let e=0;e<i.length;e+=1)i[e]&&i[e].m(r,null)},p(e,t){je(e),9&t[0]&&l!==(l=e[32].length+"")&&W(n,l),265&t[0]&&(a=e[32],i=pe(i,t,u,1,e,a,c,r,de,tt,null,Fe))},d(e){e&&y(t),e&&y(s),e&&y(r);for(let e=0;e<i.length;e+=1)i[e].d()}}}function ot(t,n){let o,s,r,l,i=n[30]+"";return{key:t,first:null,c(){o=b("span"),s=M(i),r=_(),E(o,"class","found-word svelte-1eem9xn"),this.first=o},m(e,t){w(e,o,t),v(o,s),v(o,r)},p(e,t){n=e,8&t[0]&&i!==(i=n[30]+"")&&W(s,i)},i(e){l||G((()=>{l=ae(o,ke,{x:-100,duration:500}),l.start()}))},o:e,d(e){e&&y(o)}}}function st(t){let n,o,s,r,l;return{c(){n=b("button"),n.textContent="Show all",E(n,"class","show-all-found-btn svelte-1eem9xn")},m(e,o){w(e,n,o),s=!0,r||(l=S(n,"pointerdown",t[20]),r=!0)},p:e,i(e){s||(G((()=>{s&&(o||(o=ue(n,be,{},!0)),o.run(1))})),s=!0)},o(e){o||(o=ue(n,be,{},!1)),o.run(0),s=!1},d(e){e&&y(n),e&&o&&o.end(),r=!1,l()}}}function rt(t){let n,o=[],s=new Map,r=t[2];const l=e=>e[28];for(let e=0;e<r.length;e+=1){let n=Re(t,r,e),i=l(n);s.set(i,o[e]=it(i,n))}return{c(){n=b("div");for(let e=0;e<o.length;e+=1)o[e].c();E(n,"class","hive-input-text svelte-1eem9xn")},m(e,t){w(e,n,t);for(let e=0;e<o.length;e+=1)o[e]&&o[e].m(n,null)},p(e,t){5&t[0]&&(r=e[2],o=pe(o,t,l,1,e,r,s,n,de,it,null,Re))},i:e,o:e,d(e){e&&y(n);for(let e=0;e<o.length;e+=1)o[e].d()}}}function lt(t){let n,o,s,r,l,i=t[7].message+"";function c(e,t){return e[7].positive?at:ct}let a=c(t),u=a(t);return{c(){n=b("div"),u.c(),o=_(),s=M(i),E(n,"class",r="feedback feedback-"+(t[7].positive?"positive":"negative")+" svelte-1eem9xn")},m(e,t){w(e,n,t),u.m(n,null),v(n,o),v(n,s)},p(e,t){a!==(a=c(e))&&(u.d(1),u=a(e),u&&(u.c(),u.m(n,o))),128&t[0]&&i!==(i=e[7].message+"")&&W(s,i),128&t[0]&&r!==(r="feedback feedback-"+(e[7].positive?"positive":"negative")+" svelte-1eem9xn")&&E(n,"class",r)},i(e){l||G((()=>{l=ae(n,be,{duration:500}),l.start()}))},o:e,d(e){e&&y(n),u.d()}}}function it(e,t){let n,o,s,r=t[26].toUpperCase()+"";return{key:e,first:null,c(){n=b("span"),o=M(r),E(n,"class",s=c(t[26]==t[0].center?"input-center-letter":"")+" svelte-1eem9xn"),this.first=n},m(e,t){w(e,n,t),v(n,o)},p(e,l){t=e,4&l[0]&&r!==(r=t[26].toUpperCase()+"")&&W(o,r),5&l[0]&&s!==(s=c(t[26]==t[0].center?"input-center-letter":"")+" svelte-1eem9xn")&&E(n,"class",s)},d(e){e&&y(n)}}}function ct(e){let t;return{c(){t=b("i"),E(t,"class","bi bi-x"),N(t,"font-size","2rem"),N(t,"color","red")},m(e,n){w(e,t,n)},d(e){e&&y(t)}}}function at(e){let t;return{c(){t=b("i"),E(t,"class","bi bi-check green svelte-1eem9xn"),N(t,"font-size","2rem")},m(e,n){w(e,t,n)},d(e){e&&y(t)}}}function ut(e){let t,n,o,s,r,l,i=e[26].toUpperCase()+"";function c(...t){return e[24](e[26],...t)}return{c(){t=k("text"),n=M(i),E(t,"x","50%"),E(t,"y","50%"),E(t,"dominant-baseline","central"),E(t,"font-size","80"),E(t,"class","svelte-1eem9xn")},m(e,o){w(e,t,o),v(t,n),s=!0,r||(l=S(t,"pointerdown",c),r=!0)},p(t,o){e=t,(!s||1&o[0])&&i!==(i=e[26].toUpperCase()+"")&&W(n,i)},i(e){s||(G((()=>{s&&(o||(o=ue(t,be,{},!0)),o.run(1))})),s=!0)},o(e){o||(o=ue(t,be,{},!1)),o.run(0),s=!1},d(e){e&&y(t),e&&o&&o.end(),r=!1,l()}}}function dt(t,n){let o,s,r,i,c,a,u,d,f=n[0].outer;function p(...e){return n[23](n[26],...e)}let m=ut(n);return{key:t,first:null,c(){o=M(""),s=k("svg"),r=k("path"),m.c(),E(r,"d","M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"),E(s,"class",i="hex hex-outer hex"+(n[28]+1)+" svelte-1eem9xn"),E(s,"fill","currentColor"),E(s,"height","100px"),E(s,"width","100px"),E(s,"version","1.1"),E(s,"id","Capa_1"),E(s,"xmlns","http://www.w3.org/2000/svg"),E(s,"xmlns:xlink","http://www.w3.org/1999/xlink"),E(s,"viewBox","0 0 184.75 184.75"),E(s,"xml:space","preserve"),E(s,"stroke","#e6e6e6"),E(s,"stroke-width","0.0018475100000000001"),E(s,"transform","rotate(0)"),this.first=o},m(e,t){w(e,o,t),w(e,s,t),v(s,r),m.m(s,null),a=!0,u||(d=S(r,"pointerdown",p),u=!0)},p(t,o){n=t,1&o[0]&&l(f,f=n[0].outer)?(se(),ie(m,1,1,e),re(),m=ut(n),m.c(),le(m,1),m.m(s,null)):m.p(n,o),(!a||1&o[0]&&i!==(i="hex hex-outer hex"+(n[28]+1)+" svelte-1eem9xn"))&&E(s,"class",i)},i(e){a||(le(m),G((()=>{a&&(c||(c=ue(s,Me,{duration:500},!0)),c.run(1))})),a=!0)},o(e){ie(m),c||(c=ue(s,Me,{duration:500},!1)),c.run(0),a=!1},d(e){e&&y(o),e&&y(s),m.d(e),e&&c&&c.end(),u=!1,d()}}}function ft(e){let t,n,o,s,r=e[0]&&De(e);return{c(){t=b("meta"),n=_(),o=b("main"),r&&r.c(),E(t,"name","theme-color"),E(t,"content","#008000"),E(o,"class","svelte-1eem9xn")},m(e,l){v(Ae.head,t),w(e,n,l),w(e,o,l),r&&r.m(o,null),s=!0},p(e,t){e[0]?r?(r.p(e,t),1&t[0]&&le(r,1)):(r=De(e),r.c(),le(r,1),r.m(o,null)):r&&(se(),ie(r,1,1,(()=>{r=null})),re())},i(e){s||(le(r),s=!0)},o(e){ie(r),s=!1},d(e){y(t),e&&y(n),e&&y(o),r&&r.d()}}}function pt(e,t,n){let o,s,r="",l=[],i=0,c=!1,a=!1,u=!1;function d(e){console.log("New game started"),n(0,o=e),n(2,r=""),n(3,l=[]),n(8,i=0),localStorage.setItem("game",JSON.stringify(o)),localStorage.setItem("foundWords",JSON.stringify(l))}!async function(){n(0,o=JSON.parse(localStorage.getItem("game"))),n(3,l=JSON.parse(localStorage.getItem("foundWords"))||[]),n(8,i=l.reduce(((e,t)=>e+We(t,o)),0));let e=await fetch("/get_game");n(1,s=await e.json()),console.log(s.letters,s),o?o.date!==s.date&&(console.log("Local game is outdated, showing game over modal"),n(5,a=!0)):(console.log("No local game found, using new game"),d(s))}();const f={message:void 0,positive:void 0,timeout:void 0,pushMessage(e,t){n(2,r=""),f.timeout&&clearTimeout(f.timeout),n(7,f.message=e,f),n(7,f.positive=t,f),n(7,f.timeout=setTimeout((()=>{n(7,f.message=void 0,f),n(7,f.positive=void 0,f)}),1e3),f)}};var p;function m(e){n(7,f.message=void 0,f),n(7,f.timeout=void 0,f),n(2,r+=e)}function h(){n(2,r=r.slice(0,-1))}function g(){if(r)if(r.length<4)f.pushMessage("Too short",!1);else if(r.includes(o.center))if(l.includes(r))f.pushMessage("Already found",!1);else if(o.validWords.includes(r)){n(3,l=[r,...l]);let e=We(r,o);n(8,i+=e),localStorage.setItem("foundWords",JSON.stringify(l)),o.pangrams.includes(r)?f.pushMessage(`Pangram!! (+${e})`,!0):f.pushMessage(`Nice! (+${e})`,!0),n(2,r="")}else f.pushMessage("Not in wordlist",!1);else f.pushMessage("Must include center letter",!1)}function v(){let e=Ne(i,o)[0];return["🦧Orangutang","🧑🏿‍🌾Human","🤖Robot"].includes(e)}p=()=>{console.log("App.svelte mounted")},U().$$.on_mount.push(p),document.addEventListener("keydown",(e=>{"Backspace"==e.key?h():"Enter"==e.key?g():m(e.key)}));return e.$$.update=()=>{1&e.$$.dirty[0]&&o&&n(0,o.outer=o.letters.filter((e=>e!=o.center)),o),1&e.$$.dirty[0]&&o&&n(0,o.maxScore=o.validWords.reduce(((e,t)=>e+We(t,o)),0),o)},[o,s,r,l,c,a,u,f,i,d,m,h,function(){n(0,o.letters=o.letters.sort((()=>Math.random()-.5)),o)},g,v,function(e){c=e,n(4,c)},function(e){a=e,n(5,a)},()=>d(s),function(e){u=e,n(6,u)},()=>{v()?n(6,u=!0):f.pushMessage("Reach 🦧Orangutang to unlock hints",!1)},()=>n(4,c=!0),e=>m(o.center),e=>m(o.center),(e,t)=>m(e),(e,t)=>m(e)]}return new class extends we{constructor(e){super(),xe(this,e,pt,ft,l,{},null,[-1,-1])}}({target:document.body,props:{}})}();
