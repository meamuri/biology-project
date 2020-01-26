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
    val tmp = e.map(_.trim)
    val row = if (tmp.length == 6) tmp else {
      tmp.head :: tmp(1) :: tmp.slice(4, 8)
    }
    val phylum = Taxon(row.head, row(1))
    val family = Taxon(row(2), row(3))
    val species = Taxon(row(4), row(5))
    Row(phylum, family, species)
  })
  taxonList.foreach(e => {
    val families = cache.getOrElseUpdate(e.phylum, mutable.Map())
    val species = families.getOrElseUpdate(e.family, List())
    families(e.family) = e.species :: species
  })

  cache.foreach { phylum =>
    val id = insertTaxon(phylum._1, Document(), Storage.phylumCollection)
    val parentDocument = Document("phylum" ->
      Document("_id" -> id, "name" -> phylum._1.name, "ruLocaleName" -> phylum._1.rusLocaleName))
    phylum._2.foreach { family =>
      val familyId = insertTaxon(family._1, parentDocument ++ Document("parentId" -> id), Storage.familyCollection)
      val familyDocument = parentDocument ++
        Document("family" ->
          Document("_id" -> familyId, "parentId" -> id, "name" -> family._1.name, "ruLocaleName" -> family._1.rusLocaleName))
      family._2.foreach { species =>
        insertTaxon(species, familyDocument ++ Document("parentId" -> familyId), Storage.speciesCollection)
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
