module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=27)}([function(e,t,r){"use strict";var n=r(1),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function o(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===i.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:function(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:o,isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:c,merge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]=r}for(var n=0,i=arguments.length;n<i;n++)c(arguments[n],r);return t},deepMerge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]="object"==typeof r?e({},r):r}for(var n=0,i=arguments.length;n<i;n++)c(arguments[n],r);return t},extend:function(e,t,r){return c(t,(function(t,i){e[i]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";var n=r(0);function i(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(n.isURLSearchParams(t))s=t.toString();else{var o=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),o.push(i(t)+"="+i(e))})))})),s=o.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";(function(t){var n=r(0),i=r(16),s={"Content-Type":"application/x-www-form-urlencoded"};function o(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,u={adapter:("undefined"!=typeof XMLHttpRequest?a=r(5):void 0!==t&&"[object process]"===Object.prototype.toString.call(t)&&(a=r(5)),a),transformRequest:[function(e,t){return i(t,"Accept"),i(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(o(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(o(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){u.headers[e]=n.merge(s)})),e.exports=u}).call(this,r(15))},function(e,t,r){"use strict";var n=r(0),i=r(17),s=r(2),o=r(19),a=r(22),u=r(23),c=r(6);e.exports=function(e){return new Promise((function(t,l){var f=e.data,h=e.headers;n.isFormData(f)&&delete h["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",m=e.auth.password||"";h.Authorization="Basic "+btoa(p+":"+m)}var v=o(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),s(v,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in d?a(d.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:r,config:e,request:d};i(t,l,n),d=null}},d.onabort=function(){d&&(l(c("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){l(c("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),l(c(t,e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var g=r(24),y=(e.withCredentials||u(v))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;y&&(h[e.xsrfHeaderName]=y)}if("setRequestHeader"in d&&n.forEach(h,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete h[t]:d.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),l(e),d=null)})),void 0===f&&(f=null),d.send(f)}))}},function(e,t,r){"use strict";var n=r(18);e.exports=function(e,t,r,i,s){var o=new Error(e);return n(o,t,r,i,s)}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){t=t||{};var r={},i=["url","method","params","data"],s=["headers","auth","proxy"],o=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];n.forEach(i,(function(e){void 0!==t[e]&&(r[e]=t[e])})),n.forEach(s,(function(i){n.isObject(t[i])?r[i]=n.deepMerge(e[i],t[i]):void 0!==t[i]?r[i]=t[i]:n.isObject(e[i])?r[i]=n.deepMerge(e[i]):void 0!==e[i]&&(r[i]=e[i])})),n.forEach(o,(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])}));var a=i.concat(s).concat(o),u=Object.keys(t).filter((function(e){return-1===a.indexOf(e)}));return n.forEach(u,(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])})),r}},function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,r){e.exports=r(10)},function(e,t,r){"use strict";var n=r(0),i=r(1),s=r(11),o=r(7);function a(e){var t=new s(e),r=i(s.prototype.request,t);return n.extend(r,s.prototype,t),n.extend(r,t),r}var u=a(r(4));u.Axios=s,u.create=function(e){return a(o(u.defaults,e))},u.Cancel=r(8),u.CancelToken=r(25),u.isCancel=r(3),u.all=function(e){return Promise.all(e)},u.spread=r(26),e.exports=u,e.exports.default=u},function(e,t,r){"use strict";var n=r(0),i=r(2),s=r(12),o=r(13),a=r(7);function u(e){this.defaults=e,this.interceptors={request:new s,response:new s}}u.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[o,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},u.prototype.getUri=function(e){return e=a(this.defaults,e),i(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){u.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}})),n.forEach(["post","put","patch"],(function(e){u.prototype[e]=function(t,r,i){return this.request(n.merge(i||{},{method:e,url:t,data:r}))}})),e.exports=u},function(e,t,r){"use strict";var n=r(0);function i(){this.handlers=[]}i.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},i.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},i.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=i},function(e,t,r){"use strict";var n=r(0),i=r(14),s=r(3),o=r(4);function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||o.adapter)(e).then((function(t){return a(e),t.data=i(t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(a(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},function(e,t){var r,n,i=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var u,c=[],l=!1,f=-1;function h(){l&&u&&(l=!1,u.length?c=u.concat(c):f=-1,c.length&&d())}function d(){if(!l){var e=a(h);l=!0;for(var t=c.length;t;){for(u=c,c=[];++f<t;)u&&u[f].run();f=-1,t=c.length}u=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new p(e,t)),1!==c.length||l||a(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},function(e,t,r){"use strict";var n=r(6);e.exports=function(e,t,r){var i=r.config.validateStatus;!i||i(r.status)?e(r):t(n("Request failed with status code "+r.status,r.config,null,r.request,r))}},function(e,t,r){"use strict";e.exports=function(e,t,r,n,i){return e.config=t,r&&(e.code=r),e.request=n,e.response=i,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,r){"use strict";var n=r(20),i=r(21);e.exports=function(e,t){return e&&!n(t)?i(e,t):t}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var n=r(0),i=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,s,o={};return e?(n.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=n.trim(e.substr(0,s)).toLowerCase(),r=n.trim(e.substr(s+1)),t){if(o[t]&&i.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([r]):o[t]?o[t]+", "+r:r}})),o):o}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function i(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=i(window.location.href),function(t){var r=n.isString(t)?i(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,i,s,o){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(i)&&a.push("path="+i),n.isString(s)&&a.push("domain="+s),!0===o&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";var n=r(8);function i(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}i.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},i.source=function(){var e;return{token:new i((function(t){e=t})),cancel:e}},e.exports=i},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,r){"use strict";r.r(t);var n=r(9),i=r.n(n);var s=class{constructor(){this.errors={}}has(e){return this.errors.hasOwnProperty(e)}any(){return Object.keys(this.errors).length>0}size(){return Object.keys(this.errors).length}get(e){if(this.errors[e])return this.errors[e][0]}first(){if(Object.values(this.errors).length>0)return Object.values(this.errors)[0][0]}all(){return this.errors}record(e){this.errors=e}clear(e){e?delete this.errors[e]:this.errors={}}};var o=class{validateBoolean(e){return[!0,!1,1,0,"1","0"].includes(e)}validateString(e){return"string"==typeof e}validateInteger(e){return Number.isInteger(e)}validateObject(e){return e instanceof Object&&!(e instanceof Array)}validateMax(e,t){return"number"==typeof e?e<=t:e.length<=t}validateMin(e,t){return"number"==typeof e?e>=t:e.length>=t}validateRequired(e){return null!=e}validateNull(e){return null==e}validateLength(e,t){return e.length==t}validateArray(e){return Array.isArray(e)}validateEquals(e,t){return Array.isArray(e)&&Array.isArray(t)?JSON.stringify(e)==JSON.stringify(t):e==t}validateGreaterThan(e,t){return e>t}validateLessThan(e,t){return e<t}validateGreaterThanOrEquals(e,t){return this.validateGreaterThan(e,t)||this.validateEquals(e,t)}validateLessThanOrEquals(e,t){return this.validateLessThan(e,t)||this.validateEquals(e,t)}validateBetween(e,t,r){return this.validateLessThan(e,r)&&this.validateGreaterThan(e,t)}validateInArray(e,t){return t.includes(e)}};var a=class{constructor(){this.formData={},this.rules=new o,this.errors={}}validate(e,t){let r={};return t.forEach(t=>{let n=this.validateSingleRule(e,t);r[t]=n}),{valid:Object.values(r).every(e=>1==e),validations:r}}validateSingleRule(e,t){let r=this._getRuleName(t),n=this._getRuleParameters(t);return"string"==r?this.rules.validateString(e):"integer"==r?this.rules.validateInteger(e):"boolean"==r?this.rules.validateBoolean(e):"object"==r?this.rules.validateObject(e):"max"==r?this.rules.validateMax(e,n[0]):"min"==r?this.rules.validateMin(e,n[0]):"required"==r?this.rules.validateRequired(e):"null"==r?this.rules.validateNull(e):"length"==r?this.rules.validateLength(e,n[0]):"array"==r?this.rules.validateArray(e):"equal"==r?this.rules.validateEquals(e,n[0]):"gt"==r?this.rules.validateGreaterThan(e,n[0]):"gte"==r?this.rules.validateGreaterThanOrEquals(e,n[0]):"lt"==r?this.rules.validateLessThan(e,n[0]):"lte"==r?this.rules.validateLessThanOrEquals(e,n[0]):"between"==r?this.rules.validateBetween(e,n[0],n[1]):"in"==r&&this.rules.validateInArray(e,n)}_getRuleName(e){return e.split(":")[0]}_getRuleParameters(e){let t=null,r=e.match(/(?:.*[:])(?<parameters>.*)/);return r&&r.groups.parameters&&(t=r.groups.parameters.split(",")),t}};var u=class{constructor(e){this.originalData={},this.errors=new s,this.validator=new a,this.headers={},this.files={},this.rules={},this.isValid=!1,this.hasFiles=!1,this.formData=new FormData,this.submitting=!1,this.submittable=!0,this.beforeSubmitCallback=null,this.afterSubmitCallback=null,this.afterSuccessCallback=null,this.afterFailCallback=null;for(let t in e)"string"==typeof e[t]||"number"==typeof e[t]?this._setPropertyFromString(t,e[t]):(this._setPropertyFromObject(t,e[t]),this._setRulesForProperty(t,e[t]))}_setPropertyFromString(e,t){this.originalData[e]=t,this[e]=t}_setPropertyFromObject(e,t){this.originalData[e]=t.value,this[e]=t.value}_setRulesForProperty(e,t){t.rules&&(this.rules[e]="string"==typeof t.rules?t.rules.split("|"):t.rules)}data(){let e={};for(let t in this.originalData)e[t]=this[t];return e}addFile(e){e.target.files[0]&&(this.formData.append(e.target.name,e.target.files[0]),this.headers["Content-Type"]="multipart/form-data",this.hasFiles=!0)}getFiles(){return this.files}getFormData(){let e=this.data();return Object.keys(e).forEach(t=>{if(Array.isArray(e[t]))this.formData.delete(`${t}[]`),Object.values(e[t]).forEach(e=>this.formData.append(`${t}[]`,e));else{if(null==e[t])return;this.formData.append(t,e[t])}}),this.formData}reset(){for(let e in this.originalData)this[e]=null;this.errors.clear()}post(e){return this.submit("post",e)}get(e){return this.submit("get",e)}patch(e){return this.submit("patch",e)}delete(e){return this.submit("delete",e)}beforeSubmit(e){return this.beforeSubmitCallback=e,this}afterSubmit(e){return this.afterSubmitCallback=e,this}afterSuccess(e){return this.afterSuccessCallback=e,this}afterFail(e){return this.afterFailCallback=e,this}submit(e,t){if(!this.submittable)return void console.log("Form cannot be submitted.");if(this.validate(),!this.isValid)return void console.log("Form is not valid.");this.errors.clear(),this.submitting=!0,this.beforeSubmitCallback&&this.beforeSubmitCallback();let r=this.hasFiles?this.getFormData():this.data();return new Promise((n,s)=>{i.a[e](t,r,this.headers).then(e=>{this.onSuccess(e),n(e)}).catch(e=>{this.onFail(e.response),s(e.response)})})}onSuccess(e){this.afterSubmitCallback&&this.afterSubmitCallback(),this.afterSuccessCallback&&this.afterSuccessCallback(),this.submitting=!1}onFail(e){this.afterFailCallback&&this.afterFailCallback(),this.submitting=!1,this.errors.record(e)}validate(){if(!Object.keys(this.rules).length)return this.isValid=!0,!0;let e={};Object.keys(this.data()).forEach(t=>{let r=this.validator.validate(this[t],this.rules[t]);e[t]=r,r.valid});let t=Object.values(e).every(e=>1==e.valid);return this.isValid=t,{valid:t,validations:e}}};t.default=u}]);