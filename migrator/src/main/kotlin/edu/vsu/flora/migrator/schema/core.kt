package edu.vsu.flora.migrator.schema

import org.litote.kmongo.coroutine.CoroutineCollection

data class MigrationDescription(val description: String, val apply: MigrationFunction)
typealias MigrationFunction = (migrations: MigrationCollection, metadata: MigrationMetadata) -> Unit
typealias MigrationCollection = CoroutineCollection<MigrationMetadata>
