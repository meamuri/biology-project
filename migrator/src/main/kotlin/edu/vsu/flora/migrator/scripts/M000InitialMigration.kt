package edu.vsu.flora.migrator.scripts

import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase

class M000InitialMigration(database: CoroutineDatabase) : Migration(
    database, 0, listOf(initialMigration)
) {
    companion object {
        val initialMigration = MigrationDescription("initial migration") {
            throw RuntimeException("Should not be invoked if initial migration exists")
        }
    }
}
