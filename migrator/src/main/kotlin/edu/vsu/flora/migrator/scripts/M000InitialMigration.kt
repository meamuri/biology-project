package edu.vsu.flora.migrator.scripts

import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationCollection
import edu.vsu.flora.migrator.schema.MigrationDescription

class M000InitialMigration(migrationCollection: MigrationCollection) : Migration(
    migrationCollection, 0, listOf(initialMigration)
) {
    companion object {
        val initialMigration = MigrationDescription("initial migration") { _, _ ->
            throw RuntimeException("Should not be invoked if initial migration exists")
        }
    }
}
