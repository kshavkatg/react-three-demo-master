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

  export class Renderer {
    constructor(gl, multiview) {
      this._gl = gl || createWebGLContext();
      this._frameId = 0;
      this._programCache = {};
      this._textureCache = {};
      this._renderPrimitives = Array(RENDER_ORDER.DEFAULT);
      this._cameraPositions = [];
  
      this._vaoExt = gl.getExtension('OES_vertex_array_object');
  
      let fragHighPrecision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
      this._defaultFragPrecision = fragHighPrecision.precision > 0 ? 'highp' : 'mediump';
  
      this._depthMaskNeedsReset = false;
      this._colorMaskNeedsReset = false;
  
      this._globalLightColor = vec3.clone(DEF_LIGHT_COLOR);
      this._globalLightDir = vec3.clone(DEF_LIGHT_DIR);
  
      this._multiview = multiview;
    }
  
    get gl() {
      return this._gl;
    }
  
    set globalLightColor(value) {
      vec3.copy(this._globalLightColor, value);
    }
  
    get globalLightColor() {
      return vec3.clone(this._globalLightColor);
    }
  
    set globalLightDir(value) {
      vec3.copy(this._globalLightDir, value);
    }
  
    get globalLightDir() {
      return vec3.clone(this._globalLightDir);
    }
  
    createRenderBuffer(target, data, usage = GL.STATIC_DRAW) {
      let gl = this._gl;
      let glBuffer = gl.createBuffer();
  
      if (data instanceof Promise) {
        let renderBuffer = new RenderBuffer(target, usage, data.then((data) => {
          gl.bindBuffer(target, glBuffer);
          gl.bufferData(target, data, usage);
          renderBuffer._length = data.byteLength;
          return glBuffer;
        }));
        return renderBuffer;
      } else {
        gl.bindBuffer(target, glBuffer);
        gl.bufferData(target, data, usage);
        return new RenderBuffer(target, usage, glBuffer, data.byteLength);
      }
    }
  
    updateRenderBuffer(buffer, data, offset = 0) {
      if (buffer._buffer) {
        let gl = this._gl;
        gl.bindBuffer(buffer._target, buffer._buffer);
        if (offset == 0 && buffer._length == data.byteLength) {
          gl.bufferData(buffer._target, data, buffer._usage);
        } else {
          gl.bufferSubData(buffer._target, offset, data);
        }
      } else {
        buffer.waitForComplete().then((buffer) => {
          this.updateRenderBuffer(buffer, data, offset);
        });
      }
    }
  
    createRenderPrimitive(primitive, material) {
      let renderPrimitive = new RenderPrimitive(primitive);
  
      let program = this._getMaterialProgram(material, renderPrimitive);
      let renderMaterial = new RenderMaterial(this, material, program);
      renderPrimitive.setRenderMaterial(renderMaterial);
  
      if (!this._renderPrimitives[renderMaterial._renderOrder]) {
        this._renderPrimitives[renderMaterial._renderOrder] = [];
      }
  
      this._renderPrimitives[renderMaterial._renderOrder].push(renderPrimitive);
  
      return renderPrimitive;
    }
  
    createMesh(primitive, material) {
      let meshNode = new Node();
      meshNode.addRenderPrimitive(this.createRenderPrimitive(primitive, material));
      return meshNode;
    }
  
    drawViews(views, rootNode) {
      if (!rootNode) {
        return;
      }
  
      let gl = this._gl;
      this._frameId++;
  
      rootNode.markActive(this._frameId);
  
      // If there's only one view then flip the algorithm a bit so that we're only
      // setting the viewport once.
      if (views.length == 1 && views[0].viewport) {
        let vp = views[0].viewport;
        this._gl.viewport(vp.x, vp.y, vp.width, vp.height);
      }
  
      // Get the positions of the 'camera' for each view matrix.
      for (let i = 0; i < views.length; ++i) {
        if (this._cameraPositions.length <= i) {
          this._cameraPositions.push(vec3.create());
        }
        let p = views[i].viewTransform.position;
        this._cameraPositions[i][0] = p.x;
        this._cameraPositions[i][1] = p.y;
        this._cameraPositions[i][2] = p.z;
  
        /*mat4.invert(inverseMatrix, views[i].viewMatrix);
        let cameraPosition = this._cameraPositions[i];
        vec3.set(cameraPosition, 0, 0, 0);
        vec3.transformMat4(cameraPosition, cameraPosition, inverseMatrix);*/
      }
  
      // Draw each set of render primitives in order
      for (let renderPrimitives of this._renderPrimitives) {
        if (renderPrimitives && renderPrimitives.length) {
          this._drawRenderPrimitiveSet(views, renderPrimitives);
        }
      }
  
      if (this._vaoExt) {
        this._vaoExt.bindVertexArrayOES(null);
      }
  
      if (this._depthMaskNeedsReset) {
        gl.depthMask(true);
      }
      if (this._colorMaskNeedsReset) {
        gl.colorMask(true, true, true, true);
      }
    }
  
    _drawRenderPrimitiveSet(views, renderPrimitives) {
      let gl = this._gl;
      let program = null;
      let material = null;
      let attribMask = 0;
  
      // Loop through every primitive known to the renderer.
      for (let primitive of renderPrimitives) {
        // Skip over those that haven't been marked as active for this frame.
        if (primitive._activeFrameId != this._frameId) {
          continue;
        }
  
        // Bind the primitive material's program if it's different than the one we
        // were using for the previous primitive.
        // TODO: The ording of this could be more efficient.
        if (program != primitive._material._program) {
          program = primitive._material._program;
          program.use();
  
          if (program.uniform.LIGHT_DIRECTION) {
            gl.uniform3fv(program.uniform.LIGHT_DIRECTION, this._globalLightDir);
          }
  
          if (program.uniform.LIGHT_COLOR) {
            gl.uniform3fv(program.uniform.LIGHT_COLOR, this._globalLightColor);
          }
  
          if (views.length == 1) {
            if (!this._multiview) {
              gl.uniformMatrix4fv(program.uniform.PROJECTION_MATRIX, false, views[0].projectionMatrix);
              gl.uniformMatrix4fv(program.uniform.VIEW_MATRIX, false, views[0].viewMatrix);
              gl.uniform3fv(program.uniform.CAMERA_POSITION, this._cameraPositions[0]);
              gl.uniform1i(program.uniform.EYE_INDEX, views[0].eyeIndex);
            } else {
              let vp = views[0].viewport;
              gl.viewport(vp.x, vp.y, vp.width, vp.height);
              gl.uniformMatrix4fv(program.uniform.LEFT_PROJECTION_MATRIX, false, views[0].projectionMatrix);
              gl.uniformMatrix4fv(program.uniform.LEFT_VIEW_MATRIX, false, views[0].viewMatrix);
              gl.uniformMatrix4fv(program.uniform.RIGHT_PROJECTION_MATRIX, false, views[0].projectionMatrix);
              gl.uniformMatrix4fv(program.uniform.RIGHT_VIEW_MATRIX, false, views[0].viewMatrix);
              gl.uniform3fv(program.uniform.CAMERA_POSITION, this._cameraPositions[0]);
              gl.uniform1i(program.uniform.EYE_INDEX, views[0].eyeIndex);
            }
          }
        }
  
        if (material != primitive._material) {
          this._bindMaterialState(primitive._material, material);
          primitive._material.bind(gl, program, material);
          material = primitive._material;
        }
  
        if (this._vaoExt) {
          if (primitive._vao) {
            this._vaoExt.bindVertexArrayOES(primitive._vao);
          } else {
            primitive._vao = this._vaoExt.createVertexArrayOES();
            this._vaoExt.bindVertexArrayOES(primitive._vao);
            this._bindPrimitive(primitive);
          }
        } else {
          this._bindPrimitive(primitive, attribMask);
          attribMask = primitive._attributeMask;
        }
  
        for (let i = 0; i < views.length; ++i) {
          let view = views[i];
          if (views.length > 1) {
            if (view.viewport) {
              let vp = view.viewport;
              gl.viewport(vp.x, vp.y, vp.width, vp.height);
            }
            if (this._multiview) {
              if (i == 0) {
                gl.uniformMatrix4fv(program.uniform.LEFT_PROJECTION_MATRIX, false, views[0].projectionMatrix);
                gl.uniformMatrix4fv(program.uniform.LEFT_VIEW_MATRIX, false, views[0].viewMatrix);
                gl.uniformMatrix4fv(program.uniform.RIGHT_PROJECTION_MATRIX, false, views[1].projectionMatrix);
                gl.uniformMatrix4fv(program.uniform.RIGHT_VIEW_MATRIX, false, views[1].viewMatrix);
              }
              // TODO(AB): modify shaders which use CAMERA_POSITION and EYE_INDEX to work with Multiview
              gl.uniform3fv(program.uniform.CAMERA_POSITION, this._cameraPositions[i]);
              gl.uniform1i(program.uniform.EYE_INDEX, view.eyeIndex);
            } else {
              gl.uniformMatrix4fv(program.uniform.PROJECTION_MATRIX, false, view.projectionMatrix);
              gl.uniformMatrix4fv(program.uniform.VIEW_MATRIX, false, view.viewMatrix);
              gl.uniform3fv(program.uniform.CAMERA_POSITION, this._cameraPositions[i]);
              gl.uniform1i(program.uniform.EYE_INDEX, view.eyeIndex);
            }
          }
  
          for (let instance of primitive._instances) {
            if (instance._activeFrameId != this._frameId) {
              continue;
            }
  
            gl.uniformMatrix4fv(program.uniform.MODEL_MATRIX, false, instance.worldMatrix);
  
            if (primitive._indexBuffer) {
              gl.drawElements(primitive._mode, primitive._elementCount,
                  primitive._indexType, primitive._indexByteOffset);
            } else {
              gl.drawArrays(primitive._mode, 0, primitive._elementCount);
            }
          }
          if (this._multiview) {
            break;
          }
        }
      }
    }
  
    _getRenderTexture(texture) {
      if (!texture) {
        return null;
      }
  
      let key = texture.textureKey;
      if (!key) {
        throw new Error('Texure does not have a valid key');
      }
  
      if (key in this._textureCache) {
        return this._textureCache[key];
      } else {
        let gl = this._gl;
        let textureHandle = gl.createTexture();
  
        let renderTexture = new RenderTexture(textureHandle);
        this._textureCache[key] = renderTexture;
  
        if (texture instanceof DataTexture) {
          gl.bindTexture(gl.TEXTURE_2D, textureHandle);
          gl.texImage2D(gl.TEXTURE_2D, 0, texture.format, texture.width, texture.height,
                                       0, texture.format, texture._type, texture._data);
          this._setSamplerParameters(texture);
          renderTexture._complete = true;
        } else {
          texture.waitForComplete().then(() => {
            gl.bindTexture(gl.TEXTURE_2D, textureHandle);
            gl.texImage2D(gl.TEXTURE_2D, 0, texture.format, texture.format, gl.UNSIGNED_BYTE, texture.source);
            this._setSamplerParameters(texture);
            renderTexture._complete = true;
  
            if (texture instanceof VideoTexture) {
              // Once the video starts playing, set a callback to update it's
              // contents each frame.
              texture._video.addEventListener('playing', () => {
                renderTexture._activeCallback = () => {
                  if (!texture._video.paused && !texture._video.waiting) {
                    gl.bindTexture(gl.TEXTURE_2D, textureHandle);
                    gl.texImage2D(gl.TEXTURE_2D, 0, texture.format, texture.format, gl.UNSIGNED_BYTE, texture.source);
                  }
                };
              });
            }
          });
        }
  
        return renderTexture;
      }
    }
  
    _setSamplerParameters(texture) {
      let gl = this._gl;
  
      let sampler = texture.sampler;
      let powerOfTwo = isPowerOfTwo(texture.width) && isPowerOfTwo(texture.height);
      let mipmap = powerOfTwo && texture.mipmap;
      if (mipmap) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
  
      let minFilter = sampler.minFilter || (mipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
      let wrapS = sampler.wrapS || (powerOfTwo ? gl.REPEAT : gl.CLAMP_TO_EDGE);
      let wrapT = sampler.wrapT || (powerOfTwo ? gl.REPEAT : gl.CLAMP_TO_EDGE);
  
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, sampler.magFilter || gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    }
  
    _getProgramKey(name, defines) {
      let key = `${name}:`;
  
      for (let define in defines) {
        key += `${define}=${defines[define]},`;
      }
  
      return key;
    }
  
    _getMaterialProgram(material, renderPrimitive) {
      const multiview = this._multiview;
      let materialName = material.materialName;
      let vertexSource = (!multiview) ? material.vertexSource : material.vertexSourceMultiview;
      let fragmentSource = (!multiview) ? material.fragmentSource : material.fragmentSourceMultiview;
  
      // These should always be defined for every material
      if (materialName == null) {
        throw new Error('Material does not have a name');
      }
      if (vertexSource == null) {
        throw new Error(`Material "${materialName}" does not have a vertex source`);
      }
      if (fragmentSource == null) {
        throw new Error(`Material "${materialName}" does not have a fragment source`);
      }
  
      let defines = material.getProgramDefines(renderPrimitive);
      let key = this._getProgramKey(materialName, defines);
  
      if (key in this._programCache) {
        return this._programCache[key];
      } else {
        let fullVertexSource = vertexSource;
        fullVertexSource += multiview ? VERTEX_SHADER_MULTI_ENTRY :
                                        VERTEX_SHADER_SINGLE_ENTRY;
  
        let precisionMatch = fragmentSource.match(PRECISION_REGEX);
        let fragPrecisionHeader = precisionMatch ? '' : `precision ${this._defaultFragPrecision} float;\n`;
  
        let fullFragmentSource = fragPrecisionHeader + fragmentSource;
        fullFragmentSource += multiview ? FRAGMENT_SHADER_MULTI_ENTRY :
                                          FRAGMENT_SHADER_ENTRY
  
        let program = new Program(this._gl, fullVertexSource, fullFragmentSource, ATTRIB, defines);
        this._programCache[key] = program;
  
        program.onNextUse((program) => {
          // Bind the samplers to the right texture index. This is constant for
          // the lifetime of the program.
          for (let i = 0; i < material._samplers.length; ++i) {
            let sampler = material._samplers[i];
            let uniform = program.uniform[sampler._uniformName];
            if (uniform) {
              this._gl.uniform1i(uniform, i);
            }
          }
        });
  
        return program;
      }
    }
  
    _bindPrimitive(primitive, attribMask) {
      let gl = this._gl;
  
      // If the active attributes have changed then update the active set.
      if (attribMask != primitive._attributeMask) {
        for (let attrib in ATTRIB) {
          if (primitive._attributeMask & ATTRIB_MASK[attrib]) {
            gl.enableVertexAttribArray(ATTRIB[attrib]);
          } else {
            gl.disableVertexAttribArray(ATTRIB[attrib]);
          }
        }
      }
  
      // Bind the primitive attributes and indices.
      for (let attributeBuffer of primitive._attributeBuffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer._buffer._buffer);
        for (let attrib of attributeBuffer._attributes) {
          gl.vertexAttribPointer(
              attrib._attrib_index, attrib._componentCount, attrib._componentType,
              attrib._normalized, attrib._stride, attrib._byteOffset);
        }
      }
  
      if (primitive._indexBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, primitive._indexBuffer._buffer);
      } else {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      }
    }
  
    _bindMaterialState(material, prevMaterial = null) {
      let gl = this._gl;
  
      let state = material._state;
      let prevState = prevMaterial ? prevMaterial._state : ~state;
  
      // Return early if both materials use identical state
      if (state == prevState) {
        return;
      }
  
      // Any caps bits changed?
      if (material._capsDiff(prevState)) {
        setCap(gl, gl.CULL_FACE, CAP.CULL_FACE, prevState, state);
        setCap(gl, gl.BLEND, CAP.BLEND, prevState, state);
        setCap(gl, gl.DEPTH_TEST, CAP.DEPTH_TEST, prevState, state);
        setCap(gl, gl.STENCIL_TEST, CAP.STENCIL_TEST, prevState, state);
  
        let colorMaskChange = (state & CAP.COLOR_MASK) - (prevState & CAP.COLOR_MASK);
        if (colorMaskChange) {
          let mask = colorMaskChange > 1;
          this._colorMaskNeedsReset = !mask;
          gl.colorMask(mask, mask, mask, mask);
        }
  
        let depthMaskChange = (state & CAP.DEPTH_MASK) - (prevState & CAP.DEPTH_MASK);
        if (depthMaskChange) {
          this._depthMaskNeedsReset = !(depthMaskChange > 1);
          gl.depthMask(depthMaskChange > 1);
        }
  
        let stencilMaskChange = (state & CAP.STENCIL_MASK) - (prevState & CAP.STENCIL_MASK);
        if (stencilMaskChange) {
          gl.stencilMask(stencilMaskChange > 1);
        }
      }
  
      // Blending enabled and blend func changed?
      if (material._blendDiff(prevState)) {
        gl.blendFunc(material.blendFuncSrc, material.blendFuncDst);
      }
  
      // Depth testing enabled and depth func changed?
      if (material._depthFuncDiff(prevState)) {
        gl.depthFunc(material.depthFunc);
      }
    }
  }