package edu.vsu.flora.florest.florest.security

import edu.vsu.flora.florest.florest.user.PrincipalDetailsService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Service
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class JwtAuthenticationFilter(
    private val jwtTokenProvider: JwtTokenProvider,
    private val principalDetailsService: PrincipalDetailsService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            val token = extractJwtFromHeader(request)
            if (token != null && jwtTokenProvider.isValidToken(token)) {
                val username = jwtTokenProvider.extractUsername(token)
                val userDetails = principalDetailsService.loadUserByUsername(username)
                val authentication = UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.authorities).apply {
                        details = WebAuthenticationDetailsSource().buildDetails(request)
                    }
                SecurityContextHolder.getContext().authentication = authentication
            }
        } catch (e: Exception) {
            // some logging
        }

        filterChain.doFilter(request, response)
    }

    fun extractJwtFromHeader(request: HttpServletRequest): String? {
        val authenticationHeader = request.getHeader("Authorization")
        return authenticationHeader
            ?.takeIf { it.isNotBlank() && it.startsWith("Bearer ") }
            ?.let { it.substring(7) }
    }

}
