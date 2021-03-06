package edu.vsu.flora.florest.florest.user

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class AuthController(private val authService: AuthService) {
    @PostMapping("/auth/login")
    fun login(@RequestBody request: LoginRequest): LoginResponse {
        return authService.login(request.username, request.password)
    }

    @PostMapping("/auth/sign-up")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun signUp(@RequestBody request: SignUpRequest) {
        authService.signUp(request.username, request.password)
    }

    /**
     * this endpoint provides token check.
     * returns 204 status if token is correct, otherwise 401 unauthorized.
     */
    @PostMapping("/health")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun healthCheck() = Unit
}
