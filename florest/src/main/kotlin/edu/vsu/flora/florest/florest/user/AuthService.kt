package edu.vsu.flora.florest.florest.user

import edu.vsu.flora.florest.florest.security.JwtTokenProvider
import edu.vsu.flora.florest.florest.security.SecurityConfigProperties
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val authenticationManager: AuthenticationManager,
    private val jwtTokenProvider: JwtTokenProvider,
    private val userRepository: UserRepository,
    private val securityConfigProperties: SecurityConfigProperties
) {
    fun login(username: String, password: String): LoginResponse {
        val auth = UsernamePasswordAuthenticationToken(username, password)
        val authentication = authenticationManager.authenticate(auth)
        SecurityContextHolder.getContext().authentication = authentication
        val jwt = jwtTokenProvider.generateToken(authentication)
        return LoginResponse(jwt)
    }

    fun signUp(username: String, password: String) {
        if (!securityConfigProperties.registrationEnabled) {
            throw RuntimeException("Function disabled. Contact support")
        }

        val user = userRepository.findByUsername(username)
        if (user != null) {
            throw RuntimeException("User already exists")
        }

        userRepository.save(User(null, username, password))
    }
}
