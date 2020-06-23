package edu.vsu.flora.migrator

import edu.vsu.flora.migrator.schema.MigrationCollection
import edu.vsu.flora.migrator.schema.MigrationMetadata
import edu.vsu.flora.migrator.scripts.M000InitialMigration
import edu.vsu.flora.migrator.scripts.M001AddFrequencyToSpecies
import edu.vsu.flora.migrator.scripts.M002RenameFrequencies
import edu.vsu.flora.migrator.scripts.M003ProvideClassDescription
import edu.vsu.flora.migrator.scripts.M004ProvideDefaultComplexes
import edu.vsu.flora.migrator.scripts.M005TyposFixes
import edu.vsu.flora.migrator.scripts.M006DefaultHydrophile
import edu.vsu.flora.migrator.scripts.M007TyposFixes2
import kotlinx.coroutines.runBlocking
import org.litote.kmongo.coroutine.coroutine
import org.litote.kmongo.reactivestreams.KMongo

fun main(args: Array<String>) {
    val client = KMongo.createClient().coroutine
    val database = client.getDatabase("flora")

    runBlocking {
        M000InitialMigration(database).migrate()
        M001AddFrequencyToSpecies(database).migrate()
        M002RenameFrequencies(database).migrate()
        M003ProvideClassDescription(database).migrate()
        M004ProvideDefaultComplexes(database).migrate()
        M005TyposFixes(database).migrate()
        M006DefaultHydrophile(database).migrate()
        M007TyposFixes2(database).migrate()
    }

}

suspend infix fun MigrationCollection.insert(doc: MigrationMetadata) {
    this.insertOne(doc)
}
