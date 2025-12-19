package com.quickgram

import android.app.Activity
import android.content.Intent
import android.speech.RecognizerIntent
import com.facebook.react.bridge.*
import java.util.*

class VoiceToTextModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var voicePromise: Promise? = null
        private val REQUEST_CODE = 2001

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "VoiceToText"

    @ReactMethod
    fun startVoiceSearch(promise: Promise) {
        val activity = reactContext.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Activity is null")
            return
        }

        voicePromise = promise

        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(
                RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
            )
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
        }

        activity.startActivityForResult(intent, REQUEST_CODE)
    }

    override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode == REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                val results =
                    data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
                voicePromise?.resolve(results?.get(0) ?: "")
            } else {
                voicePromise?.reject("CANCELLED", "Voice cancelled")
            }
            voicePromise = null
        }
    }

    override fun onNewIntent(intent: Intent) {
        // Required override (leave empty)
    }
}
