package com.quickgram

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import com.yalantis.ucrop.UCrop
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

class CameraModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var photoPromise: Promise? = null
    private var photoUri: Uri? = null
    private var cropDestinationUri: Uri? = null
    private var pendingCrop: Boolean = false

    companion object {
        private const val REQUEST_CAMERA_CAPTURE = 101
        private const val REQUEST_GALLERY_PICK = 102
        private const val REQUEST_CAMERA_PERMISSION = 201
        private const val REQUEST_GALLERY_PERMISSION = 202
    }

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "CameraModule"

    /** CAMERA PERMISSION CHECK **/
    private fun checkCameraPermission(onGranted: () -> Unit) {
        val activity = reactContext.currentActivity ?: run {
            photoPromise?.reject("NO_ACTIVITY", "Current activity is null")
            return
        }

        val permission = android.Manifest.permission.CAMERA
        if (ContextCompat.checkSelfPermission(reactContext, permission) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
            onGranted()
        } else {
            ActivityCompat.requestPermissions(activity, arrayOf(permission), REQUEST_CAMERA_PERMISSION)
        }
    }

    /** GALLERY PERMISSION CHECK **/
    private fun checkGalleryPermission(onGranted: () -> Unit) {
        val activity = reactContext.currentActivity ?: run {
            photoPromise?.reject("NO_ACTIVITY", "Current activity is null")
            return
        }

        val permission = if (Build.VERSION.SDK_INT >= 33)
            android.Manifest.permission.READ_MEDIA_IMAGES
        else
            android.Manifest.permission.READ_EXTERNAL_STORAGE

        if (ContextCompat.checkSelfPermission(reactContext, permission) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
            onGranted()
        } else {
            ActivityCompat.requestPermissions(activity, arrayOf(permission), REQUEST_GALLERY_PERMISSION)
        }
    }

    /** CAPTURE IMAGE **/
    @ReactMethod
    fun captureImage(options: ReadableMap?, promise: Promise) {
        photoPromise = promise
        pendingCrop = options?.getBoolean("crop") ?: false

        checkCameraPermission { launchCamera() }
    }

    /** LAUNCH CAMERA **/
    private fun launchCamera() {
        val activity = reactContext.currentActivity ?: run {
            photoPromise?.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        try {
            val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
            val storageDir: File? = reactContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
            val photoFile = File.createTempFile("JPEG_${timestamp}_", ".jpg", storageDir)

            photoUri = FileProvider.getUriForFile(
                reactContext,
                reactContext.packageName + ".provider",
                photoFile
            )

            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            intent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri)
            activity.startActivityForResult(intent, REQUEST_CAMERA_CAPTURE)

        } catch (e: Exception) {
            photoPromise?.reject("ERROR", e.message)
            photoPromise = null
        }
    }

    /** PICK IMAGE FROM GALLERY **/
    @ReactMethod
    fun pickImage(options: ReadableMap?, promise: Promise) {
        photoPromise = promise
        pendingCrop = options?.getBoolean("crop") ?: false

        checkGalleryPermission { launchGallery() }
    }

    @ReactMethod
    fun launchGallery() {
        val activity = reactContext.currentActivity ?: run {
            photoPromise?.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        try {
            val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
            intent.type = "image/*"
            activity.startActivityForResult(intent, REQUEST_GALLERY_PICK)
        } catch (e: Exception) {
            photoPromise?.reject("ERROR", e.message)
            photoPromise = null
        }
    }

    /** START UCROP **/
    private fun startUCrop(sourceUri: Uri) {
        val activity = reactContext.currentActivity ?: run {
            photoPromise?.reject("NO_ACTIVITY", "Current activity is null")
            photoPromise = null
            return
        }

        try {
            val destinationFile = File.createTempFile(
                "CROP_${System.currentTimeMillis()}_",
                ".jpg",
                reactContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
            )
            cropDestinationUri = Uri.fromFile(destinationFile)

            val intent = UCrop.of(sourceUri, cropDestinationUri!!)
                .withAspectRatio(1f, 1f)
                .withMaxResultSize(800, 800)
                .getIntent(activity)

            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
            activity.startActivityForResult(intent, UCrop.REQUEST_CROP)

        } catch (e: Exception) {
            photoPromise?.reject("UCROP_INIT_ERROR", e.message)
            photoPromise = null
        }
    }

    /** RESOLVE RESULT **/
    private fun resolveImageResult(uri: Uri, mimeType: String?, promise: Promise) {
        val result: WritableMap = Arguments.createMap()
        result.putString("uri", uri.toString())
        result.putString("type", mimeType ?: "image/jpeg")
        promise.resolve(result)
    }

    /** HANDLE PERMISSION RESULTS **/
    fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        when (requestCode) {
            REQUEST_CAMERA_PERMISSION -> {
                if (grantResults.isNotEmpty() && grantResults[0] == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                    launchCamera()
                } else {
                    photoPromise?.reject("PERMISSION_DENIED", "Camera permission denied")
                    photoPromise = null
                }
            }
            REQUEST_GALLERY_PERMISSION -> {
                if (grantResults.isNotEmpty() && grantResults[0] == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                    launchGallery()
                } else {
                    photoPromise?.reject("PERMISSION_DENIED", "Gallery permission denied")
                    photoPromise = null
                }
            }
        }
    }

    /** HANDLE ACTIVITY RESULT **/
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
        when (requestCode) {
            REQUEST_CAMERA_CAPTURE -> {
                if (resultCode == Activity.RESULT_OK && photoUri != null) {
                    if (pendingCrop) startUCrop(photoUri!!)
                    else resolveImageResult(photoUri!!, reactContext.contentResolver.getType(photoUri!!) ?: "image/jpeg", photoPromise!!)
                } else {
                    photoPromise?.reject("CANCELLED", "User cancelled camera capture")
                }
                photoPromise = null
            }

            REQUEST_GALLERY_PICK -> {
                val selectedImageUri = data?.data
                if (resultCode == Activity.RESULT_OK && selectedImageUri != null) {
                    if (pendingCrop) startUCrop(selectedImageUri)
                    else resolveImageResult(selectedImageUri, reactContext.contentResolver.getType(selectedImageUri) ?: "image/jpeg", photoPromise!!)
                } else {
                    photoPromise?.reject("CANCELLED", "User cancelled image pick")
                }
                photoPromise = null
            }

            UCrop.REQUEST_CROP -> {
                if (resultCode == Activity.RESULT_OK && cropDestinationUri != null) {
                    resolveImageResult(cropDestinationUri!!, reactContext.contentResolver.getType(cropDestinationUri!!) ?: "image/jpeg", photoPromise!!)
                } else if (resultCode == UCrop.RESULT_ERROR) {
                    val cropError = data?.let { UCrop.getError(it) }
                    photoPromise?.reject("UCROP_ERROR", cropError?.message)
                } else {
                    photoPromise?.reject("CANCELLED", "User cancelled crop")
                }
                photoPromise = null
            }

            else -> {
                photoPromise?.reject("UNKNOWN_REQUEST", "Unknown request code: $requestCode")
                photoPromise = null
            }
        }
    }

    override fun onNewIntent(intent: Intent) {}
}
