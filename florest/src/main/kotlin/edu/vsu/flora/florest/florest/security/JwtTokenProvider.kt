package edu.vsu.flora.florest.florest.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.SignatureException
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.time.Duration
import java.time.Instant
import java.util.Base64
import java.util.Date
import javax.crypto.spec.SecretKeySpec

@Component
class JwtTokenProvider(securityConfigProperties: SecurityConfigProperties) {

    private val key = Base64.getDecoder()
        .decode(securityConfigProperties.secret)
        .let { secret -> SecretKeySpec(secret, "HmacSHA256") }

    private val jwtParser = Jwts.parserBuilder()
        .setSigningKey(key)
        .build()

    private val untilExpiration = Duration.ofDays(securityConfigProperties.expirationInDays ?: 1)

    fun generateToken(authentication: Authentication): String {
        val principal = authentication.principal as Principal
        val now = Instant.now()
        return Jwts.builder()
            .setSubject(principal.username)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plus(untilExpiration)))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun extractUsername(token: String): String {
        val claims = jwtParser.parse(token).body as Claims
        return claims.subject
    }

    fun isValidToken(token: String) : Boolean {
        try {
            jwtParser.parse(token)
            return true
        } catch (e: SignatureException) {
            // a bit logging here
        }
        return false
    }

}
