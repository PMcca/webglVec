(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'showmyvectors'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'showmyvectors'.");
    }
    root.showmyvectors = factory(typeof showmyvectors === 'undefined' ? {} : showmyvectors, kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var IllegalStateException_init = Kotlin.kotlin.IllegalStateException_init_pdl1vj$;
  var throwCCE = Kotlin.throwCCE;
  var toString = Kotlin.toString;
  var Unit = Kotlin.kotlin.Unit;
  function Resourcefetcher() {
    this.params_0 = {};
    this.params_0.method = 'GET';
    this.params_0.cache = 'no-store';
    this.params_0.mode = 'same-origin';
  }
  function Resourcefetcher$getResource$lambda(response) {
    return response.text();
  }
  function Resourcefetcher$getResource$lambda_0(text) {
    println('Loaded ' + text);
    return text;
  }
  function Resourcefetcher$getResource$lambda_1(e) {
    throw IllegalStateException_init(('Error loading resource ' + e).toString());
  }
  Resourcefetcher.prototype.getResource_61zpoe$ = function (uri) {
    var result = null;
    var p = window.fetch(uri, this.params_0).then(Resourcefetcher$getResource$lambda).then(Resourcefetcher$getResource$lambda_0).catch(Resourcefetcher$getResource$lambda_1);
    return p;
  };
  Resourcefetcher.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Resourcefetcher',
    interfaces: []
  };
  function WebGLApplication() {
    var tmp$, tmp$_0;
    this.canvas_0 = Kotlin.isType(tmp$ = document.getElementById('glCanvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.gl_0 = Kotlin.isType(tmp$_0 = this.canvas_0.getContext('webgl'), WebGLRenderingContext) ? tmp$_0 : throwCCE();
    this.vertexShader_0 = this.createShader_0(WebGLRenderingContext.VERTEX_SHADER, '/Users/petem/dev/kotlin/showmyvectors/src/main/resources/glsl/vert-shader.glsl');
    this.fragmentShader_0 = this.createShader_0(WebGLRenderingContext.FRAGMENT_SHADER, '/Users/petem/dev/kotlin/showmyvectors/src/main/resources/glsl/frag-shader.glsl');
    this.program_0 = this.createProgram_0(this.vertexShader_0, this.fragmentShader_0);
  }
  WebGLApplication.prototype.createShader_0 = function (type, source) {
    var tmp$;
    var shader = this.gl_0.createShader(type);
    this.gl_0.shaderSource(shader, '/Users/petem/dev/kotlin/showmyvectors/src/main/resources/glsl/vert-shader.glsl');
    this.gl_0.compileShader(shader);
    if (!(typeof (tmp$ = this.gl_0.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS)) === 'boolean' ? tmp$ : throwCCE())) {
      this.gl_0.deleteShader(shader);
      throw IllegalStateException_init(('Error creating shader ' + type + ' for ' + source + ': ' + toString(this.gl_0.getShaderInfoLog(shader))).toString());
    }
    var tmp$_0;
    if (shader != null)
      tmp$_0 = shader;
    else {
      throw IllegalStateException_init(('Shader was null: ' + type + ' shader ' + toString(this.gl_0.getShaderInfoLog(shader))).toString());
    }
    return tmp$_0;
  };
  WebGLApplication.prototype.createProgram_0 = function (vertexShader, fragmentShader) {
    var tmp$;
    var program = this.gl_0.createProgram();
    this.gl_0.attachShader(program, vertexShader);
    this.gl_0.attachShader(program, fragmentShader);
    this.gl_0.linkProgram(program);
    this.gl_0.useProgram(program);
    if (!(typeof (tmp$ = this.gl_0.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS)) === 'boolean' ? tmp$ : throwCCE())) {
      this.gl_0.deleteProgram(program);
      throw IllegalStateException_init(('Error creating program ' + toString(this.gl_0.getProgramInfoLog(program))).toString());
    }
    var tmp$_0;
    if (program != null)
      tmp$_0 = program;
    else {
      throw IllegalStateException_init(('Program was null: ' + toString(this.gl_0.getProgramInfoLog(program))).toString());
    }
    return tmp$_0;
  };
  WebGLApplication.prototype.createAttribute_0 = function (name, data) {
    var attrLocation = this.gl_0.getAttribLocation(this.program_0, name);
    var buffer = this.gl_0.createBuffer();
    this.gl_0.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, buffer);
    this.gl_0.bufferData(WebGLRenderingContext.ARRAY_BUFFER, data, WebGLRenderingContext.STATIC_DRAW);
    this.gl_0.enableVertexAttribArray(attrLocation);
    this.gl_0.vertexAttribPointer(attrLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
    println('Created attribute ' + name + ' with data ' + data);
  };
  WebGLApplication.prototype.init_0 = function () {
    this.gl_0.enable(WebGLRenderingContext.DEPTH_TEST);
    var a_positionData = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0]);
    this.createAttribute_0('a_position', a_positionData);
    this.render_0();
  };
  function WebGLApplication$render$lambda(this$WebGLApplication) {
    return function (it) {
      this$WebGLApplication.draw_0();
      return Unit;
    };
  }
  WebGLApplication.prototype.render_0 = function () {
    while (true) {
      this.gl_0.clearColor(1.0, 0.0, 0.0, 1.0);
      this.gl_0.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);
      window.requestAnimationFrame(WebGLApplication$render$lambda(this));
    }
  };
  WebGLApplication.prototype.draw_0 = function () {
    this.gl_0.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 3);
  };
  WebGLApplication.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'WebGLApplication',
    interfaces: []
  };
  function main$lambda$lambda(closure$fragSrc) {
    return function (result) {
      closure$fragSrc.v = result[0];
      return Unit;
    };
  }
  function main$lambda(it) {
    var tmp$, tmp$_0;
    var fetcher = new Resourcefetcher();
    var fragSrc = {v: 'Not done'};
    Promise.all([fetcher.getResource_61zpoe$('glsl/frag-shader.glsl')]).then(main$lambda$lambda(fragSrc));
    println(fragSrc.v);
    var canvas = Kotlin.isType(tmp$ = document.getElementById('glCanvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var gl = Kotlin.isType(tmp$_0 = canvas.getContext('webgl'), WebGLRenderingContext) ? tmp$_0 : throwCCE();
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);
    gl.enable(WebGLRenderingContext.DEPTH_TEST);
    return Unit;
  }
  function main() {
    var tmp$;
    (tmp$ = document.body) != null ? (tmp$.onload = main$lambda) : null;
  }
  _.Resourcefetcher = Resourcefetcher;
  _.WebGLApplication = WebGLApplication;
  _.main = main;
  main();
  Kotlin.defineModule('showmyvectors', _);
  return _;
}));

//# sourceMappingURL=showmyvectors.js.map
