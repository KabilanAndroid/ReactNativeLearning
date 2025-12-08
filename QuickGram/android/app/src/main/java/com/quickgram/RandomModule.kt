package com.quickgram

import com.facebook.react.bridge.*

class RandomModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "RandomModule"

    @ReactMethod
    fun generateRandom(min: Int, max: Int, promise: Promise) {
        try {
            val number = (min..max).random()
            promise.resolve(number)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}
