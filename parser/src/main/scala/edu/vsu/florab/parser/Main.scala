package edu.vsu.florab.parser

import java.io.File

import com.github.tototoshi.csv.CSVReader

import scala.collection.mutable

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
  println(cache)
}
