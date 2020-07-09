import kotlin.browser.window
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine
import kotlin.js.Promise

/**
 * Fetch resources via JavaScript's Fetch API
 */
class ResourceFetcher() {
    private var params = js("({})")
    init {
        params.method = "GET"
        params.cache = "no-store"
        params.mode = "same-origin"
    }

    suspend fun getResource(uri: String, glApp: WebGLApplication): Promise<String> {

        var result: String? = null
        val p = window.fetch(uri, params)
            .then { response -> response.text() }
            .then { text ->
                println("Loaded ${text}")
                glApp.createShader(0, text)
                text
            }
            .catch { e -> error("Error loading resource ${e}") }

        return p
    }
}