package edu.vsu.flora.florest.florest

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.NestedConfigurationProperty
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties("security")
class ConfigProperties {
    lateinit var pathToAllowedOrigins: String
    @NestedConfigurationProperty
    val jwt = SecurityConfigProperties()

    class SecurityConfigProperties {
        var expiration: Long? = null
        lateinit var secret: String
    }

}
