(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{17:function(e,n,t){e.exports=t(18)},18:function(e,n,t){"use strict";t.r(n);var i=t(10),a=t.n(i),o=t(13),r=t.n(o),d=t(6),l=t(14),s=t(15),c=t(16);function w(){return Object(i.useEffect)((function(){var e,n,t,i;function a(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)}function o(){t.render(n,e)}!function(){var o=document.createElement("div");document.body.appendChild(o),n=new d.s,e=new d.o(70,window.innerWidth/window.innerHeight,.01,20);var r=new d.a(16777215);n.add(r),(t=new d.w({antialias:!0,alpha:!0})).setPixelRatio(window.devicePixelRatio),t.setSize(window.innerWidth,window.innerHeight),t.outputEncoding=d.x,t.physicallyCorrectLights=!0,t.xr.enabled=!0,o.appendChild(t.domElement),(new l.a).setDataType(d.u).setPath("textures/equirectangular/").load("royal_esplanade_1k.hdr",(function(e){var t;e.mapping=d.e,t=e,n.traverse((function(e){e.isMesh&&(e.material.envMap=t)}))})),document.body.appendChild(s.a.createButton(t,{optionalFeatures:["light-estimation"]}));var c=new d.t(.175,32,32),w=new d.g;w.position.z=-2;for(var u=0;u<1;u++)for(var p=0;p<4;p++){var h=new d.m({color:14540253,reflectivity:p/4}),m=new d.l(c,h);m.position.set(.4*(u+.5-.5),.4*(p+.5-2),0),w.add(m)}n.add(w),(i=t.xr.getController(0)).addEventListener("select",(function(){w.position.set(0,0,-2).applyMatrix4(i.matrixWorld),w.quaternion.setFromRotationMatrix(i.matrixWorld)})),n.add(i),window.addEventListener("resize",a)}(),t.setAnimationLoop(o)}),[]),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null))}console.log(c.a);var u=document.getElementById("root");r.a.render(a.a.createElement(w,null),u)}},[[17,1,2]]]);
//# sourceMappingURL=main.10950d4d.chunk.js.map