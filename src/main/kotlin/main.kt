import kotlin.browser.document

fun main()  {
    document.body?.onload = {
        ResourceFetcher(
            "glsl/vert-shader.glsl",
            "glsl/frag-shader.glsl"
        ).configureAndRun()
    }
}