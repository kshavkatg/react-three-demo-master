(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{15:function(e,n,t){e.exports=t(16)},16:function(e,n,t){"use strict";t.r(n);var i=t(10),r=t.n(i),o=t(13),a=t.n(o),d=t(6),s=(t(21),t(14));t(23);function c(){return Object(i.useEffect)((function(){var e,n,t,i,r,o,a,c,l=null,w=!1;function u(){n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)}function h(e,r){if(r){var a=i.xr.getReferenceSpace(),d=i.xr.getSession();if(!1===w&&(d.requestReferenceSpace("viewer").then((function(e){d.requestHitTestSource({space:e}).then((function(e){l=e}))})),d.addEventListener("end",(function(){w=!1,l=null})),w=!0),l){var s=r.getHitTestResults(l);if(s.length){var c=s[0];o.visible=!0,o.matrix.fromArray(c.getPose(a).transform.matrix)}else o.visible=!1}}i.render(t,n)}!function(){e=document.querySelector(".scene"),t=new d.x;var l=(new d.y).load("./textures/silhouette.png");n=new d.q(70,window.innerWidth/window.innerHeight,.01,20);var w=new d.h(16777215,12303359,1);w.position.set(.5,1,.25),t.add(w),(i=new d.C({antialias:!0,alpha:!0})).setPixelRatio(window.devicePixelRatio),i.setSize(window.innerWidth,window.innerHeight),i.xr.enabled=!0,e.appendChild(i.domElement),a=new d.v,console.log("camera.position",n.position);n.position;c=new d.A;document.body.addEventListener("click",(function(e){c.x=e.clientX/window.innerWidth*2-1,c.y=-e.clientY/window.innerHeight*2+1,console.log(c.x,c.y)}));var h=new d.l(new d.r(10,10,1,1),new d.o({side:d.d,transparent:!0,map:l}));h.rotation.x=Math.PI/2,h.position.set(0,-1,-2),t.add(h),document.body.appendChild(s.a.createButton(i,{requiredFeatures:["hit-test"]}));var p=new d.r(.1,.1,.2,32).translate(0,.1,0);(r=i.xr.getController(0)).addEventListener("select",(function(){var e=new d.n({color:16777215*Math.random()}),i=new d.l(p,e);a.setFromCamera(c,n);var r=a.intersectObjects(t.children,!1)[0].point;console.log(r),i.position.set(r.x,r.y,r.z),t.add(i)})),t.add(r),(o=new d.l(new d.w(.15,.2,32).rotateX(-Math.PI/2),new d.m)).matrixAutoUpdate=!1,o.visible=!1,t.add(o),window.addEventListener("resize",u)}(),i.setAnimationLoop(h)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"scene"}))}var l=document.getElementById("root");a.a.render(r.a.createElement(c,null),l)}},[[15,1,2]]]);
//# sourceMappingURL=main.3d9880e5.chunk.js.map