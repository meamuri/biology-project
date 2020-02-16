package edu.vsu.flora.migrator.scripts

import com.mongodb.client.model.Filters
import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.setTo

class M001AddFrequencyToSpecies(database: CoroutineDatabase) : Migration(
    database, 1, listOf(
        insertDefaultFrequency
    )
) {
    companion object {
        data class Species(val frequency: String)
        val insertDefaultFrequency =
            MigrationDescription("add default frequency to species") { db ->
                db.getCollection<Species>().updateMany(Filters.exists("_id"), Species::frequency setTo "HIGH")
            }
    }
}
