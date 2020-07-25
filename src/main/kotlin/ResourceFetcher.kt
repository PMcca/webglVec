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

    // Fetch all src code resources needed to initialise the application
    fun getResources(uri: String): Array<Promise<String>> {
        var promises = mutableListOf<Promise<String>>()
        promises.add(window.fetch(uri, params).then {response -> response.text()}.then {text -> text})
        println("Params is now $params")
//
//        var result: String? = null
//        val p = window.fetch(uri, params)
//            .then { response -> response.text() }
//            .then { text ->
//                println("Loaded ${text}")
//                text
//            }
//            .catch { e -> error("Error loading resource ${e}") }
//
//        return p
        return promises.toTypedArray()
    }
}