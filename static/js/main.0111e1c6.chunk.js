(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{10:function(t,e,o){"use strict";o.r(e);var s=o(1),i=o.n(s),n=o(3),r=o.n(n),l=o(0);class a extends l.c{constructor(t){if(super(),void 0===t)return void console.error("ControllerGestures must be passed a renderer");const e=new l.a;this.controller1=t.xr.getController(0),this.controller1.userData.gestures={index:0},this.controller1.userData.selectPressed=!1,this.controller1.addEventListener("selectstart",s),this.controller1.addEventListener("selectend",i),this.controller2=t.xr.getController(1),this.controller2.userData.gestures={index:1},this.controller2.userData.selectPressed=!1,this.controller2.addEventListener("selectstart",s),this.controller2.addEventListener("selectend",i),this.doubleClickLimit=.2,this.pressMinimum=.4,this.right=new l.m(1,0,0),this.up=new l.m(0,1,0),this.type="unknown",this.touchCount=0,this.clock=e;const o=this;function s(){const t=this.userData.gestures;t.startPosition=void 0,t.startTime=e.getElapsedTime(),-1==o.type.indexOf("tap")&&(t.taps=0),o.type="unknown",this.userData.selectPressed=!0,o.touchCount++,console.log("onSelectStart touchCount: ".concat(o.touchCount))}function i(){const t=this.userData.gestures;t.endTime=e.getElapsedTime();const s=t.endTime-t.startTime;if("swipe"===o.type){const e=o.controller1.position.y<t.startPosition.y?"DOWN":"UP";o.dispatchEvent({type:"swipe",direction:e}),o.type="unknown"}else"pinch"!==o.type&&"rotate"!==o.type&&"pan"!==o.type?s<o.doubleClickLimit?(o.type="tap",t.taps++):s>o.pressMinimum&&(o.dispatchEvent({type:"press",position:o.controller1.position,matrixWorld:o.controller1.matrixWorld}),o.type="unknown"):o.type="unknown";this.userData.selectPressed=!1,t.startPosition=void 0,o.touchCount--}}get multiTouch(){let t;t=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed&&this.controller2.userData.selectPressed);return console.log("ControllerGestures multiTouch: ".concat(t," touchCount:").concat(this.touchCount)),t}get touch(){let t;return t=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed||this.controller2.userData.selectPressed),t}get debugMsg(){return this.type}update(){const t=this.controller1.userData.gestures,e=this.controller2.userData.gestures,o=this.clock.getElapsedTime();let s;if(this.controller1.userData.selectPressed&&void 0===t.startPosition&&(s=o-t.startTime,s>.05&&(t.startPosition=this.controller1.position.clone())),this.controller2.userData.selectPressed&&void 0===e.startPosition&&(s=o-e.startTime,s>.05&&(e.startPosition=this.controller2.position.clone())),!this.controller1.userData.selectPressed&&"tap"===this.type&&(s=this.clock.getElapsedTime()-t.endTime,s>this.doubleClickLimit)){switch(t.taps){case 1:this.dispatchEvent({type:"tap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 2:this.dispatchEvent({type:"doubletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 3:this.dispatchEvent({type:"tripletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 4:this.dispatchEvent({type:"quadtap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld})}this.type="unknown",t.taps=0}if("unknown"===this.type&&this.touch){if(void 0!==t.startPosition)if(this.multiTouch){if(void 0!==e.startPosition){const o=t.startPosition.distanceTo(e.startPosition),s=this.controller1.position.distanceTo(this.controller2.position)-o;if(Math.abs(s)>.01)this.type="pinch",this.startDistance=this.controller1.position.distanceTo(this.controller2.position),this.dispatchEvent({type:"pinch",delta:0,scale:1,initialise:!0});else{const o=e.startPosition.clone().sub(t.startPosition).normalize(),s=this.controller2.position.clone().sub(this.controller1.position).normalize(),i=o.angleTo(s);Math.abs(i)>.2&&(this.type="rotate",this.startVector=s.clone(),this.dispatchEvent({type:"rotate",theta:0,initialise:!0}))}}}else{let e=t.startPosition.distanceTo(this.controller1.position);s=this.clock.getElapsedTime()-t.startTime;const o=e/s;if(e>.01&&o>.1){const e=this.controller1.position.clone().sub(t.startPosition);Math.abs(e.y)>Math.abs(e.x)&&Math.abs(e.y)>Math.abs(e.z)&&(this.type="swipe")}else e>.006&&o<.03&&(this.type="pan",this.startPosition=this.controller1.position.clone(),this.dispatchEvent({type:"pan",delta:new l.m,initialise:!0}))}}else if("pinch"===this.type){const t=this.controller1.position.distanceTo(this.controller2.position),e=t-this.startDistance,o=t/this.startDistance;this.dispatchEvent({type:"pinch",delta:e,scale:o})}else if("rotate"===this.type){const t=this.controller2.position.clone().sub(this.controller1.position).normalize();let e=this.startVector.angleTo(t);const o=this.startVector.clone().cross(t);this.up.dot(o)>0&&(e=-e),this.dispatchEvent({type:"rotate",theta:e})}else if("pan"===this.type){const t=this.controller1.position.clone().sub(this.startPosition);this.dispatchEvent({type:"pan",delta:t})}}}function c(t){let{onStartClick:e}=t;return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"start_view"},i.a.createElement("img",{className:"start_view_heart",src:"./images/white_heart.png",alt:"logo"})))}function d(){return Object(s.useEffect)(()=>{let t,e,o,s,i,n,r;function c(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)}function d(t,i){s.render(o,e)}!function(){t=document.querySelector(".scene"),o=new l.j;const d=(new l.k).load("./textures/silhouette.png");e=new l.g(70,window.innerWidth/window.innerHeight,.01,20);const p=new l.d(16777215,12303359,1);p.position.set(.5,1,.25),o.add(p),s=new l.n({antialias:!0,alpha:!0}),s.setPixelRatio(window.devicePixelRatio),s.setSize(window.innerWidth,window.innerHeight),s.xr.enabled=!0,t.appendChild(s.domElement);const h=new a(s);n=new l.i,console.log("camera.position",e.position);e.position;r=new l.l;h.addEventListener("tap",t=>{console.log("tap"),r.x=t.clientX/window.innerWidth*2-1,r.y=-t.clientY/window.innerHeight*2+1,console.log(r.x,r.y)});const u=new l.e(new l.h(100,100,1,1),new l.f({side:l.b,transparent:!0,opacity:0}));u.rotation.x=Math.PI/2,u.position.set(0,-1.4,-2),o.add(u),document.body.appendChild(class{static createButton(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o=document.createElement("button");function s(){o.style.display="",o.style.cursor="auto",o.style.left="calc(50% - 75px)",o.style.width="150px",o.onmouseenter=null,o.onmouseleave=null,o.onclick=null,o.textContent="AR NOT SUPPORTED"}function i(t){t.style.position="absolute",t.style.bottom="20px",t.style.padding="12px 6px",t.style.border="1px solid #fff",t.style.borderRadius="4px",t.style.background="rgba(0,0,0,0.1)",t.style.color="#fff",t.style.font="normal 13px sans-serif",t.style.textAlign="center",t.style.opacity="0.5",t.style.outline="none",t.style.zIndex="999"}if("xr"in navigator)return o.id="ARButton",o.style.display="none",i(o),navigator.xr.isSessionSupported("immersive-ar").then((function(i){i?function(){if(void 0===e.domOverlay){var s=document.createElement("div");s.style.display="none",document.body.appendChild(s);var i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("width",38),i.setAttribute("height",38),i.style.position="absolute",i.style.right="20px",i.style.top="20px",i.addEventListener("click",(function(){r.end()})),s.appendChild(i);var n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d","M 12,12 L 28,28 M 28,12 12,28"),n.setAttribute("stroke","#fff"),n.setAttribute("stroke-width",2),i.appendChild(n),void 0===e.optionalFeatures&&(e.optionalFeatures=[]),e.optionalFeatures.push("dom-overlay"),e.domOverlay={root:s}}let r=null;async function l(s){s.addEventListener("end",a),t.xr.setReferenceSpaceType("local"),await t.xr.setSession(s),o.textContent="STOP AR",e.domOverlay.root.style.display="",r=s}function a(){r.removeEventListener("end",a),o.textContent="",e.domOverlay.root.style.display="none",r=null}o.style.display="",o.style.cursor="pointer",o.style.left="calc(50% - 50px)",o.style.width="100px",o.textContent="",o.onmouseenter=function(){o.style.opacity="1.0"},o.onmouseleave=function(){o.style.opacity="0.5"},o.onclick=function(){null===r?navigator.xr.requestSession("immersive-ar",e).then(l):r.end()}}():s()})).catch(s),o;{const t=document.createElement("a");return!1===window.isSecureContext?(t.href=document.location.href.replace(/^http:/,"https:"),t.innerHTML="WEBXR NEEDS HTTPS"):(t.href="https://immersiveweb.dev/",t.innerHTML="WEBXR NOT AVAILABLE"),t.style.left="calc(50% - 90px)",t.style.width="180px",t.style.textDecoration="none",i(t),t}}}.createButton(s,{requiredFeatures:["hit-test"]}));const m=new l.h(.7,2,1),y=new l.f({transparent:!0,side:l.b,map:d}),w=new l.e(m,y);o.add(w),w.visible=!1,i=s.xr.getController(0),i.addEventListener("select",(function(){n.setFromCamera(r,e);const t=n.intersectObjects(o.children,!1)[0].point;console.log(t),w.visible?w.visible&&w.position.set(t.x,t.y+1,t.z):(w.position.set(t.x,t.y+1,t.z),w.visible=!0)})),o.add(i),window.addEventListener("resize",c)}(),s.setAnimationLoop(d)},[]),i.a.createElement(i.a.Fragment,null,i.a.createElement(c,null),i.a.createElement("div",{className:"scene"}))}o(9);const p=document.getElementById("root");r.a.render(i.a.createElement(d,null),p)},4:function(t,e,o){t.exports=o(10)},9:function(t,e,o){}},[[4,1,2]]]);
//# sourceMappingURL=main.0111e1c6.chunk.js.map