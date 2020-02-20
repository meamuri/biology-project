package edu.vsu.flora.florest.florest.user

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "users")
data class User (
    @Id var id: String?,
    var username: String,
    var password: String
)
