package edu.vsu.flora.migrator.scripts

import com.mongodb.client.model.Filters
import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.setTo

class M006DefaultHydrophile(database: CoroutineDatabase) : Migration(
    database, 6, listOf(
        migrationDescription
    )
) {
    companion object {
        data class Species(val hydrophile: String)
        val migrationDescription = MigrationDescription("provide default hydrophile to each record") { db ->
            db.getCollection<Species>().updateMany(Filters.exists("_id"), Species::hydrophile setTo "UNDEFINED")
        }
    }
}
