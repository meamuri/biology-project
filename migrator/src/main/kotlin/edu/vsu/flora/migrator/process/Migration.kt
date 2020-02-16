package edu.vsu.flora.migrator.process

import edu.vsu.flora.migrator.insert
import edu.vsu.flora.migrator.schema.MigrationCollection
import edu.vsu.flora.migrator.schema.MigrationDescription
import edu.vsu.flora.migrator.schema.MigrationMetadata
import org.litote.kmongo.eq
import java.time.Instant

abstract class Migration(
    private val migrations: MigrationCollection,
    override val id: Int,
    override val actions: List<MigrationDescription>
) : Numero, MigrationScript {

    suspend fun migrate() {
        val migrationId = id
        actions.forEachIndexed { n, description ->
            val migration = MigrationMetadata(
                migrationId,
                scriptId = n,
                author = "dr.meamuri",
                description = description.description,
                timestamp = Instant.now()
            )
            if (migrationExists(migration)) {
                println("migration $migration already completed")
                return
            }
            description.apply(migrations, migration)
            println("starting ${migration.migrationId}: $n migration: ${migration.description}")
            commit(migration)
            println("migration $migration successfully completed")
        }
    }

    private suspend fun migrationExists(m: MigrationMetadata): Boolean {
        val metadata = migrations.findOne((MigrationMetadata::migrationId eq m.migrationId))
        return metadata != null
    }

    private suspend fun commit(m: MigrationMetadata) {
        migrations.insert(m)
    }
}
