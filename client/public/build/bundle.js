var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function s(t){t.forEach(n)}function r(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let i;function c(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function u(t){return null==t?"":t}function a(t){const e="string"==typeof t&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}const d="undefined"!=typeof window;let f=d?()=>window.performance.now():()=>Date.now(),p=d?t=>requestAnimationFrame(t):t;const g=new Set;function h(t){g.forEach((e=>{e.c(t)||(g.delete(e),e.f())})),0!==g.size&&p(h)}function m(t){let e;return 0===g.size&&p(h),{promise:new Promise((n=>{g.add(e={c:t,f:n})})),abort(){g.delete(e)}}}const v="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function w(t,e){t.appendChild(e)}function $(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function x(t){const e=k("style");return function(t,e){w(t.head||t,e),e.sheet}($(t),e),e.sheet}function y(t,e,n){t.insertBefore(e,n||null)}function b(t){t.parentNode&&t.parentNode.removeChild(t)}function k(t){return document.createElement(t)}function j(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function M(t){return document.createTextNode(t)}function _(){return M(" ")}function S(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function C(t){return function(e){e.target===this&&t.call(this,e)}}function E(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function W(t,e){e=""+e,t.data!==e&&(t.data=e)}function N(t,e,n,o){null==n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function O(t,e,n){t.classList[n?"add":"remove"](e)}function z(t,e,{bubbles:n=!1,cancelable:o=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,o,e),s}const L=new Map;let F,P=0;function T(t,e,n,o,s,r,l,i=0){const c=16.666/o;let u="{\n";for(let t=0;t<=1;t+=c){const o=e+(n-e)*r(t);u+=100*t+`%{${l(o,1-o)}}\n`}const a=u+`100% {${l(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${i}`,f=$(t),{stylesheet:p,rules:g}=L.get(f)||function(t,e){const n={stylesheet:x(e),rules:{}};return L.set(t,n),n}(f,t);g[d]||(g[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${d} ${o}ms linear ${s}ms 1 both`,P+=1,d}function A(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),s=n.length-o.length;s&&(t.style.animation=o.join(", "),P-=s,P||p((()=>{P||(L.forEach((t=>{const{ownerNode:e}=t.stylesheet;e&&b(e)})),L.clear())})))}function H(t){F=t}function R(){if(!F)throw new Error("Function called outside component initialization");return F}function U(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}const Q=[],q=[];let D=[];const I=[],J=Promise.resolve();let B=!1;function G(t){D.push(t)}function Y(t){I.push(t)}const K=new Set;let V,X=0;function Z(){if(0!==X)return;const t=F;do{try{for(;X<Q.length;){const t=Q[X];X++,H(t),tt(t.$$)}}catch(t){throw Q.length=0,X=0,t}for(H(null),Q.length=0,X=0;q.length;)q.pop()();for(let t=0;t<D.length;t+=1){const e=D[t];K.has(e)||(K.add(e),e())}D.length=0}while(Q.length);for(;I.length;)I.pop()();B=!1,K.clear(),H(t)}function tt(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}function et(){return V||(V=Promise.resolve(),V.then((()=>{V=null}))),V}function nt(t,e,n){t.dispatchEvent(z(`${e?"intro":"outro"}${n}`))}const ot=new Set;let st;function rt(){st={r:0,c:[],p:st}}function lt(){st.r||s(st.c),st=st.p}function it(t,e){t&&t.i&&(ot.delete(t),t.i(e))}function ct(t,e,n,o){if(t&&t.o){if(ot.has(t))return;ot.add(t),st.c.push((()=>{ot.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}const ut={duration:0};function at(n,o,s){const l={direction:"in"};let i,c,u=o(n,s,l),a=!1,d=0;function p(){i&&A(n,i)}function g(){const{delay:o=0,duration:s=300,easing:r=e,tick:l=t,css:g}=u||ut;g&&(i=T(n,0,1,s,o,r,g,d++)),l(0,1);const h=f()+o,v=h+s;c&&c.abort(),a=!0,G((()=>nt(n,!0,"start"))),c=m((t=>{if(a){if(t>=v)return l(1,0),nt(n,!0,"end"),p(),a=!1;if(t>=h){const e=r((t-h)/s);l(e,1-e)}}return a}))}let h=!1;return{start(){h||(h=!0,A(n),r(u)?(u=u(l),et().then(g)):g())},invalidate(){h=!1},end(){a&&(p(),a=!1)}}}function dt(n,o,l,i){const c={direction:"both"};let u=o(n,l,c),a=i?0:1,d=null,p=null,g=null;function h(){g&&A(n,g)}function v(t,e){const n=t.b-a;return e*=Math.abs(n),{a:a,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function w(o){const{delay:r=0,duration:l=300,easing:i=e,tick:c=t,css:w}=u||ut,$={start:f()+r,b:o};o||($.group=st,st.r+=1),d||p?p=$:(w&&(h(),g=T(n,a,o,l,r,i,w)),o&&c(0,1),d=v($,l),G((()=>nt(n,o,"start"))),m((t=>{if(p&&t>p.start&&(d=v(p,l),p=null,nt(n,d.b,"start"),w&&(h(),g=T(n,a,d.b,d.duration,0,i,u.css))),d)if(t>=d.end)c(a=d.b,1-a),nt(n,d.b,"end"),p||(d.b?h():--d.group.r||s(d.group.c)),d=null;else if(t>=d.start){const e=t-d.start;a=d.a+d.d*i(e/d.duration),c(a,1-a)}return!(!d&&!p)})))}return{run(t){r(u)?et().then((()=>{u=u(c),w(t)})):w(t)},end(){h(),d=p=null}}}function ft(t,e){t.d(1),e.delete(t.key)}function pt(t,e){ct(t,1,1,(()=>{e.delete(t.key)}))}function gt(t,e,n,o,r,l,i,c,u,a,d,f){let p=t.length,g=l.length,h=p;const m={};for(;h--;)m[t[h].key]=h;const v=[],w=new Map,$=new Map,x=[];for(h=g;h--;){const t=f(r,l,h),s=n(t);let c=i.get(s);c?o&&x.push((()=>c.p(t,e))):(c=a(s,t),c.c()),w.set(s,v[h]=c),s in m&&$.set(s,Math.abs(h-m[s]))}const y=new Set,b=new Set;function k(t){it(t,1),t.m(c,d),i.set(t.key,t),d=t.first,g--}for(;p&&g;){const e=v[g-1],n=t[p-1],o=e.key,s=n.key;e===n?(d=e.first,p--,g--):w.has(s)?!i.has(o)||y.has(o)?k(e):b.has(s)?p--:$.get(o)>$.get(s)?(b.add(o),k(e)):(y.add(s),p--):(u(n,i),p--)}for(;p--;){const e=t[p];w.has(e.key)||u(e,i)}for(;g;)k(v[g-1]);return s(x),v}function ht(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function mt(t){t&&t.c()}function vt(t,e,o,l){const{fragment:i,after_update:c}=t.$$;i&&i.m(e,o),l||G((()=>{const e=t.$$.on_mount.map(n).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...e):s(e),t.$$.on_mount=[]})),c.forEach(G)}function wt(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];D.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),D=e}(n.after_update),s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function $t(t,e){-1===t.$$.dirty[0]&&(Q.push(t),B||(B=!0,J.then(Z)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function xt(e,n,r,l,i,c,u,a=[-1]){const d=F;H(e);const f=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:a,skip_bound:!1,root:n.target||d.$$.root};u&&u(f.root);let p=!1;if(f.ctx=r?r(e,n.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=s)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](s),p&&$t(e,t)),n})):[],f.update(),p=!0,s(f.before_update),f.fragment=!!l&&l(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(b)}else f.fragment&&f.fragment.c();n.intro&&it(e.$$.fragment),vt(e,n.target,n.anchor,n.customElement),Z()}H(d)}class yt{$destroy(){wt(this,1),this.$destroy=t}$on(e,n){if(!r(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function bt(t){const e=t-1;return e*e*e+1}function kt(t,{delay:n=0,duration:o=400,easing:s=e}={}){const r=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:s,css:t=>"opacity: "+t*r}}function jt(t,{delay:e=0,duration:n=400,easing:o=bt,x:s=0,y:r=0,opacity:l=0}={}){const i=getComputedStyle(t),c=+i.opacity,u="none"===i.transform?"":i.transform,d=c*(1-l),[f,p]=a(s),[g,h]=a(r);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${u} translate(${(1-t)*f}${p}, ${(1-t)*g}${h});\n\t\t\topacity: ${c-d*e}`}}function Mt(t,{delay:e=0,duration:n=400,easing:o=bt,start:s=0,opacity:r=0}={}){const l=getComputedStyle(t),i=+l.opacity,c="none"===l.transform?"":l.transform,u=1-s,a=i*(1-r);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${c} scale(${1-u*e});\n\t\t\topacity: ${i-a*e}\n\t\t`}}function _t(t){let e,n,o,r,l,i,u,a;const d=t[3].default,f=function(t,e,n,o){if(t){const s=c(t,e,n,o);return t[0](s)}}(d,t,t[2],null);return{c(){e=k("dialog"),n=k("div"),o=k("button"),o.innerHTML='<i class="bi bi-x"></i>',r=_(),f&&f.c(),o.autofocus=!0,E(o,"class","svelte-15q6hff"),E(n,"class","svelte-15q6hff"),E(e,"class","svelte-15q6hff")},m(s,l){var c;y(s,e,l),w(e,n),w(n,o),w(n,r),f&&f.m(n,null),t[6](e),i=!0,o.focus(),u||(a=[S(o,"click",t[5]),S(n,"click",(c=t[4],function(t){return t.stopPropagation(),c.call(this,t)})),S(e,"close",t[7]),S(e,"click",C(t[8]))],u=!0)},p(t,[e]){f&&f.p&&(!i||4&e)&&function(t,e,n,o,s,r){if(s){const l=c(e,n,o,r);t.p(l,s)}}(f,d,t,t[2],i?function(t,e,n,o){if(t[2]&&o){const s=t[2](o(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|s[o];return t}return e.dirty|s}return e.dirty}(d,t[2],e,null):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[2]),null)},i(t){i||(it(f,t),G((()=>{i&&(l||(l=dt(n,kt,{},!0)),l.run(1))})),i=!0)},o(t){ct(f,t),l||(l=dt(n,kt,{},!1)),l.run(0),i=!1},d(n){n&&b(e),f&&f.d(n),n&&l&&l.end(),t[6](null),u=!1,s(a)}}}function St(t,e,n){let o,{$$slots:s={},$$scope:r}=e,{showModal:l}=e;const i=function(){const t=R();return(e,n,{cancelable:o=!1}={})=>{const s=t.$$.callbacks[e];if(s){const r=z(e,n,{cancelable:o});return s.slice().forEach((e=>{e.call(t,r)})),!r.defaultPrevented}return!0}}();return t.$$set=t=>{"showModal"in t&&n(0,l=t.showModal),"$$scope"in t&&n(2,r=t.$$scope)},t.$$.update=()=>{1&t.$$.dirty&&(l||i("closeModal")),3&t.$$.dirty&&o&&l&&o.showModal()},[l,o,r,s,function(e){U.call(this,t,e)},()=>{o.close()},function(t){q[t?"unshift":"push"]((()=>{o=t,n(1,o)}))},()=>n(0,l=!1),()=>o.close()]}class Ct extends yt{constructor(t){super(),xt(this,t,St,_t,l,{showModal:0})}}let Et={.1:"🥚Egg",.25:"🐸Frog",.4:"🐼Panda",.6:"😸Cat",.8:"🦧Orangutang",1:"🧑🏿‍🌾Human"};function Wt(t,e){return 4==t.length?1:e.pangrams.includes(t)?t.length+7:t.length}function Nt(t,e){if(t===e.maxScore)return["🤖Robot",0];for(let n of Object.keys(Et).sort()){let o=Et[n];if(t<Math.floor(parseFloat(n)*e.maxScore))return[o,Math.floor(parseFloat(n)*e.maxScore)-t]}return[Et[1]||Et[1],0]}function Ot(t){let e,n,o,s;return{c(){e=k("span"),n=M("("),o=M(t[3]),s=M(" to next)"),N(e,"font-size","0.75em"),N(e,"color","grey")},m(t,r){y(t,e,r),w(e,n),w(e,o),w(e,s)},p(t,e){8&e&&W(o,t[3])},d(t){t&&b(e)}}}function zt(e){let n;return{c(){n=k("span"),n.textContent="🎉",E(n,"class","green svelte-13ygdni")},m(t,e){y(t,n,e)},p:t,d(t){t&&b(n)}}}function Lt(e){let n,o,s,r,l,i,c,u,a,d,f,p,g,h,m,v,$,x,j,S,C,N,O,z,L,F,P,T,A,H,R=e[1].maxScore+"",U=(e[0].length||0)+"",Q=e[1].validWords.length+"",q=e[5].length+"",D=e[1].pangrams.length+"";function I(t,e){return t[2]==t[1].maxScore?zt:Ot}let J=I(e),B=J(e);return{c(){n=k("div"),o=k("div"),s=M(e[4]),r=_(),B.c(),l=_(),i=k("div"),c=k("div"),u=k("span"),a=M(e[2]),d=M("/"),f=M(R),p=M(" points"),g=_(),h=k("div"),m=_(),v=k("div"),$=k("span"),x=M(U),j=M("/"),S=M(Q),C=M(" words"),N=_(),O=k("div"),z=_(),L=k("div"),F=k("span"),P=M(q),T=M("/"),A=M(D),H=M(" pangrams"),E(o,"class","top svelte-13ygdni"),E(u,"class","green svelte-13ygdni"),E(h,"class","bar svelte-13ygdni"),E($,"class","green svelte-13ygdni"),E(O,"class","bar svelte-13ygdni"),E(F,"class","green svelte-13ygdni"),E(i,"class","bottom svelte-13ygdni"),E(n,"class","container svelte-13ygdni")},m(t,e){y(t,n,e),w(n,o),w(o,s),w(o,r),B.m(o,null),w(n,l),w(n,i),w(i,c),w(c,u),w(u,a),w(c,d),w(c,f),w(c,p),w(i,g),w(i,h),w(i,m),w(i,v),w(v,$),w($,x),w(v,j),w(v,S),w(v,C),w(i,N),w(i,O),w(i,z),w(i,L),w(L,F),w(F,P),w(L,T),w(L,A),w(L,H)},p(t,[e]){16&e&&W(s,t[4]),J===(J=I(t))&&B?B.p(t,e):(B.d(1),B=J(t),B&&(B.c(),B.m(o,null))),4&e&&W(a,t[2]),2&e&&R!==(R=t[1].maxScore+"")&&W(f,R),1&e&&U!==(U=(t[0].length||0)+"")&&W(x,U),2&e&&Q!==(Q=t[1].validWords.length+"")&&W(S,Q),32&e&&q!==(q=t[5].length+"")&&W(P,q),2&e&&D!==(D=t[1].pangrams.length+"")&&W(A,D)},i:t,o:t,d(t){t&&b(n),B.d()}}}function Ft(t,e,n){let o,s,r,{foundWords:l=[]}=e,{game:i}=e,{score:c}=e;return t.$$set=t=>{"foundWords"in t&&n(0,l=t.foundWords),"game"in t&&n(1,i=t.game),"score"in t&&n(2,c=t.score)},t.$$.update=()=>{3&t.$$.dirty&&n(5,o=l.filter((t=>i.pangrams.includes(t)))),6&t.$$.dirty&&n(4,[s,r]=Nt(c,i),s,(n(3,r),n(2,c),n(1,i)))},[l,i,c,r,s,o]}class Pt extends yt{constructor(t){super(),xt(this,t,Ft,Lt,l,{foundWords:0,game:1,score:2})}}const{document:Tt}=v;function At(t,e,n){const o=t.slice();return o[26]=e[n],o[28]=n,o}function Ht(t,e,n){const o=t.slice();return o[26]=e[n],o[28]=n,o}function Rt(t,e,n){const o=t.slice();return o[30]=e[n],o[28]=n,o}function Ut(t){const e=t[0].validWords.filter((e=>!t[3].includes(e))).sort();t[32]=e;const n=["🧑🏿‍🌾Human","🤖Robot"].includes(Nt(t[8],t[0])[0]);t[33]=n}function Qt(t,e,n){const o=t.slice();return o[30]=e[n],o}function qt(t,e,n){const o=t.slice();return o[36]=e[n],o[38]=n,o}function Dt(t){const e=t[3].reduce(((e,n)=>e+Wt(n,t[0])),0);t[8]=e}function It(t,e,n){const o=t.slice();return o[30]=e[n],o}function Jt(t,e,n){const o=t.slice();return o[30]=e[n],o}function Bt(t){let e,n,o,r,l,i,c,u,a,d,f,p,g,h,m,v,$,x,C,N,O,z,L,F,P,T,A,H,R,U,Q,D,I,J,B,K,V,X=[],Z=new Map,tt=t[0].center.toUpperCase()+"",et=[],nt=new Map;function ot(e){t[15](e)}let st={$$slots:{default:[Yt]},$$scope:{ctx:t}};void 0!==t[4]&&(st.showModal=t[4]),e=new Ct({props:st}),q.push((()=>ht(e,"showModal",ot)));let ut=t[5]&&Kt(t),at=t[6]&&Zt(t);c=new Pt({props:{foundWords:t[3],game:t[0],score:t[8]}});let $t=t[3];const xt=t=>t[30];for(let e=0;e<$t.length;e+=1){let n=Rt(t,$t,e),o=xt(n);Z.set(o,X[e]=se(o,n))}let yt=t[3].length>0&&re(t);function bt(t,e){return t[7].message?ie:le}let kt=bt(t),jt=kt(t),_t=t[0].outer;const St=t=>t[26];for(let e=0;e<_t.length;e+=1){let n=At(t,_t,e),o=St(n);nt.set(o,et[e]=fe(o,n))}return{c(){mt(e.$$.fragment),o=_(),ut&&ut.c(),r=_(),at&&at.c(),l=_(),i=k("div"),mt(c.$$.fragment),u=_(),a=k("button"),d=k("i"),p=M(" Hints"),g=_(),h=k("div"),m=k("div"),v=k("div");for(let t=0;t<X.length;t+=1)X[t].c();$=_(),yt&&yt.c(),x=_(),C=k("div"),jt.c(),N=_(),O=k("div"),z=j("svg"),L=j("path"),F=j("text"),P=M(tt),A=_();for(let t=0;t<et.length;t+=1)et[t].c();H=_(),R=k("div"),U=k("button"),U.textContent="Delete",Q=_(),D=k("button"),D.innerHTML='<i class="bi bi-arrow-repeat"></i>',I=_(),J=k("button"),J.textContent="Enter",E(d,"class",f="bi "+(t[14]()?"bi-lightbulb-fill":"bi-lock-fill")+" svelte-1jw2xiu"),E(a,"class","hints-btn svelte-1jw2xiu"),E(i,"class","top-bar svelte-1jw2xiu"),E(v,"class","found-preview-words svelte-1jw2xiu"),E(m,"class","found-preview svelte-1jw2xiu"),E(C,"class","hive-input svelte-1jw2xiu"),E(L,"d","M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"),E(F,"x","50%"),E(F,"y","50%"),E(F,"dominant-baseline","central"),E(F,"font-size","80"),E(F,"class","svelte-1jw2xiu"),E(z,"class","hex hex-center svelte-1jw2xiu"),E(z,"fill","currentColor"),E(z,"height","100px"),E(z,"width","100px"),E(z,"version","1.1"),E(z,"id","Capa_1"),E(z,"xmlns","http://www.w3.org/2000/svg"),E(z,"xmlns:xlink","http://www.w3.org/1999/xlink"),E(z,"viewBox","0 0 184.75 184.75"),E(z,"xml:space","preserve"),E(z,"stroke","#e6e6e6"),E(z,"stroke-width","0.0018475100000000001"),E(z,"transform","rotate(0)"),E(O,"class","hive-inner svelte-1jw2xiu"),E(U,"class","hive-button svelte-1jw2xiu"),E(D,"class","hive-button shuffle-btn svelte-1jw2xiu"),E(J,"class","hive-button svelte-1jw2xiu"),E(R,"class","hive-buttons svelte-1jw2xiu"),E(h,"class","hive-outer svelte-1jw2xiu")},m(n,s){vt(e,n,s),y(n,o,s),ut&&ut.m(n,s),y(n,r,s),at&&at.m(n,s),y(n,l,s),y(n,i,s),vt(c,i,null),w(i,u),w(i,a),w(a,d),w(a,p),y(n,g,s),y(n,h,s),w(h,m),w(m,v);for(let t=0;t<X.length;t+=1)X[t]&&X[t].m(v,null);w(m,$),yt&&yt.m(m,null),w(h,x),w(h,C),jt.m(C,null),w(h,N),w(h,O),w(O,z),w(z,L),w(z,F),w(F,P),w(O,A);for(let t=0;t<et.length;t+=1)et[t]&&et[t].m(O,null);w(h,H),w(h,R),w(R,U),w(R,Q),w(R,D),w(R,I),w(R,J),B=!0,K||(V=[S(a,"pointerdown",t[19]),S(L,"pointerdown",t[21]),S(F,"pointerdown",t[22]),S(U,"pointerdown",t[11]),S(D,"pointerdown",t[12]),S(J,"pointerdown",t[13])],K=!0)},p(t,o){const s={};9&o[0]|4096&o[1]&&(s.$$scope={dirty:o,ctx:t}),!n&&16&o[0]&&(n=!0,s.showModal=t[4],Y((()=>n=!1))),e.$set(s),t[5]?ut?(ut.p(t,o),32&o[0]&&it(ut,1)):(ut=Kt(t),ut.c(),it(ut,1),ut.m(r.parentNode,r)):ut&&(rt(),ct(ut,1,1,(()=>{ut=null})),lt()),t[6]?at?(at.p(t,o),64&o[0]&&it(at,1)):(at=Zt(t),at.c(),it(at,1),at.m(l.parentNode,l)):at&&(rt(),ct(at,1,1,(()=>{at=null})),lt());const i={};8&o[0]&&(i.foundWords=t[3]),1&o[0]&&(i.game=t[0]),256&o[0]&&(i.score=t[8]),c.$set(i),8&o[0]&&($t=t[3],X=gt(X,o,xt,1,t,$t,Z,v,ft,se,null,Rt)),t[3].length>0?yt?(yt.p(t,o),8&o[0]&&it(yt,1)):(yt=re(t),yt.c(),it(yt,1),yt.m(m,null)):yt&&(rt(),ct(yt,1,1,(()=>{yt=null})),lt()),kt===(kt=bt(t))&&jt?jt.p(t,o):(jt.d(1),jt=kt(t),jt&&(jt.c(),it(jt,1),jt.m(C,null))),(!B||1&o[0])&&tt!==(tt=t[0].center.toUpperCase()+"")&&W(P,tt),1025&o[0]&&(_t=t[0].outer,rt(),et=gt(et,o,St,1,t,_t,nt,O,pt,fe,null,At),lt())},i(t){if(!B){it(e.$$.fragment,t),it(ut),it(at),it(c.$$.fragment,t);for(let t=0;t<$t.length;t+=1)it(X[t]);it(yt),it(jt),G((()=>{B&&(T||(T=dt(z,Mt,{duration:500},!0)),T.run(1))}));for(let t=0;t<_t.length;t+=1)it(et[t]);B=!0}},o(t){ct(e.$$.fragment,t),ct(ut),ct(at),ct(c.$$.fragment,t),ct(yt),T||(T=dt(z,Mt,{duration:500},!1)),T.run(0);for(let t=0;t<et.length;t+=1)ct(et[t]);B=!1},d(t){wt(e,t),t&&b(o),ut&&ut.d(t),t&&b(r),at&&at.d(t),t&&b(l),t&&b(i),wt(c),t&&b(g),t&&b(h);for(let t=0;t<X.length;t+=1)X[t].d();yt&&yt.d(),jt.d(),t&&T&&T.end();for(let t=0;t<et.length;t+=1)et[t].d();K=!1,s(V)}}}function Gt(t,e){let n,o,s,r,l,i=e[30]+"";return{key:t,first:null,c(){n=k("span"),o=k("a"),s=M(i),l=_(),E(o,"target","_blank"),E(o,"href",r="https://svenska.se/tre/?sok="+e[30]+"&pz=1"),E(o,"class","svelte-1jw2xiu"),E(n,"class","found-word-item svelte-1jw2xiu"),O(n,"pangram",e[0].pangrams.includes(e[30])),this.first=n},m(t,e){y(t,n,e),w(n,o),w(o,s),w(n,l)},p(t,l){e=t,8&l[0]&&i!==(i=e[30]+"")&&W(s,i),8&l[0]&&r!==(r="https://svenska.se/tre/?sok="+e[30]+"&pz=1")&&E(o,"href",r),9&l[0]&&O(n,"pangram",e[0].pangrams.includes(e[30]))},d(t){t&&b(n)}}}function Yt(t){let e,n,o,s,r,l,i=t[3].length+"",c=[],u=new Map,a=t[3].sort();const d=t=>t[30];for(let e=0;e<a.length;e+=1){let n=Jt(t,a,e),o=d(n);u.set(o,c[e]=Gt(o,n))}return{c(){e=k("div"),n=k("h1"),o=M(i),s=M(" words found"),r=_(),l=k("div");for(let t=0;t<c.length;t+=1)c[t].c();E(n,"class","svelte-1jw2xiu"),E(l,"class","found-words-list svelte-1jw2xiu"),E(e,"class","found-words-container svelte-1jw2xiu")},m(t,i){y(t,e,i),w(e,n),w(n,o),w(n,s),w(e,r),w(e,l);for(let t=0;t<c.length;t+=1)c[t]&&c[t].m(l,null)},p(t,e){8&e[0]&&i!==(i=t[3].length+"")&&W(o,i),9&e[0]&&(a=t[3].sort(),c=gt(c,e,d,1,t,a,u,l,ft,Gt,null,Jt))},d(t){t&&b(e);for(let t=0;t<c.length;t+=1)c[t].d()}}}function Kt(t){let e,n,o;function s(e){t[16](e)}let r={$$slots:{default:[Xt]},$$scope:{ctx:t}};return void 0!==t[5]&&(r.showModal=t[5]),e=new Ct({props:r}),q.push((()=>ht(e,"showModal",s))),e.$on("closeModal",t[17]),{c(){mt(e.$$.fragment)},m(t,n){vt(e,t,n),o=!0},p(t,o){const s={};9&o[0]|4096&o[1]&&(s.$$scope={dirty:o,ctx:t}),!n&&32&o[0]&&(n=!0,s.showModal=t[5],Y((()=>n=!1))),e.$set(s)},i(t){o||(it(e.$$.fragment,t),o=!0)},o(t){ct(e.$$.fragment,t),o=!1},d(t){wt(e,t)}}}function Vt(t,e){let n,o,s,r,l,i,c,u=e[30]+"";return{key:t,first:null,c(){n=k("span"),o=k("i"),s=_(),r=k("a"),l=M(u),c=_(),E(o,"class","bi bi-check green svelte-1jw2xiu"),O(o,"invisible",!e[3].includes(e[30])),E(r,"target","_blank"),E(r,"href",i="https://svenska.se/tre/?sok="+e[30]+"&pz=1"),E(r,"class","svelte-1jw2xiu"),E(n,"class","found-word-item svelte-1jw2xiu"),O(n,"pangram",e[0].pangrams.includes(e[30])),this.first=n},m(t,e){y(t,n,e),w(n,o),w(n,s),w(n,r),w(r,l),w(n,c)},p(t,s){e=t,9&s[0]&&O(o,"invisible",!e[3].includes(e[30])),1&s[0]&&u!==(u=e[30]+"")&&W(l,u),1&s[0]&&i!==(i="https://svenska.se/tre/?sok="+e[30]+"&pz=1")&&E(r,"href",i),1&s[0]&&O(n,"pangram",e[0].pangrams.includes(e[30]))},d(t){t&&b(n)}}}function Xt(t){let e,n,o,s,r,l;Dt(t);let i,c,u,a,d,f,p,g,h,m,v,$,x=t[3].length+"",j=t[0].validWords.length+"",S=Math.round((t[3].length||0)/t[0].validWords.length*100)+"",C=Nt(t[8],t[0])[0]+"",N=[],O=new Map,z=t[0].validWords.sort();const L=t=>t[30];for(let e=0;e<z.length;e+=1){let n=It(t,z,e),o=L(n);O.set(o,N[e]=Vt(o,n))}return{c(){e=k("div"),n=k("div"),o=k("h1"),o.textContent="Time's up!",s=_(),r=k("h2"),l=k("span"),i=M(x),c=M("/"),u=M(j),a=M(" words found\n\t\t\t\t\t("),d=M(S),f=M("%)"),p=_(),g=k("h2"),h=M("Final rank: "),m=M(C),v=_(),$=k("div");for(let t=0;t<N.length;t+=1)N[t].c();E(o,"class","svelte-1jw2xiu"),E(l,"class","green svelte-1jw2xiu"),E(r,"class","svelte-1jw2xiu"),E(g,"class","svelte-1jw2xiu"),E(n,"class","endgame-msg svelte-1jw2xiu"),E($,"class","found-words-list svelte-1jw2xiu"),E(e,"class","found-words-container svelte-1jw2xiu")},m(t,x){y(t,e,x),w(e,n),w(n,o),w(n,s),w(n,r),w(r,l),w(l,i),w(r,c),w(r,u),w(r,a),w(r,d),w(r,f),w(n,p),w(n,g),w(g,h),w(g,m),w(e,v),w(e,$);for(let t=0;t<N.length;t+=1)N[t]&&N[t].m($,null)},p(t,e){Dt(t),8&e[0]&&x!==(x=t[3].length+"")&&W(i,x),1&e[0]&&j!==(j=t[0].validWords.length+"")&&W(u,j),9&e[0]&&S!==(S=Math.round((t[3].length||0)/t[0].validWords.length*100)+"")&&W(d,S),9&e[0]&&C!==(C=Nt(t[8],t[0])[0]+"")&&W(m,C),9&e[0]&&(z=t[0].validWords.sort(),N=gt(N,e,L,1,t,z,O,$,ft,Vt,null,It))},d(t){t&&b(e);for(let t=0;t<N.length;t+=1)N[t].d()}}}function Zt(t){let e,n,o;function s(e){t[18](e)}let r={$$slots:{default:[oe]},$$scope:{ctx:t}};return void 0!==t[6]&&(r.showModal=t[6]),e=new Ct({props:r}),q.push((()=>ht(e,"showModal",s))),{c(){mt(e.$$.fragment)},m(t,n){vt(e,t,n),o=!0},p(t,o){const s={};265&o[0]|4096&o[1]&&(s.$$scope={dirty:o,ctx:t}),!n&&64&o[0]&&(n=!0,s.showModal=t[6],Y((()=>n=!1))),e.$set(s)},i(t){o||(it(e.$$.fragment,t),o=!0)},o(t){ct(e.$$.fragment,t),o=!1},d(t){wt(e,t)}}}function te(t){let e,n=t[36].toUpperCase()+"";return{c(){e=M(n)},m(t,n){y(t,e,n)},p(t,o){9&o[0]&&n!==(n=t[36].toUpperCase()+"")&&W(e,n)},d(t){t&&b(e)}}}function ee(t,e){let n,o=(0===e[38]||1===e[38]&&e[33])&&te(e);return{key:t,first:null,c(){n=k("div"),o&&o.c(),E(n,"class","word-hint-letter svelte-1jw2xiu"),this.first=n},m(t,e){y(t,n,e),o&&o.m(n,null)},p(t,s){0===(e=t)[38]||1===e[38]&&e[33]?o?o.p(e,s):(o=te(e),o.c(),o.m(n,null)):o&&(o.d(1),o=null)},d(t){t&&b(n),o&&o.d()}}}function ne(t,e){let n,o,s=[],r=new Map,l=e[30];const i=t=>t[38];for(let t=0;t<l.length;t+=1){let n=qt(e,l,t),o=i(n);r.set(o,s[t]=ee(o,n))}return{key:t,first:null,c(){n=k("div");for(let t=0;t<s.length;t+=1)s[t].c();o=_(),E(n,"class","word-hint svelte-1jw2xiu"),this.first=n},m(t,e){y(t,n,e);for(let t=0;t<s.length;t+=1)s[t]&&s[t].m(n,null);w(n,o)},p(t,c){e=t,265&c[0]&&(l=e[30],s=gt(s,c,i,1,e,l,r,n,ft,ee,o,qt))},d(t){t&&b(n);for(let t=0;t<s.length;t+=1)s[t].d()}}}function oe(t){let e;Ut(t);let n,o,s,r,l=t[32].length+"",i=[],c=new Map,u=t[32];const a=t=>t[30];for(let e=0;e<u.length;e+=1){let n=Qt(t,u,e),o=a(n);c.set(o,i[e]=ne(o,n))}return{c(){e=k("h1"),n=M(l),o=M(" remaining words:"),s=_(),r=k("div");for(let t=0;t<i.length;t+=1)i[t].c();E(e,"class","svelte-1jw2xiu"),E(r,"class","hints-container svelte-1jw2xiu")},m(t,l){y(t,e,l),w(e,n),w(e,o),y(t,s,l),y(t,r,l);for(let t=0;t<i.length;t+=1)i[t]&&i[t].m(r,null)},p(t,e){Ut(t),9&e[0]&&l!==(l=t[32].length+"")&&W(n,l),265&e[0]&&(u=t[32],i=gt(i,e,a,1,t,u,c,r,ft,ne,null,Qt))},d(t){t&&b(e),t&&b(s),t&&b(r);for(let t=0;t<i.length;t+=1)i[t].d()}}}function se(e,n){let o,s,r,l,i=n[30]+"";return{key:e,first:null,c(){o=k("span"),s=M(i),r=_(),E(o,"class","found-word svelte-1jw2xiu"),this.first=o},m(t,e){y(t,o,e),w(o,s),w(o,r)},p(t,e){n=t,8&e[0]&&i!==(i=n[30]+"")&&W(s,i)},i(t){l||G((()=>{l=at(o,jt,{x:-100,duration:500}),l.start()}))},o:t,d(t){t&&b(o)}}}function re(e){let n,o,s,r,l;return{c(){n=k("button"),n.textContent="Show all",E(n,"class","show-all-found-btn svelte-1jw2xiu")},m(t,o){y(t,n,o),s=!0,r||(l=S(n,"pointerdown",e[20]),r=!0)},p:t,i(t){s||(G((()=>{s&&(o||(o=dt(n,kt,{},!0)),o.run(1))})),s=!0)},o(t){o||(o=dt(n,kt,{},!1)),o.run(0),s=!1},d(t){t&&b(n),t&&o&&o.end(),r=!1,l()}}}function le(e){let n,o=[],s=new Map,r=e[2];const l=t=>t[28];for(let t=0;t<r.length;t+=1){let n=Ht(e,r,t),i=l(n);s.set(i,o[t]=ce(i,n))}return{c(){n=k("div");for(let t=0;t<o.length;t+=1)o[t].c();E(n,"class","hive-input-text svelte-1jw2xiu")},m(t,e){y(t,n,e);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(n,null)},p(t,e){5&e[0]&&(r=t[2],o=gt(o,e,l,1,t,r,s,n,ft,ce,null,Ht))},i:t,o:t,d(t){t&&b(n);for(let t=0;t<o.length;t+=1)o[t].d()}}}function ie(e){let n,o,s,r,l,i=e[7].message+"";function c(t,e){return t[7].positive?ae:ue}let u=c(e),a=u(e);return{c(){n=k("div"),a.c(),o=_(),s=M(i),E(n,"class",r="feedback feedback-"+(e[7].positive?"positive":"negative")+" svelte-1jw2xiu")},m(t,e){y(t,n,e),a.m(n,null),w(n,o),w(n,s)},p(t,e){u!==(u=c(t))&&(a.d(1),a=u(t),a&&(a.c(),a.m(n,o))),128&e[0]&&i!==(i=t[7].message+"")&&W(s,i),128&e[0]&&r!==(r="feedback feedback-"+(t[7].positive?"positive":"negative")+" svelte-1jw2xiu")&&E(n,"class",r)},i(t){l||G((()=>{l=at(n,kt,{duration:500}),l.start()}))},o:t,d(t){t&&b(n),a.d()}}}function ce(t,e){let n,o,s,r=e[26].toUpperCase()+"";return{key:t,first:null,c(){n=k("span"),o=M(r),E(n,"class",s=u(e[26]==e[0].center?"input-center-letter":"")+" svelte-1jw2xiu"),this.first=n},m(t,e){y(t,n,e),w(n,o)},p(t,l){e=t,4&l[0]&&r!==(r=e[26].toUpperCase()+"")&&W(o,r),5&l[0]&&s!==(s=u(e[26]==e[0].center?"input-center-letter":"")+" svelte-1jw2xiu")&&E(n,"class",s)},d(t){t&&b(n)}}}function ue(t){let e;return{c(){e=k("i"),E(e,"class","bi bi-x"),N(e,"font-size","2rem"),N(e,"color","red")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function ae(t){let e;return{c(){e=k("i"),E(e,"class","bi bi-check green svelte-1jw2xiu"),N(e,"font-size","2rem")},m(t,n){y(t,e,n)},d(t){t&&b(e)}}}function de(t){let e,n,o,s,r,l,i=t[26].toUpperCase()+"";function c(...e){return t[24](t[26],...e)}return{c(){e=j("text"),n=M(i),E(e,"x","50%"),E(e,"y","50%"),E(e,"dominant-baseline","central"),E(e,"font-size","80"),E(e,"class","svelte-1jw2xiu")},m(t,o){y(t,e,o),w(e,n),s=!0,r||(l=S(e,"pointerdown",c),r=!0)},p(e,o){t=e,(!s||1&o[0])&&i!==(i=t[26].toUpperCase()+"")&&W(n,i)},i(t){s||(G((()=>{s&&(o||(o=dt(e,kt,{},!0)),o.run(1))})),s=!0)},o(t){o||(o=dt(e,kt,{},!1)),o.run(0),s=!1},d(t){t&&b(e),t&&o&&o.end(),r=!1,l()}}}function fe(e,n){let o,s,r,i,c,u,a,d,f=n[0].outer;function p(...t){return n[23](n[26],...t)}let g=de(n);return{key:e,first:null,c(){o=M(""),s=j("svg"),r=j("path"),g.c(),E(r,"d","M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"),E(s,"class",i="hex hex-outer hex"+(n[28]+1)+" svelte-1jw2xiu"),E(s,"fill","currentColor"),E(s,"height","100px"),E(s,"width","100px"),E(s,"version","1.1"),E(s,"id","Capa_1"),E(s,"xmlns","http://www.w3.org/2000/svg"),E(s,"xmlns:xlink","http://www.w3.org/1999/xlink"),E(s,"viewBox","0 0 184.75 184.75"),E(s,"xml:space","preserve"),E(s,"stroke","#e6e6e6"),E(s,"stroke-width","0.0018475100000000001"),E(s,"transform","rotate(0)"),this.first=o},m(t,e){y(t,o,e),y(t,s,e),w(s,r),g.m(s,null),u=!0,a||(d=S(r,"pointerdown",p),a=!0)},p(e,o){n=e,1&o[0]&&l(f,f=n[0].outer)?(rt(),ct(g,1,1,t),lt(),g=de(n),g.c(),it(g,1),g.m(s,null)):g.p(n,o),(!u||1&o[0]&&i!==(i="hex hex-outer hex"+(n[28]+1)+" svelte-1jw2xiu"))&&E(s,"class",i)},i(t){u||(it(g),G((()=>{u&&(c||(c=dt(s,Mt,{duration:500},!0)),c.run(1))})),u=!0)},o(t){ct(g),c||(c=dt(s,Mt,{duration:500},!1)),c.run(0),u=!1},d(t){t&&b(o),t&&b(s),g.d(t),t&&c&&c.end(),a=!1,d()}}}function pe(t){let e,n,o,s,r,l,c,u=t[0]&&Bt(t);return{c(){var t,c;e=k("script"),o=k("script"),o.textContent="window.dataLayer = window.dataLayer || [];\n\t\tfunction gtag(){dataLayer.push(arguments);}\n\t\tgtag('js', new Date());\n\t\tgtag('config', 'G-1WQSF41QY5');\n\t",s=k("meta"),r=_(),l=k("main"),u&&u.c(),e.async=!0,t=e.src,c=n="https://www.googletagmanager.com/gtag/js?id=G-1WQSF41QY5",i||(i=document.createElement("a")),i.href=c,t!==i.href&&E(e,"src","https://www.googletagmanager.com/gtag/js?id=G-1WQSF41QY5"),E(s,"name","theme-color"),E(s,"content","#008000"),E(l,"class","svelte-1jw2xiu")},m(t,n){w(Tt.head,e),w(Tt.head,o),w(Tt.head,s),y(t,r,n),y(t,l,n),u&&u.m(l,null),c=!0},p(t,e){t[0]?u?(u.p(t,e),1&e[0]&&it(u,1)):(u=Bt(t),u.c(),it(u,1),u.m(l,null)):u&&(rt(),ct(u,1,1,(()=>{u=null})),lt())},i(t){c||(it(u),c=!0)},o(t){ct(u),c=!1},d(t){b(e),b(o),b(s),t&&b(r),t&&b(l),u&&u.d()}}}function ge(t,e,n){let o,s,r="",l=[],i=0,c=!1,u=!1,a=!1;function d(t){console.log("New game started"),n(0,o=t),n(2,r=""),n(3,l=[]),n(8,i=0),localStorage.setItem("game",JSON.stringify(o)),localStorage.setItem("foundWords",JSON.stringify(l))}!async function(){n(0,o=JSON.parse(localStorage.getItem("game"))),n(3,l=JSON.parse(localStorage.getItem("foundWords"))||[]),n(8,i=l.reduce(((t,e)=>t+Wt(e,o)),0));let t=await fetch("/get_game");var e,r;n(1,s=await t.json()),console.log(s,o),o?(e=s.letters,r=o.letters,e.length===r.length&&e.every(((t,e)=>t===r[e]))||(console.log("Local game is outdated, showing game over modal"),n(5,u=!0))):(console.log("No local game found, using new game"),d(s))}();const f={message:void 0,positive:void 0,timeout:void 0,pushMessage(t,e){n(2,r=""),f.timeout&&clearTimeout(f.timeout),n(7,f.message=t,f),n(7,f.positive=e,f),n(7,f.timeout=setTimeout((()=>{n(7,f.message=void 0,f),n(7,f.positive=void 0,f)}),1e3),f)}};var p;function g(t){n(7,f.message=void 0,f),n(7,f.timeout=void 0,f),n(2,r+=t)}function h(){n(2,r=r.slice(0,-1))}function m(){if(r)if(r.length<4)f.pushMessage("Too short",!1);else if(r.includes(o.center))if(l.includes(r))f.pushMessage("Already found",!1);else if(o.validWords.includes(r)){n(3,l=[r,...l]);let t=Wt(r,o);n(8,i+=t),localStorage.setItem("foundWords",JSON.stringify(l)),o.pangrams.includes(r)?f.pushMessage(`Pangram!! (+${t})`,!0):f.pushMessage(`Nice! (+${t})`,!0),n(2,r="")}else f.pushMessage("Not in wordlist",!1);else f.pushMessage("Must include center letter",!1)}function v(){let t=Nt(i,o)[0];return["🦧Orangutang","🧑🏿‍🌾Human","🤖Robot"].includes(t)}p=()=>{console.log("App.svelte mounted")},R().$$.on_mount.push(p),document.addEventListener("keydown",(t=>{"Backspace"==t.key?h():"Enter"==t.key?m():g(t.key)}));return t.$$.update=()=>{1&t.$$.dirty[0]&&o&&n(0,o.outer=o.letters.filter((t=>t!=o.center)),o),1&t.$$.dirty[0]&&o&&n(0,o.maxScore=o.validWords.reduce(((t,e)=>t+Wt(e,o)),0),o)},[o,s,r,l,c,u,a,f,i,d,g,h,function(){n(0,o.letters=o.letters.sort((()=>Math.random()-.5)),o)},m,v,function(t){c=t,n(4,c)},function(t){u=t,n(5,u)},()=>d(s),function(t){a=t,n(6,a)},()=>{v()?n(6,a=!0):f.pushMessage("Reach 🦧Orangutang to unlock hints",!1)},()=>n(4,c=!0),t=>g(o.center),t=>g(o.center),(t,e)=>g(t),(t,e)=>g(t)]}return new class extends yt{constructor(t){super(),xt(this,t,ge,pe,l,{},null,[-1,-1])}}({target:document.body,props:{}})}();
