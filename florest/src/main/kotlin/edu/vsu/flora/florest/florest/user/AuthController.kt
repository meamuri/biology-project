package edu.vsu.flora.florest.florest.user

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController(private val authService: AuthService) {
    @PostMapping("/login")
    fun login(request: LoginRequest): LoginResponse {
        return authService.login(request.username, request.password)
    }
}
