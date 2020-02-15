package edu.vsu.florab.migrations

import edu.vsu.florab.infrastructure.Storage.database
import org.mongodb.scala.MongoCollection

package object process {
  type MetadataCollection = MongoCollection[Metadata]
  type MigrationUnit = (MetadataCollection, Metadata) => Unit
  class Metadata(id: Int, index: Int, author: String, datetime: Long)

  val metadataCollection: MetadataCollection = database.getCollection("metadata")
}
