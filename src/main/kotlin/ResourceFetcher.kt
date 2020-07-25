import kotlin.browser.window
import kotlin.js.Promise
import kotlin.reflect.KMutableProperty0


/**
 * Fetch resources via JavaScript's Fetch API
 */
class ResourceFetcher(
    val vertShaderUri: String,
    val fragShaderUri: String) {
    private var params = js("({})")
    init {
        params.method = "GET"
        params.cache = "no-store"
        params.mode = "same-origin"
    }

    // Fetch all src code resources needed to initialise the application and run
    fun configureAndRun() {
        val resources = Resources()
        val promises = mutableListOf<Promise<String>>()

        // Fetch shaders
        promises.add(fetchResource(vertShaderUri, resources::vertSrc))
        promises.add(fetchResource(fragShaderUri, resources::fragSrc))

        //TODO: Use reflection above or code below?
//        promises.add(window.fetch(vertShaderUri, params)
//            .then {response -> response.text()}
//            .then {text -> resources.vertSrc = text;text}
//            .catch {e -> console.error("Fetch for $vertShaderUri failed with $e"); e.message!! })
//        promises.add(window.fetch(fragShaderUri, params)
//            .then {response -> response.text()}
//            .then {text -> resources.fragSrc = text;text}
//            .catch {e -> console.error("Fetch for $fragShaderUri failed with $e"); e.message!! })


        // Wait on all promises, then run app
        Promise.all(promises.toTypedArray()).then {_ -> run(resources)}
    }

    private fun fetchResource(resUri: String, resPointer: KMutableProperty0<String>): Promise<String> {
        return window.fetch(resUri, params)
            .then {response -> response.text()}
            .then {text -> resPointer.set(text);text}
            .catch {e -> console.error("Fetch for $resUri failed with $e"); e.message!! }
    }
}

class Resources() {
    lateinit var vertSrc: String
    lateinit var fragSrc: String
}