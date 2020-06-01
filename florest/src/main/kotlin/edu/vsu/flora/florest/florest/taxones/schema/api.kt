package edu.vsu.flora.florest.florest.taxones.schema

data class UpdateDTO(
    val description: String,
    val frequency: String?,
    val biomorph: String?
)
