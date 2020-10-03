import org.khronos.webgl.Float32Array
import org.khronos.webgl.WebGLProgram
import org.khronos.webgl.WebGLRenderingContext
import org.khronos.webgl.WebGLShader
import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document
import kotlin.browser.window

val webGlConsts = mapOf(35633 to "Vertex", 35632 to "Fragment")


class WebGLApplication(resources: Resources) {
    private val canvas = document.getElementById("glCanvas") as HTMLCanvasElement
    private val gl = canvas.getContext("webgl") as WebGLRenderingContext
    private val vertexShader = createShader(WebGLRenderingContext.VERTEX_SHADER, resources.vertSrc)
    private val fragmentShader = createShader(WebGLRenderingContext.FRAGMENT_SHADER, resources.fragSrc)
    private val program = createProgram(vertexShader, fragmentShader)

    /**
     * Creates and compiles a WebGLShader from the given type (frag or vert) and its source
     */
    private fun createShader(type: Int, source: String): WebGLShader {
        val shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        if(!(gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS) as Boolean)
            || shader == null) {
            gl.deleteShader(shader)
            error("Error creating shader ${type}: ${gl.getShaderInfoLog(shader)}")
        }

        console.log("Successfully created ${webGlConsts[type]} shader")
        return shader
    }

    /**
     * Creates a WebGLProgram, attaches both shaders to it and links them into the final program object
     */
    private fun createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        val program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        gl.useProgram(program)

        if(!(gl.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS) as Boolean)
            || program == null) {
            gl.deleteProgram(program)
            error("Error creating program ${gl.getProgramInfoLog(program)}")
        }

        console.log("Successfully created & linked program ${program}")
        return program
    }

    /**
     * Sets up an attribute to be passed into the vertex shader.
     * Creates, binds and loads data into buffer and points it to the attribute in the v-shader.
     */
    private fun createAttribute(name: String, data: Float32Array) {
        val attrLocation = gl.getAttribLocation(this.program, name)
        val buffer = gl.createBuffer()
        gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, buffer)
        gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, data, WebGLRenderingContext.STATIC_DRAW)
        gl.enableVertexAttribArray(attrLocation)
        gl.vertexAttribPointer(attrLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0)
        console.log("Created attribute ${name} with data ${data}")
    }

    public fun init() {
        gl.enable(WebGLRenderingContext.DEPTH_TEST)

        val a_positionData = Float32Array(arrayOf(
            0.0f, 0.0f,
            1.0f, 0.0f,
            1.0f, 1.0f)
        )
        createAttribute("a_position", a_positionData)

        render()
    }

    /**
     * Core render loop of application.
     * Perpetually clears the rendering context/canvas and draws next scene.
     */
    private fun render() {
            gl.clearColor(1.0f, 1.0f, 1.0f, 1.0f)
            gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT or WebGLRenderingContext.DEPTH_BUFFER_BIT)
            draw()
            window.requestAnimationFrame { render() }
    }

    /**
     * Main draw function, handling changes in the scene before drawing
     */
    private fun draw() {
        gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 3)
    }
}

// Begin main execution
fun run(resources: Resources) {
    val glApp = WebGLApplication(resources)
    glApp.init()
//    val canvas = document.getElementById("glCanvas") as HTMLCanvasElement
//    val gl = canvas.getContext("webgl") as WebGLRenderingContext
//    gl.clearColor(1.0f, 0.0f, 0.0f, 1.0f)
//    gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT or WebGLRenderingContext.DEPTH_BUFFER_BIT)
//    gl.enable(WebGLRenderingContext.DEPTH_TEST)
}