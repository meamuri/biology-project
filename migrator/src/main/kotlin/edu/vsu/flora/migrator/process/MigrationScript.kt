package edu.vsu.flora.migrator.process

import edu.vsu.flora.migrator.schema.MigrationDescription

interface MigrationScript {
    val actions: List<MigrationDescription>
}
