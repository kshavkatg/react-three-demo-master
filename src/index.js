import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import * as THREE from           'three';
import { RGBELoader } from       'three/examples/jsm/loaders/RGBELoader.js';
import { ARButton } from         'three/examples/jsm/webxr/ARButton.js';
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';

function Container() {

    // Three.js functionality is all inside useEffect on comp mount
    useEffect(() => {

        // define variables
        let container;
        let camera, scene, renderer;
        let controller;
        let reticle;

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

            // TEST ground planeMesh
            const planeMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(1, 1, 1, 1), new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
            }))
            planeMesh.rotation.x = Math.PI / 2
            planeMesh.position.set(0, -1, -2)
            scene.add(planeMesh)

            // add AR button and require hit-test
            document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );

            // cylinder
            const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.2, 32 ).translate( 0, 0.1, 0 );

            // on user select add cylinder to the reticle position
            function onSelect() {
                if ( reticle.visible ) {
                    const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
                    const mesh = new THREE.Mesh( geometry, material );
                    mesh.position.setFromMatrixPosition( reticle.matrix );
                    mesh.scale.y = Math.random() * 2 + 1;
                    scene.add( mesh );
                }
            }

            // get Controller (touch screen)
            controller = renderer.xr.getController( 0 );
            controller.addEventListener( 'select', onSelect );
            scene.add( controller );

            // create Reticle
            reticle = new THREE.Mesh(
                new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
                new THREE.MeshBasicMaterial()
            );
            reticle.matrixAutoUpdate = false;
            reticle.visible = false;
            scene.add( reticle );
            
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
                console.log('timestamp', timestamp)
                // get reference space of device
                const referenceSpace = renderer.xr.getReferenceSpace();
                console.log('referenceSpace', referenceSpace)
                // get session object
                const session = renderer.xr.getSession();
                console.log('session', session)

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
                    console.log('frame', frame)
                    console.log('hitTestSource', hitTestSource)
                    // get hit test results
                    const hitTestResults = frame.getHitTestResults( hitTestSource );
                    console.log('hitTestResults', hitTestResults)

                    if ( hitTestResults.length ) {
                        // get first result
                        const hit = hitTestResults[ 0 ];
                        // show and place reticle
                        reticle.visible = true;
                        reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

                    } else {
                        reticle.visible = false;
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