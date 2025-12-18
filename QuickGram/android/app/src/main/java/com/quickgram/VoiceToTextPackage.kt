package com.quickgram

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class VoiceToTextPackage : ReactPackage {
    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ) = listOf(VoiceToTextModule(reactContext))

    override fun createViewManagers(reactContext: ReactApplicationContext)
            : List<ViewManager<*, *>> = emptyList()
}
