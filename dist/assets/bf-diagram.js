(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const F=globalThis,V=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),K=new WeakMap;let dt=class{constructor(r,t,e){if(this._$cssResult$=!0,e!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=t}get styleSheet(){let r=this.o;const t=this.t;if(V&&r===void 0){const e=t!==void 0&&t.length===1;e&&(r=K.get(t)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),e&&K.set(t,r))}return r}toString(){return this.cssText}};const vt=r=>new dt(typeof r=="string"?r:r+"",void 0,Z),yt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new dt(e,r,Z)},$t=(r,t)=>{if(V)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=F.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},G=V?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return vt(e)})(r):r;/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const{is:bt,defineProperty:_t,getOwnPropertyDescriptor:wt,getOwnPropertyNames:xt,getOwnPropertySymbols:At,getPrototypeOf:St}=Object,P=globalThis,Q=P.trustedTypes,Et=Q?Q.emptyScript:"",tt=P.reactiveElementPolyfillSupport,M=(r,t)=>r,I={toAttribute(r,t){switch(t){case Boolean:r=r?Et:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},J=(r,t)=>!bt(r,t),et={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:J};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);class T extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=et){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&_t(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=wt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return i==null?void 0:i.call(this)},set(n){const h=i==null?void 0:i.call(this);o.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=St(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,s=[...xt(e),...At(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(G(i))}else t!==void 0&&e.push(G(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $t(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const n=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:I).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const n=i.getPropertyOptions(o),h=typeof n.converter=="function"?{fromAttribute:n.converter}:((s=n.converter)==null?void 0:s.fromAttribute)!==void 0?n.converter:I;this._$Em=o,this[o]=h.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??J)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],n)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[M("elementProperties")]=new Map,T[M("finalized")]=new Map,tt==null||tt({ReactiveElement:T}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.0.4");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const W=globalThis,j=W.trustedTypes,st=j?j.createPolicy("lit-html",{createHTML:r=>r}):void 0,pt="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,ut="?"+x,kt=`<${ut}>`,E=document,R=()=>E.createComment(""),L=r=>r===null||typeof r!="object"&&typeof r!="function",ft=Array.isArray,Tt=r=>ft(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",X=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,rt=/>/g,A=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,nt=/"/g,mt=/^(?:script|style|textarea|title)$/i,Pt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),y=Pt(1),O=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),lt=new WeakMap,S=E.createTreeWalker(E,129);function gt(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return st!==void 0?st.createHTML(t):t}const Ot=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":"",n=U;for(let h=0;h<e;h++){const l=r[h];let c,d,a=-1,m=0;for(;m<l.length&&(n.lastIndex=m,d=n.exec(l),d!==null);)m=n.lastIndex,n===U?d[1]==="!--"?n=it:d[1]!==void 0?n=rt:d[2]!==void 0?(mt.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=A):d[3]!==void 0&&(n=A):n===A?d[0]===">"?(n=i??U,a=-1):d[1]===void 0?a=-2:(a=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?A:d[3]==='"'?nt:ot):n===nt||n===ot?n=A:n===it||n===rt?n=U:(n=A,i=void 0);const f=n===A&&r[h+1].startsWith("/>")?" ":"";o+=n===U?l+kt:a>=0?(s.push(c),l.slice(0,a)+pt+l.slice(a)+x+f):l+x+(a===-2?h:f)}return[gt(r,o+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};class z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const h=t.length-1,l=this.parts,[c,d]=Ot(t,e);if(this.el=z.createElement(c,s),S.currentNode=this.el.content,e===2){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(i=S.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const a of i.getAttributeNames())if(a.endsWith(pt)){const m=d[n++],f=i.getAttribute(a).split(x),p=/([.?@])?(.*)/.exec(m);l.push({type:1,index:o,name:p[2],strings:f,ctor:p[1]==="."?Ht:p[1]==="?"?Ut:p[1]==="@"?Mt:B}),i.removeAttribute(a)}else a.startsWith(x)&&(l.push({type:6,index:o}),i.removeAttribute(a));if(mt.test(i.tagName)){const a=i.textContent.split(x),m=a.length-1;if(m>0){i.textContent=j?j.emptyScript:"";for(let f=0;f<m;f++)i.append(a[f],R()),S.nextNode(),l.push({type:2,index:++o});i.append(a[m],R())}}}else if(i.nodeType===8)if(i.data===ut)l.push({type:2,index:o});else{let a=-1;for(;(a=i.data.indexOf(x,a+1))!==-1;)l.push({type:7,index:o}),a+=x.length-1}o++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function C(r,t,e=r,s){var i,o;if(t===O)return t;let n=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const h=L(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==h&&((o=n==null?void 0:n._$AO)==null||o.call(n,!1),h===void 0?n=void 0:(n=new h(r),n._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=n:e._$Cl=n),n!==void 0&&(t=C(r,n._$AS(r,t.values),n,s)),t}class Ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??E).importNode(e,!0);S.currentNode=i;let o=S.nextNode(),n=0,h=0,l=s[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new D(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new Nt(o,this,t)),this._$AV.push(c),l=s[++h]}n!==(l==null?void 0:l.index)&&(o=S.nextNode(),n++)}return S.currentNode=E,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class D{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),L(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tt(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==g&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=z.createElement(gt(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===o)this._$AH.p(s);else{const n=new Ct(o,this),h=n.u(this.options);n.p(s),this.T(h),this._$AH=n}}_$AC(t){let e=lt.get(t.strings);return e===void 0&&lt.set(t.strings,e=new z(t)),e}k(t){ft(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new D(this.S(R()),this.S(R()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=C(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==O,n&&(this._$AH=t);else{const h=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=C(this,h[s+l],e,l),c===O&&(c=this._$AH[l]),n||(n=!L(c)||c!==this._$AH[l]),c===g?t=g:t!==g&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}n&&!i&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ht extends B{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}}class Ut extends B{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class Mt extends B{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??g)===O)return;const s=this._$AH,i=t===g&&s!==g||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==g&&(s===g||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const at=W.litHtmlPolyfillSupport;at==null||at(z,D),(W.litHtmlVersions??(W.litHtmlVersions=[])).push("3.1.2");const Rt=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new D(t.insertBefore(R(),o),o,void 0,e??{})}return i._$AI(r),i};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/class N extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return O}}var ct;N._$litElement$=!0,N.finalized=!0,(ct=globalThis.litElementHydrateSupport)==null||ct.call(globalThis,{LitElement:N});const ht=globalThis.litElementPolyfillSupport;ht==null||ht({LitElement:N});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Lt=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const zt={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:J},Dt=(r=zt,t,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(e.name,r),s==="accessor"){const{name:n}=e;return{set(h){const l=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,l,r)},init(h){return h!==void 0&&this.P(n,void 0,r),h}}}if(s==="setter"){const{name:n}=e;return function(h){const l=this[n];t.call(this,h),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+s)};function H(r){return(t,e)=>typeof e=="object"?Dt(r,t,e):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,n?{...s,wrapped:!0}:s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function Y(r){return H({...r,state:!0,attribute:!1})}var qt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,_=(r,t,e,s)=>{for(var i=s>1?void 0:s?Ft(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&qt(t,e,i),i};const It="https://id.loc.gov/resources/instances/",Wt="https://id.loc.gov/resources/works/",jt="https://id.loc.gov/resources/hubs/",Bt=["type","date","value","qualifier","label"];let b=class extends N{constructor(){super(),this.instances="",this.works="",this.hubs="",this.ignore="",this.fixinstanceof=!1,this.stateval="",this.resources={instances:[],works:[],hubs:[]},this.finalDereferenceTimeout=null,this.processTxtCurrentParentPredicate=""}connectedCallback(){super.connectedCallback()}updated(){setTimeout(()=>{var r;if(this.shadowRoot){let e=this.shadowRoot.querySelector("#bf-diagram-container");if(e){let s=this.shadowRoot.querySelectorAll(".instance"),i=0,o=0,n=[];for(let[d,a]of s.entries()){var t=window.getComputedStyle(a);parseFloat(t.marginTop)!=0&&(i=parseFloat(t.marginTop),o=o+i),n.push({height:parseFloat(t.height),middle:parseFloat(t.height)/2,id:d,runningTop:o,parents:this.resources.instances[d].parents,iconTop:""}),o=o+parseFloat(t.height)}for(let d of n){let a=this.shadowRoot.querySelector(`#instance-${d.id}-svg`);a&&(a.style.display="block",a.style.top=d.runningTop+d.middle/2+"px"),d.iconTop=d.runningTop+d.middle/2+"px"}let h=this.shadowRoot.querySelector(".work:first-of-type ");h&&(h.style.marginTop=e.clientHeight/4+"px");let l="",c="";for(let[d,a]of n.entries()){let m=!1,f=this.shadowRoot.querySelector(`[data-resource="work-${a.parents[0]}-icon"]`);f&&f.parentElement&&f.parentElement.offsetTop&&parseFloat(a.iconTop)>=f.parentElement.offsetTop&&(m=!0);let p=this.shadowRoot.querySelector(`#instance-line-${a.id}-svg`);p&&this.resources.works.map(k=>k.id).indexOf(a.parents[0])==-1&&(p.style.display="none");let u=this.shadowRoot.querySelector(`#instance-${a.id}-svg`);if(a.parents[0]&&p){let k=this.shadowRoot.querySelector(".instance-icons");if(m){if(p.style.top=((r=f==null?void 0:f.parentElement)==null?void 0:r.offsetTop)+"px",f&&f.parentElement&&u&&k){p.style.height=parseFloat(a.iconTop)-f.parentElement.offsetTop+(u==null?void 0:u.clientHeight)+"px",p.style.width=k.clientWidth+f.parentElement.offsetWidth/2+"px",p.style.left=f.parentElement.offsetWidth-f.parentElement.offsetWidth/2+"px",c===""&&(c=parseFloat(p.style.width)-u.clientWidth-(Math.floor(Math.random()*151)+100)+"");let v=p.querySelector(".line-part-1");v&&(v.setAttribute("y1",p.clientHeight-u.clientHeight/2+""),v.setAttribute("y2",p.clientHeight-u.clientHeight/2+""),v.setAttribute("x1",parseFloat(p.style.width)-u.clientWidth+""),v.setAttribute("x2",c));let $=p.querySelector(".line-part-2");$&&v&&($.setAttribute("y1",u.clientHeight/2-3+""),$.setAttribute("y2",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+4+""),$.setAttribute("x1",v.getAttribute("x2")+""),$.setAttribute("x2",v.getAttribute("x2")+""));let w=p.querySelector(".line-part-3");w&&(w.style.display="none")}}else if(p.style.top=a.iconTop,f&&f.parentElement&&u&&k){p.style.height=f.parentElement.offsetTop-parseFloat(a.iconTop)+(u==null?void 0:u.clientHeight)+"px",p.style.width=k.clientWidth+f.parentElement.offsetWidth/2+"px",p.style.left=f.parentElement.offsetWidth-f.parentElement.offsetWidth/2+"px",l===""&&(l=parseFloat(p.style.width)-u.clientWidth-(Math.floor(Math.random()*51)+50)+"");let v=p.querySelector(".line-part-1");v&&(v.setAttribute("y1",u.clientHeight/2+""),v.setAttribute("y2",u.clientHeight/2+""),v.setAttribute("x1",parseFloat(p.style.width)-u.clientWidth+""),v.setAttribute("x2",l));let $=p.querySelector(".line-part-2");$&&v&&($.setAttribute("y1",u.clientHeight/2-3+""),$.setAttribute("y2",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+4+""),$.setAttribute("x1",v.getAttribute("x2")+""),$.setAttribute("x2",v.getAttribute("x2")+""));let w=p.querySelector(".line-part-3");if(w&&$&&(w.setAttribute("y1",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+""),w.setAttribute("y2",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+""),w.setAttribute("x1",$.getAttribute("x2")+""),w.setAttribute("x2",0+(u.clientWidth/2+20)+"")),d==0){let q=p.querySelector(".bf-instance-of");q&&w&&(q.style.display="block",q.setAttribute("x",p.clientWidth/2-100+""),q.setAttribute("y",u.clientHeight/2+parseFloat(p.style.height)-10-u.clientHeight+""))}}}}}}})}_extractLabelDescriptionFromXmlRDF(r,t){let e=null,s=null,i=new DOMParser().parseFromString(r,"text/xml"),o=i.documentElement,n=new XPathEvaluator().createNSResolver(o);if(t.indexOf("/resources/")>-1){let d=i.evaluate("//bf:mainTitle",o,n,XPathResult.ANY_TYPE,null),a=[],m=null;for(;m=d.iterateNext();)a.push(m);a.length>0&&(e=a[0].innerHTML)}else{let d=i.evaluate("//rdfs:label",o,n,XPathResult.ANY_TYPE,null),a=[],m=null;for(;m=d.iterateNext();)a.push(m);if(a.length>0)e=a[0].innerHTML;else{let f=i.evaluate("//skos:prefLabel",o,n,XPathResult.ANY_TYPE,null),p=[],u=null;for(;u=f.iterateNext();)p.push(u);p.length>0&&(e=p[0].innerHTML)}}let h=i.evaluate("//skos:definition",o,n,XPathResult.ANY_TYPE,null),l=[],c=null;for(;c=h.iterateNext();)l.push(c);return l.length>0&&(s=l[0].innerHTML),{label:e,desc:s,url:t}}_returnDereferenceInfo(r,t){if(!r)return"";let e=window.sessionStorage.getItem(r);return e==="pending"?"":e?JSON.parse(e)[t]:""}_dereference(r,t){if(r=r.replace("http://","https://"),this.finalDereferenceTimeout!==null&&window.clearTimeout(this.finalDereferenceTimeout),this.finalDereferenceTimeout=window.setTimeout(()=>{this.requestUpdate()},1e3),t==="predicate"&&Bt.indexOf(r)>-1||window.sessionStorage.getItem(`bf-diagram-${t}-${r}`))return!0;if(window.sessionStorage.setItem(`bf-diagram-${t}-${r}`,"pending"),t==="predicate"||t==="class"||t==="ontologies"){let e=r.split("/").pop(),s=`https://id.loc.gov/ontologies/bibframe/${e}`,i=`https://id.loc.gov/ontologies/bflc/${e}`,o;fetch(s,{method:"GET"}).then(async n=>{if(n.status===200){let h=await n.text();t==="class"||t==="ontologies"?o=`https://id.loc.gov/ontologies/bibframe.html#c_${e}`:o=`https://id.loc.gov/ontologies/bibframe.html#p_${e}`;let l=this._extractLabelDescriptionFromXmlRDF(h,o);window.sessionStorage.setItem(`bf-diagram-${t}-${r}`,JSON.stringify(l)),this.requestUpdate()}else throw"non-200"}).catch(n=>{console.error(n),fetch(i,{method:"GET"}).then(async h=>{if(h.status===200){let l=await h.text();t==="class"||t==="ontologies"?o=`https://id.loc.gov/ontologies/bflc.html#c_${e}`:o=`https://id.loc.gov/ontologies/bflc.html#p_${e}`;let c=this._extractLabelDescriptionFromXmlRDF(l,o);window.sessionStorage.setItem(`bf-diagram-${t}-${r}`,JSON.stringify(c)),this.requestUpdate()}}).catch(h=>{console.error(h)})})}else t==="vocabulary"||t==="authorities"||t==="agents"?fetch(r+".skos.rdf",{method:"GET"}).then(async e=>{if(e.status===200){let s=await e.text(),i=r,o=this._extractLabelDescriptionFromXmlRDF(s,i);window.sessionStorage.setItem(`bf-diagram-${t}-${r}`,JSON.stringify(o)),this.requestUpdate()}else throw"non-200"}).catch(e=>{console.error(e)}):t==="resources"&&fetch(r+".rdf",{method:"GET"}).then(async e=>{if(e.status===200){let s=await e.text(),i=r,o=this._extractLabelDescriptionFromXmlRDF(s,i);window.sessionStorage.setItem(`bf-diagram-${t}-${r}`,JSON.stringify(o)),this.requestUpdate()}else throw"non-200"}).catch(e=>{console.error(e)})}_mouseOverToolTip(r){if(r!==null&&r.target instanceof HTMLElement){let t=this._returnDereferenceInfo(r.target.dataset.derefid,"label"),e=this._returnDereferenceInfo(r.target.dataset.derefid,"desc"),s=this._returnDereferenceInfo(r.target.dataset.derefid,"url");if(t!=""){let i=t;e&&(i=i+` -- ${e}`),r.target.dataset.tip=i,r.target.setAttribute("href",s)}else r.target.classList.remove("tool")}}_processTxt(r){let t=[];for(let e of r){let s={indent:0,type:"",html:y``},i=e.match(/^(\s+)[a-zA-Z]/);i&&(s.indent=i[1].length/2),s.indent<2&&(this.processTxtCurrentParentPredicate="");let o=e.match(/^\s+([a-z][a-zA-Z]+)\:\s(https*:\/\/.*$)/),n=e.match(/^\s+([a-z][a-zA-Z0-9\-]+)\:\s(?!http)(.*)$/),h=e.match(/^\s+([a-z]+[a-zA-Z]+)$/),l=e.match(/^\s+([A-Z]+[a-zA-Z]+)$/);if(o){let c=o[1],d=o[2],a=d;if(s.indent==2&&(this.processTxtCurrentParentPredicate=c),this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(c,"predicate"),s.type="predicate",d.indexOf("/vocabulary/")>-1?(this._dereference(d,"vocabulary"),s.type="vocabulary",a=a.replace("http://id.loc.gov/vocabulary/","").replace("/",":")):d.indexOf("/ontologies/")>-1?(this._dereference(d,"ontologies"),s.type="ontologies",a=a.replace("http://id.loc.gov/ontologies/bibframe/","bf:"),a=a.replace("http://id.loc.gov/ontologies/bflc/","bflc:")):d.indexOf("/resources/")>-1?(this._dereference(d,"resources"),a=a.replace("http://id.loc.gov/resources/works/","works:"),a=a.replace("http://id.loc.gov/resources/instances/","instances:"),a=a.replace("http://id.loc.gov/resources/instances","instances:instance"),s.type="resources"):d.indexOf("/authorities/")>-1?(this._dereference(d,"authorities"),s.type="authorities",a=a.replace("http://id.loc.gov/authorities/","").replace("/",":")):d.indexOf("/rwo/agents/")>-1&&(this._dereference(d,"agents"),s.type="agents",a=a.replace("http://id.loc.gov/rwo/","").replace("/",":")),s.html=y`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${c}`}" class="tool">${c}</a>: <a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-${s.type}-${d}`}" class="tool object-value">${a}</a> </div>`}else if(n){let c=n[1],d=n[2];if(s.indent==2&&(this.processTxtCurrentParentPredicate=c),this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(c,"predicate"),s.html=y`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${c}`}" class="tool">${c}</a>: ${d}</div>`}else if(h){let c=h[1];if(s.indent==2&&(this.processTxtCurrentParentPredicate=c),this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(c,"predicate"),s.html=y`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${c}`}" class="tool">${c}</a></div>`}else if(l){let c=l[1];if(this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(c,"class"),s.html=y`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-class-${c}`}" class="tool">${c}</a></div>`}else e.indexOf(" (bf:Instance)")>-1||e.indexOf(" (bf:Work)")>-1||e.indexOf(" (bf:Hub)")>-1;e.trim()!=""&&t.push(s)}return t}_buildRelantionships(r,t){let e=[],s=[];for(let i of t)if(r.type==="instance"){if(i.indexOf("instanceOf:")>-1){let o=i.split("/").pop();this.fixinstanceof?this.resources.works.length>0&&e.push(this.resources.works[0].id):o&&e.push(o)}}else if(r.type==="work"&&i.indexOf("hasInstance:")>-1){let o=i.split("/").pop();o&&s.push(o)}return{children:s,parents:e}}async firstUpdated(){let r=[],t=[],e=[],s=[];for(let n of this.instances.split(",")){if(n.trim().length==0)continue;let h=fetch(`${It}${n}.composed.txt`);t.push(n),r.push(h)}for(let n of this.works.split(",")){if(n.trim().length==0)continue;let h=fetch(`${Wt}${n}.composed.txt`);r.push(h),e.push(n)}for(let n of this.hubs.split(",")){if(n.trim().length==0)continue;let h=fetch(`${jt}${n}.composed.txt`);r.push(h),s.push(n)}let i;try{i=await Promise.all(r)}catch(n){console.error(n),alert(`BF-Diagram:
Error retrieving records, see console.`)}let o=[];if(i)for(let n of i){let h=await n.text();o.push(h)}for(let n of e)for(let h of o){let l=h.split(`
`);if(l[0].indexOf(n)>-1&&l[0].indexOf("bf:Work")>-1){let c={id:n,type:"work",parts:this._processTxt(l),parents:[],children:[]};c.children=this._buildRelantionships(c,l).children,this.resources.works.push(c),this.requestUpdate();break}}for(let n of t)for(let h of o){let l=h.split(`
`);if(l[0].indexOf(n)>-1&&l[0].indexOf("bf:Instance")>-1){let c={id:n,type:"instance",parts:this._processTxt(l),parents:[],children:[]};c.parents=this._buildRelantionships(c,l).parents,this.resources.instances.push(c),this.requestUpdate();break}}for(let n of s)for(let h of o){let l=h.split(`
`);if(l[0].indexOf(n)>-1&&l[0].indexOf("id.loc.gov/resources/hubs/")>-1){let c={id:n,type:"hub",parts:this._processTxt(l),parents:[],children:[]};this.resources.hubs.push(c),this.requestUpdate();break}}}render(){let r=[],t=[],e=[],s=[],i=[],o=0;for(let l of this.resources.instances){let c=[];for(let d of l.parts)c.push(d.html);r.push(y`<div class="instance">
          


        ${c}
      
      
      </div>`),i.push(y`

          <svg id="instance-line-${o}-svg" class="instance-line-svg"  >
            
            <rect width="100%" height="100%" />
            <defs>
              <!-- <marker id="arrow-${o}" markerWidth="4" fill="red" markerHeight="8" refX="4.7" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" />
              </marker> -->
              <marker
                id="arrow-${o}"
                fill="#565656"
                viewBox="0 0 15 15"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>

            </defs>
            <line class="line-part-1" x1="150" y1="150" x2="250" y2="150" stroke="#565656" stroke-width="8"  />
            <line class="line-part-2" x1="150" y1="150" x2="250" y2="150" stroke="#565656" stroke-width="8"  />

            <line class="line-part-3" x1="0" y1="0" x2="250" y2="50" stroke="#565656" stroke-width="8" marker-end="url(#arrow-${o})" />
            <text class="bf-instance-of" x="0" y="0" >bf:instanceOf</text>
            <!-- <line x1="50" y1="100" x2="250" y2="100" stroke="#000" stroke-width="5"/> -->
          </svg>

      
      `),s.push(y`

      <svg @click=${()=>{window.open("https://id.loc.gov/resources/instances/"+l.id,"_blank")}}  id="instance-${o}-svg" data-resource="instnace-${l.id}-icon" class="hidden-by-default instance-svg" version="1.1" viewbox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
          <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          <text x="0%" y="98%">instances/${l.id}</text>
        </svg>    

        
      `),o++}for(let l of this.resources.works){let c=[];for(let d of l.parts)c.push(d.html);t.push(y`<div class="work">
          <svg @click=${()=>{window.open("https://id.loc.gov/resources/works/"+l.id,"_blank")}} id="work-0-svg" data-resource="work-${l.id}-icon" class="work-svg" version="1.1" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
            <text x="10%" y="98%">works/${l.id}</text>
          </svg>
        ${c}
      </div>`)}let n=y``;this.resources.hubs.length>0&&(n=y`
          <svg class="hub-arrow-svg" width="100%" height="100px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <marker
                id="arrow-hub"
                fill="#565656"
                viewBox="0 0 15 15"
                refX="5"
                refY="5"
                markerWidth="3"
                markerHeight="3"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>  
        
          <line x1="50%" x2="50%" y1="20" y2="90" stroke="#565656" stroke-width="8" marker-end="url(#arrow-hub)" />
          <text x="60%" y="60%">bf:expressionOf</text>
          </svg>

    `);for(let l of this.resources.hubs){let c=[];for(let d of l.parts)c.push(d.html);e.push(y`<div class="hub">
          <svg @click=${()=>{window.open("https://id.loc.gov/resources/hubs/"+l.id,"_blank")}} data-resource="hub-${l.id}-icon" class="hub-svg" version="1.1" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
           
        
          
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
            <text x="10%" y="98%">hubs/${l.id.split("-")[0]+"..."}</text>
          </svg>
        ${c}
      </div>`)}let h=y`
    
      <div id="bf-diagram-container">
        <div>
          ${t}
          ${n}
          ${e}
        </div>
        <div class="instance-icons">
        
          ${s}
          
        </div>
        <div class="col-instnace">
          ${r}   
        </div>

        ${i}
        
      </div>
    
    `;return y`
      ${h}






    `}};b.styles=yt`

    <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap')
    </style>

    :host {

        
      
    }

    
    .hidden-by-default{
      display:none;
    }
    .space-mono-regular {
      font-family: "Space Mono", monospace;
      font-weight: 400;
      color: #565656;

      font-style: normal;
    }
    
    .instance{
      margin-bottom:4em;
    }
    .instance:first-of-type {
      margin-top:10em;

    }
    .instance-svg{
      cursor:pointer;
      width:112px;
      position:absolute;
      right:0;
      margin-left:auto;
      fill:#565656;
      
    }
    .instance-svg:hover{
      fill:black;
    }
    .instance-svg text{
      font-size:0.6em;
      font-family: "Space Mono", monospace;

    }

    .work-svg{
      width:112px;
      display:block;
      margin-left:auto;
      margin-right:auto;
      cursor:pointer;
      fill:#565656;

    }

    .work-svg path:hover{
      fill:black;
    }
    .work-svg text{
      font-size:0.6em;
      font-family: "Space Mono", monospace;
      fill:#565656;

    }
    .hub-svg{
      width:112px;
      display:block;
      margin-left:auto;
      margin-right:auto;
      cursor:pointer;
      fill:#565656;

    }

    .hub-svg path:hover{
      fill:black;
    }
    .hub-svg text{
      font-size:0.6em;
      font-family: "Space Mono", monospace;
      fill:#565656;

    }

    .hub-arrow-svg text{
      font-size:1em;
      font-family: "Space Mono", monospace;
      fill:#565656;

    }


    .instance-icons{
      position:relative;

    }

    #bf-diagram-container{
      overflow-x:hidden;
      position:relative;
      display: grid; 
      grid-template-columns: 1fr 1fr 1fr; 
      grid-template-rows: 1fr; 
      gap: 0px 0px; 
      grid-template-areas: 
        ". . ."; 
      // background-color:red;
    }

    .col-instnace{
      // background-color:lightblue;
    }
    .statement{
      margin-top:3px;
      margin-bottom:3px;      
    }
    .statement a{
      color:black !important;
      color: #565656  !important;
      text-decoration: none;

    }
    .statement a:hover{
      color:black !important;
      color: #565656  !important;
      text-decoration: underline !important;
    }
    .statement a::visited{
      color:black !important;
      color: #565656  !important;
      text-decoration: none;
    }

    .indent-2{
      padding-left:2em;
    }
    .indent-4{
      padding-left:4em;
    }
    .indent-6{
      padding-left:6em;
    }
    .indent-8{
      padding-left:8em;
    }
    .indent-10{
      padding-left:10em;
    }
    .indent-12{
      padding-left:12em;
    }    
    .indent-14{
      padding-left:14em;
    }    

    .object-value{}


    .instance-line-svg{
      position: absolute;
      left:0;
      top:0;
      height:100px;
      width:100px;
      fill: transparent;
      z-index:-100;

    }

    .bf-instance-of{
      display:none;
      font-family: "Space Mono", monospace;
      fill: #565656;
    }


    /*== start of code for tooltips ==*/
    .tool {
        cursor: help;
        position: relative;
    }
    
    
    /*== common styles for both parts of tool tip ==*/
    .tool::before,
    .tool::after {
        left: 50%;
        opacity: 0;
        position: absolute;
        z-index: -100;
    }
    
    .tool:hover::before,
    .tool:focus::before,
    .tool:hover::after,
    .tool:focus::after {
        opacity: 1;
        transform: scale(1) translateY(0);
        z-index: 100; 
    }


    
    
    /*== pointer tip ==*/
    .tool::before {
        border-style: solid;
        
        border-width: 1em 0.75em 0 0.75em;
        // border-color: #efefef transparent transparent transparent;
        border-color: #efefef transparent transparent transparent;
        bottom: 100%;
        content: "";
        margin-left: 1.9em;
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26), opacity .65s .5s;
        transform:  scale(.6) translateY(-90%);
    } 
    
    .tool:hover::before,
    .tool:focus::before {
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26) .2s;
    }
    
    
    /*== speech bubble ==*/
    .tool::after {
        background: #efefef;
        border-radius: .25em;
        border: solid 1px #ddd;
        bottom: 180%;
        color: #333;
        content: attr(data-tip);
        margin-left: 1.75em;
        padding: 1em;
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26) .2s;
        transform:  scale(.6) translateY(50%);  
        width: 17.5em;
    }
    .instance .tool::after {
      margin-left: -15.75em;
    }    

    .tool:hover::after,
    .tool:focus::after  {
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26);
    }
    
    @media (max-width: 760px) {
      .tool::after { 
            font-size: .75em;
            margin-left: -5em;
            width: 10em; 
      }
    }


  `;_([H({type:String})],b.prototype,"instances",2);_([H({type:String})],b.prototype,"works",2);_([H({type:String})],b.prototype,"hubs",2);_([H({type:String})],b.prototype,"ignore",2);_([H({type:Boolean})],b.prototype,"fixinstanceof",2);_([Y()],b.prototype,"stateval",2);_([Y()],b.prototype,"resources",2);_([Y()],b.prototype,"finalDereferenceTimeout",2);_([Y()],b.prototype,"processTxtCurrentParentPredicate",2);b=_([Lt("bf-diagram")],b);
