package edu.vsu.flora.migrator.process

import edu.vsu.flora.migrator.insert
import edu.vsu.flora.migrator.schema.MigrationCollection
import edu.vsu.flora.migrator.schema.MigrationDescription
import edu.vsu.flora.migrator.schema.MigrationMetadata
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.eq
import java.time.Instant

abstract class Migration(
    private val db: CoroutineDatabase,
    override val id: Int,
    override val actions: List<MigrationDescription>
) : Numero, MigrationScript {
    private val migrations: MigrationCollection = db.getCollection()

    suspend fun migrate() {
        val migrationId = id
        actions.forEachIndexed { n, migration ->
            val metadata = MigrationMetadata(
                migrationId,
                scriptId = n,
                author = "dr.meamuri",
                description = migration.description,
                timestamp = Instant.now()
            )
            if (migrationExists(metadata)) {
                println("migration $metadata already completed")
                return
            }
            migration.apply(db)
            println("starting ${metadata.migrationId}: $n migration: ${metadata.description}")
            commit(metadata)
            println("migration $metadata successfully completed")
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
