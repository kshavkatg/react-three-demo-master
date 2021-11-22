(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{10:function(t,e,i){},11:function(t,e,i){"use strict";i.r(e);var s=i(1),o=i.n(s),n=i(3),r=i.n(n),l=i(0),a=i(4);class c extends l.c{constructor(t){if(super(),void 0===t)return void console.error("ControllerGestures must be passed a renderer");const e=new l.a;this.controller1=t.xr.getController(0),this.controller1.userData.gestures={index:0},this.controller1.userData.selectPressed=!1,this.controller1.addEventListener("selectstart",s),this.controller1.addEventListener("selectend",o),this.controller2=t.xr.getController(1),this.controller2.userData.gestures={index:1},this.controller2.userData.selectPressed=!1,this.controller2.addEventListener("selectstart",s),this.controller2.addEventListener("selectend",o),this.doubleClickLimit=.2,this.pressMinimum=.4,this.right=new l.m(1,0,0),this.up=new l.m(0,1,0),this.type="unknown",this.touchCount=0,this.clock=e;const i=this;function s(){const t=this.userData.gestures;t.startPosition=void 0,t.startTime=e.getElapsedTime(),-1==i.type.indexOf("tap")&&(t.taps=0),i.type="unknown",this.userData.selectPressed=!0,i.touchCount++,console.log("onSelectStart touchCount: ".concat(i.touchCount))}function o(){const t=this.userData.gestures;t.endTime=e.getElapsedTime();const s=t.endTime-t.startTime;if("swipe"===i.type){const e=i.controller1.position.y<t.startPosition.y?"DOWN":"UP";i.dispatchEvent({type:"swipe",direction:e}),i.type="unknown"}else"pinch"!==i.type&&"rotate"!==i.type&&"pan"!==i.type?s<i.doubleClickLimit?(i.type="tap",t.taps++):s>i.pressMinimum&&(i.dispatchEvent({type:"press",position:i.controller1.position,matrixWorld:i.controller1.matrixWorld}),i.type="unknown"):i.type="unknown";this.userData.selectPressed=!1,t.startPosition=void 0,i.touchCount--}}get multiTouch(){let t;t=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed&&this.controller2.userData.selectPressed);return console.log("ControllerGestures multiTouch: ".concat(t," touchCount:").concat(this.touchCount)),t}get touch(){let t;return t=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed||this.controller2.userData.selectPressed),t}get debugMsg(){return this.type}update(){const t=this.controller1.userData.gestures,e=this.controller2.userData.gestures,i=this.clock.getElapsedTime();let s;if(this.controller1.userData.selectPressed&&void 0===t.startPosition&&(s=i-t.startTime,s>.05&&(t.startPosition=this.controller1.position.clone())),this.controller2.userData.selectPressed&&void 0===e.startPosition&&(s=i-e.startTime,s>.05&&(e.startPosition=this.controller2.position.clone())),!this.controller1.userData.selectPressed&&"tap"===this.type&&(s=this.clock.getElapsedTime()-t.endTime,s>this.doubleClickLimit)){switch(t.taps){case 1:this.dispatchEvent({type:"tap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 2:this.dispatchEvent({type:"doubletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 3:this.dispatchEvent({type:"tripletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 4:this.dispatchEvent({type:"quadtap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld})}this.type="unknown",t.taps=0}if("unknown"===this.type&&this.touch){if(void 0!==t.startPosition)if(this.multiTouch){if(void 0!==e.startPosition){const i=t.startPosition.distanceTo(e.startPosition),s=this.controller1.position.distanceTo(this.controller2.position)-i;if(Math.abs(s)>.01)this.type="pinch",this.startDistance=this.controller1.position.distanceTo(this.controller2.position),this.dispatchEvent({type:"pinch",delta:0,scale:1,initialise:!0});else{const i=e.startPosition.clone().sub(t.startPosition).normalize(),s=this.controller2.position.clone().sub(this.controller1.position).normalize(),o=i.angleTo(s);Math.abs(o)>.2&&(this.type="rotate",this.startVector=s.clone(),this.dispatchEvent({type:"rotate",theta:0,initialise:!0}))}}}else{let e=t.startPosition.distanceTo(this.controller1.position);s=this.clock.getElapsedTime()-t.startTime;const i=e/s;if(e>.01&&i>.1){const e=this.controller1.position.clone().sub(t.startPosition);Math.abs(e.y)>Math.abs(e.x)&&Math.abs(e.y)>Math.abs(e.z)&&(this.type="swipe")}else e>.006&&i<.03&&(this.type="pan",this.startPosition=this.controller1.position.clone(),this.dispatchEvent({type:"pan",delta:new l.m,initialise:!0}))}}else if("pinch"===this.type){const t=this.controller1.position.distanceTo(this.controller2.position),e=t-this.startDistance,i=t/this.startDistance;this.dispatchEvent({type:"pinch",delta:e,scale:i})}else if("rotate"===this.type){const t=this.controller2.position.clone().sub(this.controller1.position).normalize();let e=this.startVector.angleTo(t);const i=this.startVector.clone().cross(t);this.up.dot(i)>0&&(e=-e),this.dispatchEvent({type:"rotate",theta:e})}else if("pan"===this.type){const t=this.controller1.position.clone().sub(this.startPosition);this.dispatchEvent({type:"pan",delta:t})}}}function h(t){let{onStartClick:e}=t;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"start_view"},o.a.createElement("img",{className:"start_view_heart",src:"./images/white_heart.png",alt:"logo"})))}function d(){return Object(s.useEffect)(()=>{let t,e,i,s,o,n,r;function h(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)}function d(t,o){s.render(i,e)}!function(){t=document.querySelector(".scene"),i=new l.j;const d=(new l.k).load("./textures/silhouette.png");e=new l.g(70,window.innerWidth/window.innerHeight,.01,20);const p=new l.d(16777215,12303359,1);p.position.set(.5,1,.25),i.add(p),s=new l.n({antialias:!0,alpha:!0}),s.setPixelRatio(window.devicePixelRatio),s.setSize(window.innerWidth,window.innerHeight),s.xr.enabled=!0,t.appendChild(s.domElement);const u=new c(s);n=new l.i,console.log("camera.position",e.position);e.position;r=new l.l;u.addEventListener("tap",t=>{console.log("tap"),r.x=t.clientX/window.innerWidth*2-1,r.y=-t.clientY/window.innerHeight*2+1,console.log(r.x,r.y)});const m=new l.e(new l.h(100,100,1,1),new l.f({side:l.b,transparent:!0,opacity:0}));m.rotation.x=Math.PI/2,m.position.set(0,-1.4,-2),i.add(m),document.body.appendChild(a.a.createButton(s,{requiredFeatures:["hit-test"]}));const w=new l.h(.7,2,1),y=new l.f({transparent:!0,side:l.b,map:d}),g=new l.e(w,y);i.add(g),g.visible=!1,o=s.xr.getController(0),o.addEventListener("select",(function(){n.setFromCamera(r,e);const t=n.intersectObjects(i.children,!1)[0].point;console.log(t),g.visible?g.visible&&g.position.set(t.x,t.y+1,t.z):(g.position.set(t.x,t.y+1,t.z),g.visible=!0)})),i.add(o),window.addEventListener("resize",h)}(),s.setAnimationLoop(d)},[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(h,null),o.a.createElement("div",{className:"scene"}))}i(10);const p=document.getElementById("root");r.a.render(o.a.createElement(d,null),p)},5:function(t,e,i){t.exports=i(11)}},[[5,1,2]]]);
//# sourceMappingURL=main.f7700242.chunk.js.map