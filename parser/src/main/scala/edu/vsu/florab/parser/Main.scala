package edu.vsu.florab.parser

import java.io.File

import com.github.tototoshi.csv.CSVReader
import org.bson.types.ObjectId
import org.mongodb.scala.Document
import org.mongodb.scala._

import scala.collection.mutable
import scala.concurrent.Await
import scala.concurrent.duration._

object Main extends App {
  val reader = CSVReader.open(new File("data/Classification.csv"))
  val cache: mutable.Map[Taxon, mutable.Map[Taxon, List[Taxon]]] = mutable.Map()
  val taxonList = reader.all().map(e => {
    val phylum = Taxon(e.head, e(1))
    val family = Taxon(e(2), e(3))
    val species = Taxon(e(4), e(5))
    Row(phylum, family, species)
  })
  taxonList.foreach(e => {
    val families = cache.getOrElseUpdate(e.phylum, mutable.Map())
    val species = families.getOrElseUpdate(e.family, List())
    families(e.family) = e.species :: species
  })

  cache.foreach { phylum =>
    val id = insertTaxon(phylum._1, Document(), Storage.phylumCollection)
    val parentDocument = Document("phylum" -> Document("_id" -> id, "name" -> phylum._1.name))
    phylum._2.foreach { family =>
      val familyId = insertTaxon(family._1, parentDocument, Storage.familyCollection)
      val familyDocument = parentDocument ++ Document("family" -> Document("_id" -> familyId, "name" -> family._1.name))
      family._2.foreach { species =>
        insertTaxon(species, familyDocument, Storage.speciesCollection)
      }
    }
  }

  def insertTaxon(taxon: Taxon, default: Document, collection: MongoCollection[Document]): ObjectId = {
    val id = ObjectId.get()
    val doc = default ++ Document(
      "_id" -> id,
      "name" -> taxon.name,
      "ruLocaleName" -> taxon.rusLocaleName
    )
    val insert = collection.insertOne(doc).toFuture()
    Await.ready(insert, 1.second).value
    id
  }
}
