(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{10:function(e,t,o){"use strict";o.r(t);var n=o(0),i=o.n(n),s=o(3),r=o.n(s),a=o(1);class l extends a.c{constructor(e){if(super(),void 0===e)return void console.error("ControllerGestures must be passed a renderer");const t=new a.a;this.controller1=e.xr.getController(0),this.controller1.userData.gestures={index:0},this.controller1.userData.selectPressed=!1,this.controller1.addEventListener("selectstart",n),this.controller1.addEventListener("selectend",i),this.controller2=e.xr.getController(1),this.controller2.userData.gestures={index:1},this.controller2.userData.selectPressed=!1,this.controller2.addEventListener("selectstart",n),this.controller2.addEventListener("selectend",i),this.doubleClickLimit=.2,this.pressMinimum=.4,this.right=new a.o(1,0,0),this.up=new a.o(0,1,0),this.type="unknown",this.touchCount=0,this.clock=t;const o=this;function n(){const e=this.userData.gestures;e.startPosition=void 0,e.startTime=t.getElapsedTime(),-1==o.type.indexOf("tap")&&(e.taps=0),o.type="unknown",this.userData.selectPressed=!0,o.touchCount++,console.log("onSelectStart touchCount: ".concat(o.touchCount))}function i(){const e=this.userData.gestures;e.endTime=t.getElapsedTime();const n=e.endTime-e.startTime;if("swipe"===o.type){const t=o.controller1.position.y<e.startPosition.y?"DOWN":"UP";o.dispatchEvent({type:"swipe",direction:t}),o.type="unknown"}else"pinch"!==o.type&&"rotate"!==o.type&&"pan"!==o.type?n<o.doubleClickLimit?(o.type="tap",e.taps++):n>o.pressMinimum&&(o.dispatchEvent({type:"press",position:o.controller1.position,matrixWorld:o.controller1.matrixWorld}),o.type="unknown"):o.type="unknown";this.userData.selectPressed=!1,e.startPosition=void 0,o.touchCount--}}get multiTouch(){let e;e=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed&&this.controller2.userData.selectPressed);return console.log("ControllerGestures multiTouch: ".concat(e," touchCount:").concat(this.touchCount)),e}get touch(){let e;return e=void 0!==this.controller1&&void 0!==this.controller2&&(this.controller1.userData.selectPressed||this.controller2.userData.selectPressed),e}get debugMsg(){return this.type}update(){const e=this.controller1.userData.gestures,t=this.controller2.userData.gestures,o=this.clock.getElapsedTime();let n;if(this.controller1.userData.selectPressed&&void 0===e.startPosition&&(n=o-e.startTime,n>.05&&(e.startPosition=this.controller1.position.clone())),this.controller2.userData.selectPressed&&void 0===t.startPosition&&(n=o-t.startTime,n>.05&&(t.startPosition=this.controller2.position.clone())),!this.controller1.userData.selectPressed&&"tap"===this.type&&(n=this.clock.getElapsedTime()-e.endTime,n>this.doubleClickLimit)){switch(e.taps){case 1:this.dispatchEvent({type:"tap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 2:this.dispatchEvent({type:"doubletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 3:this.dispatchEvent({type:"tripletap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld});break;case 4:this.dispatchEvent({type:"quadtap",position:this.controller1.position,matrixWorld:this.controller1.matrixWorld})}this.type="unknown",e.taps=0}if("unknown"===this.type&&this.touch){if(void 0!==e.startPosition)if(this.multiTouch){if(void 0!==t.startPosition){const o=e.startPosition.distanceTo(t.startPosition),n=this.controller1.position.distanceTo(this.controller2.position)-o;if(Math.abs(n)>.01)this.type="pinch",this.startDistance=this.controller1.position.distanceTo(this.controller2.position),this.dispatchEvent({type:"pinch",delta:0,scale:1,initialise:!0});else{const o=t.startPosition.clone().sub(e.startPosition).normalize(),n=this.controller2.position.clone().sub(this.controller1.position).normalize(),i=o.angleTo(n);Math.abs(i)>.2&&(this.type="rotate",this.startVector=n.clone(),this.dispatchEvent({type:"rotate",theta:0,initialise:!0}))}}}else{let t=e.startPosition.distanceTo(this.controller1.position);n=this.clock.getElapsedTime()-e.startTime;const o=t/n;if(t>.01&&o>.1){const t=this.controller1.position.clone().sub(e.startPosition);Math.abs(t.y)>Math.abs(t.x)&&Math.abs(t.y)>Math.abs(t.z)&&(this.type="swipe")}else t>.006&&o<.03&&(this.type="pan",this.startPosition=this.controller1.position.clone(),this.dispatchEvent({type:"pan",delta:new a.o,initialise:!0}))}}else if("pinch"===this.type){const e=this.controller1.position.distanceTo(this.controller2.position),t=e-this.startDistance,o=e/this.startDistance;this.dispatchEvent({type:"pinch",delta:t,scale:o})}else if("rotate"===this.type){const e=this.controller2.position.clone().sub(this.controller1.position).normalize();let t=this.startVector.angleTo(e);const o=this.startVector.clone().cross(e);this.up.dot(o)>0&&(t=-t),this.dispatchEvent({type:"rotate",theta:t})}else if("pan"===this.type){const e=this.controller1.position.clone().sub(this.startPosition);this.dispatchEvent({type:"pan",delta:e})}}}function c(e){let{onStartClick:t}=e;return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"start_view"},i.a.createElement("img",{className:"start_view_heart",src:"./images/white_heart.png",alt:"logo"})))}function d(){return i.a.createElement("div",{className:"replace_button"},i.a.createElement("img",{src:"./images/replace.png",alt:"reset"}))}function p(){return Object(n.useEffect)(()=>{document.getElementById("greenscreenvideo"),document.querySelector(".start_video");const e=document.querySelector("#recorder");let t,o,n,i=[];function s(e){i.push(e.data)}function r(e){const t=new Blob(i,{type:"video/mp4"});i=[],(void 0).src=URL.createObjectURL(t),(void 0).load(),(void 0).onloadeddata=function(){const e=document.querySelector(".recorded-video-wrap");e.classList.remove("hidden"),e.scrollIntoView({behavior:"smooth",block:"start"}),(void 0).play()},n.getTracks().forEach(e=>e.stop()),console.log("Recording stopped")}e.addEventListener("click",(async function(){await async function(){try{n=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,sampleRate:44100},video:{width:1280,height:720}})}catch(e){console.error(e)}}(),n?(o=new MediaStream([...n.getTracks()]),t=new MediaRecorder(o),t.ondataavailable=s,t.onstop=r,t.start(1e3),console.log("Recording started")):console.warn("No stream available.")}))},[]),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{id:"recorder",className:"recorder-container fade-container"},i.a.createElement("svg",{viewBox:"0 0 38 38",className:"progress-container"},i.a.createElement("circle",{className:"progress-track",r:"16",cx:"19",cy:"19"}),i.a.createElement("circle",{id:"progressBar",className:"progress-bar",r:"16",cx:"19",cy:"19"}),i.a.createElement("circle",{className:"loading-circle",r:"16",cx:"19",cy:"19"})),i.a.createElement("button",{id:"recorder-button",className:"style-reset"},"Record")),i.a.createElement("div",{id:"flashElement",className:"flash-element"}))}function u(){return i.a.createElement("div",{className:"place_tip"},i.a.createElement("div",{className:"rectangle"}),i.a.createElement("p",{className:"text"},"To start",i.a.createElement("br",null),"tap on the screen"))}function h(){return i.a.createElement("div",{className:"scale_tip"},i.a.createElement("div",{className:"rectangle"}),i.a.createElement("p",{className:"text"},"Scale and move silhouette before",i.a.createElement("br",null),"starting performance"))}function m(){return Object(n.useEffect)(()=>{let e,t,o,n,i,s,r,c;function d(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight)}function p(e,i){n.render(o,t)}!function(){e=document.querySelector(".scene"),o=new a.k;const p=new a.m,u=p.load("./textures/silhouette.png");p.load("./textures/video_match.png");t=new a.h(70,window.innerWidth/window.innerHeight,.01,20);const h=new a.d(16777215,12303359,1);h.position.set(.5,1,.25),o.add(h),n=new a.q({antialias:!0,alpha:!0}),n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.xr.enabled=!0,e.appendChild(n.domElement);const m=new a.f(new a.i(1e3,1e3,1,1),new a.g({side:a.b,transparent:!0,depthWrite:!1,opacity:0}));m.name="ground",m.rotation.x=Math.PI/2,m.position.set(0,-.5,0),o.add(m),document.body.appendChild(class{static createButton(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o=document.createElement("button");function n(){o.style.display="",o.style.cursor="auto",o.onmouseenter=null,o.onmouseleave=null,o.onclick=null,o.textContent="AR NOT SUPPORTED"}function i(e){e.style.position="absolute",e.style.bottom="18%",e.style.width="75%",e.style.height="90px",e.style.zIndex="999",e.style.background="black",e.style.backgroundImage='url("./images/start_button.png")',e.style.backgroundSize="cover"}if("xr"in navigator)return o.id="ARButton",o.style.display="none",i(o),navigator.xr.isSessionSupported("immersive-ar").then((function(i){i?function(){const n=document.getElementById("greenscreenvideo"),i=document.querySelector(".start_video"),s=document.querySelector("#recorder"),r=document.querySelector(".place_tip"),a=document.querySelector(".scale_tip");let l,c;if(void 0===t.domOverlay){var d=document.querySelector(".overlay");d.style.display="none",document.body.appendChild(d);var p=document.createElementNS("http://www.w3.org/2000/svg","svg");p.setAttribute("width",38),p.setAttribute("height",38),p.style.position="absolute",p.style.left="20px",p.style.top="20px",p.addEventListener("click",(function(){h.end()})),d.appendChild(p);var u=document.createElementNS("http://www.w3.org/2000/svg","path");u.setAttribute("d","M 12,12 L 28,28 M 28,12 12,28"),u.setAttribute("stroke","#fff"),u.setAttribute("stroke-width",2),p.appendChild(u),void 0===t.optionalFeatures&&(t.optionalFeatures=[]),t.optionalFeatures.push("dom-overlay"),t.domOverlay={root:d}}let h=null;async function m(n){n.addEventListener("end",v),e.xr.setReferenceSpaceType("local"),await e.xr.setSession(n),o.textContent="STOP AR",t.domOverlay.root.style.display="",h=n,window.threeScene.children.forEach(e=>{"silhouette"===e.name?(console.log("assign silhouette"),c=e):"video_plane"===e.name&&(console.log("assign videoMesh"),l=e)})}function v(){h.removeEventListener("end",v),o.textContent="",t.domOverlay.root.style.display="none",h=null,c.visible?(c.visible=!1,i.style.display="none",a.style.display="none",r.style.display="inherit"):n.paused||(l.visible=!1,n.pause(),n.currentTime=0,s.classList.add("fade-container"),r.style.display="inherit")}o.style.display="",o.style.cursor="pointer",o.textContent="",o.onmouseenter=function(){},o.onmouseleave=function(){},o.onclick=function(){null===h?navigator.xr.requestSession("immersive-ar",t).then(m):h.end()}}():n()})).catch(n),o;{const e=document.createElement("a");return!1===window.isSecureContext?(e.href=document.location.href.replace(/^http:/,"https:"),e.innerHTML="WEBXR NEEDS HTTPS"):(e.href="https://immersiveweb.dev/",e.innerHTML="WEBXR NOT AVAILABLE"),e.style.left="calc(50% - 90px)",e.style.width="180px",e.style.textDecoration="none",i(e),e}}}.createButton(n,{requiredFeatures:["hit-test"]}));const v=new a.i(1.4,4,1),y=new a.g({transparent:!0,side:a.b,map:u});c=new a.f(v,y),c.name="silhouette",o.add(c),c.visible=!1;const g=document.getElementById("greenscreenvideo"),w=["varying vec2 vUv;","void main(void)","{","vUv = uv;","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","gl_Position = projectionMatrix * mvPosition;","}"].join("\n"),E=["uniform sampler2D myTexture;","uniform vec3 color;","varying vec2 vUv;","void main(void)","{","vec3 tColor = texture2D( myTexture, vUv ).rgb;","float a = (length(tColor - color) - 0.5) * 7.0;","gl_FragColor = vec4(tColor, a);","}"].join("\n"),b=new a.i(5,5.1,1),f=new a.p(g);f.minFilter=a.e;const x=new a.l({uniforms:{color:{type:"c",value:{x:.02,y:.933,z:.321}},myTexture:{type:"t",value:f}},vertexShader:w,fragmentShader:E,transparent:!0}),T=new a.f(b,x);T.name="video_plane",o.add(T),T.visible=!1,i=new l(n);const P=n.xr.getController(0);console.log("testController",P),console.log("controller gestures",i),i.addEventListener("tap",e=>{console.log("tap")}),i.addEventListener("press",e=>{console.log("press")}),i.addEventListener("pan",e=>{console.log("pan")}),i.addEventListener("swipe",e=>{console.log("swipe")}),i.addEventListener("pinch",e=>{console.log("pinch")}),i.addEventListener("rotate",e=>{console.log("rotate")}),s=new a.j;t.position;r=new a.n;const S=document.querySelector(".place_tip"),k=document.querySelector(".scale_tip");S.style.display="inherit";const L=document.querySelector(".start_video"),C=document.querySelector(".replace_button"),D=document.querySelector("#recorder");document.body.addEventListener("click",e=>{console.log("tap"),r.x=e.clientX/window.innerWidth*2-1,r.y=-e.clientY/window.innerHeight*2+1,console.log(r.x,r.y)}),document.body.addEventListener("touchmove",e=>{r.x=e.touches[0].clientX/window.innerWidth*2-1,r.y=-e.touches[0].clientY/window.innerHeight*2+1,s.setFromCamera(r,t);let n;s.intersectObjects(o.children,!1).forEach(e=>{"ground"===e.object.name&&(n=e.point)}),c.position.set(n.x,n.y,n.z-3),T.position.set(n.x,n.y+.17,n.z-3)});const _=()=>{T.visible=!0,c.visible=!1,g.play(),L.style.display="none",k.style.display="none"};C.addEventListener("click",()=>{c.visible?(c.visible=!1,L.style.display="none",k.style.display="none",S.style.display="inherit"):g.paused||(T.visible=!1,g.pause(),g.currentTime=0,D.classList.add("fade-container"),S.style.display="inherit")}),g.addEventListener("playing",()=>{D.classList.remove("fade-container"),D.classList.add("active")}),i=n.xr.getController(0),i.addEventListener("select",(function(e){let n;s.setFromCamera(r,t),s.intersectObjects(o.children,!1).forEach(e=>{"ground"===e.object.name&&(n=e.point)}),c.visible||T.visible||(c.position.set(n.x,n.y,n.z-3),T.position.set(n.x,n.y+.17,n.z-3.1),c.visible=!0,S.style.display="none",k.style.display="inherit"),T.visible||(L.style.display="inherit"),L.addEventListener("click",_)})),o.add(i),window.addEventListener("resize",d),window.threeScene=o}(),n.setAnimationLoop(p)},[]),i.a.createElement(i.a.Fragment,null,i.a.createElement("video",{id:"greenscreenvideo",playsinline:!0,preload:"auto",src:"./video/Tina_Trinity_original_big.mp4","response-type":"arraybuffer",style:{opacity:0}}),i.a.createElement(c,null),i.a.createElement("div",{className:"scene"}),i.a.createElement("div",{className:"overlay"},i.a.createElement(u,null),i.a.createElement(h,null),i.a.createElement(d,null),i.a.createElement(p,null),i.a.createElement("img",{className:"start_video",src:"./images/start_video_button.png",alt:"start"})))}o(9);const v=document.getElementById("root");r.a.render(i.a.createElement(m,null),v)},4:function(e,t,o){e.exports=o(10)},9:function(e,t,o){}},[[4,1,2]]]);
//# sourceMappingURL=main.20040eac.chunk.js.map