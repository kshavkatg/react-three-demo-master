(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var o=n(0),s=n.n(o),i=n(4),r=n.n(i),a=n(1);class l extends a.c{constructor(e){if(super(),void 0===e)return void console.error("ControllerGestures must be passed a renderer");const t=new a.a;this.controller1=e.xr.getController(0),this.controller1.userData.gestures={index:0},this.controller1.userData.selectPressed=!1,this.controller1.addEventListener("selectstart",o),this.controller1.addEventListener("selectend",s),this.controller2=e.xr.getController(1),this.controller2.userData.gestures={index:1},this.controller2.userData.selectPressed=!1,this.controller2.addEventListener("selectstart",o),this.controller2.addEventListener("selectend",s),this.doubleClickLimit=.2,this.pressMinimum=.4,this.right=new a.o(1,0,0),this.up=new a.o(0,1,0),this.type="unknown",this.touchCount=0,this.clock=t;const n=this;function o(){const e=this.userData.gestures;e.startPosition=void 0,e.startTime=t.getElapsedTime(),-1==n.type.indexOf("tap")&&(e.taps=0),n.type="unknown",this.userData.selectPressed=!0,n.touchCount++,console.log("onSelectStart touchCount: ".concat(n.touchCount))}function s(){const e=this.userData.gestures;e.endTime=t.getElapsedTime();const o=e.endTime-e.startTime;if("swipe"===n.type){const t=n.controller1.position.y<e.startPosition.y?"DOWN":"UP";n.dispatchEvent({type:"swipe",direction:t}),n.type="unknown"}else"pinch"!==n.type&&"rotate"!==n.type&&"pan"!==n.type?o<n.doubleClickLimit?(n.type="tap",e.taps++):o>n.pressMinimum&&(n.dispatchEvent({type:"press",position:n.controller1.position,matrixWorld:n.controller1.matrixWorld}),n.type="unknown"):n.type="unknown";this.userData.selectPressed=!1,e.startPosition=void 0,n.touchCount--}}get multiTouch(){let e;e=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed&&this.controller2.userData.selectPressed);return console.log("ControllerGestures multiTouch: ".concat(e," touchCount:").concat(this.touchCount)),e}get touch(){let e;return e=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed||this.controller2.userData.selectPressed),e}get debugMsg(){return this.type}update(){const e=this.controller1.userData.gestures,t=this.controller2.userData.gestures,n=this.clock.getElapsedTime();let o;if(this.controller1.userData.selectPressed&&void 0===e.startPosition&&(o=n-e.startTime,o>.05&&(e.startPosition=this.controller1.position.clone())),this.controller2.userData.selectPressed&&void 0===t.startPosition&&(o=n-t.startTime,o>.05&&(t.startPosition=this.controller2.position.clone())),!this.controller1.userData.selectPressed&&"tap"===this.type&&(o=this.clock.getElapsedTime()-e.endTime,o>this.doubleClickLimit)){switch(e.taps){case 1:this.dispatchEvent({type:"tap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 2:this.dispatchEvent({type:"doubletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 3:this.dispatchEvent({type:"tripletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 4:this.dispatchEvent({type:"quadtap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld})}this.type="unknown",e.taps=0}if("unknown"===this.type&&this.touch){if(void 0!==e.startPosition)if(this.multiTouch){if(void 0!==t.startPosition){const n=e.startPosition.distanceTo(t.startPosition),o=this.controller1.position.distanceTo(this.controller2.position)-n;if(Math.abs(o)>.01)this.type="pinch",this.startDistance=this.controller1.position.distanceTo(this.controller2.position),this.dispatchEvent({type:"pinch",delta:0,scale:1,initialise:!0});else{const n=t.startPosition.clone().sub(e.startPosition).normalize(),o=this.controller2.position.clone().sub(this.controller1.position).normalize(),s=n.angleTo(o);Math.abs(s)>.2&&(this.type="rotate",this.startVector=o.clone(),this.dispatchEvent({type:"rotate",theta:0,initialise:!0}))}}}else{let t=e.startPosition.distanceTo(this.controller1.position);o=this.clock.getElapsedTime()-e.startTime;const n=t/o;if(t>.01&&n>.1){const t=this.controller1.position.clone().sub(e.startPosition);Math.abs(t.y)>Math.abs(t.x)&&Math.abs(t.y)>Math.abs(t.z)&&(this.type="swipe")}else t>.006&&n<.03&&(this.type="pan",this.startPosition=this.controller1.position.clone(),this.dispatchEvent({type:"pan",delta:new a.o,initialise:!0}))}}else if("pinch"===this.type){const e=this.controller1.position.distanceTo(this.controller2.position),t=e-this.startDistance,n=e/this.startDistance;this.dispatchEvent({type:"pinch",delta:t,scale:n})}else if("rotate"===this.type){const e=this.controller2.position.clone().sub(this.controller1.position).normalize();let t=this.startVector.angleTo(e);const n=this.startVector.clone().cross(e);this.up.dot(n)>0&&(t=-t),this.dispatchEvent({type:"rotate",theta:t})}else if("pan"===this.type){const e=this.controller1.position.clone().sub(this.startPosition);this.dispatchEvent({type:"pan",delta:e})}}}function c(e){let{onStartClick:t}=e;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"start_view"},s.a.createElement("img",{className:"start_view_heart",src:"./images/white_heart.png",alt:"logo"})))}function d(){return s.a.createElement("div",{className:"replace_button"},s.a.createElement("img",{src:"./images/replace.png",alt:"reset"}))}var p=n(2);function u(){return Object(o.useEffect)(()=>{document.querySelector("#recorder").addEventListener("click",()=>{navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((async function(e){let t=p(e,{type:"video"});t.startRecording();var n;await(n=3e3,new Promise(e=>setTimeout(e,n))),t.stopRecording((function(){let e=t.getBlob();p.invokeSaveAsDialog(e)}))}))})},[]),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{id:"recorder",className:"recorder-container fade-container"},s.a.createElement("svg",{viewBox:"0 0 38 38",className:"progress-container"},s.a.createElement("circle",{className:"progress-track",r:"16",cx:"19",cy:"19"}),s.a.createElement("circle",{id:"progressBar",className:"progress-bar",r:"16",cx:"19",cy:"19"}),s.a.createElement("circle",{className:"loading-circle",r:"16",cx:"19",cy:"19"})),s.a.createElement("button",{id:"recorder-button",className:"style-reset"},"Record")),s.a.createElement("div",{id:"flashElement",className:"flash-element"}))}function h(){return s.a.createElement("div",{className:"place_tip"},s.a.createElement("div",{className:"rectangle"}),s.a.createElement("p",{className:"text"},"To start",s.a.createElement("br",null),"tap on the screen"))}function m(){return s.a.createElement("div",{className:"scale_tip"},s.a.createElement("div",{className:"rectangle"}),s.a.createElement("p",{className:"text"},"Scale and move silhouette before",s.a.createElement("br",null),"starting performance"))}function v(){return Object(o.useEffect)(()=>{let e,t,n,o,s,i,r,c;function d(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)}function p(e,s){o.render(n,t)}!function(){e=document.querySelector(".scene"),n=new a.k;const p=new a.m,u=p.load("./textures/silhouette.png");p.load("./textures/video_match.png");t=new a.h(70,window.innerWidth/window.innerHeight,.01,20);const h=new a.d(16777215,12303359,1);h.position.set(.5,1,.25),n.add(h),o=new a.q({antialias:!0,alpha:!0}),o.setPixelRatio(window.devicePixelRatio),o.setSize(window.innerWidth,window.innerHeight),o.xr.enabled=!0,e.appendChild(o.domElement);const m=new a.f(new a.i(1e3,1e3,1,1),new a.g({side:a.b,transparent:!0,depthWrite:!1,opacity:0}));m.name="ground",m.rotation.x=Math.PI/2,m.position.set(0,-.5,0),n.add(m),document.body.appendChild(class{static createButton(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=document.createElement("button");function o(){n.style.display="",n.style.cursor="auto",n.onmouseenter=null,n.onmouseleave=null,n.onclick=null,n.textContent="AR NOT SUPPORTED"}function s(e){e.style.position="absolute",e.style.bottom="18%",e.style.width="75%",e.style.height="90px",e.style.zIndex="999",e.style.background="black",e.style.backgroundImage='url("./images/start_button.png")',e.style.backgroundSize="cover"}if("xr"in navigator)return n.id="ARButton",n.style.display="none",s(n),navigator.xr.isSessionSupported("immersive-ar").then((function(s){s?function(){const o=document.getElementById("greenscreenvideo"),s=document.querySelector(".start_video"),i=document.querySelector("#recorder"),r=document.querySelector(".place_tip"),a=document.querySelector(".scale_tip");let l,c;if(void 0===t.domOverlay){var d=document.querySelector(".overlay");d.style.display="none",document.body.appendChild(d);var p=document.createElementNS("http://www.w3.org/2000/svg","svg");p.setAttribute("width",38),p.setAttribute("height",38),p.style.position="absolute",p.style.left="20px",p.style.top="20px",p.addEventListener("click",(function(){h.end()})),d.appendChild(p);var u=document.createElementNS("http://www.w3.org/2000/svg","path");u.setAttribute("d","M 12,12 L 28,28 M 28,12 12,28"),u.setAttribute("stroke","#fff"),u.setAttribute("stroke-width",2),p.appendChild(u),void 0===t.optionalFeatures&&(t.optionalFeatures=[]),t.optionalFeatures.push("dom-overlay"),t.domOverlay={root:d}}let h=null;async function m(o){o.addEventListener("end",v),e.xr.setReferenceSpaceType("local"),await e.xr.setSession(o),n.textContent="STOP AR",t.domOverlay.root.style.display="",h=o,window.threeScene.children.forEach(e=>{"silhouette"===e.name?(console.log("assign silhouette"),c=e):"video_plane"===e.name&&(console.log("assign videoMesh"),l=e)})}function v(){h.removeEventListener("end",v),n.textContent="",t.domOverlay.root.style.display="none",h=null,c.visible?(c.visible=!1,s.style.display="none",a.style.display="none",r.style.display="flex"):o.paused||(l.visible=!1,o.pause(),o.currentTime=0,i.classList.add("fade-container"),r.style.display="flex")}n.style.display="",n.style.cursor="pointer",n.textContent="",n.onmouseenter=function(){},n.onmouseleave=function(){},n.onclick=function(){null===h?navigator.xr.requestSession("immersive-ar",t).then(m):h.end()}}():o()})).catch(o),n;{const e=document.createElement("a");return!1===window.isSecureContext?(e.href=document.location.href.replace(/^http:/,"https:"),e.innerHTML="WEBXR NEEDS HTTPS"):(e.href="https://immersiveweb.dev/",e.innerHTML="WEBXR NOT AVAILABLE"),e.style.left="calc(50% - 90px)",e.style.width="180px",e.style.textDecoration="none",s(e),e}}}.createButton(o,{requiredFeatures:["hit-test"]}));const v=new a.i(1.4,4,1),y=new a.g({transparent:!0,side:a.b,map:u});c=new a.f(v,y),c.name="silhouette",n.add(c),c.visible=!1;const g=document.getElementById("greenscreenvideo"),w=["varying vec2 vUv;","void main(void)","{","vUv = uv;","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","gl_Position = projectionMatrix * mvPosition;","}"].join("\n"),E=["uniform sampler2D myTexture;","uniform vec3 color;","varying vec2 vUv;","void main(void)","{","vec3 tColor = texture2D( myTexture, vUv ).rgb;","float a = (length(tColor - color) - 0.5) * 7.0;","gl_FragColor = vec4(tColor, a);","}"].join("\n"),f=new a.i(5,5.1,1),b=new a.p(g);b.minFilter=a.e;const x=new a.l({uniforms:{color:{type:"c",value:{x:.02,y:.933,z:.321}},myTexture:{type:"t",value:b}},vertexShader:w,fragmentShader:E,transparent:!0}),P=new a.f(f,x);P.name="video_plane",n.add(P),P.visible=!1,s=new l(o);const T=o.xr.getController(0);console.log("testController",T),console.log("controller gestures",s),s.addEventListener("tap",e=>{console.log("tap")}),s.addEventListener("press",e=>{console.log("press")}),s.addEventListener("pan",e=>{console.log("pan")}),s.addEventListener("swipe",e=>{console.log("swipe")}),s.addEventListener("pinch",e=>{console.log("pinch")}),s.addEventListener("rotate",e=>{console.log("rotate")}),i=new a.j;t.position;r=new a.n;const k=document.querySelector(".place_tip"),C=document.querySelector(".scale_tip");k.style.display="flex";const S=document.querySelector(".start_video"),L=document.querySelector(".replace_button"),D=document.querySelector("#recorder");document.body.addEventListener("click",e=>{console.log("tap"),r.x=e.clientX/window.innerWidth*2-1,r.y=-e.clientY/window.innerHeight*2+1,console.log(r.x,r.y)}),document.body.addEventListener("touchmove",e=>{r.x=e.touches[0].clientX/window.innerWidth*2-1,r.y=-e.touches[0].clientY/window.innerHeight*2+1,i.setFromCamera(r,t);let o;i.intersectObjects(n.children,!1).forEach(e=>{"ground"===e.object.name&&(o=e.point)}),c.position.set(o.x,o.y,o.z-3),P.position.set(o.x,o.y+.17,o.z-3)});const _=()=>{P.visible=!0,c.visible=!1,g.play(),S.style.display="none",C.style.display="none"};L.addEventListener("click",()=>{c.visible?(c.visible=!1,S.style.display="none",C.style.display="none",k.style.display="flex"):g.paused||(P.visible=!1,g.pause(),g.currentTime=0,D.classList.add("fade-container"),k.style.display="flex")}),g.addEventListener("playing",()=>{D.classList.remove("fade-container"),D.classList.add("active")}),s=o.xr.getController(0),s.addEventListener("select",(function(e){let o;i.setFromCamera(r,t),i.intersectObjects(n.children,!1).forEach(e=>{"ground"===e.object.name&&(o=e.point)}),c.visible||P.visible||(c.position.set(o.x,o.y,o.z-3),P.position.set(o.x,o.y+.17,o.z-3.1),c.visible=!0,k.style.display="none",C.style.display="flex"),P.visible||(S.style.display="inherit"),S.addEventListener("click",_)})),n.add(s),window.addEventListener("resize",d),window.threeScene=n;const N=document.createElement("canvas");N.getContext("webgl");document.body.appendChild(N)}(),o.setAnimationLoop(p)},[]),s.a.createElement(s.a.Fragment,null,s.a.createElement("video",{id:"greenscreenvideo",playsinline:!0,preload:"auto",src:"./video/Tina_Trinity_original_big.mp4","response-type":"arraybuffer",style:{opacity:0}}),s.a.createElement(c,null),s.a.createElement("div",{className:"scene"}),s.a.createElement("div",{className:"overlay"},s.a.createElement(h,null),s.a.createElement(m,null),s.a.createElement(d,null),s.a.createElement(u,null),s.a.createElement("img",{className:"start_video",src:"./images/start_video_button.png",alt:"start"})))}n(12);const y=document.getElementById("root");r.a.render(s.a.createElement(v,null),y)},5:function(e,t,n){e.exports=n(13)}},[[5,1,2]]]);
//# sourceMappingURL=main.0cd37af6.chunk.js.map