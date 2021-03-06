class ARButton {

	static createButton( renderer, sessionInit = {} ) {

		const button = document.createElement( 'button' );
		const replaceButton = document.querySelector('.replace_button')
		// Get Tips 
		const placeTip = document.querySelector('.place_tip')
		const scaleTip = document.querySelector('.scale_tip')

		function showStartAR( /*device*/ ) {
			const video = document.getElementById( 'greenscreenvideo' );
			const startVideoButton = document.querySelector('.start_video')
			const recordButton = document.querySelector('#recorder')
			
			let videoMesh, silhouetteMesh;

			if ( sessionInit.domOverlay === undefined ) {

				var overlay = document.querySelector( '.overlay' );
				overlay.style.display = 'none';
				document.body.appendChild( overlay );

				var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
				svg.setAttribute( 'width', 38 );
				svg.setAttribute( 'height', 38 );
				svg.style.position = 'absolute';
				svg.style.left = '20px';
				svg.style.top = '20px';
				svg.addEventListener( 'click', function () {

					currentSession.end();

				} );
				overlay.appendChild( svg );

				var path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
				path.setAttribute( 'd', 'M 12,12 L 28,28 M 28,12 12,28' );
				path.setAttribute( 'stroke', '#fff' );
				path.setAttribute( 'stroke-width', 2 );
				svg.appendChild( path );

				if ( sessionInit.optionalFeatures === undefined ) {

					sessionInit.optionalFeatures = [];

				}

				sessionInit.optionalFeatures.push( 'dom-overlay' );
				sessionInit.domOverlay = { root: overlay };

			}

			//

			let currentSession = null;

			async function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setReferenceSpaceType( 'local' );

				await renderer.xr.setSession( session );

				button.textContent = 'STOP AR';
				sessionInit.domOverlay.root.style.display = '';

				currentSession = session;
				
				window.threeScene.children.forEach(child => {
					if (child.name === "silhouette") {
						console.log('assign silhouette')
                        silhouetteMesh = child
                    } else if (child.name === "video_plane") {
						console.log('assign videoMesh')
						videoMesh = child
					}
				})

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = ''; // button text
				sessionInit.domOverlay.root.style.display = 'none';

				currentSession = null;
				
				if (silhouetteMesh.visible) {
					silhouetteMesh.visible = false
					startVideoButton.style.display = 'none'
					scaleTip.style.display = 'none'
                    placeTip.style.display = 'flex'
				} else if (!video.paused) {
                    // stop the video
                    videoMesh.visible = false
                    video.pause()
                    video.currentTime = 0
					recordButton.classList.add('fade-container')
                    placeTip.style.display = 'flex'
                }
			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			// button.style.left = 'calc(50% - 50px)';
			// button.style.width = '100px';

			button.textContent = '';

			button.onmouseenter = function () {

				//button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				//button.style.opacity = '0.5';

			};

			button.onclick = function () {

				if ( currentSession === null ) {

					navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.style.display = '';

			button.style.cursor = 'auto';
			//button.style.left = 'calc(50% - 75px)';
			//button.style.width = '150px';

			button.onmouseenter = null;
			button.onmouseleave = null;

			button.onclick = null;

		}

		function showARNotSupported() {

			disableButton();

			button.textContent = 'AR NOT SUPPORTED';
			button.style.backgroundImage = 'none'

		}

		function stylizeElement( element ) {
			element.style.position = 'absolute';
			element.style.bottom = '18%';
			// element.style.padding = '12px 6px';
			// element.style.border = '1px solid #fff';
			// element.style.borderRadius = '4px';
			// element.style.background = 'rgba(0,0,0,0.1)';
			// element.style.color = '#fff';
			// element.style.font = 'normal 13px sans-serif';
			// element.style.textAlign = 'center';
			// element.style.opacity = '0.5';
			// element.style.outline = 'none';
			element.style.width = '75%'
			element.style.height = '90px'
			element.style.zIndex = '999';
			element.style.background = 'black';
        	element.style.backgroundImage = 'url("./images/start_button.png")'
			element.style.backgroundSize = 'cover'
		}

		if ( 'xr' in navigator ) {

			button.id = 'ARButton';
			button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported();

			} ).catch( showARNotSupported );

			return button;

		} else {

			const message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {
				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {
				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement( message );
			message.style.backgroundImage = 'none'
			message.style.width = '100%'
			message.style.left = '0'
			message.style.textAlign = 'center'
			message.style.color = 'white'
			message.style.fontSize = '20px'
			placeTip.style.display = 'none'
			replaceButton.style.display = 'none'

			return message;

		}

	}

}

export { ARButton };
