package com.quickgram

import android.app.Activity
import android.content.Intent
import android.provider.MediaStore
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CameraModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val IMAGE_CAPTURE_REQUEST_CODE = 1

    // NEW-LAYOUT: Activity event listener
    private val activityEventListener = object : BaseActivityEventListener() {
        override fun onActivityResult(
            activity: Activity,
            requestCode: Int,
            resultCode: Int,
            data: Intent?
        ) {
            if (requestCode == IMAGE_CAPTURE_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
                // TODO: handle the camera result here
                // Example:
                // val image = data?.extras?.get("data")
            }
        }
    }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

    override fun getsName(): String {
        return "CameraModule"
    }

    @ReactMethod
    fun openNativeCamera() {
        val activity = currentActivity ?: return

        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        if (takePictureIntent.resolveActivity(activity.packageManager) != null) {
            activity.startActivityForResult(takePictureIntent, IMAGE_CAPTURE_REQUEST_CODE)
        }
    }
}
