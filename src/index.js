import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import * as THREE from           'three';
import { RGBELoader } from       'three/examples/jsm/loaders/RGBELoader.js';
import { ARButton } from         'three/examples/jsm/webxr/ARButton.js';
import { ControllerGestures } from './libs/ControllerGestures'

function Container() {

    // Three.js functionality is all inside useEffect on comp mount
    useEffect(() => {

        // define variables
        let container;
        let camera, scene, renderer;
        let controller;
        let reticle;
        let raycaster;
        let mouse;

        // set hit test
        let hitTestSource = null;
        let hitTestSourceRequested = false;

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

            const gestures = new ControllerGestures(renderer)

            // cast a ray
            raycaster = new THREE.Raycaster()
            console.log('camera.position', camera.position)
            const rayOrigin = camera.position
            // const rayDirection = new THREE.Vector3(0, 0, -10)
            // rayDirection.normalize()
            // raycaster.set(rayOrigin, rayDirection)

            mouse = new THREE.Vector2()

            const onTouch = ( event ) => {
                // calculate mouse position in normalized device coordinates
	            // (-1 to +1) for both components
                console.log('tap')
	            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                console.log(mouse.x, mouse.y)
            }

            document.body.addEventListener('click', onTouch)
            gestures.addEventListener('tap', onTouch)

            // TEST ground planeMesh
            const planeMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(100, 100, 1, 1), new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0,
            }))
            planeMesh.rotation.x = Math.PI / 2
            planeMesh.position.set(0, -1.4, -2)
            scene.add(planeMesh)

            // add AR button and require hit-test
            document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );

            // cylinder
            const geometry = new THREE.PlaneBufferGeometry(0.7, 2, 1)
            const material = new THREE.MeshStandardMaterial( {
                transparent: true,
                side: THREE.DoubleSide,
                map: silhouette,
            } );
            const silhouetteMesh = new THREE.Mesh( geometry, material );
            scene.add( silhouetteMesh );
            silhouetteMesh.visible = false

            // on user select add cylinder to the reticle position
            function onSelect() {
                raycaster.setFromCamera( mouse, camera )
                const intersects = raycaster.intersectObjects( scene.children, false );
                const intPoint = intersects[0].point
                console.log(intPoint)
                if (!silhouetteMesh.visible) {
                    silhouetteMesh.position.set(intPoint.x, intPoint.y + 1, intPoint.z)
                    silhouetteMesh.visible = true
                } else if (silhouetteMesh.visible) {
                    silhouetteMesh.position.set(intPoint.x, intPoint.y + 1, intPoint.z)
                }
            }

            // get Controller (touch screen)
            controller = renderer.xr.getController( 0 );
            controller.addEventListener( 'select', onSelect );
            scene.add( controller );

            // create Reticle
            // reticle = new THREE.Mesh(
            //     new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
            //     new THREE.MeshBasicMaterial()
            // );
            // reticle.matrixAutoUpdate = false;
            // reticle.visible = false;
            // scene.add( reticle );
            
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

        // Render
        function render( timestamp, frame ) {
            if ( frame ) {
                // get reference space of device
                const referenceSpace = renderer.xr.getReferenceSpace();

                // get session object
                const session = renderer.xr.getSession();
 
                if ( hitTestSourceRequested === false ) {
                    // get the Viewer ref space
                    session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {
                        // then use it to get hitTestSource
                        session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {
                            hitTestSource = source;
                        } );

                    } );

                    // on Session end remove hit test
                    session.addEventListener( 'end', function () {
                        hitTestSourceRequested = false;
                        hitTestSource = null;
                    } );

                    hitTestSourceRequested = true;
                }

                if ( hitTestSource ) {

                    // get hit test results
                    const hitTestResults = frame.getHitTestResults( hitTestSource );

                    if ( hitTestResults.length ) {
                        // get first result
                        const hit = hitTestResults[ 0 ];
                        // show and place reticle
                        // reticle.visible = true;
                        // reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

                    } else {
                        // reticle.visible = false;
                    }
                }
            }
            renderer.render( scene, camera );
        }

    }, [])

    return (
        <>
            <div className="scene" />
        </>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);