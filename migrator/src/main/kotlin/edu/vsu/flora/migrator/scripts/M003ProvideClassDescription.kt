package edu.vsu.flora.migrator.scripts

import com.mongodb.client.model.Filters
import edu.vsu.flora.migrator.process.Migration
import edu.vsu.flora.migrator.schema.MigrationDescription
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.eq
import org.litote.kmongo.setTo
import java.io.File

class M003ProvideClassDescription(database: CoroutineDatabase) : Migration(
    database, 3, listOf(
        migrationDescription
    )
) {
    companion object {
        data class Species(val name: String, val classTaxon: ClassTaxon)
        val migrationDescription = MigrationDescription("read initial csv and fill classname if present") { db ->
            val resource = this::class.java.getResource("/Classification.csv")
            val fileContent = File(resource.toURI()).readLines()
            val withClasses = fileContent
                .filter { line ->
                    line.filter { char -> char == ',' }.count() == 7
                }
            val forUpdating = withClasses.map { row ->
                val elementsOfLine = row.split(",").map { it.trim() }.drop(2)
                ShortDescription(elementsOfLine.dropLast(1).last(), elementsOfLine.component1(), elementsOfLine.component2())
            }

            forUpdating.forEach {
                val filter = Species::name eq it.speciesName
                val update = Species::classTaxon setTo ClassTaxon(it.className, it.ruLocaleClassName)
                db.getCollection<Species>().updateMany(filter, update)
            }
        }
    }

    data class ClassTaxon(val name: String, val ruLocaleName: String)
    data class ShortDescription(val speciesName: String, val className: String, val ruLocaleClassName: String)
}
