package edu.vsu.florab.parser

import org.mongodb.scala.{Document, MongoClient, MongoCollection, MongoDatabase}

object Storage {
  // Use a Connection String
  private val mongoClient: MongoClient = MongoClient("mongodb://localhost")
  private val database: MongoDatabase = mongoClient.getDatabase("flora")
  val phylumCollection: MongoCollection[Document] = database.getCollection("phylum")
  val familyCollection: MongoCollection[Document] = database.getCollection("family")
  val speciesCollection: MongoCollection[Document] = database.getCollection("species")
}
