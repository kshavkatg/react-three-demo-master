(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{17:function(e,n,t){e.exports=t(18)},18:function(e,n,t){"use strict";t.r(n);var i=t(10),a=t.n(i),o=t(14),r=t.n(o),d=t(6),s=t(15),c=t(16),l=t(12);function u(){return Object(i.useEffect)((function(){var e,n,t,i,a;function o(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)}function r(){t.render(n,e)}function u(e){n.traverse((function(n){n.isMesh&&(n.material.envMap=e)}))}!function(){var r=document.createElement("div");document.body.appendChild(r),n=new d.s,e=new d.o(70,window.innerWidth/window.innerHeight,.01,20);var w=new d.a(16777215);n.add(w),(t=new d.w({antialias:!0,alpha:!0})).setPixelRatio(window.devicePixelRatio),t.setSize(window.innerWidth,window.innerHeight),t.outputEncoding=d.x,t.physicallyCorrectLights=!0,t.xr.enabled=!0,r.appendChild(t.domElement);var p=new l.a(t);p.addEventListener("estimationstart",(function(){n.add(p),n.remove(w),p.environment&&u(p.environment)})),p.addEventListener("estimationend",(function(){n.add(w),n.remove(p),u(a)})),(new s.a).setDataType(d.u).setPath("textures/equirectangular/").load("royal_esplanade_1k.hdr",(function(e){e.mapping=d.e,u(a=e)})),document.body.appendChild(c.a.createButton(t,{optionalFeatures:["light-estimation"]}));var m=new d.t(.175,32,32),v=new d.g;v.position.z=-2;for(var h=0;h<1;h++)for(var f=0;f<4;f++){var g=new d.m({color:14540253,reflectivity:f/4}),x=new d.l(m,g);x.position.set(.4*(h+.5-.5),.4*(f+.5-2),0),v.add(x)}n.add(v),(i=t.xr.getController(0)).addEventListener("select",(function(){v.position.set(0,0,-2).applyMatrix4(i.matrixWorld),v.quaternion.setFromRotationMatrix(i.matrixWorld)})),n.add(i),window.addEventListener("resize",o)}(),t.setAnimationLoop(r)}),[]),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null))}console.log(l.a);var w=document.getElementById("root");r.a.render(a.a.createElement(u,null),w)}},[[17,1,2]]]);
//# sourceMappingURL=main.14ac29d5.chunk.js.map