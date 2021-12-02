// Creates a WebGL context and initializes it with some common default state.
export function createWebGLContext(glAttribs) {
    glAttribs = glAttribs || {alpha: false};
  
    let webglCanvas = document.createElement('canvas');
    let contextTypes = glAttribs.webgl2 ? ['webgl2'] : ['webgl', 'experimental-webgl'];
    let context = null;
  
    for (let contextType of contextTypes) {
      context = webglCanvas.getContext(contextType, glAttribs);
      if (context) {
        break;
      }
    }
  
    if (!context) {
      let webglType = (glAttribs.webgl2 ? 'WebGL 2' : 'WebGL');
      console.error('This browser does not support ' + webglType + '.');
      return null;
    }
  
    return context;
  }