import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

const style = {
    height: 500 // we can control scene size by setting container dimensions
};
console.log('boomm')

function App() {

    useEffect(() => {
        init()
        animate()
        window.addEventListener('resize', this.handleWindowResize);

        return () => {
            window.removeEventListener('resize', this.handleWindowResize);
            window.cancelAnimationFrame(this.requestID);
        }
    }, [])

    function init() {
        const container = document.createElement( 'div' );
        document.body.appendChild( container );

        // set scene and camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

        // set light
        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
        light.position.set( 0.5, 1, 0.25 );
        scene.add( light );

        // set renderer
        const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.xr.enabled = true;
        container.appendChild( this.renderer.domElement );

        // set controller
        const controller = renderer.xr.getController( 0 );
        controller.addEventListener( 'select', onSelect );
        scene.add( controller );

        // add button
        document.body.appendChild( ARButton.createButton( renderer ) );

        // set geometry
        const geometry = new THREE.CylinderGeometry( 0, 0.05, 0.2, 32 ).rotateX( Math.PI / 2 );
        
        // on screen touch
        const onSelect = () => {
            console.log('select')
            const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
            mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
            scene.add( mesh );
        }

        // resize window
        window.addEventListener( 'resize', this.onWindowResize );

        console.log(controller)
        console.log(scene)
        console.log(renderer)
    }

    onWindowResize() {
        console.log(`camera from resizer: ${this.camera}`)
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    //

    animate() {
        this.renderer.setAnimationLoop( this.render );
    }

    render() {
        this.renderer.render( this.scene, this.camera );
    }

    render() {
        return <div style={style} ref={ref => (this.mount = ref)} />;
    }
}

class Container extends React.Component {
    state = {isMounted: true};

    render() {
        const {isMounted = true} = this.state;
        return (
            <>
                <button onClick={() => this.setState(state => ({isMounted: !state.isMounted}))}>
                    {isMounted ? "Unmount" : "Mount"}
                </button>
                {isMounted && <App />}
                {isMounted && <div>Scroll to zoom, drag to rotate</div>}
            </>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);