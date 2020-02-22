package edu.vsu.flora.florest.florest.security

import edu.vsu.flora.florest.florest.user.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class Principal(private val user: User) : UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority> = listOf()

    override fun getUsername(): String = user.username

    override fun getPassword(): String = user.password

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = true

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true
}
