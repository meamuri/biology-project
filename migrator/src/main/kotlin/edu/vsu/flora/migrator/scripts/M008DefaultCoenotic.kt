package edu.vsu.flora.migrator.scripts

import com.mongodb.client.model.Filters
import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.setTo

class M008DefaultCoenotic(database: CoroutineDatabase) : Migration(
    database, 8, listOf(defaultCoenotic)
) {
    companion object {
        data class Species(val coenotic: String)
        val defaultCoenotic = MigrationDescription("provide default coenotic") { db ->
            val filter = Filters.exists("_id")
            val update = Species::coenotic setTo "UNDEFINED"
            db.getCollection<Species>().updateMany(filter, update)
        }
    }
}
