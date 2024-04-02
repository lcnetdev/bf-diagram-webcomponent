(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=globalThis,G=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ee=new WeakMap;let de=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(G&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=ee.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ee.set(t,e))}return e}toString(){return this.cssText}};const $e=r=>new de(typeof r=="string"?r:r+"",void 0,K),be=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new de(t,r,K)},ye=(r,e)=>{if(G)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=W.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},te=G?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return $e(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ve,defineProperty:_e,getOwnPropertyDescriptor:xe,getOwnPropertyNames:we,getOwnPropertySymbols:Ae,getPrototypeOf:Se}=Object,S=globalThis,se=S.trustedTypes,Ee=se?se.emptyScript:"",Y=S.reactiveElementPolyfillSupport,R=(r,e)=>r,F={toAttribute(r,e){switch(e){case Boolean:r=r?Ee:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Q=(r,e)=>!ve(r,e),ie={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:Q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),S.litPropertyMetadata??(S.litPropertyMetadata=new WeakMap);class T extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&_e(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=xe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get(){return i==null?void 0:i.call(this)},set(n){const h=i==null?void 0:i.call(this);o.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const e=Se(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const t=this.properties,s=[...we(t),...Ae(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(te(i))}else e!==void 0&&t.push(te(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ye(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EC(e,t){var o;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:F).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var o;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),h=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:F;this._$Em=i,this[i]=h.fromAttribute(t,n.type),this._$Em=null}}requestUpdate(e,t,s){if(e!==void 0){if(s??(s=this.constructor.getPropertyOptions(e)),!(s.hasChanged??Q)(this[e],t))return;this.P(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,s){this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[R("elementProperties")]=new Map,T[R("finalized")]=new Map,Y==null||Y({ReactiveElement:T}),(S.reactiveElementVersions??(S.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis,B=N.trustedTypes,re=B?B.createPolicy("lit-html",{createHTML:r=>r}):void 0,pe="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,fe="?"+A,ke=`<${fe}>`,P=document,D=()=>P.createComment(""),L=r=>r===null||typeof r!="object"&&typeof r!="function",ue=Array.isArray,Pe=r=>ue(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",V=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ne=/>/g,E=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),le=/'/g,ae=/"/g,me=/^(?:script|style|textarea|title)$/i,Te=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),b=Te(1),O=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ce=new WeakMap,k=P.createTreeWalker(P,129);function ge(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return re!==void 0?re.createHTML(e):e}const Oe=(r,e)=>{const t=r.length-1,s=[];let i,o=e===2?"<svg>":"",n=U;for(let h=0;h<t;h++){const l=r[h];let a,d,c=-1,m=0;for(;m<l.length&&(n.lastIndex=m,d=n.exec(l),d!==null);)m=n.lastIndex,n===U?d[1]==="!--"?n=oe:d[1]!==void 0?n=ne:d[2]!==void 0?(me.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=E):d[3]!==void 0&&(n=E):n===E?d[0]===">"?(n=i??U,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,a=d[1],n=d[3]===void 0?E:d[3]==='"'?ae:le):n===ae||n===le?n=E:n===oe||n===ne?n=U:(n=E,i=void 0);const f=n===E&&r[h+1].startsWith("/>")?" ":"";o+=n===U?l+ke:c>=0?(s.push(a),l.slice(0,c)+pe+l.slice(c)+A+f):l+A+(c===-2?h:f)}return[ge(r,o+(r[t]||"<?>")+(e===2?"</svg>":"")),s]};class I{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const h=e.length-1,l=this.parts,[a,d]=Oe(e,t);if(this.el=I.createElement(a,s),k.currentNode=this.el.content,t===2){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=k.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(pe)){const m=d[n++],f=i.getAttribute(c).split(A),p=/([.?@])?(.*)/.exec(m);l.push({type:1,index:o,name:p[2],strings:f,ctor:p[1]==="."?He:p[1]==="?"?Ue:p[1]==="@"?Re:j}),i.removeAttribute(c)}else c.startsWith(A)&&(l.push({type:6,index:o}),i.removeAttribute(c));if(me.test(i.tagName)){const c=i.textContent.split(A),m=c.length-1;if(m>0){i.textContent=B?B.emptyScript:"";for(let f=0;f<m;f++)i.append(c[f],D()),k.nextNode(),l.push({type:2,index:++o});i.append(c[m],D())}}}else if(i.nodeType===8)if(i.data===fe)l.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(A,c+1))!==-1;)l.push({type:7,index:o}),c+=A.length-1}o++}}static createElement(e,t){const s=P.createElement("template");return s.innerHTML=e,s}}function C(r,e,t=r,s){var n,h;if(e===O)return e;let i=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const o=L(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=C(r,i._$AS(r,e.values),i,s)),e}class Ce{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??P).importNode(t,!0);k.currentNode=i;let o=k.nextNode(),n=0,h=0,l=s[0];for(;l!==void 0;){if(n===l.index){let a;l.type===2?a=new z(o,o.nextSibling,this,e):l.type===1?a=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(a=new Ne(o,this,e)),this._$AV.push(a),l=s[++h]}n!==(l==null?void 0:l.index)&&(o=k.nextNode(),n++)}return k.currentNode=P,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class z{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),L(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Pe(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==g&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=I.createElement(ge(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(t);else{const n=new Ce(i,this),h=n.u(this.options);n.p(t),this.T(h),this._$AH=n}}_$AC(e){let t=ce.get(e.strings);return t===void 0&&ce.set(e.strings,t=new I(e)),t}k(e){ue(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new z(this.S(D()),this.S(D()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(o===void 0)e=C(this,e,t,0),n=!L(e)||e!==this._$AH&&e!==O,n&&(this._$AH=e);else{const h=e;let l,a;for(e=o[0],l=0;l<o.length-1;l++)a=C(this,h[s+l],t,l),a===O&&(a=this._$AH[l]),n||(n=!L(a)||a!==this._$AH[l]),a===g?e=g:e!==g&&(e+=(a??"")+o[l+1]),this._$AH[l]=a}n&&!i&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class He extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class Ue extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class Re extends j{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??g)===O)return;const s=this._$AH,i=e===g&&s!==g||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==g&&(s===g||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ne{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}}const J=N.litHtmlPolyfillSupport;J==null||J(I,z),(N.litHtmlVersions??(N.litHtmlVersions=[])).push("3.1.2");const Me=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const o=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new z(e.insertBefore(D(),o),o,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class M extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return O}}var he;M._$litElement$=!0,M.finalized=!0,(he=globalThis.litElementHydrateSupport)==null||he.call(globalThis,{LitElement:M});const Z=globalThis.litElementPolyfillSupport;Z==null||Z({LitElement:M});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Le={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:Q},Ie=(r=Le,e,t)=>{const{kind:s,metadata:i}=t;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(t.name,r),s==="accessor"){const{name:n}=t;return{set(h){const l=e.get.call(this);e.set.call(this,h),this.requestUpdate(n,l,r)},init(h){return h!==void 0&&this.P(n,void 0,r),h}}}if(s==="setter"){const{name:n}=t;return function(h){const l=this[n];e.call(this,h),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+s)};function H(r){return(e,t)=>typeof t=="object"?Ie(r,e,t):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,n?{...s,wrapped:!0}:s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function X(r){return H({...r,state:!0,attribute:!1})}var ze=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,_=(r,e,t,s)=>{for(var i=s>1?void 0:s?qe(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(e,t,i):n(i))||i);return s&&i&&ze(e,t,i),i};const We="https://id.loc.gov/resources/instances/",Fe="https://id.loc.gov/resources/works/",Be="https://id.loc.gov/resources/hubs/",je=["type","date","value","qualifier","label"];let v=class extends M{constructor(){super(),this.instances="",this.works="",this.hubs="",this.ignore="",this.fixinstanceof=!1,this.stateval="",this.resources={instances:[],works:[],hubs:[]},this.finalDereferenceTimeout=null,this.processTxtCurrentParentPredicate=""}connectedCallback(){super.connectedCallback()}updated(){setTimeout(()=>{var e;if(this.shadowRoot){let t=this.shadowRoot.querySelector("#bf-diagram-container");if(t){let s=this.shadowRoot.querySelectorAll(".instance"),i=0,o=0,n=[];for(let[d,c]of s.entries()){var r=window.getComputedStyle(c);parseFloat(r.marginTop)!=0&&(i=parseFloat(r.marginTop),o=o+i),n.push({height:parseFloat(r.height),middle:parseFloat(r.height)/2,id:d,runningTop:o,parents:this.resources.instances[d].parents,iconTop:""}),o=o+parseFloat(r.height)}for(let d of n){let c=this.shadowRoot.querySelector(`#instance-${d.id}-svg`);c&&(c.style.display="block",c.style.top=d.runningTop+d.middle/2+"px"),d.iconTop=d.runningTop+d.middle/2+"px"}let h=this.shadowRoot.querySelector(".work:first-of-type ");h&&(h.style.marginTop=t.clientHeight/4+"px");let l="",a="";for(let[d,c]of n.entries()){let m=!1,f=this.shadowRoot.querySelector(`[data-resource="work-${c.parents[0]}-icon"]`);f&&f.parentElement&&f.parentElement.offsetTop&&parseFloat(c.iconTop)>=f.parentElement.offsetTop&&(m=!0);let p=this.shadowRoot.querySelector(`#instance-line-${c.id}-svg`);p&&this.resources.works.map(x=>x.id).indexOf(c.parents[0])==-1&&(p.style.display="none");let u=this.shadowRoot.querySelector(`#instance-${c.id}-svg`);if(c.parents[0]&&p){let x=this.shadowRoot.querySelector(".instance-icons");if(m){if(p.style.top=((e=f==null?void 0:f.parentElement)==null?void 0:e.offsetTop)+"px",f&&f.parentElement&&u&&x){p.style.height=parseFloat(c.iconTop)-f.parentElement.offsetTop+(u==null?void 0:u.clientHeight)+"px",p.style.width=x.clientWidth+f.parentElement.offsetWidth/2+"px",p.style.left=f.parentElement.offsetWidth-f.parentElement.offsetWidth/2+"px",a===""&&(a=parseFloat(p.style.width)-u.clientWidth-(Math.floor(Math.random()*151)+100)+"");let $=p.querySelector(".line-part-1");$&&($.setAttribute("y1",p.clientHeight-u.clientHeight/2+""),$.setAttribute("y2",p.clientHeight-u.clientHeight/2+""),$.setAttribute("x1",parseFloat(p.style.width)-u.clientWidth+""),$.setAttribute("x2",a));let y=p.querySelector(".line-part-2");y&&$&&(y.setAttribute("y1",u.clientHeight/2-3+""),y.setAttribute("y2",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+4+""),y.setAttribute("x1",$.getAttribute("x2")+""),y.setAttribute("x2",$.getAttribute("x2")+""));let w=p.querySelector(".line-part-3");w&&(w.style.display="none")}}else if(p.style.top=c.iconTop,f&&f.parentElement&&u&&x){p.style.height=f.parentElement.offsetTop-parseFloat(c.iconTop)+(u==null?void 0:u.clientHeight)+"px",p.style.width=x.clientWidth+f.parentElement.offsetWidth/2+"px",p.style.left=f.parentElement.offsetWidth-f.parentElement.offsetWidth/2+"px",l===""&&(l=parseFloat(p.style.width)-u.clientWidth-(Math.floor(Math.random()*51)+50)+"");let $=p.querySelector(".line-part-1");$&&($.setAttribute("y1",u.clientHeight/2+""),$.setAttribute("y2",u.clientHeight/2+""),$.setAttribute("x1",parseFloat(p.style.width)-u.clientWidth+""),$.setAttribute("x2",l));let y=p.querySelector(".line-part-2");y&&$&&(y.setAttribute("y1",u.clientHeight/2-3+""),y.setAttribute("y2",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+4+""),y.setAttribute("x1",$.getAttribute("x2")+""),y.setAttribute("x2",$.getAttribute("x2")+""));let w=p.querySelector(".line-part-3");if(w&&y&&(w.setAttribute("y1",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+""),w.setAttribute("y2",u.clientHeight/2+parseFloat(p.style.height)-u.clientHeight+""),w.setAttribute("x1",y.getAttribute("x2")+""),w.setAttribute("x2",0+(u.clientWidth/2+20)+"")),d==0){let q=p.querySelector(".bf-instance-of");q&&w&&(q.style.display="block",q.setAttribute("x",p.clientWidth/2-100+""),q.setAttribute("y",u.clientHeight/2+parseFloat(p.style.height)-10-u.clientHeight+""))}}}}}}})}_extractLabelDescriptionFromXmlRDF(r,e){let t=null,s=null,i=new DOMParser().parseFromString(r,"text/xml"),o=i.documentElement,h=new XPathEvaluator().createNSResolver(o);if(e.indexOf("/resources/")>-1){let c=i.evaluate("//bf:mainTitle",o,h,XPathResult.ANY_TYPE,null),m=[],f=null;for(;f=c.iterateNext();)m.push(f);m.length>0&&(t=m[0].innerHTML)}else{let c=i.evaluate("//rdfs:label",o,h,XPathResult.ANY_TYPE,null),m=[],f=null;for(;f=c.iterateNext();)m.push(f);if(m.length>0)t=m[0].innerHTML;else{let p=i.evaluate("//skos:prefLabel",o,h,XPathResult.ANY_TYPE,null),u=[],x=null;for(;x=p.iterateNext();)u.push(x);u.length>0&&(t=u[0].innerHTML)}}let l=i.evaluate("//skos:definition",o,h,XPathResult.ANY_TYPE,null),a=[],d=null;for(;d=l.iterateNext();)a.push(d);return a.length>0&&(s=a[0].innerHTML),{label:t,desc:s,url:e}}_returnDereferenceInfo(r,e){if(!r)return"";let t=window.sessionStorage.getItem(r);return t==="pending"?"":t?JSON.parse(t)[e]:""}_dereference(r,e){if(this.finalDereferenceTimeout!==null&&window.clearTimeout(this.finalDereferenceTimeout),this.finalDereferenceTimeout=window.setTimeout(()=>{this.requestUpdate()},1e3),e==="predicate"&&je.indexOf(r)>-1||window.sessionStorage.getItem(`bf-diagram-${e}-${r}`))return!0;if(window.sessionStorage.setItem(`bf-diagram-${e}-${r}`,"pending"),e==="predicate"||e==="class"||e==="ontologies"){let t=r.split("/").pop(),s=`https://id.loc.gov/ontologies/bibframe/${t}`,i=`https://id.loc.gov/ontologies/bflc/${t}`,o;fetch(s,{method:"GET"}).then(async n=>{if(n.status===200){let h=await n.text();e==="class"||e==="ontologies"?o=`https://id.loc.gov/ontologies/bibframe.html#c_${t}`:o=`https://id.loc.gov/ontologies/bibframe.html#p_${t}`;let l=this._extractLabelDescriptionFromXmlRDF(h,o);window.sessionStorage.setItem(`bf-diagram-${e}-${r}`,JSON.stringify(l)),this.requestUpdate()}else throw"non-200"}).catch(n=>{console.error(n),fetch(i,{method:"GET"}).then(async h=>{if(h.status===200){let l=await h.text();e==="class"||e==="ontologies"?o=`https://id.loc.gov/ontologies/bflc.html#c_${t}`:o=`https://id.loc.gov/ontologies/bflc.html#p_${t}`;let a=this._extractLabelDescriptionFromXmlRDF(l,o);window.sessionStorage.setItem(`bf-diagram-${e}-${r}`,JSON.stringify(a)),this.requestUpdate()}}).catch(h=>{console.error(h)})})}else e==="vocabulary"||e==="authorities"||e==="agents"?fetch(r+".skos.rdf",{method:"GET"}).then(async t=>{if(t.status===200){let s=await t.text(),i=r,o=this._extractLabelDescriptionFromXmlRDF(s,i);window.sessionStorage.setItem(`bf-diagram-${e}-${r}`,JSON.stringify(o)),this.requestUpdate()}else throw"non-200"}).catch(t=>{console.error(t)}):e==="resources"&&fetch(r+".rdf",{method:"GET"}).then(async t=>{if(t.status===200){let s=await t.text(),i=r,o=this._extractLabelDescriptionFromXmlRDF(s,i);window.sessionStorage.setItem(`bf-diagram-${e}-${r}`,JSON.stringify(o)),this.requestUpdate()}else throw"non-200"}).catch(t=>{console.error(t)})}_mouseOverToolTip(r){if(r!==null&&r.target instanceof HTMLElement){let e=this._returnDereferenceInfo(r.target.dataset.derefid,"label"),t=this._returnDereferenceInfo(r.target.dataset.derefid,"desc"),s=this._returnDereferenceInfo(r.target.dataset.derefid,"url");if(e!=""){let i=e;t&&(i=i+` -- ${t}`),r.target.dataset.tip=i,r.target.setAttribute("href",s)}else r.target.classList.remove("tool")}}_processTxt(r){let e=[];for(let t of r){let s={indent:0,type:"",html:b``},i=t.match(/^(\s+)[a-zA-Z]/);i&&(s.indent=i[1].length/2),s.indent<2&&(this.processTxtCurrentParentPredicate="");let o=t.match(/^\s+([a-z][a-zA-Z]+)\:\s(https*:\/\/.*$)/),n=t.match(/^\s+([a-z][a-zA-Z0-9\-]+)\:\s(?!http)(.*)$/),h=t.match(/^\s+([a-z]+[a-zA-Z]+)$/),l=t.match(/^\s+([A-Z]+[a-zA-Z]+)$/);if(o){let a=o[1],d=o[2],c=d;if(s.indent==2&&(this.processTxtCurrentParentPredicate=a),this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(a,"predicate"),s.type="predicate",d.indexOf("/vocabulary/")>-1?(this._dereference(d,"vocabulary"),s.type="vocabulary",c=c.replace("http://id.loc.gov/vocabulary/","").replace("/",":")):d.indexOf("/ontologies/")>-1?(this._dereference(d,"ontologies"),s.type="ontologies",c=c.replace("http://id.loc.gov/ontologies/bibframe/","bf:"),c=c.replace("http://id.loc.gov/ontologies/bflc/","bflc:")):d.indexOf("/resources/")>-1?(this._dereference(d,"resources"),c=c.replace("http://id.loc.gov/resources/works/","works:"),c=c.replace("http://id.loc.gov/resources/instances/","instances:"),c=c.replace("http://id.loc.gov/resources/instances","instances:instance"),s.type="resources"):d.indexOf("/authorities/")>-1?(this._dereference(d,"authorities"),s.type="authorities",c=c.replace("http://id.loc.gov/authorities/","").replace("/",":")):d.indexOf("/rwo/agents/")>-1&&(this._dereference(d,"agents"),s.type="agents",c=c.replace("http://id.loc.gov/rwo/","").replace("/",":")),s.html=b`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${a}`}" class="tool">${a}</a>: <a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-${s.type}-${d}`}" class="tool object-value">${c}</a> </div>`}else if(n){let a=n[1],d=n[2];if(s.indent==2&&(this.processTxtCurrentParentPredicate=a),this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(a,"predicate"),s.html=b`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${a}`}" class="tool">${a}</a>: ${d}</div>`}else if(h){let a=h[1];if(s.indent==2&&(this.processTxtCurrentParentPredicate=a),this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(a,"predicate"),s.html=b`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${a}`}" class="tool">${a}</a></div>`}else if(l){let a=l[1];if(this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate)>-1)continue;this._dereference(a,"class"),s.html=b`<div class="statement space-mono-regular indent-${s.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-class-${a}`}" class="tool">${a}</a></div>`}else t.indexOf(" (bf:Instance)")>-1||t.indexOf(" (bf:Work)")>-1||t.indexOf(" (bf:Hub)")>-1;t.trim()!=""&&e.push(s)}return e}_buildRelantionships(r,e){let t=[],s=[];for(let i of e)if(r.type==="instance"){if(i.indexOf("instanceOf:")>-1){let o=i.split("/").pop();this.fixinstanceof?this.resources.works.length>0&&t.push(this.resources.works[0].id):o&&t.push(o)}}else if(r.type==="work"&&i.indexOf("hasInstance:")>-1){let o=i.split("/").pop();o&&s.push(o)}return{children:s,parents:t}}async firstUpdated(){let r=[],e=[],t=[],s=[];for(let n of this.instances.split(",")){if(n.trim().length==0)continue;let h=fetch(`${We}${n}.composed.txt`);e.push(n),r.push(h)}for(let n of this.works.split(",")){if(n.trim().length==0)continue;let h=fetch(`${Fe}${n}.composed.txt`);r.push(h),t.push(n)}for(let n of this.hubs.split(",")){if(n.trim().length==0)continue;let h=fetch(`${Be}${n}.composed.txt`);r.push(h),s.push(n)}let i;try{i=await Promise.all(r)}catch(n){console.error(n),alert(`BF-Diagram:
Error retrieving records, see console.`)}let o=[];if(i)for(let n of i){let h=await n.text();o.push(h)}for(let n of t)for(let h of o){let l=h.split(`
`);if(l[0].indexOf(n)>-1&&l[0].indexOf("bf:Work")>-1){let a={id:n,type:"work",parts:this._processTxt(l),parents:[],children:[]};a.children=this._buildRelantionships(a,l).children,this.resources.works.push(a),this.requestUpdate();break}}for(let n of e)for(let h of o){let l=h.split(`
`);if(l[0].indexOf(n)>-1&&l[0].indexOf("bf:Instance")>-1){let a={id:n,type:"instance",parts:this._processTxt(l),parents:[],children:[]};a.parents=this._buildRelantionships(a,l).parents,this.resources.instances.push(a),this.requestUpdate();break}}for(let n of s)for(let h of o){let l=h.split(`
`);if(l[0].indexOf(n)>-1&&l[0].indexOf("id.loc.gov/resources/hubs/")>-1){let a={id:n,type:"hub",parts:this._processTxt(l),parents:[],children:[]};this.resources.hubs.push(a),this.requestUpdate();break}}}render(){let r=[],e=[],t=[],s=[],i=[],o=0;for(let l of this.resources.instances){let a=[];for(let d of l.parts)a.push(d.html);r.push(b`<div class="instance">
          


        ${a}
      
      
      </div>`),i.push(b`

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

      
      `),s.push(b`

      <svg @click=${()=>{window.open("https://id.loc.gov/resources/instances/"+l.id,"_blank")}}  id="instance-${o}-svg" data-resource="instnace-${l.id}-icon" class="hidden-by-default instance-svg" version="1.1" viewbox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
          <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          <text x="0%" y="98%">instances/${l.id}</text>
        </svg>    

        
      `),o++}for(let l of this.resources.works){let a=[];for(let d of l.parts)a.push(d.html);e.push(b`<div class="work">
          <svg @click=${()=>{window.open("https://id.loc.gov/resources/works/"+l.id,"_blank")}} id="work-0-svg" data-resource="work-${l.id}-icon" class="work-svg" version="1.1" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
            <text x="10%" y="98%">works/${l.id}</text>
          </svg>
        ${a}
      </div>`)}let n=b``;this.resources.hubs.length>0&&(n=b`
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

    `);for(let l of this.resources.hubs){let a=[];for(let d of l.parts)a.push(d.html);t.push(b`<div class="hub">
          <svg @click=${()=>{window.open("https://id.loc.gov/resources/hubs/"+l.id,"_blank")}} data-resource="hub-${l.id}-icon" class="hub-svg" version="1.1" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
           
        
          
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
            <text x="10%" y="98%">hubs/${l.id.split("-")[0]+"..."}</text>
          </svg>
        ${a}
      </div>`)}let h=b`
    
      <div id="bf-diagram-container">
        <div>
          ${e}
          ${n}
          ${t}
        </div>
        <div class="instance-icons">
        
          ${s}
          
        </div>
        <div class="col-instnace">
          ${r}   
        </div>

        ${i}
        
      </div>
    
    `;return b`
      ${h}






    `}};v.styles=be`

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


  `;_([H({type:String})],v.prototype,"instances",2);_([H({type:String})],v.prototype,"works",2);_([H({type:String})],v.prototype,"hubs",2);_([H({type:String})],v.prototype,"ignore",2);_([H({type:Boolean})],v.prototype,"fixinstanceof",2);_([X()],v.prototype,"stateval",2);_([X()],v.prototype,"resources",2);_([X()],v.prototype,"finalDereferenceTimeout",2);_([X()],v.prototype,"processTxtCurrentParentPredicate",2);v=_([De("bf-diagram")],v);
