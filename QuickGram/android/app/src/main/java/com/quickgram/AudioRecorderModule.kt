package com.quickgram

import android.media.MediaRecorder
import com.facebook.react.bridge.*
import java.io.File

class AudioRecorderModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private var recorder: MediaRecorder? = null
    private var outputPath: String? = null

    override fun getName(): String = "AudioRecorder"

    @ReactMethod
    fun startRecording(promise: Promise) {
        try {
            val file = File(
                reactApplicationContext.cacheDir,
                "audio_${System.currentTimeMillis()}.m4a"
            )
            outputPath = file.absolutePath

            recorder = MediaRecorder().apply {
                setAudioSource(MediaRecorder.AudioSource.MIC)
                setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
                setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
                setOutputFile(outputPath)
                prepare()
                start()
            }

            promise.resolve("Recording started")
        } catch (e: Exception) {
            promise.reject("START_ERROR", e)
        }
    }

    @ReactMethod
    fun stopRecording(promise: Promise) {
        try {
            recorder?.apply {
                stop()
                release()
            }
            recorder = null
            promise.resolve(outputPath)
        } catch (e: Exception) {
            promise.reject("STOP_ERROR", e)
        }
    }
}
