(this["webpackJsonpreact-three-demo"]=this["webpackJsonpreact-three-demo"]||[]).push([[0],{10:function(e,n,t){e.exports=t(11)},11:function(e,n,t){"use strict";t.r(n);var i=t(2),r=t(6),o=t(4),a=t(3),d=t(1),s=t.n(d),c=t(8),l=t.n(c),h=t(0),u=(t(16),t(9)),w={height:500};console.log("boo");var m=function(e){Object(o.a)(t,e);var n=Object(a.a)(t);function t(){return Object(i.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"componentDidMount",value:function(){this.init(),this.animate(),window.addEventListener("resize",this.handleWindowResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowResize),window.cancelAnimationFrame(this.requestID)}},{key:"init",value:function(){var e=this,n=document.createElement("div");document.body.appendChild(n),this.scene=new h.i,this.camera=new h.g(70,window.innerWidth/window.innerHeight,.01,20);var t=new h.c(16777215,12303359,1);t.position.set(.5,1,.25),this.scene.add(t),this.renderer=new h.n({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.xr.enabled=!0,n.appendChild(this.renderer.domElement),document.body.appendChild(u.a.createButton(this.renderer));var i=new h.a(0,.05,.2,32).rotateX(Math.PI/2);this.controller=this.renderer.xr.getController(0),this.controller.addEventListener("select",(function(){var n=new h.f({color:16777215*Math.random()}),t=new h.e(i,n);t.position.set(0,0,-.3).applyMatrix4(e.controller.matrixWorld),t.quaternion.setFromRotationMatrix(e.controller.matrixWorld),e.scene.add(t)})),this.scene.add(this.controller),window.addEventListener("resize",this.onWindowResize)}},{key:"onWindowResize",value:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}},{key:"animate",value:function(){this.renderer.setAnimationLoop(this.render)}},{key:"render",value:function(){this.renderer.render(this.scene,this.camera)}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{style:w,ref:function(n){return e.mount=n}})}}]),t}(d.Component),v=function(e){Object(o.a)(t,e);var n=Object(a.a)(t);function t(){var e;Object(i.a)(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=n.call.apply(n,[this].concat(o))).state={isMounted:!0},e}return Object(r.a)(t,[{key:"render",value:function(){var e=this,n=this.state.isMounted,t=void 0===n||n;return s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{onClick:function(){return e.setState((function(e){return{isMounted:!e.isMounted}}))}},t?"Unmount":"Mount"),t&&s.a.createElement(m,null),t&&s.a.createElement("div",null,"Scroll to zoom, drag to rotate"))}}]),t}(s.a.Component),p=document.getElementById("root");l.a.render(s.a.createElement(v,null),p)}},[[10,1,2]]]);
//# sourceMappingURL=main.0e80b628.chunk.js.map