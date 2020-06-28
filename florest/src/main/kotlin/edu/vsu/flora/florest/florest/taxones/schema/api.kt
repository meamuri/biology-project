package edu.vsu.flora.florest.florest.taxones.schema

data class UpdateDTO(
    val description: String,
    val frequency: String?,
    val biomorph: String?,
    val hydrophile: String?,
    val complex: String?,
    var coenotic: String?,
    var areal: String?
)
