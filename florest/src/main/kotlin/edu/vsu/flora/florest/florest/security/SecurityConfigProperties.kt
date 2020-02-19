package edu.vsu.flora.florest.florest.security

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties("security.jwt")
class SecurityConfigProperties {
    var expiration: Long? = null
    lateinit var secret: String
}
