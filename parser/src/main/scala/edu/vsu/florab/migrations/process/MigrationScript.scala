package edu.vsu.florab.migrations.process

import java.time.ZoneOffset
import java.util.{Calendar, TimeZone}

import org.mongodb.scala.MongoCollection

import scala.concurrent.Await
import scala.concurrent.duration._

trait MigrationScript extends Migration with Numero {
  def migrate(metadataCollection: MongoCollection[Metadata]): Unit = {
    val timezone = TimeZone.getTimeZone(ZoneOffset.UTC)
    val calendar = Calendar.getInstance(timezone)
    for {
      (script, i) <- scripts.zipWithIndex
      metadata = new Metadata(id = n, index = i, author = "dr.meamuri", datetime = calendar.getTimeInMillis)
      isCorrect = check(metadataCollection, metadata) if isCorrect
      _ = script.apply(metadataCollection, metadata)
      _ = commit(metadataCollection, metadata)
    } yield ()
  }

  private def check(collection: MetadataCollection, migrationMetadata: Metadata): Boolean = {
    val doc = collection.find().toFuture()
    val res = Await.ready(doc, 1.second).value
    res.isEmpty
  }

  private def commit(collection: MetadataCollection, migrationMetadata: Metadata): Boolean = {
    true
  }

}
