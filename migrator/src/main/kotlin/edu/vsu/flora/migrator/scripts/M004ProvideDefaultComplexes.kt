package edu.vsu.flora.migrator.scripts

import com.mongodb.client.model.Filters
import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.setTo

class M004ProvideDefaultComplexes(database: CoroutineDatabase) : Migration(
    database, 4, listOf(
        migrationDescription
    )
) {
    companion object {
        data class Species(val complex: String)
        val migrationDescription = MigrationDescription("provide default complexes to each record") { db ->
            db.getCollection<Species>().updateMany(Filters.exists("_id"), Species::complex setTo "UNKNOWN")
        }
    }
}
