(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{15:function(t,e,i){t.exports=i(22)},22:function(t,e,i){"use strict";i.r(e);var o=i(10),n=i.n(o),s=i(13),r=i.n(s),a=i(6),l=(i(20),i(14)),c=i(0),d=i(1),h=i(11),p=i(8),u=i(2),v=i(3),w=function(t){Object(u.a)(i,t);var e=Object(v.a)(i);function i(t){var o;if(Object(c.a)(this,i),o=e.call(this),void 0===t)return console.error("ControllerGestures must be passed a renderer"),Object(h.a)(o);var n=new a.a;o.controller1=t.xr.getController(0),o.controller1.userData.gestures={index:0},o.controller1.userData.selectPressed=!1,o.controller1.addEventListener("selectstart",r),o.controller1.addEventListener("selectend",l),o.controller2=t.xr.getController(1),o.controller2.userData.gestures={index:1},o.controller2.userData.selectPressed=!1,o.controller2.addEventListener("selectstart",r),o.controller2.addEventListener("selectend",l),o.doubleClickLimit=.2,o.pressMinimum=.4,o.right=new a.x(1,0,0),o.up=new a.x(0,1,0),o.type="unknown",o.touchCount=0,o.clock=n;var s=Object(p.a)(o);function r(){var t=this.userData.gestures;t.startPosition=void 0,t.startTime=n.getElapsedTime(),-1==s.type.indexOf("tap")&&(t.taps=0),s.type="unknown",this.userData.selectPressed=!0,s.touchCount++,console.log("onSelectStart touchCount: ".concat(s.touchCount))}function l(){var t=this.userData.gestures;t.endTime=n.getElapsedTime();var e=t.endTime-t.startTime;if("swipe"===s.type){var i=s.controller1.position.y<t.startPosition.y?"DOWN":"UP";s.dispatchEvent({type:"swipe",direction:i}),s.type="unknown"}else"pinch"!==s.type&&"rotate"!==s.type&&"pan"!==s.type?e<s.doubleClickLimit?(s.type="tap",t.taps++):e>s.pressMinimum&&(s.dispatchEvent({type:"press",position:s.controller1.position,matrixWorld:s.controller1.matrixWorld}),s.type="unknown"):s.type="unknown";this.userData.selectPressed=!1,t.startPosition=void 0,s.touchCount--}return o}return Object(d.a)(i,[{key:"update",value:function(){var t=this.controller1.userData.gestures,e=this.controller2.userData.gestures,i=this.clock.getElapsedTime();if(this.controller1.userData.selectPressed&&void 0===t.startPosition&&i-t.startTime>.05&&(t.startPosition=this.controller1.position.clone()),this.controller2.userData.selectPressed&&void 0===e.startPosition&&i-e.startTime>.05&&(e.startPosition=this.controller2.position.clone()),!this.controller1.userData.selectPressed&&"tap"===this.type&&this.clock.getElapsedTime()-t.endTime>this.doubleClickLimit){switch(t.taps){case 1:this.dispatchEvent({type:"tap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 2:this.dispatchEvent({type:"doubletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 3:this.dispatchEvent({type:"tripletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 4:this.dispatchEvent({type:"quadtap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld})}this.type="unknown",t.taps=0}if("unknown"===this.type&&this.touch){if(void 0!==t.startPosition)if(this.multiTouch){if(void 0!==e.startPosition){var o=t.startPosition.distanceTo(e.startPosition),n=this.controller1.position.distanceTo(this.controller2.position)-o;if(Math.abs(n)>.01)this.type="pinch",this.startDistance=this.controller1.position.distanceTo(this.controller2.position),this.dispatchEvent({type:"pinch",delta:0,scale:1,initialise:!0});else{var s=e.startPosition.clone().sub(t.startPosition).normalize(),r=this.controller2.position.clone().sub(this.controller1.position).normalize(),l=s.angleTo(r);Math.abs(l)>.2&&(this.type="rotate",this.startVector=r.clone(),this.dispatchEvent({type:"rotate",theta:0,initialise:!0}))}}}else{var c=t.startPosition.distanceTo(this.controller1.position),d=c/(this.clock.getElapsedTime()-t.startTime);if(c>.01&&d>.1){var h=this.controller1.position.clone().sub(t.startPosition);Math.abs(h.y)>Math.abs(h.x)&&Math.abs(h.y)>Math.abs(h.z)&&(this.type="swipe")}else c>.006&&d<.03&&(this.type="pan",this.startPosition=this.controller1.position.clone(),this.dispatchEvent({type:"pan",delta:new a.x,initialise:!0}))}}else if("pinch"===this.type){var p=this.controller1.position.distanceTo(this.controller2.position),u=p-this.startDistance,v=p/this.startDistance;this.dispatchEvent({type:"pinch",delta:u,scale:v})}else if("rotate"===this.type){var w=this.controller2.position.clone().sub(this.controller1.position).normalize(),m=this.startVector.angleTo(w),y=this.startVector.clone().cross(w);this.up.dot(y)>0&&(m=-m),this.dispatchEvent({type:"rotate",theta:m})}else if("pan"===this.type){var f=this.controller1.position.clone().sub(this.startPosition);this.dispatchEvent({type:"pan",delta:f})}}},{key:"multiTouch",get:function(){var t;t=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed&&this.controller2.userData.selectPressed);return console.log("ControllerGestures multiTouch: ".concat(t," touchCount:").concat(this.touchCount)),t}},{key:"touch",get:function(){return void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed||this.controller2.userData.selectPressed)}},{key:"debugMsg",get:function(){return this.type}}]),i}(a.e);function m(){return Object(o.useEffect)((function(){var t,e,i,o,n,s,r,c=null,d=!1;function h(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)}function p(t,n){if(n){o.xr.getReferenceSpace();var s=o.xr.getSession();if(!1===d&&(s.requestReferenceSpace("viewer").then((function(t){s.requestHitTestSource({space:t}).then((function(t){c=t}))})),s.addEventListener("end",(function(){d=!1,c=null})),d=!0),c){var r=n.getHitTestResults(c);if(r.length)r[0]}}o.render(i,e)}!function(){t=document.querySelector(".scene"),i=new a.t;var c=(new a.u).load("./textures/silhouette.png");e=new a.n(70,window.innerWidth/window.innerHeight,.01,20);var d=new a.h(16777215,12303359,1);d.position.set(.5,1,.25),i.add(d),(o=new a.y({antialias:!0,alpha:!0})).setPixelRatio(window.devicePixelRatio),o.setSize(window.innerWidth,window.innerHeight),o.xr.enabled=!0,t.appendChild(o.domElement);var p=new w(o);s=new a.s,console.log("camera.position",e.position);e.position;r=new a.w;var u=function(t){console.log("tap"),r.x=t.clientX/window.innerWidth*2-1,r.y=-t.clientY/window.innerHeight*2+1,console.log(r.x,r.y)};document.body.addEventListener("click",u),p.addEventListener("tap",u);var v=new a.k(new a.o(100,100,1,1),new a.l({side:a.d,transparent:!0,opacity:0}));v.rotation.x=Math.PI/2,v.position.set(0,-1.4,-2),i.add(v),document.body.appendChild(l.a.createButton(o,{requiredFeatures:["hit-test"]}));var m=new a.o(.7,2,1),y=new a.l({transparent:!0,side:a.d,map:c}),f=new a.k(m,y);i.add(f),f.visible=!1,(n=o.xr.getController(0)).addEventListener("select",(function(){s.setFromCamera(r,e);var t=s.intersectObjects(i.children,!1)[0].point;console.log(t),f.visible?f.visible&&f.position.set(t.x,t.y+1,t.z):(f.position.set(t.x,t.y+1,t.z),f.visible=!0)})),i.add(n),window.addEventListener("resize",h)}(),o.setAnimationLoop(p)}),[]),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"scene"}))}var y=document.getElementById("root");r.a.render(n.a.createElement(m,null),y)}},[[15,1,2]]]);
//# sourceMappingURL=main.0bdac3b2.chunk.js.map