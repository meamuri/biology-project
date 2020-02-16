package edu.vsu.flora.migrator.schema

import org.litote.kmongo.coroutine.CoroutineCollection
import org.litote.kmongo.coroutine.CoroutineDatabase

data class MigrationDescription(val description: String, val apply: MigrationFunction)
typealias MigrationFunction = suspend (db: CoroutineDatabase) -> Unit
typealias MigrationCollection = CoroutineCollection<MigrationMetadata>
