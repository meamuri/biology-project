package edu.vsu.flora.migrator.schema

import java.time.Instant

data class MigrationMetadata(
    val migrationId: Int,
    val scriptId: Int,
    val description: String,
    val author: String,
    val timestamp: Instant
)
