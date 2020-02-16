package edu.vsu.florab.infrastructure

import org.mongodb.scala.{Document, MongoClient, MongoCollection, MongoDatabase}

object Storage {
  private val mongoClient: MongoClient = MongoClient("mongodb://localhost")
  val database: MongoDatabase = mongoClient.getDatabase("flora")
  val phylumCollection: MongoCollection[Document] = database.getCollection("phylum")
  val familyCollection: MongoCollection[Document] = database.getCollection("family")
  val speciesCollection: MongoCollection[Document] = database.getCollection("species")
}
