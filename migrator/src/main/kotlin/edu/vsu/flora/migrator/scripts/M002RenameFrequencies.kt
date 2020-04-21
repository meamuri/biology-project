package edu.vsu.flora.migrator.scripts

import com.mongodb.client.model.Filters
import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.setTo

class M002RenameFrequencies(database: CoroutineDatabase) : Migration(
    database, 2, listOf(
        renameDefaultFrequencies
    )
) {
    companion object {
        data class Species(val frequency: String)
        val renameDefaultFrequencies = MigrationDescription("rename enum of frequencies") { db ->
            db.getCollection<Species>().updateMany(Filters.eq("frequency", "HIGH"), Species::frequency setTo "RECOVERING")
            db.getCollection<Species>().updateMany(Filters.eq("frequency", "MEDIUM"), Species::frequency setTo "SHRINKING")
            db.getCollection<Species>().updateMany(Filters.eq("frequency", "LOW"), Species::frequency setTo "ENDANGERED")
            db.getCollection<Species>().updateMany(Filters.eq("frequency", "UNKNOWN"), Species::frequency setTo "UNDEFINED")
        }
    }
}
