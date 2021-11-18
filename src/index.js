import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

const style = {
    height: 500 // we can control scene size by setting container dimensions
};
console.log('boomm')

class App extends Component {
    componentDidMount() {
        this.init()
        this.animate()
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    init() {
        const container = document.createElement( 'div' );
        document.body.appendChild( container );

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
        light.position.set( 0.5, 1, 0.25 );
        this.scene.add( light );
        //

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.xr.enabled = true;
        container.appendChild( this.renderer.domElement );

        //

        document.body.appendChild( ARButton.createButton( this.renderer ) );

        //

        const geometry = new THREE.CylinderGeometry( 0, 0.05, 0.2, 32 ).rotateX( Math.PI / 2 );

        const onSelect = () => {
            console.log('select')
            const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( this.controller.matrixWorld );
            mesh.quaternion.setFromRotationMatrix( this.controller.matrixWorld );
            this.scene.add( mesh );

        }

        this.controller = this.renderer.xr.getController( 0 );
        this.controller.addEventListener( 'select', onSelect );
        this.scene.add( this.controller );

        //

        window.addEventListener( 'resize', this.onWindowResize );
        console.log(`controller: ${this.controller}`)
        console.log(`scene: ${this.scene}`)
        console.log(`renderer: ${this.renderer}`)
    }

    onWindowResize() {
        console.log(`camera from resizer: ${this.camera}`)
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    //

    animate() {
        this.renderer.setAnimationLoop( this.renderIT );
    }

    renderIT() {
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