package edu.vsu.flora.migrator

import edu.vsu.flora.migrator.schema.MigrationMetadata
import kotlinx.coroutines.runBlocking
import org.litote.kmongo.coroutine.CoroutineCollection
import org.litote.kmongo.coroutine.coroutine
import org.litote.kmongo.eq
import org.litote.kmongo.reactivestreams.KMongo

typealias MigrationCollection = CoroutineCollection<MigrationMetadata>

fun main(args: Array<String>) {
    val client = KMongo.createClient().coroutine
    val database = client.getDatabase("flora")
    val metadataCollection = database.getCollection<MigrationMetadata>()

    runBlocking {
        val metadata = metadataCollection.findOne((MigrationMetadata::migrationId eq 0))
        metadata ?: throw RuntimeException("initial migration required")
    }

}

suspend infix fun MigrationCollection.insert(doc: MigrationMetadata) {
    this.insertOne(doc)
}
