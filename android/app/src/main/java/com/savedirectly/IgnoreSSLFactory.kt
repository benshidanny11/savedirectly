package com.savedirectly

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import com.facebook.react.modules.network.ReactCookieJarContainer
import java.security.cert.CertificateException
import java.util.concurrent.TimeUnit
import android.util.Log
import javax.net.ssl.*
import okhttp3.OkHttpClient

class IgnoreSSLFactory : OkHttpClientFactory {
    companion object {
        private const val TAG = "IgnoreSSLFactory"
    }

    override fun createNewNetworkModuleClient(): OkHttpClient {
        return try {
            // Trust manager that does not validate certificate chains
            val trustAllCerts = arrayOf<TrustManager>(
                object : X509TrustManager {
                    override fun checkClientTrusted(chain: Array<java.security.cert.X509Certificate>, authType: String) {
                        // Do nothing
                    }

                    override fun checkServerTrusted(chain: Array<java.security.cert.X509Certificate>, authType: String) {
                        // Do nothing
                    }

                    override fun getAcceptedIssuers(): Array<java.security.cert.X509Certificate> {
                        return arrayOf()
                    }
                }
            )

            // Initialize SSL context with our trust manager
            val sslContext = SSLContext.getInstance("SSL")
            sslContext.init(null, trustAllCerts, java.security.SecureRandom())
            val sslSocketFactory = sslContext.socketFactory

            // Create OkHttpClient builder and configure it
            val builder = OkHttpClient.Builder()
                .connectTimeout(0, TimeUnit.MILLISECONDS)
                .readTimeout(0, TimeUnit.MILLISECONDS)
                .writeTimeout(0, TimeUnit.MILLISECONDS)
                .cookieJar(ReactCookieJarContainer())

            // Set the custom SSL factory
            builder.sslSocketFactory(sslSocketFactory, trustAllCerts[0] as X509TrustManager)

            // Ignore host name verification
            builder.hostnameVerifier { _, _ -> true }

            // Build the OkHttpClient
            builder.build()
        } catch (e: Exception) {
            Log.e(TAG, e.message ?: "Error creating OkHttpClient")
            throw RuntimeException(e)
        }
    }
}
