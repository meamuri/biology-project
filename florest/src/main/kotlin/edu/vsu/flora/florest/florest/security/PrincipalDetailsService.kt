package edu.vsu.flora.florest.florest.security

import edu.vsu.flora.florest.florest.user.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component

@Component
class PrincipalDetailsService(private val userRepository: UserRepository) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username) ?: throw RuntimeException("Username not found")
        return Principal(user)
    }
}
