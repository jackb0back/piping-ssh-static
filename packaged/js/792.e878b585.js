"use strict";(self["webpackChunkpiping_ssh_web"]=self["webpackChunkpiping_ssh_web"]||[]).push([[792],{6219:function(e,a,l){l.d(a,{j:function(){return v}});var u=l(4870),t=l(3396),i=l(2529);const n=(()=>{const e=(0,u.iH)((()=>window.localStorage.getItem(i.u.language)??(navigator.languages&&navigator.languages[0])??navigator.language??navigator.userLanguage)());return(0,t.YP)(e,(()=>{window.localStorage.setItem(i.u.language,e.value)})),e})(),o=()=>l.e(341).then(l.bind(l,9341)).then((e=>e.default)),r=()=>l.e(745).then(l.bind(l,6745)).then((e=>e.default)),s=o,v=(()=>{const e=(0,u.iH)();async function a(){n.value.startsWith("en")?e.value=await o():n.value.startsWith("ja")?e.value=await r():e.value=await s()}return a(),(0,t.YP)(n,(async()=>{await a()})),e})()},9792:function(e,a,l){l.r(a),l.d(a,{default:function(){return m}});var u=l(3396),t=l(9242),i=l(4870),n=l(473),o=l(6219),r=l(7865),s=l(5989),v=(0,u.aZ)({__name:"KeysEditor",props:{initialPublicKey:{},initialPrivateKey:{}},emits:["save"],setup(e,{emit:a}){const l=e,v=(0,i.iH)(!1),d=(0,i.iH)(""),m=(0,i.iH)(n.a3[2]),p=(0,i.iH)(l.initialPublicKey),c=(0,i.iH)(l.initialPrivateKey);async function g(e){const a=await(0,r.p8)(e);let l=a;const u=n.aY.value.map((e=>e.name));for(let t=2;u.includes(l);t++)l=`${a} (${t})`;d.value=l}async function b(){v.value&&a("save",{name:d.value,publicKey:p.value,privateKey:c.value,storeType:m.value})}return void 0!==l.initialPublicKey&&g(l.initialPublicKey),(0,u.YP)(p,(()=>{""===d&&void 0!==p.value&&g(p.value)})),(e,a)=>{const l=(0,u.up)("v-text-field"),r=(0,u.up)("v-radio"),g=(0,u.up)("v-radio-group"),y=(0,u.up)("v-textarea"),f=(0,u.up)("v-btn"),w=(0,u.up)("v-form"),V=(0,u.up)("v-sheet");return(0,u.wg)(),(0,u.j4)(V,{rounded:"lg",style:{padding:"1rem"}},{default:(0,u.w5)((()=>[(0,u.Wm)(w,{onSubmit:(0,t.iM)(b,["prevent"]),modelValue:v.value,"onUpdate:modelValue":a[4]||(a[4]=e=>v.value=e)},{default:(0,u.w5)((()=>[(0,u.Wm)(l,{label:"name",modelValue:d.value,"onUpdate:modelValue":a[0]||(a[0]=e=>d.value=e),variant:"solo-filled",rules:(0,i.SU)(s.R)("Name")},null,8,["modelValue","rules"]),(0,u.Wm)(g,{label:"Store type",modelValue:m.value,"onUpdate:modelValue":a[1]||(a[1]=e=>m.value=e),inline:""},{default:(0,u.w5)((()=>[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)((0,i.SU)(n.a3),(e=>((0,u.wg)(),(0,u.j4)(r,{id:e,label:(0,i.SU)(o.j)?.store_type(e)??"",value:e},null,8,["id","label","value"])))),256))])),_:1},8,["modelValue"]),(0,u.Wm)(y,{label:"public key",modelValue:p.value,"onUpdate:modelValue":a[2]||(a[2]=e=>p.value=e),variant:"solo-filled",rules:(0,i.SU)(s.R)("Private key")},null,8,["modelValue","rules"]),(0,u.Wm)(y,{label:"private key",modelValue:c.value,"onUpdate:modelValue":a[3]||(a[3]=e=>c.value=e),type:"password",variant:"solo-filled",rules:(0,i.SU)(s.R)("Private key")},null,8,["modelValue","rules"]),(0,u.Wm)(f,{type:"submit",disabled:!v.value,color:"secondary",class:"ma-1",text:"Save"},null,8,["disabled"])])),_:1},8,["onSubmit","modelValue"])])),_:1})}}});const d=v;var m=d}}]);
//# sourceMappingURL=792.e878b585.js.map