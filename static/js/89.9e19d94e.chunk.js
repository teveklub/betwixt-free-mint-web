(this["webpackJsonpbetwixt-free-mint-web"]=this["webpackJsonpbetwixt-free-mint-web"]||[]).push([[89],{380:function(e,t,n){"use strict";n.r(t);var r=n(1),i=(n(158),n(159));n(80),n(132),n(131);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t,n,r,i,o,c){try{var a=e[o](c),u=a.value}catch(s){return void n(s)}a.done?t(u):Promise.resolve(u).then(r,i)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function c(e){u(o,r,i,c,a,"next",e)}function a(e){u(o,r,i,c,a,"throw",e)}c(void 0)}))}}t.default=function(e){var t=e.networkId,o=e.preferred,a=e.label,u=e.iconSrc,l=e.svg,f=e.buttonPosition,p=e.modalZIndex,b=e.apiKey,w=e.buildEnv,d=e.enableLogging,h=e.enabledVerifiers,g=e.loginConfig,v=e.showTorusButton,O=e.integrity,m=e.whiteLabel,y=e.loginMethod,j=e.rpcUrl;return{name:a||"Torus",svg:l||'<svg width="257" height="277" viewBox="0 0 257 277" fill="none" xmlns="http://www.w3.org/2000/svg">\n<rect width="153.889" height="82.0741" fill="#0364FF" />\n<rect x="71.8135" width="82.0741" height="277" fill="#0364FF" />\n<path d="M215.443 82.0741C238.107 82.0741 256.48 63.7012 256.48 41.037C256.48 18.3729 238.107 0 215.443 \n0C192.779 0 174.406 18.3729 174.406 41.037C174.406 63.7012 192.779 82.0741 215.443 82.0741Z" fill="#0364FF" />\n</svg>',iconSrc:u,wallet:function(){var e=s(Object(r.a)().mark((function e(o){var a,u,l,P,x;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=o.createModernProviderInterface,e.next=3,Promise.all([n.e(0),n.e(1),n.e(28),n.e(42)]).then(n.bind(null,1737));case 3:return u=e.sent,l=u.default,P=new l({buttonPosition:f,modalZIndex:p,apiKey:b}),e.next=8,P.init({buildEnv:w,enableLogging:d,network:{host:j||Object(i.m)(t),chainId:t,networkName:"".concat(Object(i.m)(t)," Network")},showTorusButton:v,enabledVerifiers:h,loginConfig:g,integrity:O,whiteLabel:m});case 8:return x=P.provider,e.abrupt("return",{provider:x,interface:c(c({},a(x)),{},{name:"Torus",dashboard:function(){return P.showWallet("home")},connect:function(){var e=s(Object(r.a)().mark((function e(){var t;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.login({verifier:y});case 2:return t=e.sent,e.abrupt("return",{message:t[0]});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),disconnect:function(){return P.cleanUp()}}),instance:P});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),type:"sdk",desktop:!0,mobile:!0,preferred:o}}}}]);
//# sourceMappingURL=89.9e19d94e.chunk.js.map