(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{15:function(e,n,t){e.exports=t(16)},16:function(e,n,t){"use strict";t.r(n);var i=t(10),r=t.n(i),a=t(13),o=t.n(a),d=t(6),s=(t(21),t(14));t(23);function c(){return Object(i.useEffect)((function(){var e,n,t,i,r,a,o=null,c=!1;function w(){n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)}function l(e,r){if(r){var d=i.xr.getReferenceSpace(),s=i.xr.getSession();if(!1===c&&(s.requestReferenceSpace("viewer").then((function(e){s.requestHitTestSource({space:e}).then((function(e){o=e}))})),s.addEventListener("end",(function(){c=!1,o=null})),c=!0),o){var w=r.getHitTestResults(o);if(w.length){var l=w[0];a.visible=!0,a.matrix.fromArray(l.getPose(d).transform.matrix)}else a.visible=!1}}i.render(t,n)}!function(){e=document.createElement("div"),document.body.appendChild(e),t=new d.x,n=new d.r(70,window.innerWidth/window.innerHeight,.01,20);var o=new d.i(16777215,12303359,1);o.position.set(.5,1,.25),t.add(o),(i=new d.A({antialias:!0,alpha:!0})).setPixelRatio(window.devicePixelRatio),i.setSize(window.innerWidth,window.innerHeight),i.xr.enabled=!0,e.appendChild(i.domElement);var c=new d.m(new d.s(10,10,1,1),new d.p({side:new d.e}));c.rotation.x=Math.PI/2,c.position.y=-1,t.add(c),document.body.appendChild(s.a.createButton(i,{requiredFeatures:["hit-test"]}));var l=new d.a(.1,.1,.2,32).translate(0,.1,0);(r=i.xr.getController(0)).addEventListener("select",(function(){if(a.visible){var e=new d.o({color:16777215*Math.random()}),n=new d.m(l,e);n.position.setFromMatrixPosition(a.matrix),n.scale.y=2*Math.random()+1,t.add(n)}})),t.add(r),(a=new d.m(new d.w(.15,.2,32).rotateX(-Math.PI/2),new d.n)).matrixAutoUpdate=!1,a.visible=!1,t.add(a),window.addEventListener("resize",w)}(),i.setAnimationLoop(l)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"scene"}))}var w=document.getElementById("root");o.a.render(r.a.createElement(c,null),w)}},[[15,1,2]]]);
//# sourceMappingURL=main.3b7d4b66.chunk.js.map