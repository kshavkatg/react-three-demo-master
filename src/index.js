import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from           'three';
import { ARButton } from         './libs/ARButton.js';
import { ControllerGestures } from './libs/ControllerGestures'
import StartView from "./components/StartView";
require('./styles/custom.scss')

function Container() {

    // Three.js functionality is all inside useEffect on comp mount
    useEffect(() => {
        // define variables
        let container;
        let camera, scene, renderer;
        let controller;
        let raycaster;
        let mouse;


        init();
        animate();

        function init() {
            // get container for the canvas
            container = document.querySelector( '.scene' );

            // set Scene
            scene = new THREE.Scene();

            // load Textures
            const textureLoader = new THREE.TextureLoader()
            const silhouette = textureLoader.load('./textures/silhouette.png')

            // set Camera
            camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

            // set Light and add to the Scene
            const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
            light.position.set( 0.5, 1, 0.25 );
            scene.add( light );

            // set renderer 
            renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // enable XR and use container
            renderer.xr.enabled = true;
            container.appendChild( renderer.domElement );

            // get gestures for multi-touch events
            const gestures = new ControllerGestures(renderer)

            // cast a ray
            raycaster = new THREE.Raycaster()
            const rayOrigin = camera.position

            mouse = new THREE.Vector2()

            const onTouch = ( event ) => {
                // calculate mouse position in normalized device coordinates
	            // (-1 to +1) for both components
                console.log('tap')
	            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                console.log(mouse.x, mouse.y)
            }

            gestures.addEventListener('tap', onTouch)

            // TEST ground planeMesh
            const planeMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(100, 100, 1, 1), new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0,
            }))
            planeMesh.name = 'ground'
            planeMesh.rotation.x = Math.PI / 2
            planeMesh.position.set(0, -0.5, 0)
            scene.add(planeMesh)

            // add AR button and require hit-test
            document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );

            // Silhouette plane
            const silhouetteGeometry = new THREE.PlaneBufferGeometry(1.4, 4, 1)
            const silhouetteMaterial = new THREE.MeshStandardMaterial( {
                transparent: true,
                side: THREE.DoubleSide,
                map: silhouette,
            } );
            // const silhouetteMesh = new THREE.Mesh( silhouetteGeometry, silhouetteMaterial );
            // scene.add( silhouetteMesh );
            // silhouetteMesh.visible = false

            // Video plane
            const video = document.getElementById( 'greenscreenvideo' );

            const vertexShader = [
                'varying vec2 vUv;',
                'void main(void)',
                '{',
                'vUv = uv;',
                'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
                'gl_Position = projectionMatrix * mvPosition;',
                '}'
              ].join('\n'),
            
            const fragmentShader = [
                'uniform sampler2D myTexture;',
                'uniform vec3 color;',
                'varying vec2 vUv;',
                'void main(void)',
                '{',
                'vec3 tColor = texture2D( myTexture, vUv ).rgb;',
                'float a = (length(tColor - color) - 0.5) * 7.0;',
                'gl_FragColor = vec4(tColor, a);',
                '}'
              ].join('\n')
            
            const color = {default: {x: 0.1, y: 0.9, z: 0.2}, type: 'vec3', is: 'uniform'}

            const videoGeometry = new THREE.PlaneBufferGeometry(3, 4, 1)
            const videoTexture = new THREE.VideoTexture( video );
            videoTexture.minFilter = THREE.LinearFilter
            const videoMaterial = new THREE.ShaderMaterial( {
                uniforms: {
                  color: {
                    type: 'c',
                    value: color
                  },
                  myTexture: {
                    type: 't',
                    value: videoTexture
                  }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            } )

            const silhouetteMesh = new THREE.Mesh( silhouetteGeometry, videoMaterial );
            scene.add( silhouetteMesh );
            silhouetteMesh.visible = false


            // on user select add cylinder to the reticle position
            function onSelect() {
                // cast ray from touch coordinate
                raycaster.setFromCamera( mouse, camera )
                const intersects = raycaster.intersectObjects( scene.children, false );
                video.play()
                // get first intersection point
                let intPoint
                // only get the int point with ground
                intersects.forEach(int => {
                    if (int.object.name === "ground") {
                        intPoint = int.point
                    }
                })
                console.log(intPoint)
                // show and replace silhouette
                if (!silhouetteMesh.visible) {
                    silhouetteMesh.position.set(intPoint.x, intPoint.y, intPoint.z)
                    silhouetteMesh.visible = true
                } else if (silhouetteMesh.visible) {
                    silhouetteMesh.position.set(intPoint.x, intPoint.y, intPoint.z)
                }
            }

            // get Controller (touch screen)
            controller = renderer.xr.getController( 0 );
            controller.addEventListener( 'select', onSelect );
            scene.add( controller );
            
            // set resize handler
            window.addEventListener( 'resize', onWindowResize );
        }

        // resize handler
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        // Animations
        function animate() {
            renderer.setAnimationLoop( render );
        }

        // Render function from for frame depending funct
        function render( timestamp, frame ) {

            renderer.render( scene, camera );
        }

    }, [])

    return (
        <>
            <video id="greenscreenvideo" playsinline preload="auto" src="./video/Tina_Trinity_original_big.mp4" response-type="arraybuffer" style={{opacity: 0}}></video>
            <StartView />
            <div className="scene" />
        </>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);