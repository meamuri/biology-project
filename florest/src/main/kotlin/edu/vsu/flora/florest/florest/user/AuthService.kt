package edu.vsu.flora.florest.florest.user

import edu.vsu.flora.florest.florest.security.JwtTokenProvider
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val authenticationManager: AuthenticationManager,
    private val jwtTokenProvider: JwtTokenProvider
) {
    fun login(username: String, password: String): LoginResponse {
        val auth = UsernamePasswordAuthenticationToken(username, password)
        val authentication = authenticationManager.authenticate(auth)
        SecurityContextHolder.getContext().authentication = authentication
        val jwt = jwtTokenProvider.generateToken(authentication)
        return LoginResponse(jwt)
    }
}
