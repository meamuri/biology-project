package edu.vsu.flora.florest.florest.user

data class LoginResponse(val token: String)
data class LoginRequest(val username: String, val password: String)
